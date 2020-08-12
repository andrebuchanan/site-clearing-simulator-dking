import React, {useState} from "react";
import { IUserCommand, EUserCommand } from "../interfaces";

interface IUserControlsProps {
  HandleUserCommand(cmd: IUserCommand): void
}


const UserControls = ({ HandleUserCommand }: IUserControlsProps) => {

  const [advanceValue, setAdvanceValue] = useState("");
  let userCommand: IUserCommand;

  const handleSubmit = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    
    userCommand = {
      command: EUserCommand.advance,
      value: parseInt(advanceValue)
    }
    
    HandleUserCommand(userCommand);

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
    //Update the parent state with the user command
    HandleUserCommand(userCommand);
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

export default UserControls;