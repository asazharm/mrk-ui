export class GetUsersDto {
  readonly page: number;

  readonly pageSize: number;

  readonly sortField: string;

  readonly sortOrder: string;
}
