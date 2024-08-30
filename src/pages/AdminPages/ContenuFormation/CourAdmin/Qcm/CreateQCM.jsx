import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { Button, CircularProgress } from "@mui/material";
import {
   MessageErrorServeur,
   MessageErrorServeurWithVarialbleHeight,
} from "../../../../../composants/MessageComponent";
import FormQCM from "./FormQCM";

export default function CreateQCM() {
   const { idChapitre } = useParams();
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const fecthChapitre = useFetch(`/admin/cour/${idChapitre}`, "GET", null, null, update);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const sauvegarde = () => {
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
               <span>Ajout d'un QCM au Chapitre: {fecthChapitre.data ? fecthChapitre.data.chapitre?.titre : ""}</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/cours"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Cours{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={`/qcm/ajouter/${idChapitre}`} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Ajout d'un QCM{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={`/cour/${idChapitre}`} style={{ textDecorationLine: "underline", color: "white" }}>
                     {fecthChapitre.data?.chapitre ? fecthChapitre.data.chapitre.titre : ""}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
               <Button variant="contained" onClick={() => sauvegarde()} color="success">
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
         {fecthChapitre.isLoading ? (
            <div style={{ marginLeft: "40%" }}>
               <CircularProgress size={40} />
            </div>
         ) : fecthChapitre.error ? (
            <MessageErrorServeurWithVarialbleHeight />
         ) : (
            <FormQCM
               setSave={setSave}
               save={save}
               initialForm={{ idChapitre: idChapitre }}
               requestMethode="POST"
               setError={setError}
               setErrorServeur={setErrorServeur}
            />
         )}
      </>
   );
}
