import { SlidersHorizontal } from 'lucide-react'

import { FeaturePlaceholder } from '@common/components'

export const SettingsPage = () => (
  <FeaturePlaceholder
    eyebrow="Configuration"
    title="Settings"
    description="Settings should hold system-level toggles, interface preferences, and integration defaults that alter application behavior across the workspace."
    bullets={[
      'Keep settings grouped by concern: interface, assistant behavior, notifications, and integrations.',
      'Avoid mixing account identity details here; those belong to profile unless they truly change application-wide behavior.',
      'Every setting should have a visible default and a reversible state, especially when backend behavior changes.',
      'This page is the right place for PWA installation hints, language preferences, and transport-level diagnostics.',
    ]}
    accent="gold"
    icon={SlidersHorizontal}
  />
)
