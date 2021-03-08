import React, { useContext, useEffect, useState } from "react";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import './TestBuilder.scss'
// import {ReactDOM, render} from 'react-dom'

const TestBuilder = () => {
  const { test, testHandler, monaco, monacoPoster }: any = useContext(TestContext);
  const { activePort }: any = useContext(StateContext)

  const dataTypes = ["Array", "Integer", "String"];
  const dataTypeOptions = [];
  for (let a = 0; a < dataTypes.length; a++) {
    dataTypeOptions.push(
      <option key={`${a} + data`} value={dataTypes[a]}>
        {dataTypes[a]}
      </option>
    );
  }

  //Capitalized all methods
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const methodOptions = [];
  for (let a = 0; a < methods.length; a++) {
    methodOptions.push(
      <option key={`${a} + method`} value={methods[a]}>
        {methods[a]}
      </option>
    );
  }
  const [local, localhandler] = useState({});

  const clicker = () => {
    // gather current value from all fields.
    // choices1, choices2, serverApp, expectedRes, methodSelect, desiredEndpoint, inputData, outputData, headerInfo
    let selectFieldsArray = ["choices1", "choices2", "methodSelect"];

    let inputFieldsArray = [
      "serverApp",
      "expectedRes",
      "desiredEndpoint",
      "inputData",
      "outputData",
      "headerInfo",
    ];
    // iterate through all dropdowns (select is the formal name) to extract current selected value, and store that selection in our state
    for (let i = 0; i < selectFieldsArray.length; i++) {
      const dropDown = document.getElementById(
        selectFieldsArray[i]
      ) as HTMLSelectElement;
      const selection = dropDown.options[dropDown.selectedIndex].text;
      testHandler(selectFieldsArray[i], selection);
    }
    console.log("state after select fields loop", test);

    for (let j = 0; j < inputFieldsArray.length; j++) {
      const inputField = document.getElementById(inputFieldsArray[j]);
      const inputValue = inputField.innerText ? inputField.innerText : "qwerty";
      testHandler(inputFieldsArray[j], inputValue);
    }

    console.log(test);
    console.log('monaco', monaco)
    // localhandler(state);
    // console.log("local localHandler", localhandler(+1));
    // console.log("gloabl state", state);
    // console.log("gloabl testHandler", testHandler);
  };

  const gatherInputDropdown = () => {
    // updates state hook for inputType by querying the id for the input dropdown
    const inputDropdown = document.getElementById(
      "choices1"
    ) as HTMLSelectElement;
    console.log("changedInputType", inputDropdown);
    const inputSelection =
      inputDropdown.options[inputDropdown.selectedIndex].text;
    testHandler("inputType", inputSelection);
  };

  const gatherOutputDropdown = () => {
    // updates state hook for outputType by querying the id for the output dropdown
    const outputDropdown = document.getElementById(
      "choices2"
    ) as HTMLSelectElement;
    const outputSelection =
      outputDropdown.options[outputDropdown.selectedIndex].text;
    testHandler("outputType", outputSelection);
  };

  const gatherMethodDropdown = () => {
    // updates state hook for outputType by querying the id for the output dropdown
    const methodDropdown = document.getElementById(
      "methodSelect"
    ) as HTMLSelectElement;
    const methodSelection =
      methodDropdown.options[methodDropdown.selectedIndex].text;
    testHandler("methodSelect", methodSelection);
  };

  //created input handler that allows input tag to change as user types and registers results
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    testHandler(e.target.id, (e.target as HTMLInputElement).value);
  };
  
  let testVar = `describe( ${test}, ()=>{
    it (${test.expectedRes}, (done) => {
       //request
       request(${activePort})
        //post method
        .post(${test.serverApp})
        //send  method
        .send(value is equivalent to ${test})
        //expect method
        .expect(res.status).to.be.equal(200)
        //done method
        .done()
    })
  })`

  return (
    <div>
      <h3>Please enter your server/application file name:</h3>
      <input
        // type="text"
        id="serverApp"
        // value={state.serverApp}
        onChange={inputHandler}
      ></input>
      <h3>Please describe your expected result:</h3>
      <input
        // type="text"
        id="expectedRes"
        // value={state.expectedRes}
        onChange={inputHandler}
      ></input>
      <br></br>

      {/* method dropdown */}
      <h3>Please enter the desired HTTP method:</h3>
      <select
        // defaultValue={methodOptions}
        id="methodSelect"
        defaultValue={methods[0]}
        onInput={gatherMethodDropdown}
      >
        {methodOptions}
      </select>

      <br></br>

      {/* Endpoint input */}
      <h3>Please enter your desired endpoint</h3>
      <input
        // // type="text"
        id="desiredEndpoint"
        // value={state.desiredEndpoint}
        onChange={inputHandler}
      ></input>

      <br></br>
      <h3>Please enter your input data and expected output data: </h3>
      {/* select value for input  */}
      <label htmlFor="input"> Please select your input:</label>
      <select
        defaultValue={dataTypes[0]}
        id="choices1"
        className="choices"
        onInput={gatherInputDropdown}
      >
        {dataTypeOptions}
      </select>

      {/* input field for input data */}
      <label> Please enter your input data:</label>
      <input
        // type="text"
        id="inputData"
        // value={state.inputData}
        onChange={inputHandler}
      ></input>

      <br></br>

      {/* select value for output  */}
      <label htmlFor="input"> Please select your output:</label>
      <select
        defaultValue={dataTypes[0]}
        id="choices2"
        className="choices"
        onInput={gatherOutputDropdown}
      >
        {dataTypeOptions}
      </select>

      {/* input field for output data */}
      <label> Please enter your expected output data:</label>
      <input
        // type="text"
        id="outputData"
        // value={state.outputData}
        onChange={inputHandler}
      ></input>

      <br></br>

      {/* should be a dropdown since there are only a few standard headers
        maybe there can be an "other" selection which will trigger users to be able to write in their desired header type? */}
      <h3>Please enter header information: </h3>
      <input
        // type="text"
        id="headerInfo"
        // value={state.headerInfo}
        onChange={inputHandler}
      ></input>

      <br></br>
      <button
        type="button"
        className="choices"
        onClick={clicker}
        placeholder="Enter your expected result"
      >
        Wooosh
      </button>
      <button onClick = {() => monacoPoster(testVar)}>update</button>
      {/* delete button 
      <button className= "deleteTestButton" onClick = {this.handleClick} > Select</button> */}

      {/* save button  */}
      {/* <button className= "saveTestButton" onClick = {this.handleClick} > Select</button> */}
    </div>
  );
};

export default TestBuilder;