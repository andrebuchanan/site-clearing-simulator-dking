import React, {useState, SyntheticEvent, FormEvent} from "react";
import { IUserCommand, EUserCommand, IUserCommandProps } from "../interfaces";
import { connect } from "react-redux";
import { AddUserCommand } from "../redux/actions/actions";
import store from "../redux/store/store";
import { MDBBtn, MDBInput, MDBContainer, MDBCol, MDBRow } from "mdbreact";

const mapDispatchToProps = (dispatch: any) => {
  return {
    AddUserCommand: (userCommand: IUserCommand)=> dispatch(AddUserCommand(userCommand))
  };
}

const UserControls = ({ HandleUserCommandCallback }: IUserCommandProps) => {

  const [advanceValue, setAdvanceValue] = useState("");
  let userCommand: IUserCommand;

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    userCommand = {
      command: EUserCommand.advance,
      value: parseInt(advanceValue)
    }
    
    //dispatch Action to add userCommand to Redux store
    store.dispatch(AddUserCommand(userCommand));
    //call the callback with the new command
    HandleUserCommandCallback(userCommand);

    //Reset the input box
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }

  const handleClick = (e: SyntheticEvent<HTMLButtonElement, Event>) => {
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
    //call the callback with the new command
    HandleUserCommandCallback(userCommand);
  }

  return(
    <div>
      <MDBContainer >
        <MDBRow className="rowStyling">
          <form
            className="rowItem"
            onSubmit={(e) => handleSubmit(e)}>
            <MDBInput
              label="Advance Value"
              type='number'
              onChange={(val) => setAdvanceValue(val.currentTarget.value)}
            />
          </form>
        </MDBRow>
        <MDBBtn color="primary" id="left" onClick={(e) => handleClick(e)}>Left</MDBBtn>
        <MDBBtn color="primary" id="right" onClick={(e) => handleClick(e)}>Right</MDBBtn>
        <MDBBtn color="red" id="quit" onClick={(e) => handleClick(e)}>Quit</MDBBtn>
      </MDBContainer>
    </div>
  )
}

const ConnectedUserControls = connect(null, mapDispatchToProps)(UserControls);

export default ConnectedUserControls;