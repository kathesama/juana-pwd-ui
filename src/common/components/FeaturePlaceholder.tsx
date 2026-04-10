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
  const accentClassName = accent === 'gold' ? 'text-juana-gold' : 'text-juana-purple-light'

  return (
    <div className="grid min-h-full gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="rounded-[1.75rem] border border-juana-border bg-black/10 p-6 lg:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-juana-border bg-juana-surface/80 p-3">
            <Icon className={`h-5 w-5 ${accentClassName}`} />
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-juana-text-muted">{eyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold text-juana-text-primary">{title}</h2>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-7 text-juana-text-muted">{description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {bullets.map((bullet) => (
            <article key={bullet} className="rounded-3xl border border-juana-border bg-juana-surface/70 p-5">
              <div className="flex items-start gap-3">
                <ArrowUpRight className={`mt-1 h-4 w-4 shrink-0 ${accentClassName}`} />
                <p className="text-sm leading-7 text-juana-text-primary">{bullet}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-[1.75rem] border border-juana-border bg-black/10 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-juana-text-muted">Implementation status</p>
        <div className="mt-4 rounded-3xl border border-juana-border bg-juana-surface/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-juana-text-primary">Scaffolded route</span>
            <span className={`rounded-full border px-3 py-1 text-xs ${accent === 'gold' ? 'border-juana-gold/30 bg-juana-gold/10 text-juana-gold' : 'border-juana-purple-light/30 bg-juana-purple/10 text-juana-purple-light'}`}>
              Placeholder
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-juana-text-muted">
            This page is intentionally useful without pretending the feature exists. Replace the content block when the real module is ready.
          </p>
        </div>
      </aside>
    </div>
  )
}
