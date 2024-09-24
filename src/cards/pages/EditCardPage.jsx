import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import useCards from "../hooks/useCards";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import cardSchema from "../models/cardSchema";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import PageHeader from "../../components/PageHeader";

export default function EditCardPage() {
    const { id } = useParams();
    const { handleEditCard, getCardById, card } = useCards();
    const {
        data,
        errors,
        setData,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(initialCardForm, cardSchema, (data) =>
        handleEditCard(id, data)
    );

    useEffect(() => {
        if (card) {
            setData(mapCardToModel(card));
        } else {
            getCardById(id);
        }
    }, [card]);

    return (
        <Container>
            <PageHeader
                title="Edit Your Card"
                subtitle="Modify the details of your business card here"
            />
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <CardForm
                    title="Edit Card"
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    errors={errors}
                    validateForm={validateForm}
                    onInputChange={handleChange}
                    data={data}
                    sx={{ width: '100%', maxWidth: 600 }}
                />
            </Container>
        </Container>
    );
}
