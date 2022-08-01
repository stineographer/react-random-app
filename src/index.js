//
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

/*
https://archive.org/metadata/TheAdventuresOfTomSawyer

*/

//gonna pass in squares.files
//which often has: name, title, source, format
//would be nice to actually catch when that property ain't there
function Square(props) {
  console.log("Square props: " + props);
  return (
    <div className="square" onClick={props.onClick}>
      <p>Source Name: {props.name}</p>
      <p>Source Title: {props.title}</p>
      <p>{"Source Type: " + props.source}</p>
      <p>{"Format : " + props.format}</p>
    </div>
  );
}//end Square function

class Board extends React.Component {

    truncateString(str, n){//problem is SourceName, too long -only allow 10 chars
        return (str.length > n) ? str.slice(0, n-1) + '... ' : str;//
      }

  renderSquare(i) {
    console.log(" Board.renderSquare props: " + this.props);
     console.log(JSON.stringify(this.props));
    //{"squares":[{"name":"michael","age":70,"count":233482},{"name":"matthew","age":36,"count":34742},{"name":"jane","age":36,"count":35010}]}


    //const truncatedName =
    //this.props.squares[i].name != undefined

    console.log("number of rows" + this.props.squares % 3);
    let rowNum = this.props.squares % 3;

    return (
      <Square
        name={this.props.squares[i].name}
        title={this.props.squares[i].title}
        source={this.props.squares[i].source}
        format={this.props.squares[i].format}
        onClick={() => this.props.onClick(i)}
      />
    );
  } //end of renderSquare: spits out Squares within a Board, each has a click function

  render() {

    return (
      <div>

        <div className="board-row">
          {this.renderSquare(0)}
          <div></div>
          {this.renderSquare(1)}
          <div></div>
          {this.renderSquare(2)}
        </div>

      </div>
    );
  } //end of render visual elements function for Board class
} //end of Board class definition

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {squares: [], value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});//it's weird to me that this one property can be passed in and not rest of object (i.e., squares)
    //but it's working, so what the hey
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

    handleClick(i) {
    //const history = this.state.history;
    //const current = history[history.length - 1];
    const squares = this.state.squares.slice();

    console.log("look! I'm in this click!! ", squares[i])//non-empty
    squares[i].age = 5;
     squares[i].age = 5;//THIS WORKS!!!
     console.log("look again! ", squares[i].age)

    this.setState({
      squares: squares,
      value: ''
      //,
        //   DataisLoaded: false

    });//end setState

  }//end handleClick

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

          <div className="game-board">
            <div className="board-row">
              <div>
              <Board
                  squares={squares.files}

                  onClick={i => this.handleClick(i)}
                  />
              </div>
            </div>
          </div>
      </form>



    );
  }//END THE FORM render!
}//END FORM COMPONENT!

ReactDOM.render(<NameForm />, document.getElementById("root"));
