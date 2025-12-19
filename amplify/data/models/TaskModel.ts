 // amplify/data/user_model.ts
 import { a } from '@aws-amplify/backend';
 
 export const TaskModel = a.model({
        id: a.integer().default(),
        dependantId: a.integer(),
        task: a.string().required(),
        taskCategoryId: a.integer().required(),
        instructions: a.string(),
        rrule: a.string(),
        active: a.boolean(),
        createdAt: a.string().required(),
        updatedAt: a.string().required(),
        // Define the foreign key fields first
        userId: a.integer(), 
        createdBy: a.integer(),
        updatedBy: a.integer(),

        // Define the relationships
        dependant: a.belongsTo('tblUser', 'id'),
        creator: a.belongsTo('tblUser', 'createdBy'), 
        editor: a.belongsTo('tblUser', 'updatedBy'),


        // Required Inverse Relationships: Records created/edited BY this user
        createdDependants: a.hasMany('tblTask', 'dependantId'),
        createdUsers: a.hasMany('tblUser', 'createdBy'),
        editedUsers: a.hasMany('tblUser', 'updatedBy')
    });
