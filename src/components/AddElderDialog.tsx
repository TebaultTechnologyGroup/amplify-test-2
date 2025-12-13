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
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [timezone, setTimezone] = useState('America/New_York');
    const [active, setActive] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        if (!loading) {
            setName('');
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
        if (!name.trim()) {
            setError('Name is required');
            setLoading(false);
            return;
        }

        if (!phone.trim()) {
            setError('Phone number is required');
            setLoading(false);
            return;
        }

        // Basic phone validation (US format)
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            setError('Please enter a valid phone number');
            setLoading(false);
            return;
        }

        try {
            const userId = await getOrCreateCurrentUser();
            const now = new Date().toISOString();

            await client.models.tbl_elder.create({
                name: name.trim(),
                phone: phone.trim(),
                timezone,
                active,
                created_at: now,
                created_by: userId,
                updated_at: now,
                updated_by: userId,
                deleted: false,
                caregiver_id: userId,
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

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Full Name"
                        type="text"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., John Smith"
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        margin="dense"
                        label="Phone Number"
                        type="tel"
                        fullWidth
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., (555) 123-4567"
                        helperText="Include area code"
                        sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
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