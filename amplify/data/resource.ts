import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { UserModel } from "./models/UserModel";
import { TaskModel } from "./models/TaskModel";
//import { defineAuth } from '@aws-amplify/backend';


// ////////////////// database ///////////////////////
const schema = a.schema({
    tblUser: UserModel, 
    tblTask: TaskModel
  }).authorization(allow => [
    // Apply authorization rules to the entire schema
    allow.authenticated().to(['create', 'read', 'update', 'delete'])
  ])
  
export const data = defineData({
  schema,
  // Optional: Set up logging for debugging
  logging: {
    excludeVerboseContent: false, 
    fieldLogLevel: 'all',
        retention: '1 week',          // Optional: Helps manage storage costs
  }
});
export type Schema = ClientSchema<typeof schema>;


// ////////////////// auth ///////////////////////
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 *
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    givenName: {
      mutable: true,
      required: true,
    },
    familyName: {
      mutable: true,
      required: true,
    },
  },
});
*/
