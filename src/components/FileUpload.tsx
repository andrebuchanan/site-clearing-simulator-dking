import React, { useEffect } from "react";
import { Dashboard } from "@uppy/react";
import { Uppy } from "@uppy/core";
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { connect } from "react-redux";
import { UpdateSiteMap } from "../redux/actions/actions";
import store from "../redux/store/store";

const mapDispatchToProps = (dispatch: any) => {
    return {
      UpdateSiteMap: (siteMap: string[][]) => dispatch(UpdateSiteMap(siteMap)),
    };
  }

const ConnectedFileUpload = () => {

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
        console.error(error.stack)
    });

    const buildMapFromFile = (file: string[]) => {
        const rows: number = file.length;
        const columns: number = file[0].length;

        // Create an empty 2D Array matching structure of uploaded file
        let uploadedMap: string[][] = Array.from(Array(rows), () => Array(columns).fill(""));
        for(let i = 0; i < uploadedMap.length; i++){
            let row: string[] = file[i].split(" ");
            uploadedMap[i] = row;
        }

        store.dispatch(UpdateSiteMap(uploadedMap));
    }
  
    return (
        <div>
            <Dashboard uppy={uppy}/>
        </div>
    )
  }

const FileUpload = connect(null, mapDispatchToProps)(ConnectedFileUpload);

export default FileUpload;