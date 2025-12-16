/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTblUser = /* GraphQL */ `subscription OnCreateTblUser($filter: ModelSubscriptionTblUserFilterInput) {
  onCreateTblUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTblUserSubscriptionVariables,
  APITypes.OnCreateTblUserSubscription
>;
export const onDeleteTblUser = /* GraphQL */ `subscription OnDeleteTblUser($filter: ModelSubscriptionTblUserFilterInput) {
  onDeleteTblUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTblUserSubscriptionVariables,
  APITypes.OnDeleteTblUserSubscription
>;
export const onUpdateTblUser = /* GraphQL */ `subscription OnUpdateTblUser($filter: ModelSubscriptionTblUserFilterInput) {
  onUpdateTblUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTblUserSubscriptionVariables,
  APITypes.OnUpdateTblUserSubscription
>;
