import { generateClient } from 'aws-amplify/data';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource'; // **Adjust the path as necessary**


const client = generateClient<Schema>(); 
const SYSTEM_USER_ID = 1; // Assuming 1 is the system user ID
/**
 * Get the current user's database ID
 * This matches the Cognito user to the tbl_user record
 */
export async function getCurrentUserId(): Promise<number> {
  try {
    const cognitoUser = await getCurrentUser();
    const email = cognitoUser.signInDetails?.loginId;

    if (!email) {
      throw new Error('User email not found');
    }

    // Query tbl_user to find the user by email
    const { data: users } = await client.models.tblUser.list({
      filter: {
        email: { eq: email }
      }
    });

    if (!users || users.length === 0) {
      // User doesn't exist in database yet - you might want to create them here
      throw new Error('User not found in database. Please contact support.');
    }

    return users[0].id as number;
  } catch (error) {
    console.error('Error getting user ID:', error);
    throw error;
  }
}

/**
 * Get or create the current user in the database
 * This ensures a user record exists when they first log in
 */
export async function getOrCreateCurrentUser(): Promise<number> {
  try {
    const cognitoUser = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    const email = cognitoUser.signInDetails?.loginId || attributes.email;

    if (!email) {
      throw new Error('User email not found');
    }

    // Try to find existing user
    const { data: users } = await client.models.tblUser.list({
      filter: {
        email: { eq: email }
      }
    });

    if (users && users.length > 0) {
      return users[0].id as number;
    }

    // Create new user record with Cognito attributes
    const creatorId = SYSTEM_USER_ID; 
    const now = new Date().toISOString();
    const firstName = attributes.given_name || email.split('@')[0];
    const lastName = attributes.family_name || '';
    

     const { data: newUser } = await client.models.tblUser.create({
      email, 
      userRole: 'caregiver',
      firstName: firstName,
      lastName: lastName,
      active: true,
      deleted: false,
      createdAt: now,
      updatedAt: now,
      createdBy: creatorId, 
      updatedBy: creatorId,      
    });

  
    
    if (!newUser) {
       throw new Error('Failed to create user');
     }
      return newUser.id as number;
  } catch (error) {
    console.error('Error getting or creating user:', error);
    throw error;
  }
}