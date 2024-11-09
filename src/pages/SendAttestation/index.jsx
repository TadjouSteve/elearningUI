import React, { useEffect, useState } from "react";
import { useFetch } from "../../utils/hooks/FetchData";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { MessageErrorServeur } from "../../composants/MessageComponent";
import { Link, useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/fonctions";
import { Checkbox, CircularProgress, FormControlLabel, TextField } from "@mui/material";
import SaveComponent from "../../composants/SaveComponent";
import Etudiant from "../AdminPages/Etudiant";

export default function SendAttestation() {
   const navigation = useNavigate();
   const [save, setSave] = useState(false);
   const [selectedModule, setSelectedModule] = useState({});
   const [update, setUpdate] = useState(true);
   const [selectedChapitre, setSelectedChapitre] = useState({});
   const [idChapitreSelected, setIdChapitreSelected] = useState(0);
   const [displayAll, setDisplayAll] = useState(false);

   const [sendToAll, setSendToAll] = useState(true);
   const [matricule, setMatricule] = useState(null);

   const { isLoading, data, error } = useFetch("/professeur/list/modules", "GET");

   //console.log("List FormModule:", data);
   useEffect(() => {
      if (!isLoading && !error) {
         setSelectedModule(data[0]);
         setSelectedChapitre(data[0].chapitres[0]);
         setIdChapitreSelected(data[0].chapitres[0].idChapitre);
         setDisplayAll(true);
      }
   }, [isLoading, data, error, setDisplayAll]);

   const sendMailAction = () => {
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
               <span>Envoi des Attestation par mail</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/mail"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Attestation{" "}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
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

         {isLoading ? (
            <div style={{ height: "100vh", width: "100vw", paddingTop: "20%", paddingLeft: "50%" }}>
               <CircularProgress size={40} />
            </div>
         ) : error ? (
            <MessageErrorServeur />
         ) : (
            <Container fluid>
               <Row>
                  <SelectModuleAndChapitre
                     listModule={data}
                     selectedModule={selectedModule}
                     setSelectedModule={setSelectedModule}
                     selectedChapitre={selectedChapitre}
                     setSelectedChapitre={setSelectedChapitre}
                     setIdChapitreSelected={setIdChapitreSelected}
                     setUpdate={setUpdate}
                  />
               </Row>
               <Row style={{ marginTop: 20 }}>
                  <Col style={{ backgroundColor: "white", margin: 10, borderRadius: 5, padding: 10 }}>
                     <span>
                        <label>Envoyer une Attestation a tout les apprenant ayant suivi le chapitre selectione</label>
                        <br></br>

                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={sendToAll}
                                 onChange={() => {
                                    setSendToAll((prev) => !prev);
                                 }}
                                 name="gilad"
                              />
                           }
                           label="Oui"
                        />

                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={!sendToAll}
                                 onChange={() => {
                                    setSendToAll((prev) => !prev);
                                 }}
                                 name="gilad"
                              />
                           }
                           label="Non"
                        />
                     </span>
                  </Col>
                  <Col style={{ backgroundColor: "white", margin: 10, borderRadius: 5, padding: 10 }}>
                     {!sendToAll && (
                        <div>
                           <label>Matricule de l'apprenant qui recevra l'Attestation</label>
                           <br></br>
                           <input
                              type="text"
                              onChange={(event) => {
                                 setMatricule(event.target.value);
                              }}
                           />
                        </div>
                     )}
                  </Col>
               </Row>

               <SendAttestaion idChapitre={idChapitreSelected} sendToAll={sendToAll} matricule={matricule} />
            </Container>
         )}
      </>
   );
}

function SelectModuleAndChapitre({
   listModule,
   selectedModule,
   setSelectedModule,
   selectedChapitre,
   setSelectedChapitre,
   setIdChapitreSelected,
   setUpdate,
}) {
   const handleModuleChange = (event) => {
      console.log("target value == ", event.target.value);
      const newModule = listModule.find((module) => module.idModule === event.target.value * 1);
      console.log("Nouveau module == ", newModule);
      setSelectedModule(newModule);
      // Mettre à jour le chapitre sélectionné avec le premier chapitre du nouveau module
      setSelectedChapitre(newModule.chapitres[0]);
      setIdChapitreSelected(newModule.chapitres[0].idChapitre);
      setTimeout(() => {
         setUpdate((prev) => !prev);
      }, 200);
   };

   // Gestion du changement de chapitre
   const handleChapitreChange = (event) => {
      //const newChapitre = event.target.value;
      const newChapitre = selectedModule.chapitres.find((chapitre) => chapitre.idChapitre === event.target.value * 1);
      console.log("nouveau choi chap === ", newChapitre);
      setSelectedChapitre(newChapitre);
      setIdChapitreSelected(newChapitre.idChapitre);
      setTimeout(() => {
         setUpdate((prev) => !prev);
      }, 200);
   };

   return (
      <>
         <Col
            style={{
               display: "flex",
               flexDirection: "column",
               gap: 5,
               backgroundColor: "white",
               borderRadius: 5,
               margin: 10,
               padding: 10,
            }}
         >
            <label htmlFor="selectModule">Choisissez un module:</label>
            <select
               className="inputSignIn"
               id="selectModule"
               value={selectedModule.idModule}
               onChange={handleModuleChange}
            >
               {listModule.map((module) => (
                  <option key={module.idModule} value={module.idModule}>
                     {truncateText(module.titre, 25)}
                  </option>
               ))}
            </select>
         </Col>
         <Col
            style={{
               display: "flex",
               flexDirection: "column",
               gap: 5,
               backgroundColor: "white",
               borderRadius: 5,
               margin: 10,
               padding: 10,
            }}
         >
            <label htmlFor="selectChapitre">Choisissez un chapitre:</label>
            <select
               className="inputSignIn"
               id="selectChapitre"
               value={selectedChapitre.idChapitre}
               onChange={(event) => handleChapitreChange(event)}
            >
               {selectedModule?.chapitres?.map((chapitre) => (
                  <option key={chapitre.idChapitre} value={chapitre.idChapitre}>
                     {truncateText(chapitre.titre, 30)}
                  </option>
               ))}
            </select>
         </Col>
      </>
   );
}

function SendAttestaion({ idChapitre, sendToAll, matricule }) {
   const [save, setSave] = useState(false);
   const [listEtudiants, setListEtudiants] = useState([]);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const navigation = useNavigate();
   const afterSuccessOperation = (data) => {
      if (data && Array.isArray(data)) {
         setListEtudiants(data);
      }
   };

   return (
      <>
         <Row style={{ marginTop: 20, padding: 5 }}>
            <div
               style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 5,
               }}
            >
               <Button
                  onClick={() => {
                     setSave(true);
                  }}
               >
                  Envoyer{" "}
                  {!sendToAll
                     ? "l'attesation a l'etudiant ayant le matricule saisi"
                     : " les attestions a tout les apprenat ayant lu ce cour"}
               </Button>
               <span>
                  idChapitre:{idChapitre} || Matricule:{matricule}
               </span>
            </div>
         </Row>

         <Row style={{ marginTop: 20, padding: 5 }}>
            {listEtudiants && listEtudiants.length > 0 && (
               <>
                  <div style={{ margin: 10 }}>
                     <h3>Listes des personnes ayant recu leur attestation par mail ({listEtudiants.length})</h3>
                  </div>
                  <Table>
                     <thead>
                        <tr>
                           <th>Matricule</th>
                           <th>Mom & prenom</th>
                           <th>email</th>
                           <th>Telephone</th>
                           <th>profil</th>
                           <th>region</th>
                        </tr>
                     </thead>
                     <tbody>
                        {listEtudiants.map((etudiant) => (
                           <tr
                              key={etudiant.id}
                              style={{ height: "40px" }}
                              onClick={() => {
                                 navigation(`/etudiant/${etudiant.matricule}`);
                              }}
                           >
                              <td>{etudiant.matricule}</td>
                              <td>{etudiant.nom + "   " + etudiant.prenom}</td>
                              <td>{etudiant.email}</td>
                              <td>{etudiant.telephone}</td>
                              <td>{etudiant.gammeEtudiant?.nom}</td>
                              <td>{etudiant.region?.nom}</td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               </>
            )}
         </Row>

         {save && (
            <SaveComponent
               setSave={setSave}
               requestURL={"/admin/generete/attestation/"}
               requestBody={{ idElement: idChapitre, sendToAll: sendToAll, matricule: sendToAll ? null : matricule }}
               requestMethode={"POST"}
               requestParam={null}
               setErrorServeur={setErrorServeur}
               setError={setError}
               functionToExcecuteAfterGoodOperation={afterSuccessOperation}
            />
         )}
      </>
   );
}
