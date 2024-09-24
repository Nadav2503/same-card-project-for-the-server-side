import React from 'react';
import Form from '../../forms/components/Form';
import Input from '../../forms/components/Input';

export default function UserForm({
    onSubmit,
    onReset,
    validateForm,
    title,
    errors,
    data,
    onInputChange,
}) {
    return (
        <Form
            onSubmit={onSubmit}
            onReset={onReset}
            validateForm={validateForm}
            title={title}
            styles={{ maxWidth: '800px' }}
        >
            <Input
                name="first"
                label="First Name"
                error={errors.first}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="middle"
                label="Middle Name"
                error={errors.middle}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                name="last"
                label="Last Name"
                error={errors.last}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="phone"
                label="Phone"
                type="tel"
                error={errors.phone}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="url"
                label="Image URL"
                error={errors.url}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                name="alt"
                label="Image Alt"
                error={errors.alt}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                name="state"
                label="State"
                error={errors.state}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
            <Input
                name="country"
                label="Country"
                error={errors.country}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="city"
                label="City"
                error={errors.city}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="street"
                label="Street"
                error={errors.street}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="houseNumber"
                label="House Number"
                type="number"
                error={errors.houseNumber}
                onChange={onInputChange}
                data={data}
                sm={6}

            />
            <Input
                name="zip"
                label="ZIP"
                error={errors.zip}
                onChange={onInputChange}
                data={data}
                sm={6}

            />
        </Form>
    );
}
