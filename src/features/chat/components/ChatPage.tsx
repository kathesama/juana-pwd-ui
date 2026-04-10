import { Bot, Clock3, CornerDownRight, Sparkles, Star } from 'lucide-react'

const sampleMessages = [
  {
    id: 'assistant-1',
    role: 'assistant',
    title: 'Status',
    body: 'Environment ready. PWA, Storybook, RTK Query and mocks are active in the new repo.',
  },
  {
    id: 'user-1',
    role: 'user',
    title: 'Next step',
    body: 'Move the real shell, auth workflow and feature pages without dragging broken config from the old project.',
  },
  {
    id: 'assistant-2',
    role: 'assistant',
    title: 'Plan',
    body: 'Keep this page as the orchestration surface and progressively replace the placeholders with real feature modules.',
  },
]

export const ChatPage = () => (
  <div className="grid min-h-full gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_320px]">
    <section className="flex min-h-[70vh] flex-col overflow-hidden rounded-[1.75rem] border border-juana-border bg-black/10">
      <header className="flex items-center justify-between gap-4 border-b border-juana-border px-5 py-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-juana-gold">Conversation</p>
          <h2 className="mt-2 text-2xl font-semibold text-juana-text-primary">Chat workspace</h2>
        </div>
        <div className="rounded-full border border-juana-purple-light/40 bg-juana-purple/10 px-3 py-1 text-xs text-juana-purple-light">
          Mock session
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {sampleMessages.map((message) => {
          const isAssistant = message.role === 'assistant'

          return (
            <article
              key={message.id}
              className={[
                'max-w-3xl rounded-3xl border px-5 py-4',
                isAssistant
                  ? 'border-juana-border bg-juana-surface/70 text-juana-text-primary'
                  : 'ml-auto border-juana-purple-light/30 bg-juana-purple/15 text-juana-text-primary',
              ].join(' ')}
            >
              <div className="mb-3 flex items-center gap-2">
                {isAssistant ? <Bot className="h-4 w-4 text-juana-gold" /> : <CornerDownRight className="h-4 w-4 text-juana-purple-light" />}
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-juana-text-muted">
                  {message.title}
                </span>
              </div>
              <p className="text-sm leading-7 text-inherit">{message.body}</p>
            </article>
          )
        })}
      </div>

      <footer className="border-t border-juana-border px-4 py-4">
        <div className="rounded-3xl border border-juana-border bg-juana-surface/80 px-4 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-juana-text-muted">Composer placeholder</p>
          <p className="mt-2 text-sm text-juana-text-muted">
            The actual streaming composer can be mounted here when the chat feature lands.
          </p>
        </div>
      </footer>
    </section>

    <aside className="grid gap-4">
      <section className="rounded-[1.75rem] border border-juana-border bg-black/10 p-5">
        <div className="flex items-center gap-2 text-juana-gold">
          <Sparkles className="h-4 w-4" />
          <p className="font-mono text-[11px] uppercase tracking-[0.24em]">Status rail</p>
        </div>
        <div className="mt-4 space-y-3">
          {[
            ['Routing', 'Protected shell, auth callback and admin gating are active.'],
            ['Mocks', 'MSW resolves auth session and starred message endpoints.'],
            ['Tooling', 'Typecheck, lint, tests and build now pass in the new repo.'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-juana-border bg-juana-surface/70 p-4">
              <h3 className="text-sm font-semibold text-juana-text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-juana-text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-juana-border bg-black/10 p-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-juana-text-muted">Signals</p>
          <Clock3 className="h-4 w-4 text-juana-purple-light" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-juana-border bg-juana-surface/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-juana-text-primary">Recent milestone</span>
              <Star className="h-4 w-4 text-juana-gold" />
            </div>
            <p className="mt-2 text-sm leading-6 text-juana-text-muted">
              New repo created and stabilized without inheriting the config drift from the previous one.
            </p>
          </div>
        </div>
      </section>
    </aside>
  </div>
)
