import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../../utils/hooks/FetchData";
import SendMail from "../../../../composants/SendMail";

export default function ShowCandidature() {
   const { idCandidature } = useParams();
   const [filter, setFilter] = useState(null);
   //const { isOnline, language } = useContext(AppContext);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/admin/candidature/${idCandidature}`, "GET", null, filter, update);

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
               <InfoGeneral etudiant={data.etudiant} />
               <DisplayDataCandidature candidature={data} />
            </>
         )}
      </Container>
   );
}

const InfoGeneral = ({ etudiant }) => {
   etudiant = etudiant
      ? etudiant
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

   return (
      <Row style={{ marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
         <Col>
            <div
               style={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                  borderRadius: 5,
               }}
            >
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
                  <SendMail etudiant={etudiant} />
               </div>
               <div
                  style={{
                     backgroundColor: "white",
                     display: "flex",
                     flexDirection: "column",
                     padding: 10,
                     borderRadius: 5,
                  }}
               >
                  <span>Email : {etudiant.email}</span>
                  <span>Profil : {etudiant.gammeEtudiant?.nom}</span>
                  <span>Télephone: {etudiant.telephone}</span>
                  <span>
                     Date d'inscription :{" "}
                     {new Date(etudiant.dateInscription).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                     })}
                  </span>
                  <span>Région : {etudiant.region?.nom}</span>
               </div>
            </div>
         </Col>
      </Row>
   );
};

const DisplayDataCandidature = ({ candidature }) => {
   let etudiant = candidature.etudiant;
   let nomDossierPrive = (etudiant.matricule + " " + etudiant.nom + " " + etudiant.prenom).replace(/ /g, "_");

   return (
      <Row style={{ marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
         <Col>
            <div
               style={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  //justifyContent: "space-evenly",
                  padding: 10,
                  borderRadius: 5,
               }}
            >
               <h4>Donnees soumises pour candidature au salon de l'entrepreneur</h4>

               <Table>
                  <thead>
                     <tr>
                        <th>Champs</th>
                        <th>Reponses</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Non Entreprise</td>
                        <td>{candidature.nomEntreprise}</td>
                     </tr>
                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Nombre d'annee de l'entreprise</td>
                        <td>{candidature.anneeExistance}</td>
                     </tr>
                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Secteur d’activité</td>
                        <td>{candidature.secteurActivite}</td>
                     </tr>
                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Chiffre d’affaires de l’année dernière </td>
                        <td>{candidature.chiffreAffaire}</td>
                     </tr>
                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Chiffre prévisionnel sur les 6-12 mois</td>
                        <td>{candidature.chiffreAffairePrev}</td>
                     </tr>
                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Valeur ajoutée de votre produit ou service</td>
                        <td>{candidature.propositionValeur}</td>
                     </tr>
                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Types de clients spécifiques actuellement? </td>
                        <td>{candidature.segmentClientele}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Références de 12 de vos clients </td>
                        <td>{candidature.referenceClient}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>
                           Canaux de distribution actuels ou prévisionnel{" "}
                        </td>
                        <td>{candidature.canauxDistribution}</td>
                     </tr>
                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>
                           Comment entretenez-vous votre relation client{" "}
                        </td>
                        <td>{candidature.relationClient}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Sources de revenus actuelles </td>
                        <td>{candidature.sourceRevenu}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Énumérez et dénombrez vos ressources clés </td>
                        <td>{candidature.ressourcesCles}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Coût de fonctionnement mensuel </td>
                        <td>{candidature.coutFonctionnement}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Nombre d'employee</td>
                        <td>{candidature.nombreEmploye}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>
                           Sur une échèle de 1 à 10, notez votre entreprise
                        </td>
                        <td>{candidature.autoevaluation}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Politique d’Autorentabilité</td>
                        <td>{candidature.politiqueAutorentabilite}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Politique de fonctionnement durable</td>
                        <td>{candidature.politiqueFonctionnement}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Rencontrer des investisseurs?</td>
                        <td>{candidature.rencontreInvestisseur ? candidature.rencontreInvestisseur : "oui"}</td>
                     </tr>

                     <tr>
                        <td style={{ fontWeight: 500, fontSize: 14 }}>Type d’investissement</td>
                        <td>{candidature.typeInvestissement ? candidature.typeInvestissement : "Subventions"}</td>
                     </tr>
                  </tbody>
               </Table>

               {candidature.lienVideo ? (
                  <>
                     <div
                        style={{
                           width: "100%",
                           maxWidth: "600px",
                           margin: "auto",
                           border: "1px solid #ccc",
                           padding: "10px",
                           marginTop: "20px",
                        }}
                     >
                        <video controls style={{ width: "100%" }}>
                           <source
                              src={`/user/documents/${nomDossierPrive}/` + candidature.lienVideo}
                              type="video/mp4"
                           />
                           Votre navigateur ne supporte pas la balise vidéo.
                        </video>
                     </div>

                     <div>
                        <a
                           href={`${process.env.PUBLIC_URL}/user/documents/${nomDossierPrive}/${candidature.businessPlan}`}
                           download={candidature.businessPlan}
                           className="download-button02"
                        >
                           Télécharger le Bussness plan du candidat
                        </a>
                     </div>
                  </>
               ) : (
                  <>
                     <h4>Aucune video n'a ete envoyer par le candidat</h4>
                  </>
               )}

               {candidature.facture && (
                  <>
                     <div>
                        <a
                           href={`${process.env.PUBLIC_URL}/user/documents/${nomDossierPrive}/${candidature.facture}`}
                           download={candidature.facture}
                           className="download-button02"
                           style={{ backgroundColor: "green" }}
                        >
                           Télécharger la facture envoyer par le candidat
                        </a>
                     </div>
                  </>
               )}

               {candidature.conformite && (
                  <>
                     <div>
                        <a
                           href={`${process.env.PUBLIC_URL}/user/documents/${nomDossierPrive}/${candidature.conformite}`}
                           download={candidature.conformite}
                           className="download-button02"
                           style={{ backgroundColor: "pink" }}
                        >
                           Télécharger l'attestation de conformite du candidat
                        </a>
                     </div>
                  </>
               )}
            </div>
         </Col>
      </Row>
   );
};
