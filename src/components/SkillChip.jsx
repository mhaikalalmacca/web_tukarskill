export default function SkillChip({ label, tone = "ochre" }) {
  const tones = {
    ochre: "bg-pasar-ochre/15 text-pasar-ochreDark border-pasar-ochre/40",
    outline: "bg-transparent text-pasar-ink/80 border-pasar-ink/30",
    leaf: "bg-pasar-leaf/15 text-pasar-leaf border-pasar-leaf/40",
    berry: "bg-pasar-berry/15 text-pasar-berry border-pasar-berry/40",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-mono font-medium tracking-wide ${tones[tone]}`}
    >
      {label}
    </span>
  );
}
