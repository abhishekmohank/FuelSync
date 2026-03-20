import Image from 'next/image';

interface BrandLogoProps {
  size?: number;
  withText?: boolean;
  textClassName?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export default function BrandLogo({
  size = 40,
  withText = false,
  textClassName = 'text-2xl font-bold',
  className = '',
  variant = 'light',
}: BrandLogoProps) {
  const logoSrc = '/logos/logowhitebg%20remove.png';
  
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={logoSrc}
        alt="FuelSync logo"
        width={size}
        height={size}
        priority
      />
      {withText ? <span className={textClassName}>FuelSync</span> : null}
    </div>
  );
}
