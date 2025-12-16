/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTblUser = /* GraphQL */ `mutation CreateTblUser(
  $condition: ModelTblUserConditionInput
  $input: CreateTblUserInput!
) {
  createTblUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTblUserMutationVariables,
  APITypes.CreateTblUserMutation
>;
export const deleteTblUser = /* GraphQL */ `mutation DeleteTblUser(
  $condition: ModelTblUserConditionInput
  $input: DeleteTblUserInput!
) {
  deleteTblUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteTblUserMutationVariables,
  APITypes.DeleteTblUserMutation
>;
export const updateTblUser = /* GraphQL */ `mutation UpdateTblUser(
  $condition: ModelTblUserConditionInput
  $input: UpdateTblUserInput!
) {
  updateTblUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateTblUserMutationVariables,
  APITypes.UpdateTblUserMutation
>;
