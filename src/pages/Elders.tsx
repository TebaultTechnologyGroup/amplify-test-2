import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    Chip,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Phone as PhoneIcon,
    AccessTime as TimezoneIcon,
} from '@mui/icons-material';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import AddElderDialog from '../components/AddElderDialog';

const client = generateClient<Schema>();

interface Elder {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    timezone: string;
    active: boolean;
}

function EldersPage() {
    const [elders, setElders] = useState<Elder[]>([]);
    const [loading, setLoading] = useState(true);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    useEffect(() => {
        fetchElders();
    }, []);

    const fetchElders = async () => {
        try {
            setLoading(true);
            // Fetch users with 'elder' role
            const { data } = await client.models.tblUser.list({
                filter: {
                    userRole: { eq: 'elder' },
                    deleted: { eq: false }
                }
            });
            setElders(data as any);
        } catch (error) {
            console.error('Error fetching elders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this elder profile?')) {
            try {
                // Soft delete - just mark as deleted
                await client.models.tblUser.update({
                    id,
                    deleted: true,
                    updatedAt: new Date().toISOString(),
                });
                fetchElders();
            } catch (error) {
                console.error('Error deleting elder:', error);
            }
        }
    };

    const getFullName = (elder: Elder) => {
        return `${elder.firstName || ''} ${elder.lastName || ''}`.trim() || 'Unknown';
    };

    // const getContactInfo = (elder: Elder) => {
    //     if (elder.email) return elder.email;
    //     if (elder.phone) return elder.phone;
    //     return 'No contact info';
    // };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    Elders
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddDialog(true)}
                >
                    Add Elder
                </Button>
            </Box>

            {elders.length === 0 ? (
                <Card>
                    <CardContent sx={{ textAlign: 'center', py: 6 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No elders added yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Get started by adding your first elder profile
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenAddDialog(true)}
                        >
                            Add Your First Elder
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Grid container spacing={3}>
                    {elders.map((elder) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={elder.id}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                        <Typography variant="h6" component="h2">
                                            {getFullName(elder)}
                                        </Typography>
                                        <Chip
                                            label={elder.active ? 'Active' : 'Inactive'}
                                            color={elder.active ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </Box>

                                    {elder.email && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {elder.email}
                                        </Typography>
                                    )}

                                    {elder.phone && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {elder.phone}
                                            </Typography>
                                        </Box>
                                    )}

                                    {!elder.email && !elder.phone && (
                                        <Typography variant="body2" color="warning.main" sx={{ mb: 1 }}>
                                            No contact information
                                        </Typography>
                                    )}

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <TimezoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {elder.timezone}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => {/* TODO: Open edit dialog */ }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(elder.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <AddElderDialog
                open={openAddDialog}
                onClose={() => setOpenAddDialog(false)}
                onSuccess={fetchElders}
            />
        </Box>
    );
}

export default EldersPage;