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
  //at first we define the state as an object, it will reside in
  //the state constant, setState function will be used to handle the state value
  const [state, setState] = useState({
    selectedCharacter: 1,
    side: 'light',
    destroyed: false
  })

  //********** WARNING ********//
  //setState in Hooks IS NOT THE SAME AS the classic setState
  //classic setState -> you pass your changes, setState merges them with the previousState
  //HOOKS setState -> completely overwrites previousState

  //2 WAYS TO HANDLE THIS
  //1 -> manually merge the changes - ex. setState({...state, myChanges})
  //2 -> set different constants for each value that must be handled

  //IN THIS COMMIT WE EXPLORE THE FIRST WAY

  //functional component can't have function but must store them in variables
  //To handle state we use the setState constant destructured from useState
  const sideHandler = side => {
    setState({ ...state, side: side });
  };

  const charSelectHandler = event => {
    const charId = event.target.value;
    setState({ ...state, selectedCharacter: charId });
  };

  const destructionHandler = () => {
    setState({ ...state, destroyed: true });
  };

  //Now everytime we want to read a state value we have our state constant
  //functions are stored in constants too
    let content = (
      <React.Fragment>
        <CharPicker
          side={state.side}
          selectedChar={state.selectedCharacter}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={state.selectedCharacter} />
        {/*
          We still use bind to pass an argument to the function
          while nost still executing it, PASSING THIS OR NULL
          DOES NOT MATTER
        */}
        <button onClick={sideHandler.bind(this, 'light')}>
          Light Side
        </button>
        <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
        {state.side === 'dark' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    if (state.destroyed) {
      content = <h1>Total destruction!</h1>;
    }


    return content;

}

export default App;
