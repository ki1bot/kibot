const ASSET_PUBLIC_PATH_MAP = {
  "assets/default-avatar.jpg": "assets/default-avatar.jpg",
  "assets/gradient-blue.jpg": "assets/gradient-blue.jpg",
  "assets/logoKibot.png": "assets/logoKibot.png",

  "media/github.png": "assets/media/github.png",
  "media/instagram.png": "assets/media/instagram.png",
  "media/linkedin.png": "assets/media/linkedin.png",
  "media/Spotify.png": "assets/media/Spotify.png",
  "media/tiktok.png": "assets/media/tiktok.png",
  "media/youtube.png": "assets/media/youtube.png",

  "projects/adminUiYayasan.png": "assets/projects/adminUiYayasan.png",
  "projects/coding.gif": "assets/projects/coding.gif",
  "projects/MarketPlaceBroker.png": "assets/projects/MarketPlaceBroker.png",
  "projects/ProjectQrcode.png": "assets/projects/ProjectQrcode.png",

  "screen/github.png": "assets/screen/github.png",
  "screen/html.png": "assets/screen/html.png",
  "screen/profile.png": "assets/screen/profile.png",

  "sertifikat/dicoding1.pdf": "sertifikat/dicoding1.pdf",
  "sertifikat/dicoding1.png": "sertifikat/dicoding1.png",
  "sertifikat/dicoding2.pdf": "sertifikat/dicoding2.pdf",
  "sertifikat/dicoding2.png": "sertifikat/dicoding2.png",
  "sertifikat/dicoding3.pdf": "sertifikat/dicoding3.pdf",
  "sertifikat/dicoding3.png": "sertifikat/dicoding3.png",
  "sertifikat/dicoding4.pdf": "sertifikat/dicoding4.pdf",
  "sertifikat/dicoding4.png": "sertifikat/dicoding4.png",
  "sertifikat/dicoding5.pdf": "sertifikat/dicoding5.pdf",
  "sertifikat/dicoding5.png": "sertifikat/dicoding5.png",
  "sertifikat/dicoding6.pdf": "sertifikat/dicoding6.pdf",
  "sertifikat/dicoding6.png": "sertifikat/dicoding6.png",
  "sertifikat/dicoding7.pdf": "sertifikat/dicoding7.pdf",
  "sertifikat/dicoding7.png": "sertifikat/dicoding7.png",
  "sertifikat/dicoding8.pdf": "sertifikat/dicoding8.pdf",
  "sertifikat/dicoding8.png": "sertifikat/dicoding8.png",
  "sertifikat/dicoding9.pdf": "sertifikat/dicoding9.pdf",
  "sertifikat/dicoding9.png": "sertifikat/dicoding9.png",
  "sertifikat/SertifikatKompetensi.pdf": "sertifikat/SertifikatKompetensi.pdf",
  "sertifikat/SertifikatKompetensi.png": "sertifikat/SertifikatKompetensi.png",
  "sertifikat/sertifikatlsp-semester1.pdf":
    "sertifikat/sertifikatlsp-semester1.pdf",
  "sertifikat/sertifikatlsp-semester1.png":
    "sertifikat/sertifikatlsp-semester1.png",
  "sertifikat/sertifikatlsp-semester2.pdf":
    "sertifikat/sertifikatlsp-semester2.pdf",
  "sertifikat/sertifikatlsp-semester2.png":
    "sertifikat/sertifikatlsp-semester2.png",

  "techstack/bootstrap.svg": "assets/techstack/bootstrap.svg",
  "techstack/c++.png": "assets/techstack/c++.png",
  "techstack/css.svg": "assets/techstack/css.svg",
  "techstack/dart.png": "assets/techstack/dart.png",
  "techstack/delphi.png": "assets/techstack/delphi.png",
  "techstack/docker.png": "assets/techstack/docker.png",
  "techstack/expressjs.png": "assets/techstack/expressjs.png",
  "techstack/figma.png": "assets/techstack/figma.png",
  "techstack/firebase.svg": "assets/techstack/firebase.svg",
  "techstack/flutter.png": "assets/techstack/flutter.png",
  "techstack/golang.png": "assets/techstack/golang.png",
  "techstack/html.svg": "assets/techstack/html.svg",
  "techstack/java.png": "assets/techstack/java.png",
  "techstack/javascript.svg": "assets/techstack/javascript.svg",
  "techstack/laravel.png": "assets/techstack/laravel.png",
  "techstack/linux.png": "assets/techstack/linux.png",
  "techstack/mongodb.png": "assets/techstack/mongodb.png",
  "techstack/mysql.png": "assets/techstack/mysql.png",
  "techstack/nestjs.png": "assets/techstack/nestjs.png",
  "techstack/nextjs.png": "assets/techstack/nextjs.png",
  "techstack/nodejs.svg": "assets/techstack/nodejs.svg",
  "techstack/php.png": "assets/techstack/php.png",
  "techstack/postgresql.png": "assets/techstack/postgresql.png",
  "techstack/prismaorm.png": "assets/techstack/prismaorm.png",
  "techstack/python.png": "assets/techstack/python.png",
  "techstack/reactjs.svg": "assets/techstack/reactjs.svg",
  "techstack/supabase.png": "assets/techstack/supabase.png",
  "techstack/tailwind.svg": "assets/techstack/tailwind.svg",
  "techstack/typescript.png": "assets/techstack/typescript.png",
  "techstack/vercel.svg": "assets/techstack/vercel.svg",
  "techstack/vite.svg": "assets/techstack/vite.svg",
};

function getBaseUrl() {
  const baseUrl = import.meta.env.BASE_URL || "/";
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

function withBasePath(path) {
  const cleanPath = String(path || "")
    .trim()
    .replace(/^\/+/, "");

  if (!cleanPath) return "";

  return `${getBaseUrl()}${cleanPath}`.replace(/\/{2,}/g, "/");
}

function normalizeLegacyAssetPath(path) {
  const cleanPath = String(path || "")
    .trim()
    .replace(/^\/+/, "");

  if (!cleanPath) return "";

  const legacyPathMap = [
    {
      from: "public/assets/media/",
      to: "media/",
    },
    {
      from: "public/assets/projects/",
      to: "projects/",
    },
    {
      from: "public/assets/screen/",
      to: "screen/",
    },
    {
      from: "public/assets/techstack/",
      to: "techstack/",
    },
    {
      from: "public/assets/sertifikat/",
      to: "sertifikat/",
    },
    {
      from: "public/sertifikat/",
      to: "sertifikat/",
    },
    {
      from: "assets/media/",
      to: "media/",
    },
    {
      from: "assets/projects/",
      to: "projects/",
    },
    {
      from: "assets/screen/",
      to: "screen/",
    },
    {
      from: "assets/techstack/",
      to: "techstack/",
    },
    {
      from: "assets/sertifikat/",
      to: "sertifikat/",
    },
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

    const markers = [
      "/storage/v1/object/public/portofolio-assets/",
      "/storage/v1/object/sign/portofolio-assets/",
      "/storage/v1/object/public/portfolio-assets/",
      "/storage/v1/object/sign/portfolio-assets/",
    ];

    const matchedMarker = markers.find((marker) =>
      url.pathname.includes(marker),
    );

    if (!matchedMarker) return "";

    const markerIndex = url.pathname.indexOf(matchedMarker);

    return decodeURIComponent(
      url.pathname.slice(markerIndex + matchedMarker.length),
    );
  } catch {
    return "";
  }
}

function resolveKnownPublicAsset(path) {
  const normalizedPath = normalizeLegacyAssetPath(path);

  if (!normalizedPath) return "";

  if (ASSET_PUBLIC_PATH_MAP[normalizedPath]) {
    return withBasePath(ASSET_PUBLIC_PATH_MAP[normalizedPath]);
  }

  if (normalizedPath.startsWith("assets/")) {
    return withBasePath(normalizedPath);
  }

  if (normalizedPath.startsWith("sertifikat/")) {
    return withBasePath(normalizedPath);
  }

  if (normalizedPath.startsWith("media/")) {
    return withBasePath(`assets/${normalizedPath}`);
  }

  if (normalizedPath.startsWith("projects/")) {
    return withBasePath(`assets/${normalizedPath}`);
  }

  if (normalizedPath.startsWith("screen/")) {
    return withBasePath(`assets/${normalizedPath}`);
  }

  if (normalizedPath.startsWith("techstack/")) {
    return withBasePath(`assets/${normalizedPath}`);
  }

  return "";
}

export function assetUrl(path) {
  const resolvedPublicAsset = resolveKnownPublicAsset(path);

  if (resolvedPublicAsset) {
    return resolvedPublicAsset;
  }

  const cleanPath = String(path || "")
    .trim()
    .replace(/^\/+/, "");

  if (!cleanPath) return "";

  return withBasePath(cleanPath);
}

export function resolveAssetUrl(value) {
  if (!value) return "";

  const cleanValue = String(value).trim();

  if (!cleanValue) return "";

  if (cleanValue.startsWith("data:")) {
    return cleanValue;
  }

  if (cleanValue.startsWith("http://") || cleanValue.startsWith("https://")) {
    const storagePath = getStoragePathFromSupabaseUrl(cleanValue);

    if (!storagePath) {
      return cleanValue;
    }

    const resolvedPublicAsset = resolveKnownPublicAsset(storagePath);

    return resolvedPublicAsset || cleanValue;
  }

  return assetUrl(cleanValue);
}

export function createPdfUrlFromImageUrl(value) {
  const resolvedImageUrl = resolveAssetUrl(value);

  if (!resolvedImageUrl) return "";

  return resolvedImageUrl.replace(/\.(png|jpg|jpeg|webp)$/i, ".pdf");
}
