export default function AvatarGlow({ src, alt, className = "" }) {
  return (
    <div className={`glow-avatar ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}