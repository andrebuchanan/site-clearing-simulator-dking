import React, { useEffect } from "react";
import { Dashboard } from "@uppy/react";
import { Uppy } from "@uppy/core";
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { connect } from "react-redux";
import { UpdateSiteMap, UpdateMapWidth, UpdateMapHeight, UpdateSimulationStatus } from "../redux/actions/actions";
import store from "../redux/store/store";
import { ESimulationStatus } from "../interfaces";

const mapDispatchToProps = (dispatch: any) => {
    return {
      UpdateSiteMap: (siteMap: string[][]) => dispatch(UpdateSiteMap(siteMap)),
      UpdateMapWidth: (width: number) => dispatch(UpdateMapWidth(width)),
      UpdateMapHeight: (height: number) => dispatch(UpdateMapWidth(height)),
      UpdateSimulationStatus: (status: ESimulationStatus) => dispatch(UpdateSimulationStatus(status))
    };
  }

const ConnectedFileUploader = () => {

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

    uppy.on('error', (error) => {
        console.error(error.stack);
    });

    /**
     * Build the map from the file and update the redux state with the new map
     * @param file the file in string array format. Each entry represents a row of the file.
     */
    const buildMapFromFile = (file: string[]): void => {
        const rows: number = file.length;
        const columns: number = file[0].length;

        // Create an empty 2D Array matching structure of uploaded file
        let uploadedMap: string[][] = Array.from(Array(rows), () => Array(columns).fill(""));
        for(let i = 0; i < uploadedMap.length; i++){
            let row: string[] = file[i].split(" ");
            uploadedMap[i] = row;
        }
        store.dispatch(UpdateSiteMap(uploadedMap));
        store.dispatch(UpdateMapWidth(uploadedMap[0].length));
        store.dispatch(UpdateMapHeight(uploadedMap.length));
        store.dispatch(UpdateSimulationStatus(ESimulationStatus.inProgress));
    }
  
    return (
        <Dashboard uppy={uppy}/>
    )
  }

const FileUploader = connect(null, mapDispatchToProps)(ConnectedFileUploader);

export default FileUploader;