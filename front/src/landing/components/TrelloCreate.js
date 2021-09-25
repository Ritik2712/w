import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import axios from "axios"
import TrelloButton from "./TrelloButton";
import { addList, addCard } from "../../store/actions/actionConstants";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import midString from "../helpers/order";

class TrelloCreate extends React.PureComponent {
  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = () => {
    const { boardId, prevOrder, dispatch } = this.props;
    const { text } = this.state;
    const order = midString(prevOrder, '')

    if (text) {
      this.setState({
        text: ""
      });
      axios.post(`/api/newList`, {
        boardId:boardId,
        title:text,
        order:order
      })
      .then((res)=>{
        console.log(res.data)
        dispatch(addList(res.data));
      })
    }

    return;
  };

  handleAddCard = () => {
    const { dispatch, listId, boardId, prevOrder} = this.props;
    const { text } = this.state;
    const order = midString(prevOrder, '')

    if (text) {
      this.setState({
        text: ""
      });
      axios.post(`/api/newCard`, {
        boardId: boardId,
        listId: listId,
        title: text,
        order: order
      })
      .then((res)=>{
        console.log(res.data)
        dispatch(addCard(listId, res.data));
      })
    }
  };

  renderOpenForm = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      margin-right: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonTextOpacity};
      color: ${buttonTextColor};
      background-color: ${buttonTextBackground};
    `;


    return (
      <OpenFormButton onClick={this.openForm}>
        <AddOutlinedIcon />
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  };

  render() {
    const { text } = this.state;
    const { list } = this.props;
    return this.state.formOpen ? (
      <TrelloForm
        text={text}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <TrelloButton onClick={list ? this.handleAddList : this.handleAddCard}>
          {list ? "Add List" : "Add Card"}
          <AddOutlinedIcon />
        </TrelloButton>
      </TrelloForm>
    ) : (
      <TrelloOpenForm list={list} onClick={this.openForm}>
        {list ? "Add another list" : "Add another card"}
      </TrelloOpenForm>
    );
  }
}

export default connect()(TrelloCreate);
