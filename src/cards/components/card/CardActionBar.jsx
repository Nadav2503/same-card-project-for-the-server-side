import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, CardActions } from "@mui/material";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import ConfirmDialog from "../../../components/ConfirmDialog";

export default function CardActionBar({
    cardId,
    handleDelete,
    handleLike,
    isLiked,
    cardOwnerId,
    phone
}) {
    const { user } = useCurrentUser();
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);

    const isLoggedIn = !!user;
    const canEdit = user && (user.isAdmin || user._id === cardOwnerId);
    const canDelete = user && (user.isAdmin || user._id === cardOwnerId);

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(cardId);
    };

    const handleCallClick = () => {
        if (phone) {
            window.location.href = `tel:${phone}`;
        }
    };

    return (
        <>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Box>
                    {canDelete && (
                        <IconButton onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    )}

                    {canEdit && (
                        <IconButton onClick={() => navigate(ROUTES.EDIT_CARD + "/" + cardId)}>
                            <ModeEditIcon />
                        </IconButton>
                    )}
                </Box>
                <Box>
                    <IconButton onClick={handleCallClick}>
                        <CallIcon />
                    </IconButton>

                    {isLoggedIn && (
                        <IconButton onClick={() => handleLike(cardId)}>
                            <FavoriteIcon color={isLiked ? "error" : "action"} />
                        </IconButton>
                    )}
                </Box>
            </CardActions>

            <ConfirmDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this card?"
            />
        </>
    );
}
