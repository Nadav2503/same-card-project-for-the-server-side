import React from 'react';
import CardComponent from "./card/CardComponent";
import { Container } from "@mui/material";

export default function Cards({ cards, handleDelete, handleLike, handleEdit }) {

    return (
        <>
            <Container sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {cards.map((card) => (
                    <CardComponent
                        card={card}
                        key={card._id}
                        handleDelete={handleDelete}
                        handleLike={handleLike}
                        handleEditCard={handleEdit}

                    />
                ))}
            </Container>
        </>
    );
}
