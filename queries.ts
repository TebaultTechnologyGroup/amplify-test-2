/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTblUser = /* GraphQL */ `query GetTblUser($id: ID!) {
  getTblUser(id: $id) {
    active
    createdAt
    created_at
    email
    first_name
    id
    last_name
    role
    updatedAt
    updated_at
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTblUserQueryVariables,
  APITypes.GetTblUserQuery
>;
export const listTblUsers = /* GraphQL */ `query ListTblUsers(
  $filter: ModelTblUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listTblUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      active
      createdAt
      created_at
      email
      first_name
      id
      last_name
      role
      updatedAt
      updated_at
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTblUsersQueryVariables,
  APITypes.ListTblUsersQuery
>;
