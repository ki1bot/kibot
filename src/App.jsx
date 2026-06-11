import { useEffect } from "react";
import "./index.css";

import { LoadingScreen } from "@/components/animations/LoadingScreen";
import { ReloadToHome } from "@/components/animations/ReloadToHome";
import { assetUrl } from "@/lib/supabase-storage";

function toCssUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return `url("${path}")`;
  return `url("/${path.replace(/^\/+/, "")}")`;
}

export default function App({ children }) {
  useEffect(() => {
    document.documentElement.lang = "id";
    document.documentElement.dataset.scrollBehavior = "smooth";
    document.documentElement.classList.add("portfolio-is-loading");

    document.body.className = "antialiased";

    document.body.style.setProperty(
      "--portfolio-gradient-blue-image",
      toCssUrl(assetUrl("assets/gradient-blue.jpg")),
    );

    document.title = "Rifqi | Software Engineer";

    const description =
      "Website portofolio pribadi yang menampilkan project, sertifikat, dan kontak.";

    let descriptionMeta = document.querySelector('meta[name="description"]');

    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.setAttribute("name", "description");
      document.head.appendChild(descriptionMeta);
    }

    descriptionMeta.setAttribute("content", description);

    let themeMeta = document.querySelector('meta[name="theme-color"]');

    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.setAttribute("name", "theme-color");
      document.head.appendChild(themeMeta);
    }

    themeMeta.setAttribute("content", "#020617");

    const faviconHref = assetUrl("assets/logoKibot.png");

    if (faviconHref) {
      let favicon = document.querySelector('link[rel="icon"]');

      if (!favicon) {
        favicon = document.createElement("link");
        favicon.setAttribute("rel", "icon");
        document.head.appendChild(favicon);
      }

      favicon.setAttribute("href", faviconHref);
      favicon.setAttribute("type", "image/png");
    }
  }, []);

  return (
    <>
      <ReloadToHome />
      <LoadingScreen />
      {children}
    </>
  );
}
