import React, { useEffect } from 'react';
import useCards from '../hooks/useCards';
import CardComponent from '../components/card/CardComponent';
import { Container } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import { useCurrentUser } from '../../users/providers/UserProvider';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import { Navigate } from 'react-router-dom';

export default function FavoritesPage() {
    const { cards, isLoading, error, getFavoriteCards, handleLike, handleDelete, handleEditCard } = useCards();
    const { user } = useCurrentUser();

    useEffect(() => {
        getFavoriteCards();
    }, [getFavoriteCards]);

    if (!user) return <Navigate to="/" replace />;
    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;
    if (!cards || cards.length === 0) return <Error errorMessage="No cards found" />;

    return (
        <Container>
            <PageHeader
                title="Favorite Cards"
                subtitle="Here are all the business cards you've marked as favorites"
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
