export type PageTitleProps = {
  name: string
}

export function PageTitle(props: PageTitleProps) {
  return <span className="text-3xl font-bold">{props.name}</span>
}
