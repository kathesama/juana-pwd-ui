import { ArrowUpRight, type LucideIcon } from 'lucide-react'

interface FeaturePlaceholderProps {
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  accent?: 'gold' | 'purple'
  icon: LucideIcon
}

export const FeaturePlaceholder = ({
  eyebrow,
  title,
  description,
  bullets,
  accent = 'purple',
  icon: Icon,
}: FeaturePlaceholderProps) => {
  const accentClassName = accent === 'gold' ? 'text-juana-gold-400' : 'text-juana-purple-300'

  return (
    <div className="grid min-h-full gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="juana-panel p-6 lg:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-juana-surface-800/80 p-3 backdrop-blur-md">
            <Icon className={`h-5 w-5 ${accentClassName}`} />
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">{eyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{title}</h2>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">{description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {bullets.map((bullet) => (
            <article key={bullet} className="juana-panel p-5">
              <div className="flex items-start gap-3">
                <ArrowUpRight className={`mt-1 h-4 w-4 shrink-0 ${accentClassName}`} />
                <p className="text-sm leading-7 text-white">{bullet}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="juana-panel p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">Implementation status</p>
        <div className="juana-panel mt-4 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-white">Scaffolded route</span>
            <span
              className={`rounded-full border px-3 py-1 text-xs ${
                accent === 'gold'
                  ? 'border-juana-gold-400/30 bg-juana-gold-400/10 text-juana-gold-400'
                  : 'border-juana-purple-300/30 bg-juana-purple-500/10 text-juana-purple-300'
              }`}
            >
              Placeholder
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            This page is intentionally useful without pretending the feature exists. Replace the content block when the real module is ready.
          </p>
        </div>
      </aside>
    </div>
  )
}
