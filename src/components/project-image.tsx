import Image from "next/image";

export function ProjectImage({ src, alt, className, eager = false, sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px" }: { src: string; alt: string; className?: string; eager?: boolean; sizes?: string }) {
  return <Image data-project-image src={src} alt={alt} fill className={className}
    sizes={sizes}
    loading={eager ? "eager" : "lazy"} unoptimized={!src.startsWith("/images/placeholders/")} />;
}
