import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "max-w-4xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-blue-100/70">
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "text-4xl font-black leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl",
          isCenter && "mx-auto",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-6 max-w-3xl text-base leading-8 text-blue-100/78 md:text-lg",
            isCenter && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
