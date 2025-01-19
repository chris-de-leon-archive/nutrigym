export type PageSubHeadingProps = {
  name: string
}

export function PageSubHeading(props: PageSubHeadingProps) {
  return <h2 className="text-xl font-bold">{props.name}</h2>
}
