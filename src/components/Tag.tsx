type TagProps = {
  label: string
}

function Tag({ label }: TagProps) {
  return <span className="tag">{label}</span>
}

export default Tag
