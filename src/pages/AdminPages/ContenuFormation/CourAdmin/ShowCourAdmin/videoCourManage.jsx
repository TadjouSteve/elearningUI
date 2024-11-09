import { useState } from "react";
import SaveComponent from "../../../../../composants/SaveComponent";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import { Button } from "@mui/material";

export function FormAddVideoCour({ setUpdate, idChapitre, texte }) {
   const requestURL = `/admin/uploadvidoechapitre/${idChapitre}`;
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const [save, setSave] = useState(false);
   const [file, setFile] = useState();

   const onAction = () => {
      //console.log("==file send==", file);
      if (!save) {
         setSave(true);
      } else {
         setSave(false);
         setTimeout(() => {
            setSave(true);
         }, 100);
      }
   };

   const setFileSelected = (event) => {
      if (event.target.files) {
         //console.log("==file selected==", event.target.files[0]);
         setFile(event.target.files[0]);
      } else {
         setFile(null);
      }
   };

   return (
      <>
         {save ? (
            <SaveComponent
               setSave={setSave}
               save={save}
               requestURL={requestURL}
               requestBody={file}
               requestMethode={"POST"}
               requestParam={null}
               setErrorServeur={setErrorServeur}
               setError={setError}
               setUpdate={setUpdate}
               isMultipart={true}
            />
         ) : null}
         <form enctype="multipart/form-data">
            <div
               style={{
                  margin: "5px",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "row",
               }}
            >
               <div style={{ margin: "5px" }}>
                  <label for="profile_pic">{texte ? texte : "ajouter une video pour ce chapitre"} </label>
                  <input
                     type="file"
                     id="videoChapitre"
                     name="videoChapitre"
                     accept=".mp4"
                     onChange={(event) => setFileSelected(event)}
                  />
               </div>
               <div style={{ display: "flex", flexDirection: "column" }}>
                  {file && (
                     <Button
                        variant="contained"
                        onClick={() => onAction()}
                        color={"success"}
                        style={{ fontWeight: "700", color: "white" }}
                     >
                        Enregistrer
                     </Button>
                  )}

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
               </div>
            </div>
         </form>
      </>
   );
}
