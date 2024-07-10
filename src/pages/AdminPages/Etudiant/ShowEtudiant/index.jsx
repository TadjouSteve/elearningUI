import React, { useState } from "react";
import { useFetch } from "../../../../utils/hooks/FetchData";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import { appColor } from "../../../../utils/data";

export default function ShowEtudiant() {
   const { matriculeEtudiant } = useParams();
   const [filter, setFilter] = useState(null);
   //const { isOnline, language } = useContext(AppContext);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/admin/etudiant/${matriculeEtudiant}`, "GET", null, filter, update);
   return (
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
               <InfoGeneral formEtudiant={data} />
               <InfoModules formEtudiant={data} />
            </>
         )}
      </Container>
   );
}

const InfoGeneral = ({ formEtudiant }) => {
   let etudiant = formEtudiant
      ? formEtudiant.etudiant
      : {
           matricule: "",
           nom: "",
           prenom: "",
           email: "",
           dateInscription: "",
           profession: "",
           region: "",
           age: "",
           statut: "",
        };
   let etudiantModules = formEtudiant ? formEtudiant.etudiantModules : [];

   let etudiantChapitres = formEtudiant ? formEtudiant.etudiantChapitres : [];

   let chapitreSimpleforms = formEtudiant ? formEtudiant.chapitreSimpleforms : [];
   return (
      <Row style={{ marginTop: 20, marginBottom: 10 }}>
         <Col md={6}>
            <div
               style={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                  borderRadius: 5,
               }}
            >
               <h3>Informations générales</h3>
               <span>Matricule : {etudiant.matricule}</span>
               <span>Nom : {etudiant.nom}</span>
               <span>Prénom : {etudiant.prenom}</span>
               <span>Email : {etudiant.email}</span>
               <span>Télephone: {etudiant.telephone}</span>
               <span>
                  Date d'inscription :{" "}
                  {new Date(etudiant.dateInscription).toLocaleDateString("fr-FR", {
                     day: "numeric",
                     month: "long",
                     year: "numeric",
                  })}
               </span>
               <span>Profession : {etudiant.profession}</span>
               <span>Région : {etudiant.region?.nom}</span>
            </div>
         </Col>
         <Col md={6}>
            <div
               style={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                  borderRadius: 5,
               }}
            >
               <h3>Evalution sur la formation</h3>
               <span>Module debuter: {etudiantModules.length}</span>
               <span>Cour / chapitre Lu : {etudiantChapitres.length}</span>
               <span>
                  QCM Valider :{" "}
                  {etudiantChapitres.reduce((total, chapitre) => total + chapitre.qcmValide, 0) +
                     " sur " +
                     chapitreSimpleforms.reduce((total, item) => total + item.qcm, 0)}{" "}
               </span>
               <span>
                  Dernierre Connexion :
                  {new Date(etudiant.lastConnexion).toLocaleDateString("fr-FR", {
                     day: "numeric",
                     month: "long",
                     year: "numeric",
                  })}
               </span>
            </div>
         </Col>
      </Row>
   );
};

const InfoModules = ({ formEtudiant }) => {
   let moduleSimpleForms = formEtudiant ? formEtudiant.moduleSimpleForms : [];
   let chapitreSimpleforms = formEtudiant ? formEtudiant.chapitreSimpleforms : [];
   let etudiantChapitres = formEtudiant ? formEtudiant.etudiantChapitres : [];
   let etudiantModules = formEtudiant ? formEtudiant.etudiantModules : [];

   console.log("== Moduleform == ", moduleSimpleForms);
   return (
      <>
         {moduleSimpleForms.map((module, index) => (
            <InfoByModule formEtudiant={formEtudiant} module={module} />
         ))}
      </>
   );
};

const InfoByModule = ({ formEtudiant, module }) => {
   let moduleSimpleForms = formEtudiant ? formEtudiant.moduleSimpleForms : [];
   let chapitreSimpleforms = formEtudiant ? formEtudiant.chapitreSimpleforms : [];
   let etudiantChapitres = formEtudiant ? formEtudiant.etudiantChapitres : [];
   let etudiantModules = formEtudiant ? formEtudiant.etudiantModules : [];

   let ModuleChapitres = [];
   let dateDebut;
   let courLu = 0;
   let courTotal = 0;
   let isStarted = false;
   let qcmValider = 0;
   let totalQcm = 0;

   chapitreSimpleforms.forEach((element, index) => {
      if (element.idModule == module.idModule) {
         //let chapitre01=element;
         etudiantChapitres.forEach((etudiantChapitre, indexEtuChap) => {
            if (etudiantChapitre.chapitre.idChapitre == element.idChapitre) {
               element.etudiantChapitre = etudiantChapitre;
               qcmValider += etudiantChapitre.qcmValide;
               courLu++;
            }
         });
         ModuleChapitres.push(element);
         totalQcm += element.qcm;
         courTotal++;
      }
   });

   etudiantModules.forEach((etudiantModule, index) => {
      if (etudiantModule.module.idModule == module.idModule) {
         dateDebut = etudiantModule.dateDebut;
         isStarted = true;
      }
   });

   console.log("== Moduleform == ", moduleSimpleForms);
   return (
      <Row style={{ marginTop: 20, marginBottom: 10 }}>
         <Col>
            <div
               style={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                  borderRadius: 5,
               }}
            >
               <h5>Module: {module.titre}</h5>
               <span>
                  Debuter le :
                  <span>
                     {dateDebut
                        ? new Date(dateDebut).toLocaleDateString("fr-FR", {
                             day: "numeric",
                             month: "long",
                             year: "numeric",
                          })
                        : "---"}
                  </span>
               </span>

               <span>
                  Cours commencés :: <span>{`${courLu} sur ${courTotal}`}</span>
               </span>
               <span>
                  QCM Validés: <span>{`${qcmValider} sur ${totalQcm}`}</span>
               </span>

               <span>
                  Statut: <span>{isStarted ? "Commencer" : "Non Commencer"}</span>
               </span>
               {!isStarted && (
                  <div
                     style={{ fontSize: 18, color: appColor.rouge, fontWeight: 700, marginTop: 10, marginBottom: 10 }}
                  >
                     <span>L'etudiant n'as pas encore debuter avec ce chapitre</span>
                  </div>
               )}

               {isStarted && (
                  <div>
                     <Table>
                        <thead style={{ position: "sticky", top: 0, background: "white" }}>
                           <tr>
                              <th>N°</th>
                              <th>Cour / Chapite</th>
                              <th>date debut</th>
                              <th>QCM validé</th>
                              <th>Qcm total</th>
                              <th>Statut</th>
                           </tr>
                        </thead>
                        <tbody>
                           {ModuleChapitres.map((chapitre, index) => (
                              <tr key={chapitre.idChapitre}>
                                 <td>{index + 1} </td>
                                 <td>{chapitre.titre}</td>
                                 <td>
                                    {chapitre.etudiantChapitre
                                       ? new Date(chapitre.etudiantChapitre.dateDebut).toLocaleDateString("fr-FR", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                         })
                                       : "---"}
                                 </td>
                                 <td>{chapitre.etudiantChapitre ? chapitre.etudiantChapitre.qcmValide : "0"}</td>
                                 <td>{chapitre.qcm}</td>
                                 <td
                                    style={{
                                       fontWeight: 700,
                                       color:
                                          chapitre.etudiantChapitre &&
                                          chapitre.etudiantChapitre.qcmValide >= chapitre.qcm / 2
                                             ? "green"
                                             : "red",
                                    }}
                                 >
                                    {chapitre.etudiantChapitre &&
                                    chapitre.etudiantChapitre.qcmValide >= chapitre.qcm / 2
                                       ? "Valider"
                                       : "Non Valider"}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </div>
               )}
            </div>
         </Col>
      </Row>
   );
};
