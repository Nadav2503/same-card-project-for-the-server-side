import React from "react";
import { CardHeader, CardMedia, Divider } from "@mui/material";

export default function CardHeaderComponent({ image, alt, title, subtitle }) {
    return (
        <>
            <CardMedia sx={{ height: 140 }} image={image} alt={alt} />
            <CardHeader title={title} subheader={subtitle} />
            <Divider variant="middle" />
        </>
    );
}
