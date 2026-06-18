/**
 * Divisores decorativos (inferidos dos prints):
 *  - WaveDivider: onda suave (hero claro -> stats navy).
 *  - CloudDivider: bordas arredondadas tipo "nuvem" (vídeo claro -> benefícios navy).
 */

export function WaveDivider({ fill = '#004594', className = '' }: { fill?: string; className?: string }) {
  return (
    <div className={`pointer-events-none -mb-px w-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 190" preserveAspectRatio="none" className="block h-[80px] w-full md:h-[120px]">
        {/* 5 ondulações: topo arredondado, emenda em bico (cusp) entre uma e outra.
            Quadráticas: o vale onde duas se encontram forma um pico agudo (mais agressivo).
            Meio maior; laterais menores. Uma cor só (navy da próxima seção). */}
        <path
          d="M0,130 Q130,30 260,130 Q410,-6 560,130 Q720,-42 880,130 Q1030,-6 1180,130 Q1310,30 1440,130 L1440,190 L0,190 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

export function CloudDivider({ fill = '#004594', className = '' }: { fill?: string; className?: string }) {
  return (
    <div className={`pointer-events-none -mb-px w-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="block h-[72px] w-full md:h-[120px]">
        {/* 5 nuvens arredondadas com tamanhos variados, transições suaves */}
        <path
          d={`M0,160 L0,120
             a200,100 0 0 1 200,-60
             a100,80 0 0 1 160,0
             a220,120 0 0 1 320,-30
             a240,130 0 0 1 360,0
             a200,110 0 0 1 280,30
             a100,70 0 0 1 120,60
             L1440,160 Z`}
          fill={fill}
        />
      </svg>
    </div>
  )
}
