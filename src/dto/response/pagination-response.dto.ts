export interface PaginatedResponse<T> {
  currentpage: number;
  pageSize: number;
  totalItems: number;
  totalpages: number;
  data: T[];
}
