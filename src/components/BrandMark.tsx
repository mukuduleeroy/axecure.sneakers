type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span
      aria-label="Axecure Sneakers"
      className={`brand-mark inline-grid shrink-0 place-items-center rounded-full border border-ink-black font-bold leading-none ${
        compact ? 'h-30 w-30 text-caption' : 'h-[92px] w-[92px] text-[18px]'
      }`}
    >
      AX
    </span>
  );
}
