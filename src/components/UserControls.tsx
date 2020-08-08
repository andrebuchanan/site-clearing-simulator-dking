import React from "react";

interface IUserControlsProps {
  parentCallback(cmd: string): void
}


const UserControls = ({ parentCallback }: IUserControlsProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    //TODO Cannot get value of form entry
    console.log(e.currentTarget.value);
     //TODO a + number advanced
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    switch(e.currentTarget.id){
      case "left":
        //update parent state
        parentCallback("l");
        break;
      case "right":
        parentCallback("l");
        break;
      case "quit":
        parentCallback("l");
        break;
    }
  }

  return(
    <div>
      <form>
        <label>Advance</label>
        <input
          type='number'
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