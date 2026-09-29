import Image from "next/image";

export function ProjectImage({ src, alt, className, eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <Image data-project-image src={src} alt={alt} fill className={className}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
    loading={eager ? "eager" : "lazy"} unoptimized={!src.startsWith("/images/placeholders/")} />;
}
