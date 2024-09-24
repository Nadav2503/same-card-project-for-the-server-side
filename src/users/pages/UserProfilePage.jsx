import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Container, Card, CardContent, Avatar, Grid, Box, Button } from '@mui/material';
import useUsers from "../hooks/useUsers";
import PageHeader from '../../components/PageHeader';
import ROUTES from '../../routes/routesModel';

export default function UserProfilePage() {
    const { id } = useParams();
    const { getUserById, isLoading, error, user } = useUsers();

    useEffect(() => {
        getUserById(id);
    }, [id, getUserById]);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!user) {
        return <Typography>No user data available.</Typography>;
    }

    return (
        <Container>
            <PageHeader
                title="User Profile"
                subtitle="View and manage your profile details"
            />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box display="flex" justifyContent="center">
                            <Avatar
                                alt={user.image.alt}
                                src={user.image.url}
                                sx={{ width: 150, height: 150 }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {`${user.name.first} ${user.name.middle ? `${user.name.middle} ` : ''}${user.name.last}`}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Email: {user.email}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Phone: {user.phone}
                                </Typography>


                                <Box mt={2} p={2} border={1} borderRadius={1} borderColor="grey.300">
                                    <Typography variant="h6" gutterBottom>
                                        Address
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Street:</strong> {user.address.street}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>House Number:</strong> {user.address.houseNumber}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>City:</strong> {user.address.city}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>State:</strong> {user.address.state}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Country:</strong> {user.address.country}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>ZIP Code:</strong> {user.address.zip}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" color="textSecondary" mt={2}>
                                    Business User: {user.isBusiness ? 'Yes' : 'No'}
                                </Typography>
                                <Box mt={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={`${ROUTES.EDIT_USER}/${id}`}
                                    >
                                        Edit Profile
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}
