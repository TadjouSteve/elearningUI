import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context";
//import { ServeurContext } from '../../../App';

export function useFetch(url, method, body, param, update, isMultipart) {
   const { serveurURL } = useContext(AppContext);
   //const serveur = "http://localhost:9006/elearningapi";
   //"https://api2.streenge.tech/elearningapi";
   //"https://api.streenge.tech/iri"
   // "http://localhost:9006/elearningapi";
   const [data, setData] = useState({});
   const [isLoading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   // const [send, setsend] = useState(true);
   //console.log("==Serveur Context==", serveur);

   useEffect(() => {
      if (!url) return;

      setLoading(true);
      setError(false);
      var myHeaders = new Headers();
      myHeaders.append(
         "Content-Type",
         isMultipart ? "multipart/form-data" : "application/json"
      );
      myHeaders.append("Connection", "Keep-alive");

      const username = "admin";
      const password = "passwordadmin237";
      const base64Credentials = btoa(username + ":" + password); // Encode en base64

      myHeaders.append("Authorization", "Basic " + base64Credentials);

      let formData = new FormData();

      formData.append("image", body);
      //formData.append('username', 'Chris');

      var myInit = {
         method: method ? method : "GET",
         headers: myHeaders,
         mode: "cors",
         cache: "default",
         body: body ? JSON.stringify(body) : null,
      };

      var myHeadersMultipart = new Headers();
      myHeadersMultipart.append("Connection", "Keep-alive");
      myHeadersMultipart.append("Authorization", "Basic " + base64Credentials);
      var myInitMultipart = {
         method: method ? method : "GET",
         headers: myHeadersMultipart,
         mode: "cors",
         cache: "default",
         body: formData,
      };

      const allPath = serveurURL + url + (param ? param : "");

      if (isMultipart) {
         myInit = myInitMultipart;
      }

      async function fetchData() {
         try {
            const response = await fetch(allPath, myInit);
            //if (!isMultipart) {
            const data = await response.json();
            setData(data);
            if (data.timestamp && data.status) {
               console.log("==Une erreur serveur ==", data);
               setError(true);
            }
            // }
         } catch (err) {
            console.log(err);
            setError(true);
         } finally {
            setLoading(false);
         }
      }
      fetchData();
   }, [url, method, body, param, update, isMultipart, serveurURL]);
   return { isLoading, data, error };
}
