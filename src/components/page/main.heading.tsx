export type PageMainHeadingProps = {
  name: string
}

export function PageMainHeading(props: PageMainHeadingProps) {
  return <h1 className="text-3xl font-bold">{props.name}</h1>
}
