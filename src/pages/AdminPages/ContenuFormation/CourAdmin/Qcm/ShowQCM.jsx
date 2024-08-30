import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Container, Row, Table } from "react-bootstrap";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import SaveComponent from "../../../../../composants/SaveComponent";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ShowQCM() {
   const { idQcm } = useParams();
   const { idChapitre } = useParams();
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/admin/qcm/${idQcm}`, "GET", null, null, update);
   const fecthChapitre = useFetch(`/admin/cour/${idChapitre}`, "GET", null, null, update);

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
            <div
               id="Links"
               style={{
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: "500",
                  color: "white",
               }}
            >
               <span>
                  QCM : <span>{data && data.chapitre ? `${data.chapitre.titre}` : null}</span>
               </span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/cours"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Cours{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={"/cour/" + idChapitre} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     {fecthChapitre.data && fecthChapitre.data.chapitre ? `${fecthChapitre.data.chapitre.titre}` : null}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={"/qcm/" + idChapitre + "/" + idQcm} style={{ textDecorationLine: "none", color: "white" }}>
                     {" QCM: "}
                     {data && data.intitule ? `${data.intitule}` : null}{" "}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation(`/qcm/alter/${idChapitre}/${idQcm}`);
                  }}
                  color="success"
               >
                  Modifier
               </Button>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation(-1);
                  }}
                  color="error"
               >
                  supprimer
               </Button>
            </div>
         </div>

         <Container fluid style={{ margin: 0, padding: 5 }}>
            {/* Your component content goes here */}
            {isLoading ? (
               <div style={{ marginLeft: "40%" }}>
                  <CircularProgress size={40} />
               </div>
            ) : error ? (
               <MessageErrorServeur />
            ) : (
               <>
                  <InformationGeneralQCM qcm={data ? data : {}} />
                  <ListProposition qcm={data ? data : {}} setUpdate={setUpdate} />
               </>
            )}
         </Container>
      </>
   );
}

const InformationGeneralQCM = ({ qcm }) => {
   return (
      <Row style={{ margin: 10, padding: 5, backgroundColor: "white" }}>
         <div name="info_static" style={{ display: "flex", flexDirection: "column", flex: 1, padding: 5 }}>
            <span>
               <span style={{ fontWeight: 600 }}>Intitule en francais : </span>
               <span style={{ fontSize: 18, fontWeight: 700 }}> {qcm.intitule}</span>
            </span>

            <span>
               <span style={{ fontWeight: 600 }}>Intitule en Anglais : </span>
               <span style={{ fontSize: 18, fontWeight: 700 }}> {qcm.intituleEn}</span>
            </span>

            <span style={{ marginTop: 3 }}>
               <span style={{ fontWeight: 600 }}>Description : </span>
               {qcm.description}
            </span>
         </div>
      </Row>
   );
};

const ListProposition = ({ qcm, setUpdate }) => {
   let propositions = qcm?.propositions ? qcm.propositions : {};
   return (
      <Row style={{ margin: 10, padding: 5, backgroundColor: "white" }}>
         <div
            style={{
               display: "flex",
               flexDirection: "column",
               flexWrap: "wrap",
               gap: 5,
               backgroundColor: "white",
               borderRadius: 5,
               padding: 5,
            }}
         >
            <h3>
               liste des proposition presents dans ce QCM{" "}
               <AjoutOrUpdatePropositionQCM qcm={qcm} setUpdate={setUpdate} />
            </h3>
            {propositions?.length === 0 ? (
               <span style={{ fontSize: 17 }}>Ce QCM ne contient aucune proposition...!</span>
            ) : (
               <>
                  {propositions.map((proposition, index) => (
                     <div
                        style={{
                           display: "flex",
                           flexWrap: "wrap",
                           gap: 5,
                           justifyContent: "space-between",
                           border: "2px solid gray",
                           marginTop: 10,
                           padding: 5,
                           borderRadius: 8,
                           alignItems: "center",
                        }}
                     >
                        <div
                           style={{
                              width: 30,
                              height: 30,
                              color: "white",
                              backgroundColor: "gray",
                              fontSize: "25",
                              fontWeight: "700",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                           }}
                        >
                           <span>{index + 1}</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                           <span>
                              <span style={{ fontWeight: 400 }}>Proposition en francais : </span>
                              <span style={{ fontSize: 18, fontWeight: 500 }}> {proposition.valeur}</span>
                           </span>

                           <span>
                              <span style={{ fontWeight: 400 }}>Proposition en francais : </span>
                              <span style={{ fontSize: 18, fontWeight: 500 }}> {proposition.valeurEn}</span>
                           </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                           <AjoutOrUpdatePropositionQCM qcm={qcm} setUpdate={setUpdate} initialValue={proposition} />
                           <DeleteProposition setUpdate={setUpdate} proposition={proposition} />
                        </div>
                     </div>
                  ))}
               </>
            )}
         </div>
      </Row>
   );
};

const AjoutOrUpdatePropositionQCM = ({ qcm, setUpdate, initialValue }) => {
   const [formPropositionQCM, setFormPropositionQCM] = useState(initialValue ? initialValue : {});
   const requestURL = "/admin/qcmproposition/";
   const [open, setOpen] = useState(false);
   //const [formLink, setFormLink] = useState([]);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const handleClose = () => {
      setOpen(false);
   };
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleSave = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      setSave(true);
   };

   return (
      <>
         <Button variant="outlined" onClick={handleClickOpen}>
            {initialValue ? "Modification" : "Ajouter une propositions"}
         </Button>
         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Ajout d'une proposition au qcm: {qcm.intitule}</DialogTitle>
            <DialogContent>
               <div>
                  {errorServeur && <MessageErrorServeur />}
                  {save && (
                     <SaveComponent
                        setSave={setSave}
                        save={save}
                        requestURL={requestURL}
                        requestBody={formPropositionQCM}
                        requestMethode={"POST"}
                        requestParam={qcm && qcm.id ? qcm.id : null}
                        setErrorServeur={setErrorServeur}
                        setError={setError}
                        setUpdate={setUpdate}
                     />
                  )}

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
                  <br />
                  <div>
                     <div name="intituleQROfrancais" className="divChamp">
                        <div className="subDivChamp">
                           <label className="labelSignIn">Proposition (francais)</label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={4}
                              placeholder="ecrire ici..."
                              value={formPropositionQCM.valeur}
                              onChange={(event) =>
                                 setFormPropositionQCM((prevForm) => ({ ...prevForm, valeur: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="intituleQROfrancais" className="divChamp">
                        <div className="subDivChamp">
                           <label className="labelSignIn">Proposition (Anglais)</label>
                           <textarea
                              style={{ padding: 5, borderRadius: 5 }}
                              type="text"
                              rows={5}
                              placeholder="write here..."
                              value={formPropositionQCM.valeurEn}
                              onChange={(event) =>
                                 setFormPropositionQCM((prevForm) => ({ ...prevForm, valeurEn: event.target.value }))
                              }
                           />
                        </div>
                     </div>

                     <div name="intituleQROfrancais" className="divChamp">
                        <div className="subDivChamp">
                           <label className="labelSignIn">Statut de la proposition</label>
                           <select
                              id="region-select"
                              className="inputSignIn"
                              onChange={(e) =>
                                 setFormPropositionQCM((prevForm) => ({ ...prevForm, etat: e.target.value }))
                              }
                              value={formPropositionQCM.etat || 0}
                           >
                              <option value="1">Vrai</option>
                              <option value="0">Faux</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="error">
                  Annuler
               </Button>
               <Button onClick={handleSave} color="primary">
                  Enregistrer
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

const DeleteProposition = ({ proposition, setUpdate }) => {
   const requestURL = "/admin/qcmproposition/";
   const [open, setOpen] = useState(false);
   //const [formLink, setFormLink] = useState([]);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const handleClose = () => {
      setOpen(false);
   };
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleSave = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      setSave(true);
   };
   return (
      <>
         <DeleteIcon sx={{ color: "red", fontSize: "30px" }} onClick={handleClickOpen} />

         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Suppression d'une proposition</DialogTitle>
            <DialogContent>
               <>
                  {errorServeur && <MessageErrorServeur />}
                  {save && (
                     <SaveComponent
                        setSave={setSave}
                        save={save}
                        requestURL={requestURL}
                        requestBody={null}
                        requestMethode={"DELETE"}
                        requestParam={proposition && proposition.id ? proposition.id : null}
                        setErrorServeur={setErrorServeur}
                        setError={setError}
                        setUpdate={setUpdate}
                     />
                  )}

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
                  <br />

                  <div>
                     <span>Cette operation est irréversible</span>
                  </div>
               </>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="error">
                  Annuler
               </Button>
               <Button onClick={handleSave} color="primary">
                  Supprimer
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};
