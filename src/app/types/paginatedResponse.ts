export interface PaginatedList<TData> {
  totalRecords: number
  pageNumber: number
  pageSize: number
  totalPages: number
  items: TData[]
}