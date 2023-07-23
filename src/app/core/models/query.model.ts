export class Query {
  constructor(
    public pageNumber: number | null = 1,
    public pageSize: number | null = 5,
    public queryString: string = '',
    public collection: string = '',
  ) {}
}
