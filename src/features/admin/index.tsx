import { ShieldEllipsis } from 'lucide-react'

import { FeaturePlaceholder } from '@common/components'

export const AdminPage = () => (
  <FeaturePlaceholder
    eyebrow="Operations"
    title="Admin"
    description="Admin is the operational control plane for privileged actors. It should stay narrow, auditable, and role-gated instead of becoming a dumping ground for every missing feature."
    bullets={[
      'Centralize privileged actions like connector health checks, user role review, and environment diagnostics.',
      'Make every destructive action explicit, logged, and easy to attribute to the current operator.',
      'Do not duplicate general-purpose settings here; admin surfaces should exist only for elevated capabilities.',
      'When this grows, split by operational domain instead of stacking unrelated controls into one screen.',
    ]}
    accent="gold"
    icon={ShieldEllipsis}
  />
)
