export function PageMainContainer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-7">{children}</div>
    </div>
  )
}
