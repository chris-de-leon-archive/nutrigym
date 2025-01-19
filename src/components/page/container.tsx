export function PageContainer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // TODO: should this be part of the root layout?
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-7">{children}</div>
    </div>
  )
}
