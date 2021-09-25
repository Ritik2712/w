import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import styled from "styled-components";

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import TrelloCard from "./TrelloCard";
import TrelloCreate from "./TrelloCreate";
import { editTitle, deleteList, deleteCard } from "../../store/actions/actionConstants";
import axios from "axios";

const ListContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 3px;
  width: 300px;
  padding: 4px;
  height: 100%;
  margin: 0 8px 0 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin: 3px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled(DeleteOutlineOutlinedIcon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  margin-left: 10px;
  ${TitleContainer}:hover & {
    background: #f2f2f2;
  }
`;

const TrelloList = ({ listID, boardId,owener, delList, title, cards, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [cardList, updateCardList] = useState([])
  useEffect(() => {
    console.log("Running")
    updateCardList(cards)
  },[cards])

  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleFocus = e => {
    e.target.select();
  };

  const handleChange = e => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleDeleteCard = (id, listId, index) => {
    console.log(listID);
    //This is done to solve a bug
    console.log(cardList)
    const updateCard = [...cardList]
    updateCard.splice(index, 1)
    updateCardList(updateCard)
    dispatch(deleteCard(id, listId, index));
  };

  const handleFinishEditing = e => {
    setIsEditing(false);
    dispatch(editTitle(listID, listTitle, index));
  };


  return (
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <ListContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {provided => (
              <div>
                <div>
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                    <TitleContainer>
                      <ListTitle onClick={() => owener && setIsEditing(true)}>{listTitle}</ListTitle>
                      {owener ? <DeleteButton onClick={()=>delList(listID, index)}>
                        <DeleteOutlineOutlinedIcon />
                      </DeleteButton>:
                      <p></p>}
                    </TitleContainer>
                  )}
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cardList.length && cardList.map((card, index) => {
                    console.log(card)
                    return (<TrelloCard
                      key={card._id}
                      text={card.title}
                      owener={owener}
                      id={card._id}
                      index={index}
                      listID={listID}
                      delCard={handleDeleteCard}
                    />)
                  })}
                  {provided.placeholder}
                  {owener ? <TrelloCreate listId={listID} boardId={boardId} prevOrder={cards.length?cards[cards.length -1].order: "a"}/>: <p></p>}
                </div>
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};
const mapStateToProps = state => ({
  // cards: state.cards,
});
export default connect(mapStateToProps)(TrelloList);
