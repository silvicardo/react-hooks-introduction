//REACT HOOKS

//React Hooks let us use State inside of a functional component too!

//We got to do so Destructuring from React useState instead of Component
import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

//App Component now becomes a functional component
const App = props => {

  //Access To state is made through 'useState' that
  //is an array of 2 elements
  //[ the previous state, function to handle state ]

  //Using array destructuring we get both elements in constants from useState
  //at first we define the state as value or any type we want, it will reside in
  //the state constant, setState function will be used to handle the state value

  //IN THIS COMMIT we are going to manage
  //each piece of state in different constants
  //so we destructure each time useState forEach
  //value we want to manage in this component

  //[pieceOfState, functionToChangeJustThisValue] = setInitial(value)
  const [selectedCharacter, selectCharacter] = useState('1')
  const [side, selectSide] = useState('light')
  const [destroyed, startDestruction] = useState(false)

  //********** WARNING ********//
  //setState in Hooks IS NOT THE SAME AS the classic setState
  //classic setState -> you pass your changes, setState merges them with the previousState
  //HOOKS setState -> completely overwrites previousState

  //2 WAYS TO HANDLE THIS
  //1 -> manually merge the changes - ex. setState({...state, myChanges})
  //2 -> set different constants for each value that must be handled

  //IN THIS COMMIT WE EXPLORE THE SECOND WAY

  //functional component can't have function but must store them in variables
  //To handle each piece of state we use the setState function(we called it differently everyTime)
  //each function will manage just a piece of state!
  const sideHandler = side => {
    selectSide(side);
  };

  const charSelectHandler = event => {
    const charId = event.target.value;
    selectedCharacter(charId);
  };

  const destructionHandler = () => {
    startDestruction(true);
  };

  //Now everytime we want to read a  piece of state we have constant to read from
  //functions are stored in constants too as in the first way
    let content = (
      <React.Fragment>
        <CharPicker
          side={state.side}
          selectedChar={selectedCharacter}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={selectedCharacter} />
        {/*
          We still use bind to pass an argument to the function
          while nost still executing it, PASSING THIS OR NULL
          DOES NOT MATTER
        */}
        <button onClick={sideHandler.bind(this, 'light')}>
          Light Side
        </button>
        <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
        {side === 'dark' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    if (destroyed) {
      content = <h1>Total destruction!</h1>;
    }


    return content;

}

export default App;
