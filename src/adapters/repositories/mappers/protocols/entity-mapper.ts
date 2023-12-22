export type EntityMapper<E> = {
  toEntity: (data: any) => E
  toArrayOfEntities: (dataArray: any[]) => E[]
}
