import React, { useCallback } from 'react';
import CardForm from '../components/CardForm';
import initialCardForm from '../helpers/initialForms/initialCardForm';
import cardSchema from '../models/cardSchema';
import useForm from '../../forms/hooks/useForm';
import useCards from '../hooks/useCards';
import ROUTES from '../../routes/routesModel';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import PageHeader from '../../components/PageHeader';

export default function AddCardPage() {
    const { handleCreateCard } = useCards();
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (formData) => {
        try {
            await handleCreateCard(formData);
            navigate(ROUTES.MY_CARDS);
        } catch (error) {
            throw new error('Failed to create card:', error);
        }
    }, [handleCreateCard]);

    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(initialCardForm, cardSchema, handleSubmit);

    return (
        <Container>
            <PageHeader
                title="Create Your Card"
                subtitle="Add a new business card to the platform"
            />
            <Container sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <CardForm
                    title="Add New Card"
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    validateForm={validateForm}
                    errors={errors}
                    data={data}
                    onInputChange={handleChange}
                />
            </Container>
        </Container>
    );
}
