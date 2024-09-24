import React from "react";
import { CardContent, Typography } from "@mui/material";

export default function CardBody({ phone, address, email, bizNumber }) {
    return (
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                <strong>Phone: </strong>
                {phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Address: </strong>
                {address.city} {address.street} {address.houseNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Biz Number: </strong>
                {bizNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Email: </strong>
                {email}
            </Typography>
        </CardContent>
    );
}
