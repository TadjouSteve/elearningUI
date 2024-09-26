import React, { useEffect, useRef, useState } from "react";
import "./inscriptionCSS.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../composants/Footer";
import { Button, Container, Row } from "react-bootstrap";
import Header from "../../composants/Header";
import SaveComponent from "../../composants/SaveComponent";
import { MessageErrorServeur } from "../../composants/MessageComponent";

const etoileSpanRed = <span style={{ color: "red" }}> *</span>;
const steps = ["Etape 1", "Etape 2", "Etape 3"];

export default function InscriptionSalon() {
   const [canditature, setCanditature] = useState({});
   const [save, setSave] = useState(false);
   const [activeStep, setActiveStep] = useState(1);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      signUpError: null,
      step: -1,
   });

   const actionSendformConnexion = () => {
      setError((prev) => ({ ...prev, textError: null, step: -1 }));
      setErrorServeur(false);
      setSave(true);
   };

   let navigation = useNavigate();

   const apresEnregistrement = (data) => {
      console.log(" candidature get== ", data);
      if (activeStep === 1) {
         setActiveStep(2);
         setCanditature(data);
         // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
         // navigation("/dashboard"); //dashboard
      } else {
         navigation("/successcandidaturesalonentrepreneur"); //dashboard
      }
   };
   return (
      <>
         <Container
            fluid
            style={{
               padding: 0,
               backgroundColor: "white",
               backgroundImage:
                  "linear-gradient(270deg, rgba(250, 250, 250, 0.471) 63.5%, rgba(250, 250, 250, 0) 100%),url(/images/toto6.jpg)",
               backgroundSize: "cover",
               backgroundPosition: "center",
            }}
         >
            <Header />
            <Row
               style={{
                  justifyContent: "center",
                  minHeight: "80vh",
               }}
            >
               <div className="mainDivInscription" style={{}}>
                  <FormCandidature
                     error={error}
                     canditature={canditature}
                     setCanditature={setCanditature}
                     save={save}
                     setSave={setSave}
                     requestMethode="POST"
                     setError={setError}
                     setErrorServeur={setErrorServeur}
                     errorServeur={errorServeur}
                     activeStep={activeStep}
                     setActiveStep={setActiveStep}
                     actionSendformConnexion={actionSendformConnexion}

                     //actionSaveEtudiant={actionSaveEtudiant}
                  />
               </div>
            </Row>
            {save && (
               <SaveComponent
                  setSave={setSave}
                  requestURL={"/etudiant/candidatsalonentrepreneur/stepone"}
                  //requestBody={{ ...formInscription, informations: [information] }}
                  requestBody={canditature}
                  requestMethode={"POST"}
                  requestParam={null}
                  setErrorServeur={setErrorServeur}
                  setError={setError}
                  //redirected={true}
                  //setActiveStep={setActiveStep}
                  functionToExcecuteAfterGoodOperation={apresEnregistrement}
               />
            )}
            <Footer />
         </Container>
      </>
   );
}

const FormCandidature = ({
   error,
   setActiveStep,
   setSave,
   activeStep,
   errorServeur,
   canditature,
   setCanditature,
   actionSendformConnexion,
}) => {
   return (
      <>
         {activeStep === 1 ? (
            <FirstStep
               error={error}
               errorServeur={errorServeur}
               canditature={canditature}
               setSave={setSave}
               setCanditature={setCanditature}
               setActiveStep={setActiveStep}
               actionSendformConnexion={actionSendformConnexion}
            />
         ) : (
            <SecondStep
               error={error}
               errorServeur={errorServeur}
               canditature={canditature}
               setSave={setSave}
               setCanditature={setCanditature}
               setActiveStep={setActiveStep}
               actionSendformConnexion={actionSendformConnexion}
            />
         )}
      </>
   );
};

const FirstStep = ({
   error,
   errorServeur,
   setActiveStep,
   canditature,
   setSave,
   setCanditature,
   actionSendformConnexion,
}) => {
   const mainTitreRef = useRef(null);

   useEffect(() => {
      mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
   }, []);
   const handleChange = (e) => {
      const { name, value } = e.target;
      setCanditature({
         ...canditature,
         [name]: value,
      });
   };
   return (
      <div
         ref={mainTitreRef}
         className="divFormulaire"
         style={{ display: "flex", flexDirection: "column" }}
         // onKeyUp={(event) => handleKeyPress(event)}
      >
         <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
            <span className="" style={{ fontSize: "1.8rem", fontWeight: 700 }}>
               Formulaire de Candidature pour une Place au Salon de l'Entrepreneuriat
            </span>
         </div>
         <div style={{ marginTop: 10, marginBottom: 18, color: "green", fontWeight: "500" }}>
            <div>
               <strong>NB Avant de commencer :</strong>
               <ul style={{ fontSize: 13, listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                     Préparez une courte vidéo présentant votre prototype ou votre entreprise. Celle-ci vous sera
                     demandée à la suite de ce formulaire.
                  </li>
                  <li>Préparez le document contenant votre business plan.</li>
                  <li>Si vous en avez, préparez votre certificat de conformité.</li>
                  <li>Si possible, la dernière facture conforme payée par un de vos clients.</li>
               </ul>
            </div>
         </div>
         <form
            onSubmit={(event) => {
               event.preventDefault();
               actionSendformConnexion();
            }}
         >
            {error.textError && <span style={{ color: "red", fontWeight: 500, fontSize: 14 }}>{error.textError}</span>}
            <div className="subDivChamp">
               <label className="labelSignIn">
                  Votre Email ou Telephone{etoileSpanRed}{" "}
                  <span style={{ color: "red", fontSize: 12 }}>(celui utiliser pour votre inscription)</span>
               </label>
               <input
                  className="inputSignIn"
                  type="text"
                  maxLength={60}
                  required
                  placeholder=""
                  name="email"
                  value={canditature.email}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label className="labelSignIn">Nom de votre entrepise / projet{etoileSpanRed}</label>
               <input
                  className="inputSignIn"
                  type="text"
                  maxLength={100}
                  required
                  placeholder=""
                  name="nomEntreprise"
                  value={canditature.nomEntreprise}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label className="labelSignIn">Nombre d'annee de votre entreprise</label>
               <input
                  className="inputSignIn"
                  type="number"
                  //maxLength={60}
                  //required
                  placeholder=""
                  name="anneeExistance"
                  value={canditature.anneeExistance}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label className="labelSignIn">Dans quel secteur d’activité exercez-vous {etoileSpanRed}</label>
               <input
                  className="inputSignIn"
                  type="text"
                  //maxLength={60}
                  required
                  placeholder=""
                  name="secteurActivite"
                  value={canditature.secteurActivite}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label className="labelSignIn">
                  Quel est votre chiffre d’affaires de l’année dernière{etoileSpanRed}
               </label>
               <input
                  className="inputSignIn"
                  type="number"
                  maxLength={60}
                  required
                  placeholder=""
                  name="chiffreAffaire"
                  value={canditature.chiffreAffaire}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label className="labelSignIn">
                  Quel est votre Chiffre prévisionnel sur les 6-12 prochains mois {etoileSpanRed}
               </label>
               <input
                  className="inputSignIn"
                  type="number"
                  maxLength={60}
                  required
                  placeholder=""
                  name="chiffreAffairePrev"
                  value={canditature.chiffreAffairePrev}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label className="labelSignIn">
                  Quelle est la proposition de valeur (valeur ajoutée de votre produit ou service) de votre activité ?
                  {etoileSpanRed}
               </label>
               <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  rows={2}
                  //className="inputSignIn"
                  type="text"
                  required
                  placeholder=""
                  name="propositionValeur"
                  value={canditature.propositionValeur}
                  onChange={handleChange}
               />
            </div>
            <div className="subDivChamp">
               <label>Quels sont vos types de clients spécifiques actuellement?{etoileSpanRed}</label>
               <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  rows={2}
                  //className="inputSignIn"
                  type="text"
                  //maxLength={60}
                  required
                  placeholder=""
                  name="segmentClientele"
                  value={canditature.segmentClientele}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label>
                  ⁠Donnez des références de 12 de vos clients (Noms et Prénoms, + Numéros de téléphone){etoileSpanRed}
               </label>
               <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  rows={3}
                  //className="inputSignIn"
                  type="text"
                  //maxLength={60}
                  required
                  placeholder=""
                  name="referenceClient"
                  value={canditature.referenceClient}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label>Quel sont vos canaux de distribution actuels ou prévisionnel ?{etoileSpanRed}</label>
               <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  rows={2}
                  //className="inputSignIn"
                  type="text"
                  //maxLength={60}
                  required
                  placeholder=""
                  name="canauxDistribution"
                  value={canditature.canauxDistribution}
                  onChange={handleChange}
               />
            </div>
            <div className="subDivChamp">
               <label>Comment entretenez-vous/gagnerez-vous votre relation client ?{etoileSpanRed}</label>
               <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  rows={2}
                  //className="inputSignIn"
                  type="text"
                  //maxLength={60}
                  required
                  placeholder=""
                  name="relationClient"
                  value={canditature.relationClient}
                  onChange={handleChange}
               />
            </div>
            <div className="subDivChamp">
               <label>Quelles sont vos sources de revenus actuelles ? {etoileSpanRed}</label>
               <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  rows={2}
                  //className="inputSignIn"
                  type="text"
                  //maxLength={60}
                  required
                  placeholder=""
                  name="sourceRevenu"
                  value={canditature.sourceRevenu}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label>
                  Énumérez et dénombrez vos ressources clés (mobilier, matériel, relationnel, etc.) ? {etoileSpanRed}
               </label>
               <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  rows={2}
                  //className="inputSignIn"
                  type="text"
                  //maxLength={60}
                  required
                  placeholder=""
                  name="ressourcesCles"
                  value={canditature.ressourcesCles}
                  onChange={handleChange}
               />
            </div>
            <div className="subDivChamp">
               <label>Quels est votre coût de fonctionnement mensuel actuel ou prévisionnel? {etoileSpanRed}</label>
               <input
                  className="inputSignIn"
                  type="number"
                  //maxLength={60}
                  required
                  placeholder=""
                  name="coutFonctionnement"
                  value={canditature.coutFonctionnement}
                  onChange={handleChange}
               />
            </div>
            <div className="subDivChamp">
               <label>
                  Combien de personnes travaillent dans votre entreprise actuellement ou prévisionnel sur 1 ans?{" "}
                  {etoileSpanRed}
               </label>
               <input
                  className="inputSignIn"
                  type="number"
                  //maxLength={60}
                  required
                  placeholder=""
                  name="nombreEmploye"
                  value={canditature.nombreEmploye}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label>
                  A une échèle de 1 à 10 combien pouvez-vous notez votre entreprise sur l’atteinte des objectifs de
                  notoriété et de rentabilité depuis la création ?{etoileSpanRed}
               </label>
               <input
                  className="inputSignIn"
                  type="number"
                  //maxLength={60}
                  min="0"
                  max="10"
                  required
                  placeholder=""
                  name="autoevaluation"
                  value={canditature.autoevaluation}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label>Présentez votre politique d’Autorentabilité</label>
               <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  rows={3}
                  //className="inputSignIn"
                  type="text"
                  //maxLength={60}
                  //required
                  placeholder=""
                  name="politiqueAutorentabilite"
                  value={canditature.politiqueAutorentabilite}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label>Présentez votre politique de fonctionnement durable</label>
               <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  rows={3}
                  //className="inputSignIn"
                  type="text"
                  //maxLength={60}
                  //required
                  placeholder=""
                  name="politiqueFonctionnement"
                  value={canditature.politiqueFonctionnement}
                  onChange={handleChange}
               />
            </div>

            <div className="subDivChamp">
               <label>Souhaitez-vous rencontrer des investisseurs sur le site ?</label>
               <select
                  className="inputSignIn"
                  id="rencontreInvestisseur"
                  name="rencontreInvestisseur"
                  value={canditature.rencontreInvestisseur}
                  onChange={handleChange}
               >
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
               </select>
            </div>

            <div className="subDivChamp">
               <label>Quel type d’investissement aimeriez-vous obtenir pour votre entreprise ?</label>
               <select
                  className="inputSignIn"
                  id="typeInvestissement"
                  name="typeInvestissement"
                  value={canditature.typeInvestissement}
                  onChange={handleChange}
               >
                  <option value="subventions">Subventions</option>
                  <option value="prets">Prêts</option>
                  <option value="apport_capital">Apport de capital</option>
                  <option value="autre">Autres</option>
               </select>
            </div>

            {error.textError && <span style={{ color: "red", fontWeight: 500, fontSize: 15 }}>{error.textError}</span>}

            {errorServeur && <MessageErrorServeur />}
            <div className="divContainButton">
               {/* <Button color="error" variant="contained">
                  Annuler
               </Button> */}
               <span>.</span>
               <div style={{ display: "flex", gap: 10 }}>
                  <Button type="submit" variant="contained" onClick={() => {}}>
                     VALIDATION
                  </Button>
               </div>
            </div>
         </form>
      </div>
   );
};

const SecondStep = ({ setActiveStep, canditature, setCanditature }) => {
   const [errorServeur, setErrorServeur] = useState(false);
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const [save, setSave] = useState(false);
   const [errorSize, setErrorSize] = useState(false);
   const [errorBusinessPlanSize, setErrorBusinessPlanSize] = useState(false);
   const [errorConformiteSize, setErrorConformiteSize] = useState(false);
   const [errorFactureSize, setErrorFactureSize] = useState(false);

   const [fileBusinessPlan, setFileBusinessPlan] = useState();
   const [fileConformite, setFileConformite] = useState();
   const [fileFacture, setFileFacture] = useState();
   const [file, setFile] = useState();

   const maxFileSize = 20 * 1024 * 1024; // 20 Mo pour la vidéo
   const maxOtherFileSize = 2 * 1024 * 1024; // 2 Mo pour les autres fichiers

   // Gestion du fichier vidéo
   const setFileSelected = (event) => {
      if (event.target?.files) {
         const file = event.target.files[0];
         setFile(event.target.files[0]);
         if (file && file.size > maxFileSize) {
            setErrorSize(true);
            setFile(null);
         } else {
            setFile(file);
            setErrorSize(false);
         }
      } else {
         setFile(null);
      }
   };

   // Gestion des fichiers Business Plan, Conformité, Facture
   const setBusinessPlanFileSelected = (event) => {
      handleFileSelection(event, setFileBusinessPlan, setErrorBusinessPlanSize, maxOtherFileSize);
   };

   const setConformiteFileSelected = (event) => {
      handleFileSelection(event, setFileConformite, setErrorConformiteSize, maxOtherFileSize);
   };

   const setFactureFileSelected = (event) => {
      handleFileSelection(event, setFileFacture, setErrorFactureSize, maxOtherFileSize);
   };

   // Fonction générique pour gérer la sélection de fichiers
   const handleFileSelection = (event, setFileState, setErrorState, maxSize) => {
      if (event.target?.files) {
         const file = event.target.files[0];
         if (file && file.size > maxSize) {
            setErrorState(true);
            setFileState(null);
         } else {
            setFileState(file);
            setErrorState(false);
         }
      } else {
         setFileState(null);
      }
   };

   const mainTitreRef = useRef(null);

   useEffect(() => {
      mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
   }, []);

   let navigation = useNavigate();

   const apresEnregistrement = (data) => {
      //setSuccess(true);
      navigation(`/successcandidaturesalonentrepreneur/${data.nom}`);
   };

   const actionSendformConnexion = () => {
      setError((prev) => ({ ...prev, textError: null, step: -1 }));
      setSuccess(false);
      setErrorServeur(false);
      setSave(true);
   };

   const getFilesArray = () => {
      // Initialise un tableau vide pour stocker les fichiers récupérés
      const filesArray = [];

      // Récupération des fichiers des différents inputs
      if (fileBusinessPlan) {
         filesArray.push({ nom: "businessPlan", file: fileBusinessPlan });
      }

      if (fileConformite) {
         filesArray.push({ nom: "conformite", file: fileConformite });
      }

      if (fileFacture) {
         filesArray.push({ nom: "facture", file: fileFacture });
      }

      if (file) {
         filesArray.push({ nom: "video", file: file });
      }

      return filesArray; // Retourne le tableau des fichiers
   };

   return (
      <>
         <div ref={mainTitreRef} className="divFormulaire" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
               <span className="" style={{ fontSize: "1.8rem", fontWeight: 700 }}>
                  Formulaire de Candidature pour une Place au Salon de l'Entrepreneuriat
               </span>
            </div>
            <form
               enctype="multipart/form-data"
               onSubmit={(event) => {
                  event.preventDefault();
                  actionSendformConnexion();
               }}
            >
               {error.textError && (
                  <span style={{ color: "red", fontWeight: 500, fontSize: 14 }}>{error.textError}</span>
               )}

               {success && (
                  <span style={{ color: "red", fontWeight: 500, fontSize: 18 }}> l'envoi c'est bien passe</span>
               )}

               {/* Champ pour la vidéo */}
               <div className="subDivChamp">
                  <label className="labelSignIn" style={{ fontSize: "15px" }}>
                     Téléchargez une vidéo présentant votre prototype (ou entreprise) et, si possible, le lieu où il est
                     fabriqué.{etoileSpanRed}
                     <span style={{ fontSize: 13 }}>
                        (<span style={{ color: "red", fontWeight: "500" }}>obligatoire</span>, maximum 20 Mo).
                     </span>
                  </label>
                  <input
                     className="inputSignIn"
                     type="file"
                     required
                     accept="video/mp4, video/avi, video/mov"
                     onChange={setFileSelected}
                  />
                  {errorSize && <p style={{ color: "red" }}>Le fichier sélectionné dépasse 20 Mo.</p>}
               </div>

               {/* Champ pour le Business Plan */}
               <div className="subDivChamp">
                  <label className="labelSignIn" style={{ fontSize: "15px" }}>
                     Téléchargez votre Business Plan{etoileSpanRed}{" "}
                     <span style={{ fontSize: 13 }}>
                        (<span style={{ color: "red", fontWeight: "500" }}>obligatoire</span>, maximum 2 Mo).
                     </span>
                  </label>
                  <input
                     className="inputSignIn"
                     type="file"
                     accept=".pdf, .doc, .docx"
                     required
                     onChange={setBusinessPlanFileSelected}
                  />
                  {errorBusinessPlanSize && <p style={{ color: "red" }}>Le fichier sélectionné dépasse 2 Mo.</p>}
               </div>

               {/* Champ pour la Conformité */}
               <div className="subDivChamp" style={{ marginTop: 30 }}>
                  <label className="labelSignIn" attestation Certificat style={{ fontSize: "15px" }}>
                     Pouvez-vous télécharger votre attestions de conformité la plus récente ?{" "}
                     <span style={{ fontSize: 13 }}>
                        (<span style={{ color: "green", fontWeight: "500" }}>facultatif</span>, maximum 2 Mo).
                     </span>
                  </label>
                  <input
                     className="inputSignIn"
                     type="file"
                     accept=".pdf, .doc, .docx, .png, .jpeg, .jpg"
                     onChange={setConformiteFileSelected}
                  />
                  {errorConformiteSize && <p style={{ color: "red" }}>Le fichier sélectionné dépasse 2 Mo.</p>}
               </div>

               {/* Champ pour la Facture */}
               <div className="subDivChamp">
                  <label className="labelSignIn" style={{ fontSize: "15px" }}>
                     Pouvez télécharger votre dernière facture formelle payée par un client ?{" "}
                     <span style={{ fontSize: 13 }}>
                        (<span style={{ color: "green", fontWeight: "500" }}>facultatif</span>, maximum 2 Mo).
                     </span>
                  </label>
                  <input
                     className="inputSignIn"
                     type="file"
                     accept=".pdf, .doc, .docx, .png, .jpeg, .jpg"
                     onChange={setFactureFileSelected}
                  />
                  {errorFactureSize && <p style={{ color: "red" }}>Le fichier sélectionné dépasse 2 Mo.</p>}
               </div>

               {errorServeur && <MessageErrorServeur />}
               <div className="divContainButton">
                  <span>.</span>
                  <div style={{ display: "flex", gap: 10 }}>
                     <Button
                        type="submit"
                        disabled={errorSize || errorBusinessPlanSize || errorConformiteSize || errorFactureSize}
                        variant="contained"
                     >
                        VALIDATION
                     </Button>
                  </div>
               </div>
            </form>
         </div>

         {save ? (
            <SaveComponent
               setSave={setSave}
               save={save}
               requestURL={"/etudiant/upload/videosalonentrepreneurtest/"}
               requestBody={null}
               requestMethode={"POST"}
               requestParam={canditature.email}
               setErrorServeur={setErrorServeur}
               setError={setError}
               isMultipart={true}
               manyfilesToSend={getFilesArray()} // Ajout des autres fichiers
               functionToExcecuteAfterGoodOperation={apresEnregistrement}
            />
         ) : (
            ""
         )}
      </>
   );
};
