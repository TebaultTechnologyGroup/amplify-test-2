import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { schema as generatedSqlSchema } from './schema.sql';


// Add a global authorization rule
// TODO: Update the authorization rule as needed for your application
//.      https://docs.amplify.aws/react/build-a-backend/data/customize-authz/
const sqlSchema = generatedSqlSchema.authorization(allow => allow.guest())

// default todo schema from example app
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
       }).authorization(allow => [allow.owner()]);

// combine with the generated SQL schema
const combinedSchema = a.combine([schema, sqlSchema]);

export type Schema = ClientSchema<typeof combinedSchema>;


export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
    
  },
});

