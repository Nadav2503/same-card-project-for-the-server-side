import * as React from "react";
import Card from "@mui/material/Card";
import { useNavigate } from 'react-router-dom';
import { CardActionArea } from "@mui/material";
import CardHeaderComponent from "./CardHeaderComponent";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import ROUTES from "../../../routes/routesModel";

export default function CardComponent({
  card,
  handleDelete,
  handleEditCard,
  handleLike,
  isLiked
}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 250, m: 2 }}>
      <CardActionArea onClick={() => navigate(ROUTES.CARD_INFO + '/' + card._id)}>
        <CardHeaderComponent
          image={card.image.url}
          alt={card.image.alt}
          title={card.title}
          subtitle={card.subtitle}
        />
        <CardBody
          phone={card.phone}
          address={card.address}
          bizNumber={card.bizNumber}
          email={card.email}
        />
      </CardActionArea>
      <CardActionBar
        cardId={card._id}
        handleDelete={handleDelete}
        handleEditCard={handleEditCard}
        handleLike={handleLike}
        isLiked={isLiked}
        cardOwnerId={card.user_id}
        phone={card.phone}
      />
    </Card>
  );
}
