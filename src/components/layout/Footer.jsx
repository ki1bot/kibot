import { PERSONAL_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/35 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-8 text-center text-sm text-blue-100/65">
        <p>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
