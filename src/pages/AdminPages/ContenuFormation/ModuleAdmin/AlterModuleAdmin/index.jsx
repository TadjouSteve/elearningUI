import React, { useState } from "react";
import FormModule from "../FormModule";
import {
   MessageErrorServeur,
   MessageErrorServeurWithVarialbleHeight,
} from "../../../../../composants/MessageComponent";
import { CircularProgress } from "@mui/material";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";

export default function AlterModuleAdmin() {
   const { idModule } = useParams();
   const [update, setUpdate] = useState(false);
   const fecthModule = useFetch(`/admin/module/${idModule}`, "GET", null, null, update);
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
               <span>Modifiaction du module {fecthModule.data ? fecthModule.data.module?.nom : ""}</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/modules"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Modules{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={`/module/alter/${idModule}`} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     modifiaction module{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={`/module/${idModule}`} style={{ textDecorationLine: "underline", color: "white" }}>
                     {fecthModule.data?.module ? fecthModule.data.module.nom : ""}
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
         {fecthModule.isLoading ? (
            <div style={{ marginLeft: "40%" }}>
               <CircularProgress size={40} />
            </div>
         ) : fecthModule.error ? (
            <MessageErrorServeurWithVarialbleHeight />
         ) : (
            <FormModule
               setSave={setSave}
               save={save}
               initialForm={fecthModule.data.module}
               requestMethode="PUT"
               setError={setError}
               setErrorServeur={setErrorServeur}
            />
         )}
      </>
   );
}
