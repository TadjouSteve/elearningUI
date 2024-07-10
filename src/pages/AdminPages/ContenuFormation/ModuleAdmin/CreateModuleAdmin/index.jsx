import React, { useState } from "react";
import FormModule from "../FormModule";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function CreateModuleAdmin() {
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
               <span>Ajout d'une rubrique</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/modules"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Rubriques{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={"/module/creer"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     ajout d'une rubrique{" "}
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

         <FormModule
            setSave={setSave}
            save={save}
            requestMethode="POST"
            setError={setError}
            setErrorServeur={setErrorServeur}
         />
      </>
   );
}
