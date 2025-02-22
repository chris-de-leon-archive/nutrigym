export type Identifier = string | number

export type CacheInvalidation = {
  id?: Identifier
  typename: string
}

export type CacheEntity = {
  id: Identifier
  typename: string
}
