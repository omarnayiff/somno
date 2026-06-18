/**
 * Camada decorativa: orbes de luz desfocados que derivam suavemente ao fundo.
 * Puramente visual (aria-hidden, sem interação). Fica em `absolute inset-0`
 * com overflow próprio, então não exige que a seção recorte (não afeta
 * elementos que transbordam, como o CTA do comparativo).
 */
export function Aurora({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <span className="aurora-orb aurora-orb-1" />
      <span className="aurora-orb aurora-orb-2" />
    </div>
  )
}
