const ASSET_ALIAS_MAP = {
  "assets/default-avatar.jpg": "default-avatar.jpg",
  "assets/gradient-blue.jpg": "gradient-blue.jpg",
  "assets/logoKibot.png": "logoKibot.png",

  "media/github.png": "github.png",
  "media/instagram.png": "instagram.png",
  "media/linkedin.png": "linkedin.png",
  "media/Spotify.png": "Spotify.png",
  "media/tiktok.png": "tiktok.png",
  "media/youtube.png": "youtube.png",

  "projects/adminUiYayasan.png": "adminUiYayasan.png",
  "projects/coding.gif": "coding.gif",
  "projects/MarketPlaceBroker.png": "MarketPlaceBroker.png",
  "projects/ProjectQrcode.png": "ProjectQrcode.png",

  "screen/github.png": "screen-github.png",
  "screen/html.png": "html.png",
  "screen/profile.png": "profile.png",

  "sertifikat/dicoding1.pdf": "dicoding1.pdf",
  "sertifikat/dicoding1.png": "dicoding1.png",
  "sertifikat/dicoding2.pdf": "dicoding2.pdf",
  "sertifikat/dicoding2.png": "dicoding2.png",
  "sertifikat/dicoding3.pdf": "dicoding3.pdf",
  "sertifikat/dicoding3.png": "dicoding3.png",
  "sertifikat/dicoding4.pdf": "dicoding4.pdf",
  "sertifikat/dicoding4.png": "dicoding4.png",
  "sertifikat/dicoding5.pdf": "dicoding5.pdf",
  "sertifikat/dicoding5.png": "dicoding5.png",
  "sertifikat/dicoding6.pdf": "dicoding6.pdf",
  "sertifikat/dicoding6.png": "dicoding6.png",
  "sertifikat/dicoding7.pdf": "dicoding7.pdf",
  "sertifikat/dicoding7.png": "dicoding7.png",
  "sertifikat/dicoding8.pdf": "dicoding8.pdf",
  "sertifikat/dicoding8.png": "dicoding8.png",
  "sertifikat/dicoding9.pdf": "dicoding9.pdf",
  "sertifikat/dicoding9.png": "dicoding9.png",
  "sertifikat/SertifikatKompetensi.pdf": "SertifikatKompetensi.pdf",
  "sertifikat/SertifikatKompetensi.png": "SertifikatKompetensi.png",
  "sertifikat/sertifikatlsp-semester1.pdf": "sertifikatlsp-semester1.pdf",
  "sertifikat/sertifikatlsp-semester1.png": "sertifikatlsp-semester1.png",
  "sertifikat/sertifikatlsp-semester2.pdf": "sertifikatlsp-semester2.pdf",
  "sertifikat/sertifikatlsp-semester2.png": "sertifikatlsp-semester2.png",

  "techstack/bootstrap.svg": "bootstrap.svg",
  "techstack/c++.png": "cplusplus.png",
  "techstack/css.svg": "css.svg",
  "techstack/dart.png": "dart.png",
  "techstack/delphi.png": "delphi.png",
  "techstack/docker.png": "docker.png",
  "techstack/expressjs.png": "expressjs.png",
  "techstack/figma.png": "figma.png",
  "techstack/firebase.svg": "firebase.svg",
  "techstack/flutter.png": "flutter.png",
  "techstack/golang.png": "golang.png",
  "techstack/html.svg": "html.svg",
  "techstack/java.png": "java.png",
  "techstack/javascript.svg": "javascript.svg",
  "techstack/laravel.png": "laravel.png",
  "techstack/linux.png": "linux.png",
  "techstack/mongodb.png": "mongodb.png",
  "techstack/mysql.png": "mysql.png",
  "techstack/nestjs.png": "nestjs.png",
  "techstack/nextjs.png": "nextjs.png",
  "techstack/nodejs.svg": "nodejs.svg",
  "techstack/php.png": "php.png",
  "techstack/postgresql.png": "postgresql.png",
  "techstack/prismaorm.png": "prismaorm.png",
  "techstack/python.png": "python.png",
  "techstack/reactjs.svg": "reactjs.svg",
  "techstack/supabase.png": "supabase.png",
  "techstack/tailwind.svg": "tailwind.svg",
  "techstack/typescript.png": "typescript.png",
  "techstack/vercel.svg": "vercel.svg",
  "techstack/vite.svg": "vite.svg",
};

function normalizeLegacyAssetPath(path) {
  const cleanPath = String(path || "")
    .trim()
    .replace(/^\/+/, "");

  if (!cleanPath) return "";

  const legacyPathMap = [
    { from: "assets/media/", to: "media/" },
    { from: "assets/projects/", to: "projects/" },
    { from: "assets/screen/", to: "screen/" },
    { from: "assets/techstack/", to: "techstack/" },
    { from: "assets/sertifikat/", to: "sertifikat/" },
    { from: "sertifikat/", to: "sertifikat/" },
  ];

  const matchedRule = legacyPathMap.find((rule) =>
    cleanPath.startsWith(rule.from),
  );

  if (!matchedRule) return cleanPath;

  return cleanPath.replace(matchedRule.from, matchedRule.to);
}

function getStoragePathFromSupabaseUrl(value) {
  try {
    const url = new URL(value);
    const marker = "/storage/v1/object/public/portofolio-assets/";
    const markerIndex = url.pathname.indexOf(marker);

    if (markerIndex === -1) return "";

    return decodeURIComponent(url.pathname.slice(markerIndex + marker.length));
  } catch {
    return "";
  }
}

export function assetUrl(path) {
  const normalizedPath = normalizeLegacyAssetPath(path);

  if (!normalizedPath) return "";

  return ASSET_ALIAS_MAP[normalizedPath] || normalizedPath.split("/").pop();
}

export function resolveAssetUrl(value) {
  if (!value) return "";

  const cleanValue = String(value).trim();

  if (!cleanValue) return "";

  if (cleanValue.startsWith("data:")) return cleanValue;

  if (cleanValue.startsWith("http://") || cleanValue.startsWith("https://")) {
    const storagePath = getStoragePathFromSupabaseUrl(cleanValue);

    if (storagePath) {
      return assetUrl(storagePath);
    }

    return cleanValue;
  }

  return assetUrl(cleanValue);
}

export function createPdfUrlFromImageUrl(value) {
  const resolvedImageUrl = resolveAssetUrl(value);

  if (!resolvedImageUrl) return "";

  return resolvedImageUrl.replace(/\.(png|jpg|jpeg|webp)$/i, ".pdf");
}
