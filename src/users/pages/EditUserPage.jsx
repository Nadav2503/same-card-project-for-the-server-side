import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import useUsers from '../hooks/useUsers';
import useForm from '../../forms/hooks/useForm';
import mapUserToModelForUpdate from '../helpers/normalization/mapUserToModelForUpdate';
import userSchema from '../models/userSchema';
import initialUserForm from '../helpers/initialForms/initialUserForm';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import PageHeader from '../../components/PageHeader';

export default function EditUserPage() {
    const { id } = useParams();
    const { handleUpdateUser, getUserById, isLoading, user } = useUsers();
    const {
        data,
        errors,
        setData,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
        handleChangeCheckBox,
    } = useForm(initialUserForm, userSchema, (data) => handleUpdateUser(id, data));

    useEffect(() => {
        if (user) {
            setData(mapUserToModelForUpdate(user));
        } else {
            getUserById(id);
        }
    }, [user, id, getUserById, setData]);

    if (isLoading) return <Spinner />;
    if (!user) return <Error errorMessage="No user data available" />;

    return (
        <Container>
            <PageHeader title="Edit User Details" subtitle="Update your personal information here" />
            <Container sx={{ paddingTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <UserForm
                    title="Edit User"
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    validateForm={validateForm}
                    onInputChange={handleChange}
                    handleChangeCheckBox={handleChangeCheckBox}
                    errors={errors}
                    data={data}
                />
            </Container>
        </Container>
    );
}
