import { Box, Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Top Navigation Bar */}
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Elder Care Reminder
                    </Typography>
                    <Box>
                        <Button
                            color="primary"
                            onClick={() => navigate('/login')}
                            sx={{ mr: 1 }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    py: 12,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Care for Your Loved Ones
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                        A simple, compassionate way to manage daily tasks and reminders for elderly family members with memory challenges
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/register')}
                        sx={{
                            bgcolor: 'white',
                            color: '#667eea',
                            px: 4,
                            py: 1.5,
                            '&:hover': {
                                bgcolor: '#f0f0f0'
                            }
                        }}
                    >
                        Get Started Free
                    </Button>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
                    How It Works
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
                    <Box sx={{ textAlign: 'center', p: 3 }}>
                        <Box sx={{ fontSize: 48, mb: 2 }}>👤</Box>
                        <Typography variant="h5" gutterBottom>
                            Add Elderly Profiles
                        </Typography>
                        <Typography color="text.secondary">
                            Create profiles for your loved ones with their contact information and timezone
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3 }}>
                        <Box sx={{ fontSize: 48, mb: 2 }}>📋</Box>
                        <Typography variant="h5" gutterBottom>
                            Set Up Tasks
                        </Typography>
                        <Typography color="text.secondary">
                            Define daily tasks like medication, meals, or appointments with detailed instructions
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3 }}>
                        <Box sx={{ fontSize: 48, mb: 2 }}>🔔</Box>
                        <Typography variant="h5" gutterBottom>
                            Automated Reminders
                        </Typography>
                        <Typography color="text.secondary">
                            Receive timely reminders via phone or SMS to ensure nothing is forgotten
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* Benefits Section */}
            <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
                        Why Elder Care Reminder?
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography variant="h6" gutterBottom>✓ Peace of Mind</Typography>
                            <Typography color="text.secondary">
                                Never worry about forgotten medications or missed appointments
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" gutterBottom>✓ Easy to Use</Typography>
                            <Typography color="text.secondary">
                                Simple interface designed for caregivers of all tech levels
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" gutterBottom>✓ Flexible Scheduling</Typography>
                            <Typography color="text.secondary">
                                Set up recurring tasks with custom schedules that fit your loved one's routine
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" gutterBottom>✓ Track Confirmations</Typography>
                            <Typography color="text.secondary">
                                Know when tasks are completed with confirmation tracking
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Container maxWidth="sm">
                    <Typography variant="h4" gutterBottom>
                        Ready to Get Started?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Join us today and make caregiving easier for you and your loved ones
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => navigate('/register')}
                        sx={{ px: 4, py: 1.5 }}
                    >
                        Create Your Free Account
                    </Button>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#333', color: 'white', py: 3 }}>
                <Container>
                    <Typography variant="body2" align="center">
                        © 2024 Elder Care Reminder. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default LandingPage;