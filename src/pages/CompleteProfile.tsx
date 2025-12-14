import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { updateUserAttributes } from 'aws-amplify/auth';
import { getCurrentUserId } from '../utils/userHelper';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

function CompleteProfile() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Update Cognito
            await updateUserAttributes({
                userAttributes: {
                    given_name: firstName,
                    family_name: lastName,
                }
            });

            // Update database
            const userId = await getCurrentUserId();
            await client.models.tbl_user.update({
                id: userId,
                first_name: firstName,
                last_name: lastName,
            });

            navigate('/admin/elders');
        } catch (err: any) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Complete Your Profile
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Please provide your name to continue
                </Typography>

                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        fullWidth
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Continue'}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default CompleteProfile;