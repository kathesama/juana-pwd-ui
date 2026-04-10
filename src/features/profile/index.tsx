import { UserRound } from 'lucide-react'

import { FeaturePlaceholder } from '@common/components'

export const ProfilePage = () => (
  <FeaturePlaceholder
    eyebrow="Identity"
    title="Profile"
    description="Profile is the place to surface user identity, permissions, preferences, and account posture without forcing people into the settings flow for every small check."
    bullets={[
      'Expose the authenticated user, role mapping, and environment flags from the session payload.',
      'Add editable personal preferences only after the auth contract and persistence strategy are stable.',
      'Keep account diagnostics visible here so debugging auth issues does not require digging into storage or devtools.',
      'Reserve this surface for self-service information, not for operational controls that belong in settings or admin.',
    ]}
    icon={UserRound}
  />
)
