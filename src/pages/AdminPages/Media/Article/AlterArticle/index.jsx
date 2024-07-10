import React, { useState } from "react";
import FormArticle from "../FormArticle";
import {
   MessageErrorServeur,
   MessageErrorServeurWithVarialbleHeight,
} from "../../../../../composants/MessageComponent";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";

export default function AlterArticle() {
   const { idArticle } = useParams();
   const [update, setUpdate] = useState(false);
   const fectchArticle = useFetch(`/media/article/${idArticle}`, "GET", null, null, update);

   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const navigation = useNavigate();
   const modifierArticle = () => {
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
               <span>Modification de l'article</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/article"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Articles{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={`/article/alter/${idArticle}`} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     modifiaction de l'article
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={`/article/${idArticle}`} style={{ textDecorationLine: "underline", color: "white" }}>
                     {fectchArticle.data ? fectchArticle.data.nom : ""}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
               <Button variant="contained" onClick={() => modifierArticle()} color="success">
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

         {fectchArticle.isLoading ? (
            <div style={{ marginLeft: "40%" }}>
               <CircularProgress size={40} />
            </div>
         ) : fectchArticle.error ? (
            <MessageErrorServeurWithVarialbleHeight />
         ) : (
            <FormArticle
               initialForm={fectchArticle.data}
               setSave={setSave}
               save={save}
               requestMethode="PUT"
               setError={setError}
               setErrorServeur={setErrorServeur}
            />
         )}
      </>
   );
}
