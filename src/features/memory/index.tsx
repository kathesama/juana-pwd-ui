import { DatabaseZap } from 'lucide-react'

import { FeaturePlaceholder } from '@common/components'

export const MemoryPage = () => (
  <FeaturePlaceholder
    eyebrow="Continuity"
    title="Memory"
    description="Memory should explain what the assistant is retaining, why it matters, and how users can inspect or correct long-lived context without guessing what the model remembers."
    bullets={[
      'Separate durable profile memory from volatile conversational state so the mental model stays clear.',
      'Show origin, confidence, and last-updated metadata for every remembered item worth exposing.',
      'Support review and pruning workflows before adding aggressive auto-save behavior.',
      'Design the page around trust and observability, because memory features fail when they feel opaque.',
    ]}
    icon={DatabaseZap}
  />
)
