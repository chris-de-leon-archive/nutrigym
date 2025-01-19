export type PageHeadingProps = {
  name: string
}

export function PageHeading(props: PageHeadingProps) {
  return <h1 className="text-3xl font-bold">{props.name}</h1>
}
