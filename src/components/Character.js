//Character Component will:
// -> manage state via useState
// -> fetch api via useEffect
// -> manage new rerenders monitoring props via useEffect and memo
import React, { useState, useEffect, memo } from 'react';

import Summary from './Summary';

//Again this becomes a functional component and receives props
const Character = props =>  {

  //State is managed via useState
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  //fetchData gets stored in a constant
  const fetchData = () => {

    //props gets called directly
    //state is managed via useState destructured functions
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setIsLoading(true);

    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };

        setLoadedCharacter(loadedCharacter)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
      });
  };

  //componentDidMount replaced with useEffect
  //This time we want the component to be updated(rerendered)
  //everytime the prop containing the character id
  //changes, we do that including that prop in
  //the dependencies array. This replaces componentDidUpdate.
  useEffect(() =>  {
    fetchData();

    //we can place a check, this replaces componentDidUpdate + componentWillUnmount
    return () => {
      console.log('this mimics componentDidUpdate + componentWillUnmount');

    }
  }, [props.selectedChar]);

  //we can mimic the behaviour of componentWillUnmount
  //by placing an handler that will get executed before
  //the rest of useEffect from its second instantiation
  //first time the component is loaded this does not count!
  useEffect(() =>  {
    return () => {
      console.log('this mimics componentDidUnmount only');
      console.log('Too soon...');
    }
  }, []);

    //now we prepare content to present
    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }

    //and return
    return content;

}

//To mimic componentShouldUpdate React provides "memo"
//this component gets "memorized" and updates only when the value
//of its props gets changed
//In this app changing side won't cause a re-render of the Character component
export default memo(Character,
//to apply better/explicit control we can select what causes a rerender in the second
//argument of memo. This is a function that receives previous and next props.
//by comparing them we decide wether it should NOT re-render
// -> condition returns true,  if props are the same DO NOT RE-RENDER
//-> condition returns false, if props are DIFFERENT apply RE-RENDER
(prevProps, nextProps) => {
  //in this case, DO NOT RERENDER IF old and new selectedChar are the same
  return prevProps.selectedChar === nextProps.selectedChar
}
);
