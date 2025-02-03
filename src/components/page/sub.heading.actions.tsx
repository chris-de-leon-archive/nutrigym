export function PageSubHeadingActions({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="flex flex-row items-center gap-x-2">{children}</div>
}
