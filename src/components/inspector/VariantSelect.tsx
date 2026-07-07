import type { ComponentVariantDefinition } from '../../config/componentManifest'

type VariantSelectProps = {
  variants: ComponentVariantDefinition[]
  value: string | undefined
  onChange: (variantId: string) => void
}

/** Variant picker. Shared by Builder Inspector and Playground. */
function VariantSelect({ variants, value, onChange }: VariantSelectProps) {
  if (variants.length === 0) {
    return null
  }

  return (
    <select
      className="builder-inspector__select"
      value={value ?? variants[0].id}
      onChange={(event) => onChange(event.target.value)}
    >
      {variants.map((variant) => (
        <option key={variant.id} value={variant.id}>
          {variant.name}
        </option>
      ))}
    </select>
  )
}

export default VariantSelect
