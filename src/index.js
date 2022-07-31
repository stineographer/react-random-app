import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/*
fetch('https://api.agify.io?name[]=michael&name[]=matthew&name[]=jane')
  .then(response => response.json())
  .then(data => console.log(data));
  */

//use this
//https://api.agify.io?name[]=michael&name[]=matthew&name[]=jane
const baseUrl = 'https://api.agify.io?'
//param format
//name[]=michael&name[]=matthew&name[]=jane
const param = 'name[]=michael&name[]=matthew&name[]=jane'
//returns:
//[{name: "michael", age: 70, count: 233482}, {name: "matthew", age: 36, count: 34742}, {name: "jane", age: 36, count: 35010}]

//const fullUrl = baseUrl + param;
const fullUrl = baseUrl + param;

// "this gets called after the end of the main stack. the value received and returned is: 33"
// Promise {[[PromiseStatus]]: "resolved", [[PromiseResult]]: 33}
//like where the F does that 33 come from???
function fortheloveofgodpleaseresolve() {

  return fetch('https://api.agify.io?name[]=michael&name[]=matthew&name[]=jane')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      console.log(data);//LINE prints
    //[Log] [{name: "michael", age: 70, count: 233482}, {name: "matthew", age: 36, count: 34742}, {name: "jane", age: 36, count: 35010}] (3)

      return data;
    })//end fetch!

}

async function asyncCall() {
  console.log('calling');
  const result = await fortheloveofgodpleaseresolve();
  console.log(result);//LINE prints
  //[Log] [{name: "michael", age: 70, count: 233482}, {name: "matthew", age: 36, count: 34742}, {name: "jane", age: 36, count: 35010}] (3)
  return result;
  // expected output: "resolved"
}

const result = asyncCall();
console.log("what are you?" + result);
//returns:
//[object Promise]
//unresolved promise, and it remains unresolved
//because you can't call await on an async function outside of a function
//but apparently there's a proposal to change this??? according to this StackOverflow post: https://stackoverflow.com/a/48327733
//you gotta do something more like this, especially if you actually want to save the json data in some sort of variable somewhere
/*
const p = Promise.resolve([1,2,3]);
p.then((v) => {
  console.log(v[0]); // 1
});
*/

//that's where a JS framework (like React) comes in handy
function Square(props) {
  console.log("Square props: " + props);
  return (
    <button className="square" onClick={props.onClick}>
      {props.name + ": "}
      {props.age}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    console.log(" Board.renderSquare props: " + this.props);
     console.log(JSON.stringify(this.props));
    //{"squares":[{"name":"michael","age":70,"count":233482},{"name":"matthew","age":36,"count":34742},{"name":"jane","age":36,"count":35010}]}

    return (
      <Square
        name={this.props.squares[i].name}
        age={this.props.squares[i].age}
        count={this.props.squares[i].count}
        onClick={() => this.props.onClick(i)}
      />
    );
  } //end of renderSquare: spits out Squares within a Board, each has a click function

  render() {
    return (
      <div>
        <div className="board-row">
            <label>
            Name:
            <input type="text" value={this.props.squares[0].name} onChange={this.handleChange} />
          </label>

          <label>
            Name:
            <input type="text" value={this.props.squares[1].name} onChange={this.handleChange} />
          </label>
           <label>
            Name:
            <input type="text" value={this.props.squares[2].name} onChange={this.handleChange} />
          </label>
        </div>
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


class Game extends React.Component {
  /*
fetch('https://api.agify.io?name[]=michael&name[]=matthew&name[]=jane')
  .then(response => response.json())
  .then(data => console.log(data));
  */

  constructor(props) {
    super(props);

    console.log("loading props inside constructor: " + props);
    console.log(JSON.stringify(props));
    this.state = {
      //all these come into existence when Game is first rendered
        //hard-coded: {name: "michael", age: 70, count: 233482}, {name: "matthew", age: 36, count: 34742}, {name: "jane", age: 36, count: 35010}
                  //  {name: "jane", age: 36, count: 35010}
          squares: props
      //,
        //    DataisLoaded: false
    }; //end of Game.state definition
  } //end of Game constructor

  handleClick(i) {
    //const history = this.state.history;
    //const current = history[history.length - 1];
    const squares = this.state.squares.slice();

    console.log("look! I'm in this click!! ", squares[i])//non-empty
    squares[i].age = 5;
     squares[i].age = 5;//THIS WORKS!!!
     console.log("look again! ", squares[i].age)

    this.setState({
      squares: squares
      //,
        //   DataisLoaded: false

    });//end setState

  }//end handleClick

  // ComponentDidMount is used to
    // execute the code

  componentDidMount() {
        fetch('https://api.agify.io?name[]=michael&name[]=matthew&name[]=jane')
            .then((res) => res.json())
            .then((data) => {
              console.log("inside componentDidMount, just before setState: " + data);
            this.setState(

                  {
                             //hard-coded: {name: "michael", age: 70, count: 233482}, {name: "matthew", age: 36, count: 34742}, {name: "jane", age: 36, count: 35010}
                                  //  {name: "jane", age: 36, count: 35010}
                                squares: data
                    //this is array of 3 objects
                    //,
                      //          DataisLoaded: true


                  }//end setState object
                );//end setState function

              //this gets called absolutely last!!
              console.log("inside componentMount after setState, before end then: " + this.state.squares[0].name);//THIS ACTUALLY WORKED AT SOME POINT!!
          //this isn't prining anymore??
          //I swear I saw the name print today
            })//end then
    }



  render() {
    //defining elements that will be visually rendered
    //originally:
     //   const history = this.state.history;
   // const current = history[this.state.stepNumber];
    //    squares={current.squares}

    //const current = { DataisLoaded, history[this.state.stepNumber] }
   // const { DataisLoaded, items } = this.state;
     const { squares } = this.state;

    //it's all there!
   // inside render[object Object],[object Object],[object Object]

        //the line below changed EVERYTHING!!!!!
       if (Object.keys(squares).length === 0) return <div>
         <h1> Pleses wait some time.... </h1> </div> ;

               console.log("what the heck is in this state.squares? " + this.state.squares[0].name);// this prints the goddam name!!
                console.log(JSON.stringify(squares)); //it's full of data!
              console.log("what the heck is in this squares? " + squares[0].name);//this also prints the goddam name!!


    return (
      <div className="game">

        <div className="game-board">
          <Board
            squares={squares}
            onClick={i => this.handleClick(i)}
            />
        </div>

      </div>
    ); //end of render return
  } //end of Game class component definition
} //

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
