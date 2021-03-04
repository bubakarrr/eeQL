/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */ // ! Be careful

import React, { useContext } from 'react';
import { InputState } from '../../provider/CodeProvider';
const fs = require ('fs');

const path = require('path');
const { remote } = window.require('electron');
const { fileSystem } = remote.require('fs')
let current: string = '';
let readDir;
let filterArray: Array<string> = [];


const Home = () => {
    // destructuring state/useState methods from Context
    const { fileTreeHandler, pathHandler }: any = useContext(InputState);

    const readDirectory = async () => {
       readDir = await fs.readdirSync(current)
    }
    const getFilePath = () => {
        remote.dialog
        .showOpenDialog({properties: ['openDirectory'],
        message: 'Please choose your project folder'})
        .then((files: any) => {
            if (!files.cancelled) {
            current = files.filePaths[0];
            }
        })
    }
    async function test() {


        console.log('hello')
       

        const getFilePath = () => {


        console.log('hello 2')



            remote.dialog
            .showOpenDialog({properties: ['openDirectory'],
            message: 'Please choose your project folder'})
            .then((files: any) => {

                console.log('hello 3')



                if (files.cancelled == 'false') {
                current = files.filePaths[0];
                readDirectory(current);
                console.log('current get file path', current)
                }
            })
        }
        getFilePath();
        const readDirectory = (path) => {
            new Promise((resolve, reject) => {
                readDir = fs.readdir(path, (err, filenames) => err !== null ? reject(err) : resolve(filenames))
            })
            console.log(readDir)
         }

        return
    }

    return (
        <div>
            {/* <button onClick={getFilePath}>file</button>
            <button onClick={readDirectory}>read</button> */}
            <input type="text" placeholder = "howdy" />
            <button onClick={test}>test</button>
            <h1>rijjdfijwiejij</h1> 
        </div>
    )

}

export default Home;