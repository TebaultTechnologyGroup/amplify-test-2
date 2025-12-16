 // amplify/data/user_model.ts
 import { a } from '@aws-amplify/backend';
 
 export const TaskModel = a.model({
        id: a.integer().default(),
        dependant: a.belongsTo('tblUser','id'),
        task: a.string().required(),
        taskCategoryId: a.integer().required(),
        instructions: a.string(),
        rrule: a.string(),
        active: a.boolean(),
        createdAt: a.string().required(),
        updatedAt: a.string().required(),
        creator: a.belongsTo('tblUser', 'createdBy'), 
        editor: a.belongsTo('tblUser', 'updatedBy'),
    });
