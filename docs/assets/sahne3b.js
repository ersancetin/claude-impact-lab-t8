/* ============================================================
   3B KAPSAM SAHNESİ — hero'daki bina kesiti

   NE ANLATIR: yarı saydam bina kabuğu (DASK'ın karşıladığı) ve içinde
   duran katı eşya blokları (karşılamadığı). Kabuk saydam olduğu için
   içerideki kırmızı hacim dışarıdan görünür — "dört duvar sigortalı,
   içindekiler değil" cümlesinin görsel karşılığı budur. Süs değil.

   NEDEN ÜSTE BİNEN KATMAN:
   PROJE-AKIS.md §11 tam 3B'yi "mobilde ağır, erişilebilirlik sorunlu"
   diye işaretlemiş ve haklı. three.js yerele gömülü olsa bile iki dosya
   ~190 KB gzip. Bu yüzden 3B varsayılan DEĞİL: SVG afiş taban katman
   olarak sayfada durur, bu modül ancak şu üç şart birlikte sağlanırsa
   yüklenir:
     1. WebGL2 var
     2. prefers-reduced-motion: reduce KAPALI
     3. Save-Data açık DEĞİL ve bağlantı yavaş değil
   Şartlardan biri tutmazsa tek bayt bile indirilmez.

   Dış istek yok: three.js docs/vendor altından gelir.
   ============================================================ */

const KOSUL_YOK = "3B atlandı";

/* --- Yüklenmeli mi? --------------------------------------- */
export function uygunMu() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const b = navigator.connection;
  if (b) {
    if (b.saveData) return false;
    if (/^(slow-2g|2g|3g)$/.test(b.effectiveType || "")) return false;
  }

  try {
    const c = document.createElement("canvas");
    if (!c.getContext("webgl2")) return false;
  } catch { return false; }

  return true;
}

/* CSS değişkenini oku — sahne renkleri temayla aynı kalsın */
function renk(ad, varsayilan) {
  const d = getComputedStyle(document.documentElement).getPropertyValue(ad).trim();
  return d || varsayilan;
}

/* --- Sahne ------------------------------------------------- */
export async function sahneKur(kap) {
  if (!kap || !uygunMu()) return KOSUL_YOK;

  const T = await import("../vendor/three.module.min.js");

  const sahne = new T.Scene();
  const kamera = new T.PerspectiveCamera(38, 1, 0.1, 100);
  kamera.position.set(5.2, 2.9, 6.1);
  kamera.lookAt(0, 0.55, 0);

  const cizer = new T.WebGLRenderer({ antialias: true, alpha: true });
  cizer.setPixelRatio(Math.min(devicePixelRatio, 2));
  kap.replaceChildren(cizer.domElement);
  cizer.domElement.setAttribute("aria-hidden", "true");

  sahne.add(new T.AmbientLight(0xffffff, 1.5));
  const isik = new T.DirectionalLight(0xffffff, 2.1);
  isik.position.set(5, 8, 6);
  sahne.add(isik);

  const grup = new T.Group();
  sahne.add(grup);

  const kabukRengi = new T.Color(renk("--turkuaz", "#0A6E6B"));
  const acikRengi = new T.Color(renk("--tehlike", "#8E1B12"));

  /* Kabuk: yarı saydam ki içerisi görünsün */
  const kabukMalzeme = new T.MeshStandardMaterial({
    color: kabukRengi, transparent: true, opacity: 0.28,
    roughness: 0.75, metalness: 0, side: T.DoubleSide,
    depthWrite: false,
  });
  const cizgiMalzeme = new T.LineBasicMaterial({ color: kabukRengi });
  const esyaMalzeme = new T.MeshStandardMaterial({
    color: acikRengi, roughness: 0.55, metalness: 0,
  });

  /* Bina gövdesi + kenar telleri (kenarlar kabuğu okunur kılar) */
  const govde = new T.BoxGeometry(3.4, 2.6, 2.6);
  grup.add(new T.Mesh(govde, kabukMalzeme));
  grup.add(new T.LineSegments(new T.EdgesGeometry(govde), cizgiMalzeme));

  /* Çatı: dört yüzlü prizma (silindirin 4 kenarlısı) */
  const cati = new T.ConeGeometry(2.55, 1.25, 4);
  const catiMesh = new T.Mesh(cati, kabukMalzeme);
  catiMesh.position.y = 1.92;
  catiMesh.rotation.y = Math.PI / 4;
  grup.add(catiMesh);
  const catiTel = new T.LineSegments(new T.EdgesGeometry(cati), cizgiMalzeme);
  catiTel.position.copy(catiMesh.position);
  catiTel.rotation.copy(catiMesh.rotation);
  grup.add(catiTel);

  /* Döşeme — kabuğun parçası */
  const doseme = new T.BoxGeometry(3.4, 0.12, 2.6);
  const dosemeMesh = new T.Mesh(doseme, kabukMalzeme);
  dosemeMesh.position.y = 0;
  grup.add(dosemeMesh);
  const dosemeTel = new T.LineSegments(new T.EdgesGeometry(doseme), cizgiMalzeme);
  dosemeTel.position.copy(dosemeMesh.position);
  grup.add(dosemeTel);

  /* İçerideki eşya — katı ve kırmızı: açıkta kalan */
  const ESYA = [
    [1.5, 0.55, 0.75, -0.85, -0.75, 0.6],    // kanepe
    [0.65, 1.25, 0.6, 1.15, -0.4, -0.7],     // buzdolabı
    [1.2, 0.35, 0.9, -0.9, 0.65, -0.55],     // yatak
    [0.85, 1.0, 0.5, 1.05, 0.8, 0.75],       // dolap
    [0.5, 0.45, 0.5, 0.1, -0.8, -0.8],       // sandık
  ];
  for (const [g, y, d, x, py, z] of ESYA) {
    const m = new T.Mesh(new T.BoxGeometry(g, y, d), esyaMalzeme);
    m.position.set(x, py + y / 2 - 1.24, z);
    grup.add(m);
  }

  /* --- Ölçü ve döngü --------------------------------------- */
  function boyutla() {
    const g = kap.clientWidth || 480;
    const y = Math.max(260, Math.round(g * 0.72));
    cizer.setSize(g, y, false);
    kamera.aspect = g / y;
    kamera.updateProjectionMatrix();
  }
  boyutla();
  const gozlemci = new ResizeObserver(boyutla);
  gozlemci.observe(kap);

  /* Sekme görünmezken çizme — pil ve işlemci boşa gitmesin */
  let calisiyor = true;
  let kare = 0;
  const gorunurluk = () => { calisiyor = !document.hidden; if (calisiyor) don(); };
  document.addEventListener("visibilitychange", gorunurluk);

  function don() {
    if (!calisiyor) return;
    kare = requestAnimationFrame(don);
    grup.rotation.y += 0.0025;
    cizer.render(sahne, kamera);
  }
  don();

  /* Tema değişince renkleri tazele */
  const temaGozlemci = new MutationObserver(() => {
    kabukMalzeme.color.set(renk("--turkuaz", "#0A6E6B"));
    cizgiMalzeme.color.set(renk("--turkuaz", "#0A6E6B"));
    esyaMalzeme.color.set(renk("--tehlike", "#8E1B12"));
  });
  temaGozlemci.observe(document.documentElement, {
    attributes: true, attributeFilter: ["data-tema"],
  });

  return () => {                       // sökme
    cancelAnimationFrame(kare);
    calisiyor = false;
    document.removeEventListener("visibilitychange", gorunurluk);
    gozlemci.disconnect();
    temaGozlemci.disconnect();
    cizer.dispose();
  };
}

/* --- Bağlama ---------------------------------------------- */
/* Hero'daki SVG afiş sayfada zaten duruyor. 3B ancak yüklenirse afişin
   YERİNE geçer; yüklenmezse hiçbir şey değişmez ve kullanıcı eksik bir
   şey görmez. */
export function sahneBaslat() {
  const sar = document.querySelector("[data-sahne3b]");
  const kap = sar && sar.querySelector(".sahne-3b");
  if (!kap || !uygunMu()) return;

  /* Görünür alana girmeden yükleme — hero için hemen, ama yine de
     tembel: modül import'u ancak burada tetiklenir. */
  sahneKur(kap).then((sonuc) => {
    if (sonuc !== KOSUL_YOK) {
      sar.hidden = false;
      const afis = document.querySelector("[data-afis-2b]");
      if (afis) afis.hidden = true;
    }
  }).catch(() => { /* 3B başarısızsa SVG afiş yerinde kalır */ });
}
