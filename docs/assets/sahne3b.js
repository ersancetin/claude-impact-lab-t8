/* ============================================================
   3B KAPSAM SAHNESİ — DASK ile konut poliçesinin farkı

   NE ANLATIR: sahne iki evrede döner ve farkı canlı gösterir.
     Evre 1 — DASK: yalnızca bina kabuğu yeşile boyanır. İçerideki eşya
              ve dışarıdaki çadır gri kalır: karşılanmıyorlar.
     Evre 2 — + Konut poliçesi: eşya ve alternatif konaklama da renklenir.
   Alt yazı her evrede değişir. Yani görsel sadece "ev" göstermiyor,
   iki ürünün kapsam farkını anlatıyor — asıl mesaj bu.

   NEDEN ÜSTE BİNEN KATMAN:
   PROJE-AKIS.md §11 tam 3B'yi "mobilde ağır, erişilebilirlik sorunlu"
   diye işaretlemiş. three.js yerele gömülü olsa bile ~190 KB gzip.
   Bu yüzden 3B varsayılan DEĞİL: etiketli SVG afiş taban katman olarak
   sayfada durur, bu modül ancak şu şartlar birlikte sağlanırsa yüklenir:
     1. WebGL2 var
     2. prefers-reduced-motion: reduce KAPALI
     3. Save-Data açık DEĞİL ve bağlantı 2G/3G değil
   Şartlardan biri tutmazsa tek bayt bile indirilmez.

   Dış istek yok: three.js docs/vendor altından gelir.
   ============================================================ */

const KOSUL_YOK = "3B atlandı";

export function uygunMu() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const b = navigator.connection;
  if (b) {
    if (b.saveData) return false;
    if (/^(slow-2g|2g|3g)$/.test(b.effectiveType || "")) return false;
  }
  try {
    if (!document.createElement("canvas").getContext("webgl2")) return false;
  } catch { return false; }
  return true;
}

function renk(ad, varsayilan) {
  const d = getComputedStyle(document.documentElement).getPropertyValue(ad).trim();
  return d || varsayilan;
}

/* Yumuşak geçiş — sert kesme yerine hızlanıp yavaşlama */
const yumusat = (t) => t * t * (3 - 2 * t);

/* --- Evreler ---------------------------------------------- */
const EVRELER = [
  {
    ad: "DASK",
    yazi: "DASK yalnızca binayı öder",
    alt: "Eşyanız, barınmanız ve enkaz kaldırma teminat dışıdır.",
    icerik: 0,
  },
  {
    ad: "+ Konut poliçesi",
    yazi: "Konut poliçesi eklendiğinde",
    alt: "Ev eşyası ve alternatif konaklama da teminat altına girer.",
    icerik: 1,
  },
];
const EVRE_SURESI = 4200;      // ms
const GECIS_SURESI = 900;      // ms

export async function sahneKur(kap, yaziEl) {
  if (!kap || !uygunMu()) return KOSUL_YOK;

  const T = await import("../vendor/three.module.min.js");

  const sahne = new T.Scene();
  const kamera = new T.PerspectiveCamera(34, 1, 0.1, 60);
  kamera.position.set(4.3, 2.5, 5.0);
  kamera.lookAt(0, 0.3, 0);

  const cizer = new T.WebGLRenderer({ antialias: true, alpha: true });
  cizer.setPixelRatio(Math.min(devicePixelRatio, 2));
  cizer.shadowMap.enabled = true;
  cizer.shadowMap.type = T.PCFSoftShadowMap;
  cizer.toneMapping = T.ACESFilmicToneMapping;   /* yumuşak, modern ton */
  cizer.toneMappingExposure = 1.15;
  kap.replaceChildren(cizer.domElement);
  cizer.domElement.setAttribute("aria-hidden", "true");

  /* Işık: yumuşak ortam + gölge veren ana ışık + dolgu */
  sahne.add(new T.HemisphereLight(0xffffff, 0xd8dee6, 2.2));
  const ana = new T.DirectionalLight(0xffffff, 2.6);
  ana.position.set(4.5, 7, 4);
  ana.castShadow = true;
  ana.shadow.mapSize.set(1024, 1024);
  ana.shadow.camera.near = 1;
  ana.shadow.camera.far = 22;
  ana.shadow.camera.left = -6;
  ana.shadow.camera.right = 6;
  ana.shadow.camera.top = 6;
  ana.shadow.camera.bottom = -6;
  ana.shadow.radius = 4;
  sahne.add(ana);
  const dolgu = new T.DirectionalLight(0xffffff, 0.7);
  dolgu.position.set(-5, 2, -3);
  sahne.add(dolgu);

  /* Zemin — yalnızca gölgeyi tutar, kendisi görünmez */
  const zemin = new T.Mesh(
    new T.PlaneGeometry(26, 26),
    new T.ShadowMaterial({ opacity: 0.15 }));
  zemin.rotation.x = -Math.PI / 2;
  zemin.position.y = -1.36;
  zemin.receiveShadow = true;
  sahne.add(zemin);

  const grup = new T.Group();
  sahne.add(grup);

  const YESIL = new T.Color(renk("--turkuaz", "#0A6E6B"));
  const AMBER = new T.Color(renk("--uyari", "#855100"));
  const GRI = new T.Color("#9AA3AD");

  /* Kabuk: camsı ve hafif parlak — içerisi görünsün */
  const kabukMalzeme = new T.MeshPhysicalMaterial({
    color: YESIL, transparent: true, opacity: 0.22,
    roughness: 0.15, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.2,
    side: T.DoubleSide, depthWrite: false,
  });
  const telMalzeme = new T.LineBasicMaterial({ color: YESIL });
  /* İçerik: evreye göre gri ↔ amber */
  const icerikMalzeme = new T.MeshStandardMaterial({
    color: GRI.clone(), roughness: 0.5, metalness: 0.05,
  });

  function kabukParca(geo, y = 0, donus = 0) {
    const m = new T.Mesh(geo, kabukMalzeme);
    m.position.y = y; m.rotation.y = donus;
    m.castShadow = true;
    grup.add(m);
    const t = new T.LineSegments(new T.EdgesGeometry(geo), telMalzeme);
    t.position.y = y; t.rotation.y = donus;
    grup.add(t);
  }

  kabukParca(new T.BoxGeometry(3.3, 2.5, 2.5), 0);
  kabukParca(new T.ConeGeometry(2.45, 1.2, 4), 1.85, Math.PI / 4);
  kabukParca(new T.BoxGeometry(3.3, 0.14, 2.5), -1.28);

  /* İçerik: ev eşyası (binanın içinde) */
  const ESYA = [
    [1.4, 0.5, 0.7, -0.8, 0.6],
    [0.6, 1.15, 0.55, 1.05, -0.65],
    [1.1, 0.32, 0.85, -0.85, -0.6],
    [0.8, 0.9, 0.48, 1.0, 0.7],
  ];
  for (const [g, y, d, x, z] of ESYA) {
    const m = new T.Mesh(new T.BoxGeometry(g, y, d), icerikMalzeme);
    m.position.set(x, -1.2 + y / 2, z);
    m.castShadow = true;
    grup.add(m);
  }

  /* İçerik: alternatif konaklama — binanın DIŞINDA bir çadır.
     Konut poliçesinin kapsadığı ama DASK'ın kapsamadığı kalemin
     bina dışında durması, farkı mekânsal olarak da anlatıyor. */
  const cadir = new T.Mesh(new T.ConeGeometry(0.72, 1.05, 4), icerikMalzeme);
  cadir.position.set(2.75, -0.83, 0.4);
  cadir.rotation.y = Math.PI / 4;
  cadir.castShadow = true;
  grup.add(cadir);

  /* --- Ölçü ------------------------------------------------ */
  function boyutla() {
    const g = kap.clientWidth || 480;
    const y = Math.max(280, Math.round(g * 0.74));
    cizer.setSize(g, y, false);
    kamera.aspect = g / y;
    kamera.updateProjectionMatrix();
  }
  boyutla();
  const gozlemci = new ResizeObserver(boyutla);
  gozlemci.observe(kap);

  /* --- Döngü ----------------------------------------------- */
  let calisiyor = true;
  let kare = 0;
  let gecenToplam = 0;
  let baslangic = performance.now();
  let sonEvre = -1;

  const gorunurluk = () => {
    calisiyor = !document.hidden;
    if (calisiyor) { baslangic = performance.now() - gecenToplam; don(); }
  };
  document.addEventListener("visibilitychange", gorunurluk);

  function yaziyiYaz(i) {
    if (!yaziEl || i === sonEvre) return;
    sonEvre = i;
    const e = EVRELER[i];
    const b = document.createElement("b");
    b.textContent = e.yazi;
    const s = document.createElement("span");
    s.textContent = e.alt;
    yaziEl.replaceChildren(b, s);
    yaziEl.dataset.evre = e.ad;
  }

  function don(su) {
    if (!calisiyor) return;
    kare = requestAnimationFrame(don);
    const simdi = su || performance.now();
    /* requestAnimationFrame'in zaman damgası, karenin BAŞLANGICINI
       gösterir ve hemen öncesinde alınan performance.now() değerinden
       birkaç mikrosaniye GERİDE olabilir. Kırpılmazsa ilk karede
       gecenToplam negatif oluyor, indis -1'e düşüyor ve sahne
       "Cannot read properties of undefined" ile çöküyordu. */
    gecenToplam = Math.max(0, simdi - baslangic);

    /* Evre döngüsü ve yumuşak geçiş */
    const tur = EVRE_SURESI * EVRELER.length;
    const t = ((gecenToplam % tur) + tur) % tur;   /* her koşulda [0, tur) */
    const i = Math.floor(t / EVRE_SURESI);
    const icinde = t - i * EVRE_SURESI;
    const gecis = icinde < GECIS_SURESI ? yumusat(icinde / GECIS_SURESI) : 1;
    const onceki = (i - 1 + EVRELER.length) % EVRELER.length;
    const oran = EVRELER[onceki].icerik +
      (EVRELER[i].icerik - EVRELER[onceki].icerik) * gecis;

    icerikMalzeme.color.copy(GRI).lerp(AMBER, oran);
    icerikMalzeme.emissive.copy(AMBER).multiplyScalar(oran * 0.12);
    yaziyiYaz(icinde > GECIS_SURESI / 2 ? i : onceki);

    /* Yumuşak salınım: sabit dönüş yerine hafif gidip gelme —
       kullanıcı modeli her açıdan görür ama baş döndürmez. */
    const s = gecenToplam / 1000;
    grup.rotation.y = Math.sin(s * 0.22) * 0.55 + 0.35;
    grup.position.y = Math.sin(s * 0.7) * 0.035;

    cizer.render(sahne, kamera);
  }
  don();

  return () => {
    cancelAnimationFrame(kare);
    calisiyor = false;
    document.removeEventListener("visibilitychange", gorunurluk);
    gozlemci.disconnect();
    cizer.dispose();
  };
}

export function sahneBaslat() {
  const sar = document.querySelector("[data-sahne3b]");
  const kap = sar && sar.querySelector(".sahne-3b");
  if (!kap || !uygunMu()) return;
  const yazi = sar.querySelector("[data-sahne-yazi]");

  sahneKur(kap, yazi).then((sonuc) => {
    if (sonuc !== KOSUL_YOK) {
      sar.hidden = false;
      const afis = document.querySelector("[data-afis-2b]");
      if (afis) afis.hidden = true;
    }
  }).catch(() => { /* 3B başarısızsa SVG afiş yerinde kalır */ });
}
