type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h2" | "h3";
};

export function SectionHeading({ eyebrow, title, intro, align = "center", tone = "light", as: Tag = "h2" }: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = tone === "dark" ? "text-white" : "text-brand-ink";
  const introColor = tone === "dark" ? "text-white/85" : "text-brand-muted";
  const eyebrowColor = tone === "dark" ? "text-white/90" : "text-brand-teal-dark";

  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow ? (
        <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${eyebrowColor}`}>{eyebrow}</p>
      ) : null}
      <Tag className={`text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${titleColor}`}>{title}</Tag>
      {intro ? <p className={`mt-4 text-base leading-relaxed sm:text-lg ${introColor}`}>{intro}</p> : null}
    </div>
  );
}
