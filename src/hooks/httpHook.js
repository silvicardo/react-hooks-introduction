/**********************************/
/***** CREATING A CUSTOM HOOK *****/
/**********************************/

//Why we import these? Explained below....
import {useEffect, useState} from 'react';

//A custom Hook is a function we export and
//reuse in components just like useState and useEffect.
//This hook will focus on:
//-> performing an http request
//-> returning an array of [isLoading(Bool), fetchedData(resultOfRequest -> Array)]
//This hook accepts two parameters:
//-> url
//-> dependencies (properties than cause this operation to repeat, explained below)

export const httpHook = (url, dependencies) => {

  //An Hook can use on its "main scope"(function scope) other Hooks!

  //We will import useState to manage
  //-> isLoading
  //-> fetchedData (data returning from the request)
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState(null)

  //We import useEffect to perform an httpRequest just the
  //first time we load the component that implements this Hook
  //and when a specified set of dependencies-data
  //gets changed
  useEffect(() => {

      console.log('Sending Http request for ' + url );

      //Now the fetch operation is versatile and can be reused!
      //We manage pieces of state with useState resulting functions
      setIsLoading(true);

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Could not fetch person!');
          }
          return response.json();
        })
        .then(data => {

          setFetchedData(data)
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false)
        });

  }, dependencies)

  //in the end of our hook we can return data of any type
  //in this occasione we return relevant data from our request
  return [isLoading, fetchedData]

}
