import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { UserModel } from "./models/UserModel";
//import { TaskModel } from "./models/TaskModel";
import {schemaXX} from "./schema.sql";


// ////////////////// database ///////////////////////
export const data = defineData({
  schema: schemaXX,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  }

});
