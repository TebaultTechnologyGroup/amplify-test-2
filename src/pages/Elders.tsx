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
} from '@mui/icons-material';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

interface Elder {
    id: number;
    name: string;
    phone: string;
    timezone: string;
    active: boolean;
}

function EldersPage() {
    const [elders, setElders] = useState<Elder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchElders();
    }, []);

    const fetchElders = async () => {
        try {
            setLoading(true);
            const { data } = await client.models.tbl_elder.list();
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
                await client.models.tbl_elder.delete({ id });
                fetchElders();
            } catch (error) {
                console.error('Error deleting elder:', error);
            }
        }
    };

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
                    onClick={() => {/* TODO: Open add dialog */ }}
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
                            onClick={() => {/* TODO: Open add dialog */ }}
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
                                            {elder.name}
                                        </Typography>
                                        <Chip
                                            label={elder.active ? 'Active' : 'Inactive'}
                                            color={elder.active ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {elder.phone}
                                        </Typography>
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Timezone: {elder.timezone}
                                    </Typography>

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
        </Box>
    );
}

export default EldersPage;