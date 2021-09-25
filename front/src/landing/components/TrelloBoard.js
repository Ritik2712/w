import React, { useEffect,useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import _ from "lodash"
import axios from "axios"

import midString  from "../helpers/order";
import TrelloList from "./TrelloList";
import TrelloCreate from "./TrelloCreate";

import { sort, setActiveBoard, initList, initCard, updateListById, updateCardById, deleteList } from "../../store/actions/actionConstants";
import Invite from "../../components/Invite";



const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 90px;
  padding-bottom: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color:black;
  &:hover {
    color: white;
  }
`;

// TODO: Fix performance issue

const TrelloBoard = ({login, board,lists, cards, dispatch}) => {
  
  const {boardId} = useParams()
  let currBoard = _.filter(board, ['boardId',boardId])[0]
  const [loading, setLoading] = useState(true)
  const [orderList, setOrderList] = useState([])
  const [orderCard, setOrderCard] = useState({})


  useEffect(()=>{
    if (!_.isEmpty(lists)){
      console.log(lists[0].boardId === boardId)
      if(lists[0].boardId === boardId){
        setOrderCard(cards)
        setOrderList(lists)
      }
    }
  },[cards, lists])

  useEffect(()=>{
    const getAllList = ()=>{
      //get all list from boardId
      // console.log(currBoard.boardId)
      console.log("Getting all list")
      setLoading(true)
      axios.get(`/api/getList/${currBoard.boardId}`)
      .then((res)=>{
        // console.log(res.data)
        //TODO: Order the list found hear
        dispatch(initList(res.data))
        const orderedList = _.orderBy(res.data, ['order'], ['asc']) 
        dispatch(initList(orderedList))
        getAllCards(res.data)
      })
      .catch((err)=>{
        console.log(err)
        //TODO: What happen if error occure how user knows
        setLoading(false)
      })
    }

    const getAllCards = (lists)=>{
      //get all cards from boardId
      console.log("Getting all Cards")
      axios.get(`/api/getCard/${currBoard.boardId}`)
      .then((res)=>{
        // console.log(res.data)
        const cardList = {}
        lists.forEach(list => {
          cardList[list._id] = _.filter(res.data, ["listId", list._id])
          const distinctCards = _.filter(res.data, ["listId", list._id])
          cardList[list._id] = _.orderBy(distinctCards, ['order'], ['asc'])
        });
        //dispatch should run after forEach
        // console.log(cardList)
        dispatch(initCard(cardList))
        setLoading(false)
      })
    }
    //ALSO while returning remove all list and cards from state
  getAllList()

  },[])

  
  const handleDeleteList = (listId, index) => {
    console.log("Deleting")
    const cpyList = [...orderList]
    cpyList.splice(index, 1)
    setOrderList(cpyList)
    dispatch(deleteList(listId, index));
  };

  const onDragEnd = result => {
    setLoading(true)
    var newOrder
    const { destination, source, draggableId, type } = result;
    // console.log(result)
  

    if (!destination) {
      setLoading(false)
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      setLoading(false)
      return
    }

    if (type === "list"){
      const listOrder = orderList
      if(destination.index === 0){
        newOrder = midString('', listOrder[0].order)
      }else if (destination.index === listOrder.length -1){
        newOrder = midString(listOrder[listOrder.length - 1].order, '')
      }else if (destination.index < source.index){

        newOrder = midString(listOrder[destination.index - 1].order, listOrder[destination.index].order)
      }else{

        newOrder = midString(listOrder[destination.index].order, listOrder[destination.index + 1].order)
      }
      //update things in database and state
      const chg = {"id": draggableId, "soIndex": source.index}
      dispatch(updateListById(chg, {order:newOrder}))
      //Updating state of component so user won't experience lag
      const copyOrder = [...orderList]
      const sourceList = copyOrder[source.index]
      sourceList.order = newOrder
      const finalOrder = _.orderBy(copyOrder, ['order'], ['asc']) 
      setOrderList(finalOrder)

      setLoading(false)
      return
    }
  
    if(source.droppableId === destination.droppableId){
      
      const cardList = cards[source.droppableId]
      if (destination.index === 0){
        newOrder = midString('', cardList[0].order)
      }else if(destination.index === cardList.length-1){
        newOrder = midString(cardList[destination.index].order, '')
      }else if(destination.index < source.index){
        newOrder =midString(cardList[destination.index -1].order, cardList[destination.index].order)
      }else{
        newOrder = midString(cardList[destination.index].order, cardList[destination.index + 1].order)
      }
      //update the state of card order
      var copyCard = {...orderCard}
      const sourceList = copyCard[destination.droppableId][source.index]
      sourceList.order = newOrder
      const finalOrder = _.orderBy(copyCard, ['order'], ['asc']) 
      setOrderCard(finalOrder)
      dispatch(updateCardById(destination, finalOrder, draggableId, {order:newOrder}))
       
      setLoading(false)
      return 
    }

    const cardList = cards[destination.droppableId]
    
    if (destination.index === 0){
      if(_.isEmpty(cardList)){
        newOrder = 'n'
      }else{
        newOrder = midString('', cardList[0].order)
      }
    }else if(destination.index === cardList.length){
      newOrder = midString(cardList[destination.index-1].order, '')
    }else{
      newOrder = midString(cardList[destination.index-1].order, cardList[destination.index].order)
    }
    const currCard = {...orderCard}
    const [chgCard] = currCard[source.droppableId].splice(source.index, 1)
    chgCard.order = newOrder
    if(currCard[destination.droppableId]){
      currCard[destination.droppableId].splice(destination.index, 0, chgCard)
    }else{
      currCard[destination.droppableId] = [chgCard]
    }
    setOrderCard(currCard)
    dispatch(updateCardById(destination, currCard, draggableId, {order: newOrder}))

    setLoading(false)
  };

    if(!login){
      return(
      <Redirect to="/" />)
    }

    if (!currBoard) {
      return <p>Board not found</p>;
    }
    // const listOrder = board.lists;

  return (
    <>
    <TopContainer>
      {console.log(login)}
    <StyledLink to="/">Go Back</StyledLink>
    <Invite boardId={boardId}/>
    </TopContainer>
    <DragDropContext onDragEnd={onDragEnd}>
      <h2>{currBoard.title}</h2>
      {loading? <h1>Loading..</h1>:
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {provided => (
          <ListsContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {orderList.length !== 0 ? orderList.map((list, index) => {
              if (list) {
                // const listCards = list.cards.map(cardID => cards[cardID]);
                const cardList = list._id in orderCard ? orderCard[list._id] : []
                // console.log(cardList)
                return (
                  <TrelloList
                    listID={list._id}
                    boardId={currBoard.boardId}
                    owener={currBoard.isOwener}
                    delList={handleDeleteList}
                    key={list._id}
                    title={list.title}
                    cards={cardList}
                    index={index}
                  />
                );
              }
            }): <h3></h3>}
            {provided.placeholder}
            {currBoard['isOwener']?<TrelloCreate list="list" boardId={currBoard.boardId} prevOrder={lists.length? lists[lists.length-1].order : "n"}/>: <p></p>}
          </ListsContainer>
        )}
      </Droppable>}
    </DragDropContext>
    </>
  );
}

const mapStateToProps = state => ({
  login: state.user.login,
  board: state.boards,
  lists: state.lists,
  cards: state.cards,
});

export default connect(mapStateToProps)(TrelloBoard);
