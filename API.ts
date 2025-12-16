/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type tblUser = {
  __typename: "tblUser",
  active: boolean,
  createdAt: string,
  created_at: number,
  email: string,
  first_name?: string | null,
  id: string,
  last_name?: string | null,
  role: string,
  updatedAt: string,
  updated_at: number,
};

export type ModelTblUserFilterInput = {
  active?: ModelBooleanInput | null,
  and?: Array< ModelTblUserFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  created_at?: ModelIntInput | null,
  email?: ModelStringInput | null,
  first_name?: ModelStringInput | null,
  id?: ModelIDInput | null,
  last_name?: ModelStringInput | null,
  not?: ModelTblUserFilterInput | null,
  or?: Array< ModelTblUserFilterInput | null > | null,
  role?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  updated_at?: ModelIntInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelTblUserConnection = {
  __typename: "ModelTblUserConnection",
  items:  Array<tblUser | null >,
  nextToken?: string | null,
};

export type ModelTblUserConditionInput = {
  active?: ModelBooleanInput | null,
  and?: Array< ModelTblUserConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  created_at?: ModelIntInput | null,
  email?: ModelStringInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  not?: ModelTblUserConditionInput | null,
  or?: Array< ModelTblUserConditionInput | null > | null,
  role?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  updated_at?: ModelIntInput | null,
};

export type CreateTblUserInput = {
  active: boolean,
  created_at: number,
  email: string,
  first_name?: string | null,
  id?: string | null,
  last_name?: string | null,
  role: string,
  updated_at: number,
};

export type DeleteTblUserInput = {
  id: string,
};

export type UpdateTblUserInput = {
  active?: boolean | null,
  created_at?: number | null,
  email?: string | null,
  first_name?: string | null,
  id: string,
  last_name?: string | null,
  role?: string | null,
  updated_at?: number | null,
};

export type ModelSubscriptionTblUserFilterInput = {
  active?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionTblUserFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  created_at?: ModelSubscriptionIntInput | null,
  email?: ModelSubscriptionStringInput | null,
  first_name?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  last_name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionTblUserFilterInput | null > | null,
  role?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  updated_at?: ModelSubscriptionIntInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type GetTblUserQueryVariables = {
  id: string,
};

export type GetTblUserQuery = {
  getTblUser?:  {
    __typename: "tblUser",
    active: boolean,
    createdAt: string,
    created_at: number,
    email: string,
    first_name?: string | null,
    id: string,
    last_name?: string | null,
    role: string,
    updatedAt: string,
    updated_at: number,
  } | null,
};

export type ListTblUsersQueryVariables = {
  filter?: ModelTblUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTblUsersQuery = {
  listTblUsers?:  {
    __typename: "ModelTblUserConnection",
    items:  Array< {
      __typename: "tblUser",
      active: boolean,
      createdAt: string,
      created_at: number,
      email: string,
      first_name?: string | null,
      id: string,
      last_name?: string | null,
      role: string,
      updatedAt: string,
      updated_at: number,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateTblUserMutationVariables = {
  condition?: ModelTblUserConditionInput | null,
  input: CreateTblUserInput,
};

export type CreateTblUserMutation = {
  createTblUser?:  {
    __typename: "tblUser",
    active: boolean,
    createdAt: string,
    created_at: number,
    email: string,
    first_name?: string | null,
    id: string,
    last_name?: string | null,
    role: string,
    updatedAt: string,
    updated_at: number,
  } | null,
};

export type DeleteTblUserMutationVariables = {
  condition?: ModelTblUserConditionInput | null,
  input: DeleteTblUserInput,
};

export type DeleteTblUserMutation = {
  deleteTblUser?:  {
    __typename: "tblUser",
    active: boolean,
    createdAt: string,
    created_at: number,
    email: string,
    first_name?: string | null,
    id: string,
    last_name?: string | null,
    role: string,
    updatedAt: string,
    updated_at: number,
  } | null,
};

export type UpdateTblUserMutationVariables = {
  condition?: ModelTblUserConditionInput | null,
  input: UpdateTblUserInput,
};

export type UpdateTblUserMutation = {
  updateTblUser?:  {
    __typename: "tblUser",
    active: boolean,
    createdAt: string,
    created_at: number,
    email: string,
    first_name?: string | null,
    id: string,
    last_name?: string | null,
    role: string,
    updatedAt: string,
    updated_at: number,
  } | null,
};

export type OnCreateTblUserSubscriptionVariables = {
  filter?: ModelSubscriptionTblUserFilterInput | null,
};

export type OnCreateTblUserSubscription = {
  onCreateTblUser?:  {
    __typename: "tblUser",
    active: boolean,
    createdAt: string,
    created_at: number,
    email: string,
    first_name?: string | null,
    id: string,
    last_name?: string | null,
    role: string,
    updatedAt: string,
    updated_at: number,
  } | null,
};

export type OnDeleteTblUserSubscriptionVariables = {
  filter?: ModelSubscriptionTblUserFilterInput | null,
};

export type OnDeleteTblUserSubscription = {
  onDeleteTblUser?:  {
    __typename: "tblUser",
    active: boolean,
    createdAt: string,
    created_at: number,
    email: string,
    first_name?: string | null,
    id: string,
    last_name?: string | null,
    role: string,
    updatedAt: string,
    updated_at: number,
  } | null,
};

export type OnUpdateTblUserSubscriptionVariables = {
  filter?: ModelSubscriptionTblUserFilterInput | null,
};

export type OnUpdateTblUserSubscription = {
  onUpdateTblUser?:  {
    __typename: "tblUser",
    active: boolean,
    createdAt: string,
    created_at: number,
    email: string,
    first_name?: string | null,
    id: string,
    last_name?: string | null,
    role: string,
    updatedAt: string,
    updated_at: number,
  } | null,
};
