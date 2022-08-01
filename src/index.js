//missing imports?
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

/*
https://archive.org/metadata/TheAdventuresOfTomSawyer

*/

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {squares: [], value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.value);
    let myStateVal = this.state.value;
    //for the love of god please output the fucking data into the fucking dom somehow
    //make a fucking copy!  .replace(/\s/g, "")
    const noSpaces = myStateVal.replace(/\s/g, "");

    console.log("no fucking spaces: " + noSpaces);
     event.preventDefault();//keep this BEFORE THE FETCH or shit breaks!!

       fetch('https://archive.org/metadata/' + noSpaces)
            .then((res) => res.json())
            .then((data) => {
              console.log("inside componentDidMount, just before setState: " + data);
              this.setState(

                    {
                               //hard-coded:
                                  squares: data,
                                  value: 'loaded ' + myStateVal
                      //this is array of 3 objects
                      //,
                        //          DataisLoaded: true

                    }//end setState object
                  );//end setState function

              //this gets called absolutely last!!
              console.log("inside componentMount after setState, before end then: " + this.state.squares.created);
          //super annoying trying to get inside wtf is returned

            })//end last fetch then

  }//end handleSubmit


  componentDidMount() {
        let searched_title = 'The Adventures Of Tom Sawyer';

        fetch('https://archive.org/metadata/TheAdventuresOfTomSawyer')
            .then((res) => res.json())
            .then((data) => {
              console.log("inside componentDidMount, just before setState: " + data);
            this.setState(

                  {
                             //hard-coded:
                                squares: data,
                                value: searched_title
                    //this is array of 3 objects
                    //,
                      //          DataisLoaded: true

                  }//end setState object
                );//end setState function

              //this gets called absolutely last!!
              console.log("inside componentMount after setState, before end then: " + this.state.squares.created);
          //super annoying trying to get inside wtf is returned

            })//end then

    }//END componentDidMount

  render() {
     const { squares, value } = this.state;

     //the line below changed EVERYTHING!!!!!
       if (Object.keys(squares).length === 0) return <div>
         <h1> Pleses wait some time.... </h1> </div> ;

 console.log("look at them squares: " + JSON.stringify(squares));

squares.files.forEach(element => console.log(element));
         console.log("look at them squares files: " + JSON.stringify(squares.files));//wtf is in here

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
          <div>Title Searched: {value}</div>
          <div>Directory: {squares.dir} </div>

           <div>Files count: {squares.files_count} </div>
             <div>Directory: {squares.dir} </div>



      </form>

    );
  }//END THE FORM render!
}

ReactDOM.render(<NameForm />, document.getElementById("root"));
