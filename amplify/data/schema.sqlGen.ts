import { a } from "@aws-amplify/data-schema";
import { configure } from "@aws-amplify/data-schema/internals";
import { secret } from "@aws-amplify/backend";

export const schema = configure({
    database: {
        identifier: "ID66zoOWQbVui2ztRVXVdJgQ",
        engine: "postgresql",
        connectionUri: secret("SQL_CONNECTION_STRING"),
        sslCert: secret("SUPABASE_CA_CERT")
    }
}).schema({
    "tblreminder": a.model({
        id: a.integer().default(),
        taskid: a.integer().required(),
        scheduledat: a.string(),
        reminderstatusid: a.integer(),
        sentat: a.string(),
        confirmedat: a.string(),
        confirmedby: a.string().required(),
        note: a.string()
    }).identifier([
        "id"
    ]),
    "tblremindercategory": a.model({
        id: a.integer().default(),
        category: a.string()
    }).identifier([
        "id"
    ]),
    "tblsubscription": a.model({
        id: a.integer().default(),
        userid: a.integer().required(),
        stripecustomerid: a.string(),
        stripesubscriptionid: a.string(),
        status: a.string().required(),
        planid: a.string().required(),
        currentperiodstart: a.string(),
        currentperiodend: a.string(),
        cancelatperiodend: a.boolean(),
        createdat: a.datetime(),
        updatedat: a.datetime(),
        createdby: a.integer(),
        updatedby: a.integer()
    }).identifier([
        "id"
    ]),
    "tbltask": a.model({
        id: a.integer().default(),
        dependentuser: a.integer().required(),
        task: a.string().required(),
        taskcategoryid: a.integer().required(),
        instructions: a.string(),
        rrule: a.string(),
        active: a.boolean(),
        createdat: a.datetime(),
        updatedat: a.datetime(),
        createdby: a.integer(),
        updatedby: a.integer()
    }).identifier([
        "id"
    ]),
    "tbltaskcategory": a.model({
        id: a.integer().default(),
        category: a.string(),
        createdat: a.datetime(),
        createdby: a.integer()
    }).identifier([
        "id"
    ]),
    "tblUser": a.model({
        id: a.integer().default(),
        awsId: a.string(),
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        userRole: a.string().required(),
        active: a.boolean(),
        deleted: a.boolean(),
        createdAt: a.datetime(),
        updatedAt: a.datetime(),
        createdBy: a.integer(),
        updatedBy: a.integer(),
        phone: a.string(),
        timezone: a.string()
    }).identifier([
        "id"
    ])
});
