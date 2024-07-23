import React, { useState } from "react";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Table } from "react-bootstrap";
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import SaveComponent from "../../../../../composants/SaveComponent";

export default function ShowModuleAdmin() {
   const { idModule } = useParams();
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/admin/module/${idModule}`, "GET", null, null, update);

   const handleModifierClick = () => {
      // Logique pour gérer le clic sur le bouton "Modifier"
      navigation(`/module/alter/${idModule}`);
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
                  Module <span>{data && data.module ? `${data.module.titre}` : null}</span>
               </span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/modules"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Module{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={"/module/" + idModule} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     {data && data.module ? `${data.module.titre}` : null}{" "}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
               <Button variant="contained" onClick={handleModifierClick} color="success">
                  Modifier
               </Button>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation(-1);
                  }}
                  color="error"
               >
                  Bloquer
               </Button>
            </div>
         </div>
         <Container fluid style={{ margin: 0, padding: 0 }}>
            {/* Your component content goes here */}
            {isLoading ? (
               <div style={{ marginLeft: "40%" }}>
                  <CircularProgress size={40} />
               </div>
            ) : error ? (
               <MessageErrorServeur />
            ) : (
               <>
                  <InformationGeneral formModule={data} />
                  <GammeEtudiantAssocier formModule={data} gammeEtudiants={data.gammeEtudiants} setUpdate={setUpdate} />
                  <ListCourModule formModule={data} />
               </>
            )}
         </Container>
      </>
   );
}

const InformationGeneral = ({ formModule }) => {
   let module = {};
   module = formModule?.module;
   return (
      <>
         <Row style={{ margin: 10, padding: 5 }}>
            <div
               style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 5,
                  backgroundColor: "white",
                  borderRadius: 5,
                  padding: 5,
               }}
            >
               <div name="info_static" style={{ display: "flex", flexDirection: "column", flex: 1, padding: 5 }}>
                  <span>
                     <span style={{ fontWeight: 600 }}>Titre : </span>
                     {module.titre}
                  </span>
                  <span>
                     <span style={{ fontWeight: 600 }}>Titre anglais : </span>
                     {module.titreEn}
                  </span>
                  <span style={{ marginTop: 3 }}>
                     <span style={{ fontWeight: 600 }}>Description : </span>
                     {module.description}
                  </span>
                  <span style={{ marginTop: 3 }}>
                     <span style={{ fontWeight: 600 }}>Description anglais : </span>
                     {module.descriptionEn}
                  </span>

                  <span style={{ marginTop: 3 }}>
                     <span style={{ fontWeight: 600 }}>Date deblocage du module : </span>
                     {new Date(module.dateDeblocage).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                     })}
                  </span>

                  <span style={{ marginTop: 10, color: "green" }}>
                     <span style={{ fontWeight: 600 }}>Lien (url) de l'image desciptive : </span>
                     {module.nomImage}
                  </span>
               </div>
               <div
                  name="info_dynamique"
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     flex: 1,
                     borderLeft: "solid 4px black",
                     padding: 5,
                     paddingLeft: 10,
                  }}
               >
                  <span>
                     <span style={{ fontWeight: 600 }}>Nombre de Cours / chapitre : </span>
                     {formModule?.nombreCour}
                  </span>
                  <span>
                     <span style={{ fontWeight: 600 }}>Nombre total QCM : </span>
                     {formModule?.nombreQCM}
                  </span>
               </div>
            </div>
         </Row>
      </>
   );
};

const GammeEtudiantAssocier = ({ formModule, gammeEtudiants, setUpdate }) => {
   // gammeEtudiants = gammeEtudiants ? gammeEtudiants : [{}];
   return (
      <Row style={{ margin: 10, padding: 5 }}>
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
            <h3>Gamme d'apprenants associer a ce module</h3>
            <AjoutGammeEtudiantToModule formModule={formModule} setUpdate={setUpdate} />
            {gammeEtudiants?.length === 0 ? (
               <span style={{ fontSize: 17 }}>
                  Ce module n'est associer a aucune gamme d'apprenant sur la plateforme
               </span>
            ) : (
               <Table width={"100%"} hover size="sm" style={{ marginBottom: "0px" }}>
                  <thead
                     className="header"
                     style={{
                        position: "sticky",
                        top: 0,
                        background: "white",
                     }}
                  >
                     <tr>
                        <th>N°</th>
                        <th>Gamme d'apprenant</th>
                        <th>Nbrs Apprenants</th>
                     </tr>
                  </thead>
                  <tbody>
                     {gammeEtudiants.map((gammeEtudiant, index) => (
                        <tr key={gammeEtudiant.id} style={{ height: "40px" }}>
                           <td>{index + 1}</td>
                           <td>{gammeEtudiant.nom}</td>
                           <td>{gammeEtudiant.nombreEtudiant}</td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            )}
         </div>
      </Row>
   );
};

const AjoutGammeEtudiantToModule = ({ formModule, setUpdate }) => {
   const requestURL = "/admin/linkgammmetudianttomodule/";
   const [open, setOpen] = useState(false);
   const [formLink, setFormLink] = useState([]);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   console.log("formModule == ", formModule);
   const handleClose = () => {
      setOpen(false);
   };
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleLinkModule = (event, idElement) => {
      //console.log("formModule == ", formModule)
      let newForm = formLink;
      let link = {
         idElement: idElement,
         isLinked: event.target.checked,
      };

      if (newForm.length === 0) {
         newForm.push(link);
      } else {
         let index = newForm.findIndex((item) => item.idElement === idElement);
         if (index === -1) {
            newForm.push(link);
         } else {
            newForm[index] = link;
         }
      }

      setFormLink(newForm);
      //console.log("formLink == ", formLink)
   };

   const handleSave = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      setSave(true);
   };

   return (
      <>
         <Button variant="contained" onClick={handleClickOpen} color="success">
            Associer ou dissocier une gamme d'apprenant
         </Button>
         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Ajout d'un module au professur {formModule.module.titre}</DialogTitle>
            <DialogContent>
               <div>
                  <span>Selectionner les gammes d'apprenants a associer a ce module</span>
                  <br />
                  {errorServeur && <MessageErrorServeur />}
                  {save && (
                     <SaveComponent
                        setSave={setSave}
                        save={save}
                        requestURL={requestURL}
                        requestBody={formLink}
                        requestMethode={"POST"}
                        requestParam={formModule && formModule.module ? formModule.module.idModule : null}
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
                  {formModule && formModule.allGammeEtudiants
                     ? formModule.allGammeEtudiants.map((item, index) => (
                          <div
                             key={item.id}
                             style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 5,
                                alignItems: "center",
                             }}
                          >
                             <span style={{ flex: 4 }}>{item.nom}</span>
                             <Checkbox
                                color="primary"
                                inputProps={{
                                   "aria-label": "secondary checkbox",
                                }}
                                defaultChecked={formModule.gammeEtudiants.some((item2) => item2.id === item.id)}
                                onChange={(event) => handleLinkModule(event, item.id)}
                                style={{ flex: 1 }}
                             />
                          </div>
                       ))
                     : null}
               </div>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="error">
                  Annuler
               </Button>
               <Button onClick={handleSave} color="primary">
                  Valider
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

const ListCourModule = ({ formModule }) => {
   const navigation = useNavigate();

   let chapitres =
      formModule && formModule?.chapitres.length > 0 ? formModule.chapitres.sort((a, b) => a.ordre - b.ordre) : [];
   return (
      <Row style={{ margin: 10, padding: 5 }}>
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
            <h3>Liste de chapitres de ce module de formation</h3>
            {(!chapitres || chapitres.length) === 0 ? (
               <span style={{ fontSize: 17 }}>Ce module n'as encore aucun chapitres</span>
            ) : (
               <Table width={"100%"} hover size="sm" style={{ marginBottom: "0px" }}>
                  <thead
                     className="header"
                     style={{
                        position: "sticky",
                        top: 0,
                        background: "white",
                     }}
                  >
                     <tr>
                        <th>N°</th>
                        <th>titre</th>
                        <th>Nbrs QCM</th>
                        <th>Ordre</th>
                     </tr>
                  </thead>
                  <tbody>
                     {chapitres.map((chapitre, index) => (
                        <tr
                           key={chapitre.idChapitre}
                           onClick={() => {
                              navigation("/cour/" + chapitre.idChapitre);
                           }}
                           style={{ height: "40px" }}
                        >
                           <td>{index + 1}</td>
                           <td>{chapitre.titre}</td>
                           <td>{chapitre.totalQcm}</td>
                           <td>{chapitre.ordre}</td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            )}
         </div>
      </Row>
   );
};
