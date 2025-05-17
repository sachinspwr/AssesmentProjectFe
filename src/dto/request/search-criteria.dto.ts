import { MatchOn, Operator, OrderDirection } from '@utils/enums';

class OrderItem {
  field!: string;

  direction!: OrderDirection;
}

export class SearchCriteria<T> {
  field!: keyof T;

  operator!: Operator;

  matchOn!: MatchOn;

  value!: string | number | boolean;
}

export class AssociationCriteria<T> {
  model!: string;
  as!: string;
  required?: boolean;
  criteria!: SearchCriteria<T>[];
}

export class SearchRequestDTO<T> {
  criteria!: SearchCriteria<T>[];

  limit?: number;

  offset?: number;

  order?: OrderItem[];

  associations?: AssociationCriteria<T>[];

  static default<T>(searchCriteria?: SearchCriteria<T>[], associations?: AssociationCriteria<T>[]) {

    const searchRequest = new SearchRequestDTO<T>();
    searchRequest.criteria = searchCriteria ?? [];
    searchRequest.associations = associations ?? [];
    searchRequest.limit = 100;
    searchRequest.offset = 0;
    searchRequest.order = [{ field: "createdAt", direction: OrderDirection.DESC }]
    return searchRequest;
  }
}