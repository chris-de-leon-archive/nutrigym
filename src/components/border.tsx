export function Border({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="rounded border p-2">{children}</div>
}
