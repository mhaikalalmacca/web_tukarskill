export const SKILL_CATALOG = [
  "Desain Grafis",
  "Fotografi Produk",
  "Videografi & Reels",
  "Marketing Media Sosial",
  "Excel & Pembukuan",
  "Coding Dasar",
  "Bahasa Inggris",
  "Menjahit",
  "Servis Motor",
  "Masak & Baking",
];

export function getMatchType(me, other) {
  if (!me.offer || !me.want) return null;
  const iWantWhatTheyOffer = other.offer === me.want;
  const theyWantWhatIOffer = me.offer === other.want;
  if (iWantWhatTheyOffer && theyWantWhatIOffer) return "perfect";
  if (iWantWhatTheyOffer || theyWantWhatIOffer) return "partial";
  return null;
}
