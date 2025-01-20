// @source: https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
export type NextSearchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
