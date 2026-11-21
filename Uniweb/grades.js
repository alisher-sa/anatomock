const ORD = { '1': '1st', '2': '2nd', '3': '3rd' };
const BLOCKS = {
    '1': ['Thorax', 'Abdomen', 'Pelvis', 'Upper and Lower limbs'],
    '2': ['Neuroanatomy'],
    '3': ['Clinical Anatomy']
};

const SUPABASE_URL = 'https://iecnvwledwyryyyhkscu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tCsh8U7FZm3Kga7AyNS3zw_aySFn_MC';   // publishable key: meant to be public. NEVER put a secret key here.
const SUPABASE_JS_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.0/dist/umd/supabase.js';
const BUCKET = 'specimens';
const LOCAL_MISTAKES = 'anatomock_mistakes';   // mistake log for visitors who are not signed in

let sb = null;
let _supabaseInitError = '';

// The library loads itself, so no page can forget the <script> tag.
function loadSupabaseLib() {
    if (window.supabase?.createClient) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = SUPABASE_JS_URL;
        s.onload = resolve;
        s.onerror = () => reject(new Error('Could not load the Supabase library (check your internet connection).'));
        document.head.appendChild(s);
    });
}
async function initSupabase() {
    try {
        await loadSupabaseLib();
        sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (err) {
        sb = null;
        _supabaseInitError = err.message || String(err);
    }
}
function getSupabaseError() {
    return sb ? '' : (_supabaseInitError || 'Supabase client is not initialized.');
}

let _testsCache = [];
let _sessionUser = null;
let _isAdmin = false;     // answered by the server (is_admin()), never decided in the browser
let _loadError = '';

function esc(str = '') {
    return String(str ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function norm(s = '') {
    return String(s).toLowerCase().replace(/ı/g, 'i').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ').trim();
}

function lev(a, b) {
    const d = [...Array(b.length + 1).keys()];
    for (let i = 1; i <= a.length; i++) {
        let p = d[0]; d[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const t = d[j];
            d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1));
            p = t;
        }
    }
    return d[b.length];
}

function isCorrect(given, acceptedList = []) {
    const g = norm(given);
    if (!g) return false;
    return acceptedList.some(a => {
        const n = norm(a), tol = n.length >= 14 ? 2 : n.length >= 8 ? 1 : 0;
        return lev(g, n) <= tol;
    });
}

function renderStage(stage, t, active = 0, onPlace = null, zoom = false) {
    if (!stage || !t) return;
    if (stage._ro) stage._ro.disconnect();
    stage.innerHTML = '';
    const w = document.createElement('div');
    w.className = 'img-wrap';
    const img = new Image();
    img.alt = 'Specimen';
    img.onerror = () => { stage.textContent = 'Image failed to load.'; };
    const fit = () => {
        if (!img.naturalWidth || !stage.clientWidth) return;
        const s = Math.min(stage.clientWidth / img.naturalWidth, stage.clientHeight / img.naturalHeight, 3);
        img.style.width = img.naturalWidth * s + 'px';
        img.style.height = img.naturalHeight * s + 'px';
    };
    img.onload = fit;
    img.src = t.img || t.img_url || '';
    w.appendChild(img);
    (t.arrows || []).forEach((a, i) => {
        if (!onPlace && i !== active) return;
        const el = document.createElement('div');
        el.className = 'arrow' + (i === active ? ' active' : '');
        el.style.cssText = `left:${a.x}%;top:${a.y}%;--a:${a.angle ?? 225}deg`;
        el.innerHTML = `<i class="needle"></i><b>${i + 1}</b>`;
        w.appendChild(el);
    });
    if (onPlace) w.onclick = e => {
        const r = w.getBoundingClientRect();
        onPlace(+((e.clientX - r.left) / r.width * 100).toFixed(1), +((e.clientY - r.top) / r.height * 100).toFixed(1));
    };
    else if (zoom) w.onclick = e => {
        if (w.classList.contains('zoomed')) return w.classList.remove('zoomed');
        const r = w.getBoundingClientRect();
        w.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`;
        w.classList.add('zoomed');
    };
    stage.appendChild(w);
    if (t.src) {
        const s = document.createElement('span');
        s.className = 'source-tag';
        s.textContent = t.src;
        stage.appendChild(s);
    }
    stage._ro = new ResizeObserver(fit);
    stage._ro.observe(stage);
}

function getAllTests() {
    return _testsCache;
}
function getBackendError() { return _loadError; }

async function refreshAdminFlag() {
    _isAdmin = false;
    if (!sb || !_sessionUser) return;
    const { data, error } = await sb.rpc('is_admin');
    _isAdmin = !error && data === true;
}

async function refreshTestsFromCloud() {
    if (!sb) { _loadError = getSupabaseError(); return []; }
    const { data, error } = await sb.from('tests').select('*').order('id', { ascending: true });
    if (error) { _loadError = error.message; console.error('Loading tests failed:', error); return _testsCache; }
    _loadError = '';
    _testsCache = (data || [])
        .filter(t => t && (t.img_path || t.img_url) && Array.isArray(t.arrows) && t.arrows.length && BLOCKS[String(t.grade)])
        .map(t => {
            const bl = BLOCKS[String(t.grade)];
            return {
                ...t,
                grade: String(t.grade),
                block: bl.find(b => b === t.block) || bl[0],
                img: t.img_path ? sb.storage.from(BUCKET).getPublicUrl(t.img_path).data.publicUrl : (t.img_url || '')
            };
        });
    return _testsCache;
}

async function uploadTestToCloud({ grade, block, topic, fileBlob, externalUrl, src, arrows }) {
    if (!sb) throw new Error(getSupabaseError());
    if (!auth.isAdmin()) throw new Error('Only the administrator can upload tests. Please sign in with the admin account.');
    const id = Date.now();
    let img_path = null, img_url = null;
    if (fileBlob) {
        const path = `grade${grade}/${id}_${Math.random().toString(36).slice(2, 7)}.jpg`;
        const { error } = await sb.storage.from(BUCKET).upload(path, fileBlob, { contentType: 'image/jpeg', upsert: false });
        if (error) throw error;
        img_path = path;
    } else if (externalUrl) {
        img_url = externalUrl;
    } else {
        throw new Error('Please add a photo.');
    }
    const { error: dbErr } = await sb.from('tests').insert({ id, grade: String(grade), block, topic, img_path, img_url, src, arrows });
    if (dbErr) {
        if (img_path) await sb.storage.from(BUCKET).remove([img_path]);   // do not leave an orphan photo behind
        throw dbErr;
    }
    await refreshTestsFromCloud();
}

async function moveTestBlockInCloud(id, block) {
    if (!sb) throw new Error(getSupabaseError());
    const { error } = await sb.from('tests').update({ block }).eq('id', id);
    if (error) throw error;
    await refreshTestsFromCloud();
}

async function deleteTestFromCloud(id) {
    if (!sb) throw new Error(getSupabaseError());
    const target = _testsCache.find(t => t.id === id);
    const { error } = await sb.from('tests').delete().eq('id', id);
    if (error) throw error;
    if (target?.img_path) await sb.storage.from(BUCKET).remove([target.img_path]);
    await refreshTestsFromCloud();
}

/* =========================================================
   MISTAKE LOG: in the cloud for signed-in students (only they can read it),
   in this browser for visitors who are not signed in
   ========================================================= */
function localMistakes() {
    try { return JSON.parse(localStorage.getItem(LOCAL_MISTAKES) || '[]'); } catch { return []; }
}

async function getCloudMistakes() {
    const { data, error } = await sb.from('mistakes').select('*').eq('user_id', _sessionUser.id).order('created_at', { ascending: true });
    if (error) throw error;
    return (data || []).map(r => ({ key: r.key, testId: r.test_id, k: r.k, grade: r.grade, block: r.block, topic: r.topic, given: r.given, ans: r.ans }));
}

async function syncExamMistakesToCloud(resultsList) {
    const solvedKeys = resultsList.filter(r => r.ok).map(r => r.key);
    const missedRows = resultsList.filter(r => !r.ok).map(r => ({
        key: r.key, user_id: _sessionUser.id, test_id: r.testId, k: r.k,
        grade: r.grade, block: r.block, topic: r.topic, given: r.given, ans: r.ans
    }));
    if (solvedKeys.length) {
        const { error } = await sb.from('mistakes').delete().eq('user_id', _sessionUser.id).in('key', solvedKeys);
        if (error) throw error;
    }
    if (missedRows.length) {
        const { error } = await sb.from('mistakes').upsert(missedRows, { onConflict: 'user_id,key' });
        if (error) throw error;
    }
}

async function clearCloudMistakes() {
    const { error } = await sb.from('mistakes').delete().eq('user_id', _sessionUser.id);
    if (error) throw error;
}

// what the pages call
async function getMistakes() {
    return sb && _sessionUser ? getCloudMistakes() : localMistakes();
}
async function saveMistakes(results) {   // results: [{ key, ok, testId, k, grade, block, topic, given, ans }]
    if (sb && _sessionUser) return syncExamMistakesToCloud(results);
    let m = localMistakes();
    results.forEach(r => {
        m = m.filter(x => x.key !== r.key);
        if (!r.ok) { const { ok, ...row } = r; m.push(row); }
    });
    try { localStorage.setItem(LOCAL_MISTAKES, JSON.stringify(m)); } catch {}
}
async function clearAllMistakes() {
    localStorage.removeItem(LOCAL_MISTAKES);
    if (sb && _sessionUser) await clearCloudMistakes();
}

/* =========================================================
   AUTHENTICATION & KVKK / GDPR ACCOUNT ERASURE
   ========================================================= */
const auth = {
    currentUser() {
        if (!_sessionUser) return null;
        const meta = _sessionUser.user_metadata || {};
        const isAdm = _isAdmin;
        return {
            id: _sessionUser.id,
            email: _sessionUser.email,
            name: meta.name || _sessionUser.email.split('@')[0],
            grade: meta.grade || '1',
            role: isAdm ? 'admin' : 'student'
        };
    },
    isAdmin() {
        const u = this.currentUser();
        return Boolean(u && u.role === 'admin');
    },
    async signUp(name, email, password, grade = '1') {
        if (!sb) return { ok: false, msg: 'Supabase not configured yet.' };
        name = name.trim(); email = email.trim().toLowerCase();
        if (!name || !email || !password) return { ok: false, msg: 'Please fill in all fields.' };
        const { data, error } = await sb.auth.signUp({
            email,
            password,
            options: { data: { name, grade } }
        });
        if (error) return { ok: false, msg: error.message };
        if (!data.session) return { ok: false, msg: 'Account created! Please confirm your e-mail address, then log in.' };   // e-mail confirmation is switched on in Supabase
        _sessionUser = data.user;
        return { ok: true, user: this.currentUser() };
    },
    async logIn(email, password) {
        if (!sb) return { ok: false, msg: 'Supabase not configured yet.' };
        email = email.trim().toLowerCase();
        if (!email || !password) return { ok: false, msg: 'Please fill in all fields.' };
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) return { ok: false, msg: error.message };
        _sessionUser = data.user;
        await refreshAdminFlag();
        return { ok: true, user: this.currentUser() };
    },
    async logOut() {
        if (sb) await sb.auth.signOut();
        _sessionUser = null;
        _isAdmin = false;
        window.location.href = 'index.html';
    },
    async deleteAccount() {
        const T = window.T || (s => s);
        const u = this.currentUser();
        if (!u) return alert(T('Please sign in first.'));
        if (!confirm(T('Delete your account and all saved data permanently?'))) return;
        if (!sb) return alert(getSupabaseError());
        const { error } = await sb.rpc('delete_own_account');
        if (error) return alert(error.message);
        await sb.auth.signOut();
        _sessionUser = null;
        _isAdmin = false;
        localStorage.removeItem(LOCAL_MISTAKES);
        alert(T('Account deleted.'));
        window.location.href = 'index.html';
    },
    openModal(mode = 'login', note = '') {
        let modal = document.getElementById('auth-modal-root');
        if (!modal) { modal = document.createElement('div'); modal.id = 'auth-modal-root'; document.body.appendChild(modal); }
        const isReg = mode === 'signup';
        modal.innerHTML = `
        <div class="auth-backdrop" onclick="if(event.target===this)auth.closeModal()">
            <div class="auth-modal">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                    <h3>${isReg ? 'Sign Up (New Student)' : 'Sign In / Log In'}</h3>
                    <button class="nav-auth-btn" onclick="auth.closeModal()">✕</button>
                </div>
                ${note ? `<p style="font-size:0.83rem; color:var(--burgundy); font-weight:600; margin-bottom:10px;">${esc(note)}</p>` : ''}
                ${isReg ? `<input class="input" id="au-name" placeholder="Name or Nickname">` : ''}
                <input class="input" id="au-email" type="email" placeholder="Email">
                <input class="input" id="au-pass" type="password" placeholder="Password (min 6 characters)" onkeydown="if(event.key==='Enter')auth.submitModal('${mode}')">
                ${isReg ? `
                <select class="input" id="au-grade">
                    <option value="1">1st Grade Student</option>
                    <option value="2">2nd Grade Student</option>
                    <option value="3">3rd Grade Student</option>
                </select>` : ''}
                <p id="au-err" class="res-bad" style="font-size:0.84rem; margin-bottom:10px;"></p>
                <button class="btn" id="au-submit" style="width:100%; margin-bottom:10px;" onclick="auth.submitModal('${mode}')">${isReg ? 'Sign Up' : 'Log In'}</button>
                ${isReg ? `<p style="font-size:0.74rem; color:var(--ink-muted); text-align:center; margin-bottom:10px;">By signing up, you agree to our <a href="legal.html" style="color:var(--burgundy);">KVKK/GDPR Privacy Policy &amp; Terms</a>.</p>` : ''}
                <p style="font-size:0.84rem; text-align:center; color:var(--ink-muted);">
                    ${isReg ? `Already registered? <a href="#" onclick="auth.openModal('login');return false;">Log In</a>`
                            : `No account yet? <a href="#" onclick="auth.openModal('signup');return false;">Sign Up</a>`}
                </p>
            </div>
        </div>`;
    },
    closeModal() { const m = document.getElementById('auth-modal-root'); if (m) m.innerHTML = ''; },
    async submitModal(mode) {
        const btn = document.getElementById('au-submit');
        const email = document.getElementById('au-email')?.value || '';
        const pass = document.getElementById('au-pass')?.value || '';
        if (btn) btn.disabled = true;
        const res = mode === 'signup'
            ? await this.signUp(document.getElementById('au-name')?.value || '', email, pass, document.getElementById('au-grade')?.value || '1')
            : await this.logIn(email, pass);
        if (btn) btn.disabled = false;
        if (!res.ok) {
            document.getElementById('au-err').textContent = res.msg;
            return;
        }
        this.closeModal();
        if (res.user.role === 'admin') window.location.href = 'admin.html';
        else location.reload();
    },
    syncUI() {
        const u = this.currentUser();
        const inBtn = document.getElementById('student-signin-btn');
        const outBtn = document.getElementById('student-signout-btn');
        if (inBtn && outBtn) {
            inBtn.classList.toggle('hidden', Boolean(u));
            outBtn.classList.toggle('hidden', !u);
        }
        const navUl = document.querySelector('.nav-links ul');
        if (navUl) {
            let admLi = document.getElementById('nav-admin-slot');
            if (this.isAdmin() && !admLi) {
                admLi = document.createElement('li');
                admLi.id = 'nav-admin-slot';
                admLi.innerHTML = `<a href="admin.html" class="panel-pill">ADMIN</a>`;
                navUl.appendChild(admLi);
            }
            let li = document.getElementById('nav-auth-slot');
            if (!li) {
                li = document.createElement('li');
                li.id = 'nav-auth-slot';
                navUl.appendChild(li);
            }
            li.innerHTML = u
                ? `<span class="badge-pill" style="margin-right:4px;">${esc(u.name)}</span><button class="nav-auth-btn primary" onclick="auth.logOut()">SIGN OUT</button>`
                : `<button class="nav-auth-btn" onclick="auth.openModal('login')">LOG IN</button><button class="nav-auth-btn primary" onclick="auth.openModal('signup')">SIGN IN</button>`;
        }
    }
};

// Every page waits for this before reading tests, the session or mistakes. It never rejects.
window.appReady = (async () => {
    try {
        await initSupabase();
        if (sb) {
            const { data } = await sb.auth.getSession();
            _sessionUser = data?.session?.user || null;
            await refreshAdminFlag();
            await refreshTestsFromCloud();
            sb.auth.onAuthStateChange((_evt, session) => { _sessionUser = session?.user || null; });
        } else {
            _loadError = getSupabaseError();
        }
    } catch (err) {
        _loadError = err.message || String(err);
        console.error(err);
    }
    auth.syncUI();
})();