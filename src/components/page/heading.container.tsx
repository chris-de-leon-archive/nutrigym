export function PageHeadingContainer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-row items-center justify-between">{children}</div>
  )
}
