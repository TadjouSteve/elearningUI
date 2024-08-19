import React from "react";
import { useFetch } from "../../utils/hooks/FetchData";
//import { AppContext } from '../../context';
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

export default function SaveComponent({
   setErrorServeur,
   setSave,
   setOpen,
   setError,
   setActiveStep,
   requestBody,
   requestMethode,
   setUpdate,
   requestURL,
   requestParam,
   redirected,
   isMultipart,
   functionToExcecuteAfterGoodOperation,
}) {
   requestMethode = requestMethode ? requestMethode : "POST";
   requestURL = requestURL ? requestURL : "URL_non_defini";

   //const { isOnline, language, setUser } = useContext(AppContext);
   const { isLoading, data, error } = useFetch(
      requestURL,
      requestMethode,
      requestBody,
      requestParam,
      null,
      isMultipart
   );
   const navigation = useNavigate();
   console.log("donner envoyer en body == ", requestBody);
   //console.log("donner retour == ", data);
   //console.log("isRedirected? == ", redirected);
   if (isLoading) {
      return (
         <div style={{ marginLeft: "40%" }}>
            {/* <CircularProgress size={40} /> */}
            <Backdrop open={true} style={{ zIndex: 1000, color: "#fff" }}>
               <CircularProgress
                  style={{
                     position: "absolute",
                     top: "50%",
                     left: "50%",
                     marginTop: "-20px",
                     marginLeft: "-20px",
                  }}
                  color="inherit"
               />
            </Backdrop>
         </div>
      );
   } else if (error) {
      setErrorServeur(true);
      setSave(false);
   } else if (!isLoading && !error) {
      if (data.errorAPI) {
         setError((prevError) => ({ ...prevError, step: data.index, textError: data.message }));
         if (setActiveStep) {
            try {
               setActiveStep(data.index);
            } catch (error) {
               console.log("Impossible d'initialise activeStep via SetActiveStep, saveComponent  ==", error);
            }
         }
         setSave(false);
      } else {
         if (redirected === true) {
            //console.log("Redirected url == ", data.url);
            navigation(data.url);
         } else {
            if (functionToExcecuteAfterGoodOperation) {
               try {
                  functionToExcecuteAfterGoodOperation(data);
               } catch (error) {
                  console.log(
                     "Impossible d'executer la fonction apres succes d'une opreation fecth, saveComponent  ==",
                     error
                  );
               }
            }
         }

         if (setUpdate) {
            setUpdate((prevUpdate) => !prevUpdate);
         }
         if (setOpen) {
            setOpen(false);
         }
         //navigation('/professeur/' + data.matricule)
         setSave(false);
      }
   }
}
