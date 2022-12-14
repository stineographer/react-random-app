//
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

/*
https://archive.org/metadata/TheAdventuresOfTomSawyer

*/

function   truncateString(str, n){//problem is SourceName, too long -only allow 10 chars
        return (str.length > n) ? str.slice(0, n-1) + '... ' : str;//
      }

//gonna pass in squares.files
//which often has: name, title, source, format
function Square(props) {
  //try truncating name here?
   const truncatedName = props.name.length>=10? truncateString(props.name, 10) : props.name;

  console.log("Square props.name length: " + props.name.length);
  return (
    <div className="square" >
      <p>Source Name: {truncatedName}</p>
      <p>Source Title: {props.title}</p>
      <p>{"Source Type: " + props.source}</p>
      <p>{"Format : " + props.format}</p>
    </div>
  );//end return statement
}//end Square function

class Board extends React.Component {

  renderSquare(item) {
    console.log(" Board.renderSquare props: " + this.props);
     console.log(JSON.stringify(this.props));

    return (
      <Square
        name={item.name}
        title={item.title}
        source={item.source}
        format={item.format}

      />
    );
  } //end of renderSquare: spits out Squares within a Board

  render() {

         this.props.squares.forEach(element => console.log("Files array element.name: " + element.name));

        const fileItems = [this.props.squares.map((item, index) =>
          <div key={index}>
            {this.renderSquare(item)}
          </div>
        )];

    return (
      <div>

        <div className="board-row">
           {fileItems}
        </div>

      </div>
    );
  } //end of render for Board class
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
    const myStateVal = this.state.value;
    //make a copy!  .replace(/\s/g, "")
    const noSpaces = myStateVal.replace(/\s/g, "");

    console.log("no spaces: " + noSpaces);
     event.preventDefault();//keep this BEFORE THE FETCH or it breaks!!

       fetch('https://archive.org/metadata/' + noSpaces)
            .then((res) => res.json())
            .then((data) => {
              console.log("inside componentDidMount, just before setState: " + data);
              this.setState(

                    {
                               //hard-coded:
                                  squares: data,
                                  value: myStateVal
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

    handleClick(item) {
    //TO DO: display full name instead of truncated
    const squares = this.state.squares.slice();

   // console.log("look! I'm in this click!! ", squares[i])//non-empty

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
                                squares: data,
                                value: searched_title

                  }//end setState object
                );//end setState function

              //this gets called absolutely last!!
              console.log("inside componentMount after setState, before end then: " + this.state.squares.created);
          //created attribute is not actually a unix timestamp, so it's kinda uselessd?

            })//end then

    }//END componentDidMount



  render() {
     const { squares, value, error } = this.state;

     //the line below changed EVERYTHING!!!!!
       if (Object.keys(squares).length === 0) return (

         <form onSubmit={this.handleSubmit}>
            <div>
             <h1> Pleses wait some time.... Or "try" another submission ?</h1>

           </div>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>

        <input type="submit" value="Submit" />

           </form>
       );

         console.log("look at them squares: " + JSON.stringify(squares));
          console.log("where's is dark?" + squares.is_dark)
         const containsFiles = Object.keys(squares).includes("files");
          //DO EARLY RETURN HERE FOR NO FILES
           if (!containsFiles) return (
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
                <div>Title Searched: {value}</div>
                <div>Directory: {squares.dir} </div>
                <div> "is_dark: " {squares.is_dark.toString()} </div>
            </form>

          );//END RETURN

    //FINAL RETURN!
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

             <div className="game-board">
            <div className="board-row">
              <div>
              <Board
                  squares={squares.files}

                  />
              </div>
            </div>
          </div>


      </form>

    );//END RETURN
  }//END THE FORM render!
}//END FORM COMPONENT!

ReactDOM.render(<NameForm />, document.getElementById("root"));
