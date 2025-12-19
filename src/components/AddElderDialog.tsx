import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Alert,
    Grid,
} from '@mui/material';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { getOrCreateCurrentUser } from '../utils/userHelper';

const client = generateClient<Schema>();

interface AddElderDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

// Common US timezones
const TIMEZONES = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Phoenix',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
];

function AddElderDialog({ open, onClose, onSuccess }: AddElderDialogProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [timezone, setTimezone] = useState('America/New_York');
    const [active, setActive] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        if (!loading) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setTimezone('America/New_York');
            setActive(true);
            setError('');
            onClose();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!firstName.trim()) {
            setError('First name is required');
            setLoading(false);
            return;
        }

        if (!lastName.trim()) {
            setError('Last name is required');
            setLoading(false);
            return;
        }

        // Email validation (only if provided)
        if (email.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email address');
                setLoading(false);
                return;
            }
        }

        // Phone validation (optional but if provided, should be valid)
        if (phone.trim()) {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            if (!phoneRegex.test(phone)) {
                setError('Please enter a valid phone number');
                setLoading(false);
                return;
            }
        }

        // At least one contact method required
        if (!email.trim() && !phone.trim()) {
            setError('Please provide either email or phone number');
            setLoading(false);
            return;
        }

        try {
            const userId = await getOrCreateCurrentUser();
            const now = new Date().toISOString();

            // Check if email already exists (only if email provided)
            if (email.trim()) {
                const { data: existingUsers } = await client.models.tblUser.list({
                    filter: {
                        email: { eq: email.trim().toLowerCase() },
                        deleted: { eq: false }
                    }
                });

                if (existingUsers && existingUsers.length > 0) {
                    setError('A user with this email already exists');
                    setLoading(false);
                    return;
                }
            }

            // Create elder as a user with 'elder' role
            await client.models.tblUser.create({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim() ? email.trim().toLowerCase() : undefined,
                phone: phone.trim() || undefined,
                timezone,
                userRole: 'elder',
                active,
                deleted: false,
                createdAt: now,
                createdBy: userId,
                updatedAt: now,
                updatedBy: userId,
            });

            onSuccess();
            handleClose();
        } catch (err: any) {
            console.error('Error creating elder:', err);
            setError(err.message || 'Failed to create elder. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add New Elder</DialogTitle>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="First Name"
                                type="text"
                                fullWidth
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="e.g., John"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                margin="dense"
                                label="Last Name"
                                type="text"
                                fullWidth
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="e.g., Smith"
                            />
                        </Grid>
                    </Grid>

                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., john.smith@example.com"
                        sx={{ mt: 2 }}
                        helperText="Optional - for notifications. Either email or phone required."
                    />

                    <TextField
                        margin="dense"
                        label="Phone Number"
                        type="tel"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., (555) 123-4567"
                        helperText="Optional - for SMS notifications. Either email or phone required."
                        sx={{ mt: 2 }}
                    />

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Timezone</InputLabel>
                        <Select
                            value={timezone}
                            label="Timezone"
                            onChange={(e) => setTimezone(e.target.value)}
                        >
                            {TIMEZONES.map((tz) => (
                                <MenuItem key={tz} value={tz}>
                                    {tz.replace('_', ' ')}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={active}
                                onChange={(e) => setActive(e.target.checked)}
                            />
                        }
                        label="Active"
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Creating...' : 'Add Elder'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AddElderDialog;