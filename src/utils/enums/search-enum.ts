/* eslint-disable no-unused-vars */
export enum Operator {
  AND = 'AND',
  OR = 'OR',
  GREATER_THAN = "GREATER_THAN",
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum MatchOn {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  LIKE = 'LIKE',
  IN = 'IN',
  VALUE = "VALUE",
}
