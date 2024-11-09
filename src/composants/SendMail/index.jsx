import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { MessageErrorServeur } from "../MessageComponent";
import SaveComponent from "../SaveComponent";

export default function SendMail({ etudiant, setUpdate }) {
   const [formMail, setFormMail] = useState({});
   const requestURL = "/admin/sendmail/";
   const [open, setOpen] = useState(false);
   const [success, setSuccess] = useState(false);
   const [showEdit, setShowEdit] = useState(true);
   //const [formLink, setFormLink] = useState([]);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const handleClose = () => {
      setFormMail({});
      setSuccess(false);
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
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
         <Button variant="contained" onClick={handleClickOpen} color="success">
            Envoyer un mail a cet apprenant
         </Button>

         <Dialog open={open} fullWidth onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Envoyer un mail a {etudiant.nom}</DialogTitle>
            <DialogContent>
               {success ? (
                  <>
                     <div>
                        <span>
                           Le mail a été envoyé avec succès à l'apprenant
                           <span style={{ fontWeight: 500 }}>{" " + etudiant.nom + " " + etudiant.prenom}</span>
                        </span>
                        <br />
                        <br />
                        <span>
                           Via l'email: <span style={{ fontWeight: 500, color: "red" }}>{etudiant.email}</span>
                        </span>
                     </div>
                  </>
               ) : (
                  <div>
                     {errorServeur && <MessageErrorServeur />}
                     {save && (
                        <SaveComponent
                           setSave={setSave}
                           save={save}
                           requestURL={requestURL}
                           requestBody={formMail}
                           requestMethode={"POST"}
                           requestParam={etudiant && etudiant.id ? etudiant.id : null}
                           setErrorServeur={setErrorServeur}
                           setError={setError}
                           functionToExcecuteAfterGoodOperation={() => {
                              setSuccess(true);
                           }}
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
                        <div name="objet_du_mail" className="divChamp">
                           <div className="subDivChamp">
                              <label className="labelSignIn">Objet du mail</label>
                              <input
                                 style={{ padding: 5, borderRadius: 5 }}
                                 type="text"
                                 placeholder="Objet du mail"
                                 value={formMail.objet}
                                 onChange={(event) =>
                                    setFormMail((prevForm) => ({ ...prevForm, objet: event.target.value }))
                                 }
                              />
                           </div>
                        </div>

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
                                 value={formMail.bodyHtml}
                                 onChange={(e) => {
                                    setFormMail({ ...formMail, bodyHtml: e.target.value });
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
                                 dangerouslySetInnerHTML={{ __html: formMail.bodyHtml }}
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
                     </div>
                  </div>
               )}
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="error">
                  Fermer
               </Button>
               {!success && (
                  <Button onClick={handleSave} color="primary">
                     Envoyer
                  </Button>
               )}
            </DialogActions>
         </Dialog>
      </>
   );
}
