import { ACCENT } from "@/lib/site";

export const FLAME_PATH = "M15 2 C22 11 26 16 26 23 A11 11 0 0 1 4 23 C4 17 9 13 11 8 C12 12 14 14 15 15 C16 11 16 6 15 2 Z";
export const FLAME_CORE_PATH = "M15 18 C18 22 19 24 19 27 A4 4 0 0 1 11 27 C11 24 13 22 15 18 Z";

type Props = { width?: number; height?: number; core?: boolean; className?: string };

/** The Daily Devotion flame, from the brand sheet. Decorative: always aria-hidden. */
export function FlameMark({ width = 30, height = 38, core = true, className }: Props) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 30 38" aria-hidden="true">
      <path d={FLAME_PATH} fill={ACCENT} />
      {core && <path d={FLAME_CORE_PATH} fill="#FFF6D8" />}
    </svg>
  );
}
