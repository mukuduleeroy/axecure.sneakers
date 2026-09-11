type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <img
      alt="Axecure Sneakers main logo"
      className={`shrink-0 object-contain ${compact ? 'h-[35px] w-[35px]' : 'h-[58px] w-[58px]'}`}
      src="/Axcure Logo.png"
    />
  );
}
