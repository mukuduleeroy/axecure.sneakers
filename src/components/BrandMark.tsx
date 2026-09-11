type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <img
      alt="Axecure Sneakers main logo"
      className={`shrink-0 object-contain ${compact ? 'h-40 w-40' : 'h-[92px] w-[92px]'}`}
      src="/Axcure Logo.png"
    />
  );
}
