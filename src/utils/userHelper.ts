import { generateClient } from 'aws-amplify/data';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();
const SYSTEM_USER_ID = 1; 

/**
 * Get the current user's database ID
 * This matches the Cognito user to the tblUser record
 */
export async function getCurrentUserId(): Promise<number> {
  try {
    const cognitoUser = await getCurrentUser();
    const email = cognitoUser.signInDetails?.loginId;

    if (!email) {
      throw new Error('User email not found');
    }

    // Query tblUser to find the user by email
    const { data: users } = await client.models.tblUser.list({
      filter: {
        email: { eq: email },
        deleted: { eq: false }
      }
    });

    if (!users || users.length === 0) {
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
        email: { eq: email },
        deleted: { eq: false }
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
    const phone = attributes.phone_number || '';
        
    const { data: newUser } = await client.models.tblUser.create({
      email,
      awsId: cognitoUser.signInDetails?.loginId || '',
      userRole: 'caregiver', // Default role for new registrations
      firstName,
      lastName,
      phone,
      timezone: 'America/New_York',
      active: true,
      deleted: false,
      createdAt: now,
      createdBy: creatorId, // System user
      updatedAt: now,
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

/**
 * Get current user's full record
 */
export async function getCurrentUserRecord() {
  try {
    const userId = await getCurrentUserId();
    const { data: user } = await client.models.tblUser.get({ id: userId });
    return user;
  } catch (error) {
    console.error('Error getting user record:', error);
    throw error;
  }
}

export async function  updateUser(id: number, firstName: string, lastName: string, email: string) {
  await client.models.tblUser.update({
    id,
    firstName,
    lastName,
    email,
    updatedAt: new Date().toISOString(),
  });
}