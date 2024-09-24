import { Container, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";

export default function AboutPage() {
    return (
        <Container>
            <PageHeader
                title="About Us"
                subtitle="Learn more about BusinessCardsHub"
            />
            <Container sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Container sx={{ maxWidth: 800, mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Welcome to BusinessCardsHub!
                    </Typography>
                    <Typography variant="body1" paragraph>
                        At BusinessCardsHub, we're transforming the way professionals connect and network. Our platform allows you to publish and discover business cards easily. As an entrepreneur, you can showcase your business and connect with potential clients or partners. As a user, you can explore various business cards, find new connections, and engage with profiles that interest you.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        With BusinessCardsHub, you can:
                    </Typography>
                    <Typography variant="body1" paragraph>
                        - <strong>Publish Your Business Card:</strong> Share your company details and contact information with a broad audience.
                        <br />
                        - <strong>Explore Cards:</strong> Browse through business cards from different industries and professionals to find what suits your needs.
                        <br />
                        - <strong>Like and Engage:</strong> Interact with cards and show appreciation for businesses that stand out to you.
                        <br />
                        - <strong>Create and Manage Cards:</strong> Business users can create and update their business cards to keep their information current and engaging.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Join our community and enhance your networking experience today!
                    </Typography>
                </Container>
                <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <img
                        src="/images/card.png"
                        alt="Business Card Example"
                        style={{ width: '50%', maxWidth: 400 }}
                    />
                </Container>
            </Container>
        </Container>
    );
}
