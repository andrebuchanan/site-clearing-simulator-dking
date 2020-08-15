import React, {useState} from "react";
import { IUserCommand, EUserCommand } from "../interfaces";
import { connect } from "react-redux";
import AddUserCommand from "../actions/index";
import store from "../store/index";

const mapDispatchToProps = (dispatch: any) => {
  return {
    AddUserCommand: (userCommand: IUserCommand)=> dispatch(AddUserCommand(userCommand))
  };
}


const ConnectedUserControls = () => {

  const [advanceValue, setAdvanceValue] = useState("");
  let userCommand: IUserCommand;

  const handleSubmit = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    
    userCommand = {
      command: EUserCommand.advance,
      value: parseInt(advanceValue)
    }
    
    //dispatch Action to add userCommand to Redux store
    store.dispatch(AddUserCommand(userCommand));

    //Reset the input box
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    switch(e.currentTarget.id){
      case "left":
        userCommand = {
          command: EUserCommand.left,
          value: 0
        }
        break;
      case "right":
        userCommand = {
          command: EUserCommand.right,
          value: 0
        }
        break;
      case "quit":
        userCommand = {
          command: EUserCommand.quit,
          value: 0
        }
        break;
      default:
        throw console.error(`Invalid click command ${e.currentTarget.id}`);
    }
    //dispatch Action to add userCommand to Redux store
    store.dispatch(AddUserCommand(userCommand));
  }

  return(
    <div>
      <form>
        <label>Advance</label>
        <input
          type='number'
          onChange={(val) => setAdvanceValue(val.currentTarget.value)}
        />
        <input type='submit' onClick={(e) => handleSubmit(e)}/>
      </form>
      <button id="left" onClick={(e) => handleClick(e)}>Left</button>
      <button id="right" onClick={(e) => handleClick(e)}>Right</button>
      <button id="quit" onClick={(e) => handleClick(e)}>Quit</button>
    </div>
  )
}

const UserControls = connect(null/*mapStateToProps */, mapDispatchToProps)(ConnectedUserControls);

export default UserControls;