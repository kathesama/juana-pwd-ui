import { BrainCircuit } from 'lucide-react'

import { FeaturePlaceholder } from '@common/components'

export const KnowledgePage = () => (
  <FeaturePlaceholder
    eyebrow="Context"
    title="Knowledge"
    description="Knowledge should become the retrieval-oriented surface for curated sources, indexed references, and relevance controls that shape how Juana answers with external context."
    bullets={[
      'Organize connected sources and retrieval scopes so users understand what knowledge is available before they ask.',
      'Show freshness, sync state, and source provenance to avoid black-box retrieval behavior.',
      'Treat this page as a control plane for knowledge quality, not as a generic document browser.',
      'Leave room for source-level filters, indexing jobs, and citation previews once the backend endpoints land.',
    ]}
    icon={BrainCircuit}
  />
)
