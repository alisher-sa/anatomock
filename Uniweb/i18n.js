(() => {
const TR = {
'HOME':'ANA SAYFA','EXAM-MODE':'SINAV MODU','REVISION':'TEKRAR','WHY US?':'NEDEN BİZ?','FAQ':'SSS','CONTACT':'İLETİŞİM','STUDENT':'ÖĞRENCİ','ADMIN':'YÖNETİCİ',
'1st GRADE':'1. SINIF','2nd GRADE':'2. SINIF','3rd GRADE':'3. SINIF','LOG IN':'GİRİŞ YAP','SIGN IN':'KAYDOL','SIGN OUT':'ÇIKIŞ YAP',
'AnatoMock - Practice and Solidify Together':'AnatoMock - Birlikte Pratik Yapın ve Pekiştirin','AnatoMock — Student Panel':'AnatoMock — Öğrenci Paneli','AnatoMock — Spotter Exam':'AnatoMock — Spotter Sınavı',
'Real Specimens · Active Recall':'Gerçek Örnekler · Aktif Hatırlama','Practice & Solidify Together':'Birlikte Pratik Yapın ve Pekiştirin',
'Questions and active recall using real anatomical specimens and classical plates.':'Gerçek anatomik örnekler ve klasik plakalarla sorular ve aktif hatırlama.',
'Start Exam-Mode':'Sınav Modunu Başlat','Quick Revision':'Hızlı Tekrar',
'EXAM-MODE: Select Your Class':'SINAV MODU: Sınıfınızı Seçin','Choose your current grade to launch class and block specific tests and topics uploaded':'Yüklenen sınıfa ve komiteye özel test ve konuları başlatmak için sınıfınızı seçin',
'Sample Question (Thorax block; 1st Grade)':'Örnek Soru (Toraks bloğu; 1. Sınıf)','Heart Specimen — Identify needle 1:':'Kalp Örneği — 1 numaralı iğneyi tanımlayın:',
'Type your answer (Latin or English)':'Cevabınızı yazın (Latince veya İngilizce)','Check':'Kontrol Et','Source: Cleveland Clinic':'Kaynak: Cleveland Clinic',
'Correct! Pick your Grade above for full timed exams.':'Doğru! Tam süreli sınavlar için yukarıdan sınıfınızı seçin.','Not quite — pick your Grade above to practice.':'Tam değil — pratik için yukarıdan sınıfınızı seçin.',
'REVISIONS: High-Yield Atlas':'TEKRAR: Yüksek Verimli Atlas','Structural Images for Students to RETAIN knowledge':'Öğrencilerin bilgiyi KALICI hale getirmesi için yapısal görseller',
'Thoracic Cage':'Göğüs Kafesi','True ribs (1–7), false ribs (8–10), floating ribs (11–12), and sternal angle at T4/T5.':'Gerçek kaburgalar (1–7), yalancı kaburgalar (8–10), yüzen kaburgalar (11–12) ve T4/T5 hizasında sternal açı.',
'Cranial Base & Foramina':'Kafa Tabanı ve Foramenler','Foramen magnum, ovale (V3), spinosum (MMA), and jugular foramen (CN IX, X, XI).':'Foramen magnum, ovale (V3), spinosum (MMA) ve foramen jugulare (KS IX, X, XI).',
'Coronary Circulation':'Koroner Dolaşım','LAD supplies anterior 2/3 of septum; PDA determines coronary dominance.':'LAD septumun ön 2/3’ünü besler; PDA koroner dominansı belirler.',
'WHY US?':'NEDEN BİZ?','ZERO DISTRACTIONS. PURE PREPARATION :)':'SIFIR DİKKAT DAĞINIKLIĞI. SAF HAZIRLIK :)','1. Real Specimens Only':'1. Yalnızca Gerçek Örnekler',
'Study from':'','real cadaveric dissections, photos, and':'Gerçek kadavra diseksiyonları ve fotoğraflarıyla çalışın,','PRACTICE ENDLESSLY':'SONSUZA KADAR PRATİK YAPIN','.':'.',
'2. Simulated Bell Timer':'2. Simüle Zil Zamanlayıcısı','30-second station rotations for 2 questions (15 sec - each) to':'2 soruluk 30 saniyelik istasyon rotasyonlarıyla (her biri 15 sn)','eliminate exam-day panic':'sınav günü paniğini ortadan kaldırın',
'3. Mistake Log':'3. Hata Günlüğü','Mistakes are automatically lined into your':'Hatalar otomatik olarak toplanır:','Student Revision deck':'Öğrenci Tekrar destesi',
'Everything you need to know about US':'Hakkımızda bilmeniz gereken her şey','Why should I choose you?':'Neden sizi seçmeliyim?',
'As AnatoMock team, we provide never-ending support for your anatomical studies. Plus, we mostly cover real-case scenarios which will definitely help our users to grow and master in the exams.':'AnatoMock ekibi olarak anatomi çalışmalarınız için bitmeyen destek sağlıyoruz. Ayrıca çoğunlukla gerçek vaka senaryolarını işliyoruz; bu da kullanıcılarımızın sınavlarda gelişmesine ve ustalaşmasına kesinlikle yardımcı olacaktır.',
'How realistic is your "Exam-mode"?':'"Sınav modunuz" ne kadar gerçekçi?','Very. Every question uses numbered pins with bell-simulators. At the end of your exam, we collect and provide data about how "well" you did — To See How Fast You\'re "GROWING" With US ;)':'Çok. Her soru numaralı iğneler ve zil simülatörleri kullanır. Sınavın sonunda ne kadar "iyi" yaptığına dair veri toplar ve sunarız — Bizimle ne kadar hızlı "GELİŞTİĞİNİ" görmen için ;)',
'Can I switch to English/Latin terms?':'İngilizce/Latince terimlere geçebilir miyim?','Yes, standard Latin and English Nomina Anatomica terms are supported.':'Evet, standart Latince ve İngilizce Nomina Anatomica terimleri desteklenir.',
'Your Name':'Adınız','Email':'E-posta','Message':'Mesaj','Send Message':'Mesaj Gönder',
'KVKK & Privacy Policy':'KVKK ve Gizlilik Politikası','Terms of Service':'Kullanım Koşulları','Medical Disclaimer':'Tıbbi Uyarı','Delete Account':'Hesabı Sil',
'Please sign in first.':'Lütfen önce giriş yapın.','Delete your account and all saved data permanently?':'Hesabınız ve kayıtlı tüm verileriniz kalıcı olarak silinsin mi?','Account deleted.':'Hesap silindi.',
'STUDENT PANEL':'ÖĞRENCİ PANELİ','1st Grade Tests':'1. Sınıf Testleri','2nd Grade Tests':'2. Sınıf Testleri','3rd Grade Tests':'3. Sınıf Testleri','Sign In / Log In':'Giriş Yap','Sign Out / Log Out':'Çıkış Yap','← Back to Home':'← Ana Sayfaya Dön',
'Select Your Class':'Sınıfınızı Seçin','Jump directly to your grade\'s exam bank.':'Doğrudan sınıfınızın sınav bankasına geçin.','Year 1':'1. Yıl','Year 2':'2. Yıl','Year 3':'3. Yıl','1st Grade':'1. Sınıf','2nd Grade':'2. Sınıf','3rd Grade':'3. Sınıf',
'Upper & Lower Limb, General Anatomy':'Üst ve Alt Ekstremite, Genel Anatomi','Upper & Lower Limb, General Anatomy.':'Üst ve Alt Ekstremite, Genel Anatomi.','Neuroanatomy':'Nöroanatomi','Neuroanatomy.':'Nöroanatomi.','Clinical Anatomy':'Klinik Anatomi','Clinical Anatomy.':'Klinik Anatomi.','Open 1st Grade':'1. Sınıfı Aç','Open 2nd Grade':'2. Sınıfı Aç','Open 3rd Grade':'3. Sınıfı Aç',
'Your Mistake Log (Revision Deck)':'Hata Günlüğünüz (Tekrar Destesi)','Questions you missed during Exam-Mode are automatically lined here.':'Sınav Modunda kaçırdığınız sorular otomatik olarak buraya eklenir.',
'Photo':'Fotoğraf','Grade · Topic':'Sınıf · Konu','Your answer':'Cevabınız','Correct answer':'Doğru cevap','Action':'İşlem','Retest':'Tekrar Test Et','Clear Revision Deck':'Tekrar Destesini Temizle',
'No mistakes logged yet. Take an exam from your Grade page!':'Henüz kayıtlı hata yok. Sınıf sayfanızdan bir sınav çözün!','— no answer —':'— cevap yok —',
'Exam rules':'Sınav kuralları','Each numbered needle is one question. You get 10 seconds to prepare, then 15 seconds per question. Type the structure in Latin or English. You cannot go back.':'Numaralı her iğne bir sorudur. Hazırlanmak için 10 saniyeniz var, ardından her soru için 15 saniye. Yapıyı Latince veya İngilizce yazın. Geri dönemezsiniz.',
'All topics':'Tüm konular','No tests uploaded for this grade yet — add some in the Admin Panel.':'Bu sınıf için henüz test yüklenmedi — Yönetici Panelinden ekleyin.','Start exam':'Sınavı başlat',
'Type the structure, then press Enter':'Yapıyı yazın, ardından Enter’a basın','Submit →':'Gönder →','Results':'Sonuçlar','Retake':'Tekrar çöz','Retry missed only':'Sadece kaçırılanları tekrar dene','Mistake log':'Hata günlüğü',
'Question':'Soru','Accepted answers':'Kabul edilen cevaplar',
'Get ready!':'Hazır ol!','Exam starts in…':'Sınav başlıyor…','GO!':'BAŞLA!','Skip':'Atla','Take a deep breath 🫁':'Derin bir nefes al 🫁',
'Red tip = the structure. Grey end = the needle number.':'Kırmızı uç = yapı. Gri uç = iğne numarası.','Latin or English — both are accepted.':'Latince ya da İngilizce — ikisi de kabul edilir.',
'Type fast, then press Enter!':'Hızlı yaz, sonra Enter’a bas!','Small typos on long terms are forgiven.':'Uzun terimlerdeki küçük yazım hataları affedilir.',
'Sign Up (New Student)':'Kayıt Ol (Yeni Öğrenci)','Full Name':'Ad Soyad','Password':'Şifre','1st Grade Student':'1. Sınıf Öğrencisi','2nd Grade Student':'2. Sınıf Öğrencisi','3rd Grade Student':'3. Sınıf Öğrencisi',
'Admin Secret Key':'Yönetici Gizli Anahtarı','Sign Up':'Kayıt Ol','Log In':'Giriş Yap','No account yet?':'Henüz hesabınız yok?','Already registered?':'Zaten kayıtlı mısınız?',
'Please fill in all fields.':'Lütfen tüm alanları doldurun.','Account already exists. Please Log In.':'Hesap zaten var. Lütfen giriş yapın.','Invalid email or password.':'Geçersiz e-posta veya şifre.','Invalid Admin Secret Key.':'Geçersiz yönetici anahtarı.',
'Thorax':'Toraks','Abdomen':'Abdomen','Pelvis':'Pelvis','Upper and Lower limbs':'Üst ve Alt Ekstremiteler', '10 Questions':'10 Soru','15 Questions':'15 Soru','20 Questions':'20 Soru',
'Choose a block to practice:':'Çalışmak istediğiniz bloğu seçin:','No tests uploaded for this block yet — add some in the Admin Panel.':'Bu blok için henüz test yüklenmedi — Yönetici Panelinden ekleyin.',
'Stop exam':'Sınavı durdur','Stop the exam? Your answers so far will be scored.':'Sınavı durdurmak istiyor musunuz? Şimdiye kadarki cevaplarınız puanlanacak.','Cancel':'İptal',
'Click the photo to zoom in or out':'Yakınlaştırmak veya uzaklaştırmak için fotoğrafa tıklayın',
'Message sent!':'Mesaj gönderildi!','Failed to send. Please try again.':'Gönderilemedi. Lütfen tekrar deneyin.','Loading…':'Yükleniyor…',
'Could not load the tests. Please refresh the page or try again later.':'Testler yüklenemedi. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.',
'Account created! Please confirm your e-mail address, then log in.':'Hesap oluşturuldu! Lütfen e-posta adresinizi onaylayın, ardından giriş yapın.',
'Delete Account':'Hesabı Sil'
};
const RX = [
[/^Stopped early — (\d+) of (\d+) questions answered\.$/, 'Erken durduruldu — $2 sorudan $1 tanesi cevaplandı.'],
[/^Question (\d+) \/ (\d+)$/, 'Soru $1 / $2'],
[/^(\d+) questions? · 15s each$/, '$1 soru · her biri 15 sn'],
[/^Name the structure indicated by needle #(\d+)$/, '$1 numaralı iğnenin gösterdiği yapıyı adlandırın'],
[/^(\d)(?:st|nd|rd) GRADE: Spotter Exam$/, '$1. SINIF: Spotter Sınavı'],
[/^(.*) · needle #(\d+)$/, '$1 · İğne #$2'], [/^Needle #(\d+)$/, 'İğne #$1'], [/^Grade (\d)$/, '$1. Sınıf']
];
let lang = localStorage.getItem('anatomock_lang') === 'tr' ? 'tr' : 'en';
const tr = s => {
    const k = s.trim(); if (!k) return s;
    let o = TR[k];
    if (o === undefined) for (const [r, v] of RX) if (r.test(k)) { o = k.replace(r, v); break; }
    return o === undefined ? s : s.replace(k, o);
};
window.T = s => (lang === 'tr' ? tr(s) : s);
function fixText(n) {
    if (n.parentElement && n.parentElement.closest('script,style,.lang-btn')) return;
    if (lang === 'tr') { if (n._en === undefined) n._en = n.nodeValue; n.nodeValue = tr(n._en); }
    else if (n._en !== undefined) n.nodeValue = n._en;
}
function apply(root) {
    if (root.nodeType === 3) return fixText(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) fixText(n);
    [...(root.matches && root.matches('[placeholder]') ? [root] : []), ...root.querySelectorAll('[placeholder]')].forEach(el => {
        if (el._ph === undefined) el._ph = el.placeholder;
        el.placeholder = lang === 'tr' ? tr(el._ph) : el._ph;
    });
}
function setLang(l) {
    lang = l; localStorage.setItem('anatomock_lang', l);
    document.documentElement.lang = l;
    if (document._t === undefined) document._t = document.title;
    document.title = l === 'tr' ? tr(document._t) : document._t;
    apply(document.body);
    document.querySelectorAll('.lang-btn').forEach(b => b.textContent = l === 'tr' ? '🌐 EN' : '🌐 TR');
}
document.addEventListener('DOMContentLoaded', () => {
    const b = document.createElement('button');
    b.className = 'lang-btn'; b.title = 'English / Türkçe';
    b.onclick = () => setLang(lang === 'tr' ? 'en' : 'tr');
    const ul = document.querySelector('.nav-links ul'), sb = document.querySelector('.sidebar h2');
    if (ul) { b.classList.add('nav-auth-btn'); const li = document.createElement('li'); li.appendChild(b); ul.appendChild(li); }
    else if (sb) { b.classList.add('side-link'); sb.after(b); }
    else { b.style.cssText = 'position:fixed;top:12px;right:12px;z-index:90'; document.body.appendChild(b); }
    new MutationObserver(ms => {
        if (lang !== 'tr') return;
        ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 3 || n.nodeType === 1) apply(n); }));
    }).observe(document.body, { childList: true, subtree: true });
    setLang(lang);
});
})();