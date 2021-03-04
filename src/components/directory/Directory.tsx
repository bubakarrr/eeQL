import React, { useContext, useEffect, useState } from 'react';
import {InputState} from '../../provider/CodeProvider';

const Directory = () => {
    //renders file tree of uploaded directory
    const { myPath, fileTree, chosenFileHandler }: any = useContext(InputState);
    //upades opened and closed folders
    const [openFolder, setOpenFolder] = useState({});
    //sees if folders are open
    const checkFolder: { [key: string]: boolean} = {};
    //function that changes wheather or not folders are open
    const toggleOpenFolder = (fileName: string): void => {
       openFolder[fileName]? setOpenFolder({ ...openFolder, [fileName]: false }) : setOpenFolder({ ...openFolder, [fileName]: true })
    }
    //set initial state upon rendering
		useEffect(() => {
			setOpenFolder(checkFolder)
		}, []);
    //goes to end of directory to get name of project
		let idx: number;
    myPath.lastIndexOf('/') === -1? idx = myPath.lastIndexOf('\\'): idx = myPath.lastIndexOf('/');
		const projectName: string = myPath.substring(idx + 1);

    const renderFiles = (tree) => tree.map((file) => {
      if (file.files.lenght) {
        checkFolder[file.fileName] = false;
        return(
          <ul key ={file.fileName}>
            <li>
              {/* folders function as buttons */}
              <button id = 'FileOrFolderButton' type = "button" onClick = {() => toggleOpenFolder(file.fileName)} > {file.fileName} </button>
            </li>
            <li>
              {openFolder[file.fileName] && renderFiles(file.files)}
            </li>
          </ul>
        )
      }
      return (
        <ul key = {file.filePath} >
          <li>
            <button
              id="FileOrFolderButton"
              type="button"
              onClick={() => {
                chosenFileHandler(file.filePath);
              }}
            >
              {file.fileName}
          </button>
          </li>
        </ul>
      )
    });

    return (
      <div id="fileTreeCont">
        {fileTree.length ? (
          <>
            <h1 id="fileName">{projectName}</h1>
            <section id="fileTreeCont">{renderFiles(fileTree)}</section>
          </>
        )
          : (
            <h1>Upload a file</h1>
          )}
      </div>
    );
  }

export default Directory;