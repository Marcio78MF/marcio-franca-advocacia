'use client';

export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
      style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left' }}
    >
      Preferências de cookies
    </button>
  );
}
