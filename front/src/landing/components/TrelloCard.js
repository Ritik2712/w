import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TrelloForm from "./TrelloForm";
import { editCard, deleteCard } from "../../store/actions/actionConstants";
import { connect } from "react-redux";
import TrelloButton from "./TrelloButton";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const CardContainer = styled.div`
  margin: 0 10px 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
  margin-left: 10px;
  padding: 4px;
  font-size: 8px;
`;

const EditButton = styled(EditOutlinedIcon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(DeleteOutlineOutlinedIcon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const TrelloCard = React.memo(({ text, id, owener,  listID, index, delCard, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);
  console.log("I two running")
  const closeForm = e => {
    setIsEditing(false);
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  

  const saveCard = e => {
    e.preventDefault();
    console.log(cardText)
    dispatch(editCard( id,listID, index, cardText));
    setIsEditing(false);
  };

  

  const renderEditForm = () => {
    return (
      <TrelloForm text={cardText} onChange={handleChange} closeForm={closeForm}>
        <TrelloButton onClick={saveCard}>Save</TrelloButton>
      </TrelloForm>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <CardContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card>
              {owener ? <EditButton
                onMouseDown={() => setIsEditing(true)}
                fontSize="small"
              >
                <EditOutlinedIcon />
              </EditButton> : <p></p>}
              {owener ? <DeleteButton fontSize="small" onMouseDown={(e)=>delCard(id, listID, index)}>
                <DeleteOutlineOutlinedIcon />
              </DeleteButton> : 
              <p></p>}

              <CardContent>
                <Typography>{cardText}</Typography>
              </CardContent>
            </Card>
          </CardContainer>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});



export default connect()(TrelloCard);
