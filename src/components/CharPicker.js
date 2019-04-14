
//Converting the Char Picker Component we need to handle
//its apiCall inside componentDidMount,
//HOOKS provides us useEffect to handle such a task
import React, { useState, useEffect } from 'react';

import './CharPicker.css';

const CharPicker = props => {

  //We create a pair [pieceOfState, handlerMethod]
  //setting the initialValue forEach pieceOfState
  const [ characters, setCharacters ] = useState([]);
  const [ isLoading, setIsLoading ] =  useState(false);

  //ComponentDidMount gets replaced from useEffect,
  //ATTENTION: useEffect() by itself gets called
  //EVERYTIME we submit a change to the state
  //and always after React rendered this component,
  //to make sure this gets executed only once we add
  //a second argument -> useEffect(actionFunction, secondArgument)
  //this is an array of dependencies. We declare in this array
  //WICH VALUES TO FOLLOW THAT WILL TRIGGER useEffect execution
  //by passing an empty array we ensure that useEffect gets called
  //once after the component was mounted and never again
  useEffect(() => {

    //we execute our api call same as before with
    //componentDidMount, handling the state with
    //methods generated from useState
    setIsLoading(true);

    fetch('https://swapi.co/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {

        const selectedCharacters = charData.results.slice(0, 5);

        //again "useState generated methods"
        setCharacters(selectedCharacters.map((char, index) => ({
          name: char.name,
          id: index + 1
        })));

        setIsLoading(false);

      })
      .catch(err => {
        console.log(err);
      });
  }, []);//here the second argument, noValuesToMonitor === useEffectExecutesOnce

    //Again we use our constants instead of recalling this.state
    //props are directly passed so noMore this.props.something
    let content = <p>Loading characters...</p>;

    if (
      !isLoading &&
      characters &&
      characters.length > 0
    ) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          {characters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!characters || characters.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;

}

export default CharPicker;
