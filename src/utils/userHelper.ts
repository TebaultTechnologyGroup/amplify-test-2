import { generateClient } from 'aws-amplify/data';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

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
    const { data: users } = await client.models.tbl_user.list({
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
    const email = cognitoUser.signInDetails?.loginId;

    if (!email) {
      throw new Error('User email not found');
    }

    // Try to find existing user
    const { data: users } = await client.models.tbl_user.list({
      filter: {
        email: { eq: email }
      }
    });

    if (users && users.length > 0) {
      return users[0].id as number;
    }

    // Create new user record
    const now = new Date().toISOString();
    const { data: newUser } = await client.models.tbl_user.create({
      email,
      role: 'caregiver',
      first_name: email.split('@')[0], // Temporary - should be collected during registration
      last_name: '',
      active: true,
      created_at: now,
      created_by: 1, // System user
      updated_at: now,
      updated_by: 1,
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