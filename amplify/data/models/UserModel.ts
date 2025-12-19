// amplify/data/user_model.ts
import { a } from '@aws-amplify/backend';

export const UserModel = a.model({
  id: a.integer().default(),
  awsId: a.string(),
  firstName: a.string(),
  lastName: a.string(),
  email: a.string(),
  phone:a.string(),
  userRole: a.string().required(),
  timezone: a.string().default('America/New_York'),
  active: a.boolean().required().default(true),
  deleted: a.boolean().required().default(false),
  createdAt: a.string().required(),
  updatedAt: a.string().required(),
  createdBy: a.integer().required(), 
  updatedBy: a.integer().required(),
  
  // Relationship: Who created/edited this specific user record
  creator: a.belongsTo('tblUser', 'createdBy'), 
  editor: a.belongsTo('tblUser', 'updatedBy'),

  // Required Inverse Relationships: Records created/edited BY this user
  createdUsers: a.hasMany('tblUser', 'id'),
  editedUsers: a.hasMany('tblUser', 'id'),
});