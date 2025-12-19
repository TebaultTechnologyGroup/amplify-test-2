// amplify/auth/post-confirmation/handler.ts
import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import postgres from 'postgres';

// Initialize the database connection outside the handler for execution environment reuse
const sql = postgres(process.env.SQL_CONNECTION_STRING!, {
  ssl: 'require', // Required for Supabase/RDS connections
});

export const handler: PostConfirmationTriggerHandler = async (event) => {
  const { sub, email, given_name, family_name } = event.request.userAttributes;
  
  // Mapping Cognito attributes to your tbl_user schema
  const firstName = given_name || '';
  const lastName = family_name || '';
  const now = new Date().toISOString();
  const systemUserId = 1;

  try {
    await sql`
      INSERT INTO tblUser (
        awsId,
        email, 
        userRole, 
        firstName, 
        lastName, 
        active, 
        createdAt, 
        updatedAt
        createdBy, 
        updatedBy
      )
      VALUES (
        ${sub}, 
        ${email}, 
        'caregiver', 
        ${firstName}, 
        ${lastName}, 
        true, 
        ${now}, 
        ${now},
        ${systemUserId},
        ${systemUserId})
      ON CONFLICT (email) DO NOTHING;
    `;
    
    return event;
  } catch (error) {
    console.error("Error syncing user to Postgres:", error);
    throw error;
  }
};