import { useEffect, useState } from "react";
import { apiUrl } from "../utils/app-config";
import { doFetch } from "../utils/func";



const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const json = await doFetch(apiUrl + "media");
      // console.log(json);
      const mediaFiles = await Promise.all(
        json.map(async (item) => {
          const fileData = await doFetch(apiUrl + "media/" + item.file_id);
          // console.log('fileData', fileData);
          return fileData;
        }),
      );
      // console.log(data);
      setMediaArray(mediaFiles);
    } catch (error) {
      console.error("loadMedia failed", error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return { mediaArray };
};

  const useAuthentication = () => {

    const postLogin = async (userCredentials) => {
      try{
        await doFetch(apiUrl + 'login', {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(userCredentials),
        });
      }catch (error){
      console.error('postloginfailed',error);
      }
      // user credentials format: {username: 'someUsername', password: 'somePassword'}
       const options = {
          // TODO: add method, headers and body for sending json data with POST
       };
       try {
          // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
       } catch (error) {

          throw new Error(error.message);
       }
    };

    return {postLogin};
 };



export { useMedia,useAuthentication };
