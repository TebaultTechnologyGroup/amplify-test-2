import { Box, Typography, Card, CardContent } from '@mui/material';
export function RemindersPage() {
    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
                Reminders
            </Typography>
            <Card>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="h6" color="text.secondary">
                        Reminders management coming soon
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default RemindersPage;