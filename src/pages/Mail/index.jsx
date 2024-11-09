import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MessageErrorServeur } from "../../composants/MessageComponent";
import { Button, CircularProgress, TextField } from "@mui/material";
import SaveComponent from "../../composants/SaveComponent";
import { useFetch } from "../../utils/hooks/FetchData";

export default function Mail() {
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const navigation = useNavigate();
   const sendMailAction = () => {
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
               <span>Envoi de mail</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/mail"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Mail Sender{" "}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
               <Button variant="contained" onClick={() => sendMailAction()} color="info">
                  Envoyer
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

         <FormMAil
            setSave={setSave}
            save={save}
            requestMethode="POST"
            setError={setError}
            setErrorServeur={setErrorServeur}
         />
      </>
   );
}

const FormMAil = ({ setErrorServeur, setError, setSave, save, requestMethode }) => {
   const [update, setUpdate] = useState(false);
   const fetchMetaData = useFetch(`/metadata/inscription/`, "GET", null, null, update);
   const [showEdit, setShowEdit] = useState(true);

   const requestURL = "/admin/sendmail/";
   const [form, setForm] = useState({});
   return (
      <>
         <Container fluid>
            <Row style={{ backgroundColor: "white", borderRadius: 5, margin: 10, padding: 10 }}>
               <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                  <TextField
                     label="Objet du mail"
                     placeholder="Validation de Compte"
                     multiline
                     fullWidth
                     value={form.objet}
                     onChange={(e) => {
                        setForm({ ...form, objet: e.target.value });
                     }}
                  />
               </div>
            </Row>
            <Row style={{ backgroundColor: "white", borderRadius: 5, margin: 10, padding: 10 }}>
               {showEdit ? (
                  <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                     <Button
                        onClick={() => {
                           setShowEdit(false);
                        }}
                        variant="contained"
                        color="warning"
                     >
                        Voir le rendu final
                     </Button>
                     <TextField
                        label="Corp du Mail (html format)"
                        placeholder="Texte du mail au format html, tout dans une div"
                        multiline
                        rows={15}
                        fullWidth
                        value={form.bodyHtml}
                        onChange={(e) => {
                           setForm({ ...form, bodyHtml: e.target.value });
                        }}
                     />
                  </div>
               ) : (
                  <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                     <Button
                        onClick={() => {
                           setShowEdit(true);
                        }}
                        variant="contained"
                        color="success"
                     >
                        Editer le mail
                     </Button>
                     <p
                        dangerouslySetInnerHTML={{ __html: form.bodyHtml }}
                        style={{
                           minHeight: "300px",
                           border: "2px solid gray",
                           padding: 5,
                           paddingLeft: 8,
                           paddingRight: 8,
                           minWidth: "60%",
                           borderRadius: 5,
                        }}
                        className="texteCour"
                     ></p>
                  </div>
               )}
            </Row>
            <Row style={{ backgroundColor: "white", borderRadius: 5, margin: 10, padding: 10 }}>
               <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                  <TextField
                     label="identifiant des profil qui recevrons ce mail (ex: 123 ou 12 ou 34)"
                     placeholder="1234"
                     multiline
                     fullWidth
                     value={form.profil}
                     onChange={(e) => {
                        setForm({ ...form, profil: e.target.value });
                     }}
                  />
               </div>
               {fetchMetaData.isLoading ? (
                  <div style={{ marginLeft: "40%" }}>
                     <CircularProgress size={40} />
                  </div>
               ) : fetchMetaData.error ? (
                  <MessageErrorServeur />
               ) : (
                  <div name="localisation_Region" className="divChamp" style={{ marginTop: 15 }}>
                     <div name="region" className="subDivChamp">
                        <label className="labelSignIn">Region de reception du mail</label>
                        <select
                           id="region-select"
                           className="inputSignIn"
                           value={form.idRegion}
                           onChange={(e) => {
                              setForm({ ...form, idRegion: e.target.value });
                           }}
                        >
                           <option value="-1">-- Toute les Regions --</option>
                           {fetchMetaData.data &&
                              fetchMetaData.data.regions.length &&
                              fetchMetaData.data.regions.map((region) => (
                                 <option key={region.id} value={region.id}>
                                    {region.nom}
                                 </option>
                              ))}
                        </select>
                     </div>
                  </div>
               )}
            </Row>
         </Container>

         {save && (
            <SaveComponent
               setSave={setSave}
               requestURL={requestURL}
               requestBody={form}
               requestMethode={"POST"}
               requestParam={null}
               setErrorServeur={setErrorServeur}
               setError={setError}
               redirected={true}
            />
         )}
      </>
   );
};
