import React from "react";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Cards from "./Cards";
export default function CardsFeedback({
    isLoading,
    cards,
    error,
    handleDelete,
    handleLike,
    handleEdit
}) {
    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;
    if (!cards && cards.length === 0) return <Error errorMessage="Oops...it seems there are no business cards to display" />;
    if (cards)
        return (
            <Cards
                cards={cards}
                handleDelete={handleDelete}
                handleLike={handleLike}
                handleEdit={handleEdit}
            />

        );
    return null;
}