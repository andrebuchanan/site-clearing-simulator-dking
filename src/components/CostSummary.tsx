import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { ELandType, ICostSummaryProps, EUserCommand } from "../interfaces";

const mapStateToProps = (state: ICostSummaryProps) => {
    return { 
      fuelUsed: state.fuelUsed,
      siteMap: state.siteMap,
      userCommands: state.userCommands,
      paintDamage: state.paintDamage
    };
  };

const ConnectedCostSummary = ({fuelUsed, siteMap, userCommands, paintDamage}: ICostSummaryProps) => {

    const [ userCommandsList, setUserCommandsList ] = useState<string[]>([])
    const [fuelCost, setFuelCost] = useState<number>(0);
    const [unclearedSquaresCost, setUnclearedSquaresCost] = useState<number>(0);
    const [communicationCost, setCommunicationCost] = useState<number>(0);
    const [paintDamageCost, setPaintDamageCost] = useState<number>(0);

    const buildUserCommandList = (): void => {
        const cmds: string[] = []
        for(let cmd of userCommands){
            if (cmd.command === EUserCommand.advance){
                cmds.push(`Advance ${cmd.value}, `);
            } else if (cmd.command === EUserCommand.quit) {
                cmds.push("quit");
            } else {
                cmds.push(`${cmd.command} turn, `);
            }
        }
        setUserCommandsList(cmds);
    }

    const calculateFuelCost = (): void => {
        setFuelCost(fuelUsed);
    }

    /**
     * Calculates the cost based on the number of uncleared squares at
     * the end of the simulation
     */
    const calculateUnclearedSquaresCost = (): void => {
        let cost: number = 0;
        for(let i = 0; i < siteMap.length; i++){
            for(let j=0;j<siteMap[i].length; j++){
              if (siteMap[i][j] === ELandType.t || siteMap[i][j] === ELandType.r){
                  //3 credits per uncleared square
                  cost+=3;
              }
            }
        }
        setUnclearedSquaresCost(cost);
    }

    /**
     * Calculates the total cost of the communication per user command
     */
    const calculateCommunicationCost = (): void => {
        //1 credit per communication so just take length of usercommands array
        setCommunicationCost(userCommands.length);
    }

    const calculatePaintDamageCost = (): void => {
        //2 credits per paint damage so multiply paint damage by 2
        setPaintDamageCost(paintDamage*2);
    }

    useEffect(() => {
        buildUserCommandList();
        calculateFuelCost();
        calculateUnclearedSquaresCost();
        calculateCommunicationCost();
        calculatePaintDamageCost();
    }, [])

    return(
    <div className="costSummary">
        <h1>Simulation Ended</h1>
        <br/>
        <h3>Fuel Cost: {fuelCost}</h3>
        <br/>
        <h3>Uncleared Squares Cost: {unclearedSquaresCost}</h3>
        <br/>
        <h3>Communication Overhead Cost: {communicationCost}</h3>
        <br/>
        <h3>Paint Damage Repair Cost: {paintDamageCost}</h3>
        <br/>
        <h3>Total Cost: {fuelCost + unclearedSquaresCost + communicationCost + paintDamageCost}</h3>
        <br/>
        <h5>Commands Entered: {userCommandsList}</h5>
    </div>
    );
}

const CostSummary = connect(mapStateToProps)(ConnectedCostSummary);

export default CostSummary;