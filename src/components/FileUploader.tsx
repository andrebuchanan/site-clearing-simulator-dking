import React, { useEffect, useState } from "react";
import { DashboardModal } from "@uppy/react";
import { Uppy } from "@uppy/core";
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { connect } from "react-redux";
import { UpdateSiteMap, UpdateMapWidth, UpdateMapHeight, UpdateSimulationStatus } from "../redux/actions/actions";
import store from "../redux/store/store";
import { ESimulationStatus, ELandType } from "../interfaces";
import { MDBBtn } from "mdbreact";

const mapDispatchToProps = (dispatch: any) => {
    return {
      UpdateSiteMap: (siteMap: string[][]) => dispatch(UpdateSiteMap(siteMap)),
      UpdateMapWidth: (width: number) => dispatch(UpdateMapWidth(width)),
      UpdateMapHeight: (height: number) => dispatch(UpdateMapWidth(height)),
      UpdateSimulationStatus: (status: ESimulationStatus) => dispatch(UpdateSimulationStatus(status))
    };
  }

const ConnectedFileUploader = () => {

  const [ modalOpen, setModalOpen ] = useState(false);

    const uppy = React.useMemo(() => {
      return new Uppy({
          allowMultipleUploads: false,
          restrictions: {
            allowedFileTypes: ['.txt'],
            minNumberOfFiles: 1,
            maxNumberOfFiles: 1
          }
      });
    }, []);

    useEffect(() => {
      return () => uppy.close();
    }, []);

    /**
     * On sucessful file upload, read the file
     */
    uppy.on('complete', (result) => {
        const reader = new FileReader();
        const dataToRead = result.successful[0].data;
        reader.readAsText(dataToRead);
        reader.onload = () => {
            let data: string[] = (reader.result as string).split("\n");
            buildMapFromFile(data);
        };
    });

    /**
     * On file upload error, throw an error
     */
    uppy.on('error', (error) => {
        throw Error(`File Upload Error: ${error}`);
    });

    /**
     * Handle Button click
     * Opens the File Upload Modal
     */
    const handleButtonClick = () => {
      setModalOpen(true);
    }

    /**
     * Build the map from the file and update the redux state with the new map
     * @param file the file in string array format. Each entry represents a row of the file.
     */
    const buildMapFromFile = (file: string[]): void => {
      
      const rows: number = file.length;
      const columns: number = file[0].length - 1; //Unwanted whitespace

      // Create an empty 2D Array matching structure of uploaded file
      let uploadedMap: string[][] = Array.from(Array(rows), () => Array(columns).fill(""));

      for(let i = 0; i < uploadedMap.length; i++){
          let row: string[] = file[i].trim().split("");
          
          //Check the land types of the row are valid;
          if(!checkValidLandType(row)){
            throw Error("Invalid File Upload. Map letters must be one of {o, t, r, T}");
          }
          uploadedMap[i] = row;
      }
      
      if (checkFileUploadedIsValid(uploadedMap)){
        store.dispatch(UpdateSiteMap(uploadedMap));
        store.dispatch(UpdateMapWidth(uploadedMap[0].length));
        store.dispatch(UpdateMapHeight(uploadedMap.length));
        store.dispatch(UpdateSimulationStatus(ESimulationStatus.inProgress));
      } else {
        throw Error("Invlaid File Upload. Uploaded files must have the same number of entries per row");
      }

        
    }

    /**
     * Checks that the land type strings in the uploaded maps are valid
     * @param arr The array of strings representing a row in the map
     * @returns boolean - true of the land types are valid
     */
    const checkValidLandType = (arr: string[]): boolean => {
      for(let letter of arr){

        if(letter !== ELandType.o
          && letter !== ELandType.r
          && letter !== ELandType.t
          && letter !== ELandType.T){
          return false;
        }
      }
      return true;
    }

    /**
     * 
     * @param file the uploaded file
     */
    const checkFileUploadedIsValid = (file: string[][]): boolean => {

      let valid: boolean;
      const columns: number = file[0].length;
      //Check that each row has same number of entries
      valid = file.every((row) => {
        return row.length === columns;
      });
      if(!valid) {
        return false
      }
      return true;
    }
  
    return (
        <div className="fileUploadWelcomeScreen">
          <h2>Welcome to the Aconex Site Clearing Simulator</h2>
          <MDBBtn color="primary" onClick={handleButtonClick}>Upload a Site Map</MDBBtn>
          <DashboardModal
           uppy={uppy}
           open={modalOpen}/>
        </div>
    )
  }

const FileUploader = connect(null, mapDispatchToProps)(ConnectedFileUploader);

export default FileUploader;