export function PageSubContainer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="flex flex-col justify-start gap-y-2">{children}</div>
}
