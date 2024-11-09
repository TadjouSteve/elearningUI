import React, { useContext, useEffect, useState } from "react";
import "./dashbordProfCSS.css";
import { useFetch } from "../../../utils/hooks/FetchData";
import { Button, CircularProgress } from "@mui/material";
import { MessageErrorServeur } from "../../../composants/MessageComponent";
import { truncateText } from "../../../utils/fonctions";
import { AppContext } from "../../../context";
import SaveComponent from "../../../composants/SaveComponent";
import Header from "../../../composants/Header";
import Footer from "../../../composants/Footer";
import { Container } from "react-bootstrap";

export default function DashboardProf() {
   const [selectedModule, setSelectedModule] = useState({});
   const [update, setUpdate] = useState(true);
   const [selectedChapitre, setSelectedChapitre] = useState({});
   const [idChapitreSelected, setIdChapitreSelected] = useState(0);
   const [displayAll, setDisplayAll] = useState(false);
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
   return (
      <>
         <Container fluid style={{ padding: 0 }}>
            <Header />
            <div className="profDashBloc01">
               <span>Correction des réponses envoyées par les apprenants du programme de leadership</span>
               <span style={{ color: "red" }}>
                  Les opérations effectuées ici sont très sensibles, restez concentrés.
               </span>
            </div>
            {isLoading ? (
               <div style={{ height: "100vh", width: "100vw", paddingTop: "20%", paddingLeft: "50%" }}>
                  <CircularProgress size={40} />
               </div>
            ) : error ? (
               <MessageErrorServeur />
            ) : (
               <>
                  {displayAll && (
                     <div className="mainDivDashProf">
                        <SelectModuleAndChapitre
                           listModule={data}
                           selectedModule={selectedModule}
                           setSelectedModule={setSelectedModule}
                           selectedChapitre={selectedChapitre}
                           setSelectedChapitre={setSelectedChapitre}
                           setIdChapitreSelected={setIdChapitreSelected}
                           setUpdate={setUpdate}
                        />
                        <CorrectionQRO
                           selectedChapitre={selectedChapitre}
                           idChapitreSelected={idChapitreSelected}
                           update={update}
                           setUpdate={setUpdate}
                        />
                        <div className="maindivShowDataDashProf"></div>
                     </div>
                  )}
               </>
            )}
            <Footer />
         </Container>
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
         <div className="menuDashProf">
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
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
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
               <label htmlFor="selectChapitre">Choisissez un chapitre:</label>
               <select
                  className="inputSignIn"
                  id="selectChapitre"
                  value={selectedChapitre.idChapitre}
                  onChange={handleChapitreChange}
               >
                  {selectedModule.chapitres.map((chapitre) => (
                     <option key={chapitre.idChapitre} value={chapitre.idChapitre}>
                        {truncateText(chapitre.titre, 30)}
                     </option>
                  ))}
               </select>
            </div>
         </div>
      </>
   );
}

function CorrectionQRO({ selectedChapitre, idChapitreSelected, update, setUpdate }) {
   const { isLoading, data, error } = useFetch(
      "/professeur/next/etudiantchapitre/",
      "GET",
      null,
      selectedChapitre.idChapitre,
      update
   );
   console.log("FormCorrectionQro:", data);
   console.log("idChapitreSelected == ", idChapitreSelected);
   return (
      <>
         <div className="mainBodyCorrectionProf">
            <div style={{ marginTop: 20, fontWeight: "bold", fontSize: "20px", textAlign: "center" }}>
               <span>
                  Module: <span>{selectedChapitre.titreModule}</span>
               </span>
            </div>
            <div
               style={{
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  //justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <span style={{ fontSize: "17px" }}>
                  Chapitre: <span>{selectedChapitre.titre + " (" + selectedChapitre.totalQRO + ")"} </span>
               </span>

               <span style={{ fontSize: "13px" }}>
                  Nombre de QRO presents: <span>{selectedChapitre.totalQRO} </span>
               </span>
            </div>

            {isLoading ? (
               <div>
                  <CircularProgress size={40} />
               </div>
            ) : error ? (
               <MessageErrorServeur />
            ) : (
               <>
                  {data.etudiant ? (
                     <>
                        <div
                           style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              //padding: "15px",
                              gap: 10,
                           }}
                        >
                           <span>
                              Nom de l'apprenant:{" "}
                              <span style={{ fontWeight: "700" }}>
                                 {data.etudiant.nom + " " + data.etudiant.prenom};
                              </span>
                           </span>
                           <span>
                              Profil: <span style={{ fontWeight: "700" }}>{data.etudiant.gammeEtudiant.nom};</span>
                           </span>
                           <span>
                              Region: <span style={{ fontWeight: "500" }}>{data.etudiant.region.nom};</span>
                           </span>

                           <span>
                              Email: <span style={{ fontWeight: "500" }}>{data.etudiant.email};</span>
                           </span>
                           <span>
                              Telephone: <span style={{ fontWeight: "500" }}>{data.etudiant.telephone}</span>
                           </span>
                        </div>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                           <DisplayQroWithReponde listQroEtudaint={data.qroEtudiants} setUpdate={setUpdate} />
                        </div>
                     </>
                  ) : (
                     <div
                        style={{ fontSize: 20, textAlign: "center", marginTop: 40, fontWeight: "500", color: "gray" }}
                     >
                        {selectedChapitre.totalQRO === 0 ? (
                           <>
                              <span>Ce chapitre ne contient pas de QRO, et donc aucune réponse à corriger</span>
                           </>
                        ) : (
                           <>
                              <span style={{ color: "green" }}>
                                 Toutes les réponses des apprenants pour ce chapitre ont déjà été corrigées
                              </span>
                           </>
                        )}
                     </div>
                  )}
               </>
            )}
         </div>
      </>
   );
}

const DisplayQroWithReponde = ({ listQroEtudaint, setUpdate }) => {
   const { language, user } = useContext(AppContext);
   const [notes, setNotes] = useState({});
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });
   var isfrench = language === "FR";

   const handleNoteChange = (id, value) => {
      // Validation : la note doit être entre 0 et 10
      const note = Math.max(0, Math.min(10, Number(value))); // Clamp entre 0 et 10
      setNotes((prevNotes) => ({
         ...prevNotes,
         [id]: note,
      }));
   };

   const handleSubmit = () => {
      const dataToSend = Object.keys(notes).map((idQroEtudant) => ({
         idElement: idQroEtudant,
         note: notes[idQroEtudant],
      }));
      console.log("liste des notes == ", dataToSend);
      if (dataToSend.length !== listQroEtudaint.length) {
         alert("Toutes les notes doivent être saisies avant l'envoi !");
         return;
      } else {
         setSave(true);
      }

      // Envoi des données après validation
      // fetch(...)
   };

   return (
      <>
         {listQroEtudaint.map((qroEtudiant, index) => (
            <>
               <div className="itemQRODiv">
                  <div name="intituleQROfrancais" className="divChamp">
                     <div className="subDivChamp">
                        <label className="labelQro" style={{ fontSize: "16px", fontWeight: 500 }}>
                           {index + 1 + " ) "} {isfrench ? qroEtudiant.qro.intitule : qroEtudiant.qro.intituleEn}
                        </label>
                        <div
                           style={{
                              //minHeight: "40px",
                              border: "2px solid gray",
                              backgroundColor: "rgba(176, 170, 170, 0.6)",
                              borderRadius: 5,
                              display: "flex",
                              flexDirection: "column",
                              alignContent: "space-between",
                              padding: 5,
                           }}
                        >
                           <span style={{ fontWeight: 700, fontSize: 16, fontStyle: "italic" }}>
                              {qroEtudiant.reponse}
                           </span>
                        </div>
                        <div style={{ padding: 5 }}>
                           <span>
                              Note:{" "}
                              <input
                                 style={{ width: 150 }}
                                 type="number"
                                 min="0"
                                 max="10"
                                 step="0.5"
                                 value={notes[qroEtudiant.id] || ""}
                                 onChange={(e) => handleNoteChange(qroEtudiant.id, e.target.value)}
                                 placeholder="Note (0-10)"
                              />
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         ))}
         <div>
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
         <div>
            <Button
               fullWidth
               variant="contained"
               onClick={() => {
                  handleSubmit();
               }}
            >
               Envoyer les notes
            </Button>

            {save && (
               <SaveComponent
                  setSave={setSave}
                  requestURL={"/professeur/savescrore/qro/"}
                  requestBody={Object.keys(notes).map((idQro) => ({
                     idElement: idQro,
                     note: notes[idQro],
                  }))}
                  requestMethode={"POST"}
                  requestParam={null}
                  setErrorServeur={setErrorServeur}
                  setError={setError}
                  setUpdate={setUpdate}
                  redirected={false}
               />
            )}
         </div>
      </>
   );
};
