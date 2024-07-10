import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
   MessageErrorServeur,
   MessageErrorServeurWithVarialbleHeight,
} from "../../../../../composants/MessageComponent";
import SaveComponent from "../../../../../composants/SaveComponent";
import { FormRubrique } from "../FormRubrique";
import { Button, CircularProgress } from "@mui/material";
import { useFetch } from "../../../../../utils/hooks/FetchData";

export default function AlterRubrique() {
   const { idRubrique } = useParams();
   const [update, setUpdate] = useState(false);
   const fecthRubrique = useFetch(`/media/rubrique/${idRubrique}`, "GET", null, null, update);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const navigation = useNavigate();
   const ajoutRubrique = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      setSave(true);
   };

   return (
      <>
         <div
            className="headerPage"
            style={{
               backgroundColor: "#17bd08cc",
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
            }}
         >
            <div id="Links" style={{ display: "flex", flexDirection: "column", fontWeight: "500", color: "white" }}>
               <span>Modifiaction de la rubrique {fecthRubrique.data ? fecthRubrique.data.nom : ""}</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/rubrique"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Rubriques{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link
                     to={`/rubrique/alter/${idRubrique}`}
                     style={{ textDecorationLine: "underline", color: "white" }}
                  >
                     {" "}
                     modifiaction rubrique{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={`/rubrique/${idRubrique}`} style={{ textDecorationLine: "underline", color: "white" }}>
                     {fecthRubrique.data ? fecthRubrique.data.nom : ""}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
               <Button variant="contained" onClick={() => ajoutRubrique()} color="success">
                  Enregistrer
               </Button>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation(-1);
                  }}
                  color="error"
               >
                  Annuler
               </Button>
            </div>
         </div>
         {errorServeur && <MessageErrorServeur />}

         {error.textError && (
            <div
               style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: 10,
                  borderRadius: 5,
                  margin: 10,
                  fontSize: 16,
               }}
            >
               {error.textError}
            </div>
         )}
         {fecthRubrique.isLoading ? (
            <div style={{ marginLeft: "40%" }}>
               <CircularProgress size={40} />
            </div>
         ) : fecthRubrique.error ? (
            <MessageErrorServeurWithVarialbleHeight />
         ) : (
            <FormRubrique
               setSave={setSave}
               save={save}
               initialForm={fecthRubrique.data}
               requestMethode="PUT"
               setError={setError}
               setErrorServeur={setErrorServeur}
            />
         )}
      </>
   );
}
