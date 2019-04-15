//Character Component will:
// -> manage new rerenders monitoring props via useEffect and memo
import React, { useEffect, memo } from 'react';
// -> fetch api via our custom httpHook(no more useState needed, data comes from httpHookResults)
import {httpHook} from '../hooks/httpHook';

import Summary from './Summary';

//Again this becomes a functional component and receives props
const Character = props =>  {

  //CUSTOM HOOKS MUST BE IMPLEMENTED ON TOP LEVEL OF THE FUNCTIONAL COMPONENT!!!!!
  //we pass the requested arguments:
  //-> url for the request
  //-> array of dependencies that will (thanks to useEffect) manage the need for a refresh-request
  //like a regular hook we destructure results
  //-> is Loading:  state of request
  //-> charData: data returned from the request
  //this Hook gets to replace componentDidMount + componentDidUpdate
  //componentDidMount -> executes httpRequest after the component is loaded first time
  //componentDidUpdate -> based on dependencies changes performs operation in this hook
  const [isLoading, charData] = httpHook('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar])

  //if charData is NOT NULL we fill with data otherwise loadedCharacter = {}
  const loadedCharacter = (charData && {
    id: props.selectedChar,
    name: charData.name,
    height: charData.height,
    colors: {
      hair: charData.hair_color,
      skin: charData.skin_color
    },
    gender: charData.gender,
    movieCount: charData.films.length
  }) || {}

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
