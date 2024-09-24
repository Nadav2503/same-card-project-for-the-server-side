import { Divider, Typography, Container } from '@mui/material';
import React from 'react';

export default function PageHeader({ title, subtitle }) {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="h2" component="h1">
                {title}
            </Typography>
            <Typography variant="h5" component="h2">
                {subtitle}
            </Typography>
            <Divider sx={{ my: 2, width: '100%', maxWidth: '600px' }} />
        </Container>
    );
}
