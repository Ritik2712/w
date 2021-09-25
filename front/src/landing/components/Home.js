import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash"
import { bindActionCreators } from "redux";
import styled from "styled-components";
import axios from "axios";


import { addBoard, initBoard, pushBoardId } from "../../store/actions/actionConstants";
import { deleteBoard, addUpdatedBoard } from "../../store/actions/actionConstants";

import BoardThumbnail from "./BoardThumbnail";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-top:100px;
`;

const CreateTitle = styled.h3`
  font-size: 48px;
  color: white;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: blue;
  box-shadow: 0 2px 4px grey;
  align-self: center;
`;

const Home = ({ user,boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.

  const [newBoardTitle, setNewBoardTitle] = useState("");

  useEffect(()=>{
    
    let boardList = []
    const getBoards = async()=>{
        axios.get(`/api/getBoardList/${user.userId}`)
        .then(async(res)=>{
          const updatedBoards = res.data.boards
          if(updatedBoards){
            dispatch(addUpdatedBoard(updatedBoards))
          //update the current userboard
          if(!_.isEmpty(updatedBoards)){
            console.log("Gettng of data")
            await Promise.all(
              //Get board by Id
              updatedBoards.map(async(id)=>{
                const boardInfo = await axios.get(`/api/getBoard/${id}`)
                if(boardInfo.data){
                  const {boardId, title, owenerId, createdAt, msg} = boardInfo.data
                  // console.log(boardInfo.data)
                  if(!msg){
                    const isOwener = (user['userId'] === owenerId)
                    boardList.push({
                      boardId,
                      title,
                      isOwener,
                      createdAt
                    })
                  }
                }
                //show error in msg
              })
            )
            if(!_.isEmpty(boardList)){
              // console.log("dispatching")
              const orderBoard = _.orderBy(boardList, ['createdAt'], ['asc'])
              dispatch(initBoard(orderBoard))
            }
          }else{
            dispatch(initBoard([]))
          }
        }else{
          alert(res.data.msg)
        }
        
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  getBoards()
  }, [])

  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/newBoard', {
      title : newBoardTitle,
      userId: user['userId']
    })
    .then((res)=>{
      //storing that boardId  in user
      if (res.data.boardId){
        const {boardId, title, owenerId} = res.data
        dispatch(pushBoardId(boardId))
        const isOwener = user['userId'] === owenerId
        // console.log(isOwener)
        dispatch(addBoard({
          boardId : boardId,
          title: title,
          isOwener : isOwener
        }))
      }
      setNewBoardTitle("")
    })
  };

  if(!user.login){
    return(
    <Redirect to="/sign-in" />)
  }
  const renderBoards = () => {
    if(!_.isEmpty(boards)){
      return boards.map((singleboard, index) => {
        // console.log(singleboard)
        const board = singleboard
        const boardId = board['boardId']
        return (
          <div>
            <Link
              key={boardId}
              to={`/task/${boardId}`}
              style={{ textDecoration: "none" }}
            >
              <BoardThumbnail title={board['title']} />
            </Link>
            {
              board['isOwener'] ? 
              <button
                color="action"
                onClick={() => {
                  dispatch(deleteBoard(boardId, index));
                }}
              >
                <DeleteOutlinedIcon>
              </DeleteOutlinedIcon>
            </button> :
            <p></p>
            }
            
          </div>
        );
      });
    }
    
  };



  const renderCreateBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <CreateTitle>Create a new Board</CreateTitle>
        <CreateInput
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Your boards title..."
          type="text"
        />
      </form>
    );
  };

  return (
    <HomeContainer>
      <Thumbnails>
        {renderBoards()}
      </Thumbnails>
      {renderCreateBoard()}
    </HomeContainer>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  boards: state.boards,
  boardOrder: state.boardOrder,
  deleteBoard: state.deleteBoard
});

export default connect(mapStateToProps)(Home);
