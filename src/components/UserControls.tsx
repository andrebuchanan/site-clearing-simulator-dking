import React, {useState} from "react";

interface IUserControlsProps {
  UpdateCommandsUsedCallback(cmd: string): void
}


const UserControls = ({ UpdateCommandsUsedCallback }: IUserControlsProps) => {

  const [advanceValue, setAdvanceValue] = useState("");

  const handleSubmit = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    //TODO need to push {cmd: "a", value: value} object instead
    UpdateCommandsUsedCallback(advanceValue);
    //Reset the input box
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    switch(e.currentTarget.id){
      case "left":
        //update parent state
        UpdateCommandsUsedCallback("l");
        break;
      case "right":
        UpdateCommandsUsedCallback("r");
        break;
      case "quit":
        UpdateCommandsUsedCallback("q");
        break;
      default:
        throw console.error(`Invalid click command ${e.currentTarget.id}`);
    }
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