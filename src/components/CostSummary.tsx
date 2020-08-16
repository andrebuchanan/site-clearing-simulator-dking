import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { ELandType, ICostSummaryProps } from "../interfaces";

const mapStateToProps = (state:  any/*TODO */) => {
    return { 
      fuelUsed: state.fuelUsed,
      siteMap: state.siteMap,
      userCommands: state.userCommands,
      paintDamage: state.paintDamage
    };
  };

const ConnectedCostSummary = ({fuelUsed, siteMap, userCommands, paintDamage}: ICostSummaryProps) => {

    const [fuelCost, setFuelCost] = useState<number>(0);
    const [unclearedSquaresCost, setUnclearedSquaresCost] = useState<number>(0);
    const [communicationCost, setCommunicationCost] = useState<number>(0);
    const [paintDamageCost, setPaintDamageCost] = useState<number>(0);

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
        calculateFuelCost();
        calculateUnclearedSquaresCost();
        calculateCommunicationCost();
        calculatePaintDamageCost();
    }, [])

    return(
    <div>
        Fuel Cost: {fuelCost}
        <br/>
        Uncleared Squares Cost: {unclearedSquaresCost}
        <br/>
        Communication Overhead Cost: {communicationCost}
        <br/>
        Paint Damage Repair Cost: {paintDamageCost}
        <br/>
        Total Cost: {fuelCost + unclearedSquaresCost + communicationCost + paintDamageCost}
    </div>
    );
}

const CostSummary = connect(mapStateToProps)(ConnectedCostSummary);

export default CostSummary;