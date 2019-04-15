
//Converting the Char Picker Component we need to handle
//its apiCall inside componentDidMount,
//HOOKS provides us useEffect to handle such a task
//REFACTORING ON TO USE OUR CUSTOM HOOK!
//CharPicker will:
import React from 'react';
// -> fetch api via our custom httpHook(no more useState needed, data comes from httpHookResults)
import {httpHook} from '../hooks/httpHook';

import './CharPicker.css';

const CharPicker = props => {

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
  const [isLoading, charData] = httpHook('https://swapi.co/api/people',
                                        [/* empty because no need to refresh after first load*/])

  //if charData is NOT NULL then manage data
  const characters = (charData && charData.results
        .slice(0, 5) //get first 5 results
        .map((char, index) => ({ //forEach create an object
          name: char.name,       //with character name
          id: index + 1          //and character id
        }))) || []; //else characters = []

  //Data to fill the content of the component come
  //from httpHook results manipulation and props
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
