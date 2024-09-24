import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import useCards from '../hooks/useCards';
import CardComponent from '../components/card/CardComponent';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { Navigate } from 'react-router-dom';

export default function MyCards() {
    const { cards, isLoading, error, getMyCards, handleDelete, handleEditCard, handleLike } = useCards();
    const { user } = useCurrentUser();

    useEffect(() => {
        if (user) {
            getMyCards();
        }
    }, [user, getMyCards]);

    if (!user) return <Navigate to="/" replace />;
    if (!user.isBusiness && !user.isAdmin) return <Navigate to="/" replace />;
    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;
    if (!cards || cards.length === 0) return <Error errorMessage="No cards found" />;

    return (
        <Container>
            <PageHeader
                title="My Cards"
                subtitle="Here are all the business cards you have created"
                sx={{ mb: 4 }}
            />
            <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {cards.map(card => (
                    <CardComponent
                        card={card}
                        key={card._id}
                        handleDelete={handleDelete}
                        handleEditCard={handleEditCard}
                        handleLike={handleLike}
                        isLiked={card.likes.includes(user._id)}
                    />
                ))}
            </Container>
        </Container>
    );
}
