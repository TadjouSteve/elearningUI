import React, { useContext, useState } from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Cookies from "js-cookie";

import { Container, Row } from "react-bootstrap";
import Header from "../../composants/Header";
import "./inscriptionCSS.css";
import Footer from "../../composants/Footer";
import Button from "@mui/material/Button";
import { useFetch } from "../../utils/hooks/FetchData";
import { CircularProgress } from "@mui/material";
import { MessageErrorServeur } from "../../composants/MessageComponent";
import SaveComponent from "../../composants/SaveComponent";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";

const etoileSpanRed = <span style={{ color: "red" }}> *</span>;
const steps = ["Etape 1", "Etape 2", "Etape 3", "Etape 4"];

export default function Inscription() {
   const { isOnline, language, setUser } = useContext(AppContext);
   const [formInscription, setFormInscription] = useState({});
   const [save, setSave] = useState(false);
   const [activeStep, setActiveStep] = useState(0);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      signUpError: null,
      step: -1,
   });
   let navigation = useNavigate();
   const actionSaveEtudiant = () => {
      setError((prev) => ({ ...prev, textError: null, step: -1 }));
      setErrorServeur(false);
      setSave(true);
   };

   const apresEnregistrement = (data) => {
      Cookies.set("user", JSON.stringify(data));
      setUser(data);
      // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
      navigation("/dashboard"); //dashboard
   };
   return (
      <>
         <Container fluid style={{ padding: 0, backgroundColor: "white" }}>
            <Header />
            <Row style={{ justifyContent: "center" }}>
               <div className="mainDivInscription">
                  <FormInscription
                     error={error}
                     formInscription={formInscription}
                     setFormInscription={setFormInscription}
                     save={save}
                     setSave={setSave}
                     requestMethode="POST"
                     setError={setError}
                     setErrorServeur={setErrorServeur}
                     errorServeur={errorServeur}
                     activeStep={activeStep}
                     setActiveStep={setActiveStep}
                     actionSaveEtudiant={actionSaveEtudiant}
                  />
               </div>
            </Row>
            {save && (
               <SaveComponent
                  setSave={setSave}
                  requestURL={"/etudiant/enregistrement/"}
                  requestBody={formInscription}
                  requestMethode={"POST"}
                  requestParam={null}
                  setErrorServeur={setErrorServeur}
                  setError={setError}
                  //redirected={true}
                  setActiveStep={setActiveStep}
                  functionToExcecuteAfterGoodOperation={apresEnregistrement}
               />
            )}
            <Footer />
         </Container>
      </>
   );
}

function FormInscription({
   formInscription,
   setFormInscription,
   error,
   setActiveStep,
   activeStep,
   errorServeur,
   setSave,
   actionSaveEtudiant,
   setErrorServeur,
   setError,
}) {
   const [update, setUpdate] = useState(false);
   const fetchMetaData = useFetch(`/metadata/inscription/`, "GET", null, null, update);

   // const [activeStep, setActiveStep] = useState(0);
   const [skipped, setSkipped] = useState(new Set());
   const isStepOptional = (step) => {
      return step === -1;
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };

   const handleNext = () => {
      console.log("etudiant == ", formInscription);

      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      //setSave(false);
      //setErrorServeur(false);
   };

   const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
         // You probably want to guard against something like this,
         // it should never occur unless someone's actively trying to break something.
         throw new Error("You can't skip a step that isn't optional.");
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
         const newSkipped = new Set(prevSkipped.values());
         newSkipped.add(activeStep);
         return newSkipped;
      });
   };

   const handleReset = () => {
      setActiveStep(0);
   };

   const setProfileStudent = (gammeEtudiant) => {
      setFormInscription((prevForm) => ({ ...prevForm, gammeEtudiant: gammeEtudiant }));
      // setFormInscription({ ...formInscription, gammeEtudiant: gammeEtudiant });
      console.log("gamme selected == ", gammeEtudiant);

      handleNext();
   };

   const handleRegionChange = (event) => {
      console.log("id region selected == ", event.target.value);
      const region = fetchMetaData.data.regions.find((region) => region.id == event.target.value);
      console.log("region == ", region);
      setFormInscription({ ...formInscription, region: region });
   };

   const largeurEcran = window.screen.width;
   // Détermine la taille du bouton en fonction de la largeur de l'écran
   //const tailleBouton = largeurEcran < 769 ? "small" : "medium";
   const tailleBouton = window.innerWidth < 769 ? "small" : "medium";

   return (
      <>
         <div style={{ textAlign: "center", marginTop: 20 }}>
            <span className="signInTitle">Inscription au programme leadership</span>
         </div>
         <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Stepper activeStep={activeStep}>
               {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  if (isStepSkipped(index)) {
                     stepProps.completed = false;
                  }
                  return (
                     <Step key={label} {...stepProps}>
                        <StepLabel className="stepLabel" {...labelProps}>
                           {label}
                        </StepLabel>
                     </Step>
                  );
               })}
            </Stepper>
         </div>
         {activeStep === 0 && (
            <fieldset>
               <legend>
                  Selectionez votre <span style={{ color: "green" }}>profil de formation</span>
               </legend>
               {error.textError && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}
               <div className="listProfilEtutdiantDiv">
                  {fetchMetaData.isLoading ? (
                     <div style={{ marginLeft: "40%" }}>
                        <CircularProgress size={40} />
                     </div>
                  ) : fetchMetaData.error ? (
                     <MessageErrorServeur />
                  ) : (
                     fetchMetaData.data.gammeEtudiants.map((item, index) => (
                        <div key={item.id} className="bodyProfilEtudiant" onClick={(e) => setProfileStudent(item)}>
                           <div className="bodyProfilEtudiantImage">
                              <span className="nomProfileEtudiantSpan" style={{ cursor: "pointer" }}>
                                 {item.nom}
                              </span>
                           </div>
                           <div className="profilEtudiantDetail">
                              <span>{item.description}</span>
                           </div>
                        </div>
                     ))
                  )}
               </div>
            </fieldset>
         )}
         {activeStep === 1 && (
            <fieldset>
               {error.step === 1 && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}
               <legend>
                  Informations <span style={{ color: "green" }}>Personnelles</span>
               </legend>

               <div name="nom_prenom" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">
                        Nom<span style={{ color: "red" }}> *</span>
                     </label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="Entrez votre nom"
                        value={formInscription.nom}
                        onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, nom: e.target.value }))}
                     />
                  </div>
                  <div className="subDivChamp maginLeft">
                     <label className="labelSignIn">Prenom</label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="Entrez votre prenom"
                        value={formInscription.prenom}
                        onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, prenom: e.target.value }))}
                     />
                  </div>
               </div>

               <div name="date_lieu_naissane" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Date de Naisance{etoileSpanRed}</label>
                     <input
                        className="inputSignIn"
                        type="date"
                        required
                        placeholder="..."
                        value={formInscription.dateNaissance}
                        onChange={(e) =>
                           setFormInscription((prevForm) => ({ ...prevForm, dateNaissance: e.target.value }))
                        }
                     />
                  </div>
                  <div className="subDivChamp maginLeft">
                     <label className="labelSignIn">Lieu de naissance{etoileSpanRed}</label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="..."
                        value={formInscription.lieuNaissance}
                        onChange={(e) =>
                           setFormInscription((prevForm) => ({ ...prevForm, lieuNaissance: e.target.value }))
                        }
                     />
                  </div>
               </div>

               <div name="date_lieu_naissane" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Telephone{etoileSpanRed}</label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="..."
                        value={formInscription.telephone}
                        onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, telephone: e.target.value }))}
                     />
                  </div>
               </div>

               <div name="date_lieu_naissane" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Email{etoileSpanRed}</label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="..."
                        value={formInscription.email}
                        onChange={(e) => setFormInscription((prevForm) => ({ ...prevForm, email: e.target.value }))}
                     />
                  </div>
               </div>
            </fieldset>
         )}
         {activeStep === 2 && (
            <fieldset>
               <legend>
                  Informations <span style={{ color: "blue" }}>Professionels</span>
               </legend>

               {error.step === 2 && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}

               <div name="non_profession" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">
                        Profession<span style={{ color: "red" }}> *</span>
                     </label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="Entrez votre Profession"
                        value={formInscription.profession}
                        onChange={(event) =>
                           setFormInscription((prevForm) => ({ ...prevForm, profession: event.target.value }))
                        }
                     />
                  </div>
               </div>

               <div name="nonEntreprise" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Nom de l'entreprise </label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="..."
                        value={formInscription.nomEntreprise}
                        onChange={(event) =>
                           setFormInscription((prevForm) => ({ ...prevForm, nomEntreprise: event.target.value }))
                        }
                     />
                  </div>
               </div>

               <div name="Chiffre_affaire" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Chiffre d'affaire </label>
                     <input
                        className="inputSignIn"
                        type="text"
                        maxLength={60}
                        required
                        placeholder="..."
                        value={formInscription.chiffreAffaire}
                        onChange={(event) =>
                           setFormInscription((prevForm) => ({ ...prevForm, chiffreAffaire: event.target.value }))
                        }
                     />
                  </div>
               </div>

               <div name="Region" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Region de residence </label>
                     <select
                        id="region-select"
                        className="inputSignIn"
                        onChange={(e) => handleRegionChange(e)}
                        value={formInscription.region?.id || ""}
                     >
                        <option value="">-- Choisissez une région --</option>
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
            </fieldset>
         )}

         {activeStep === 3 && (
            <fieldset>
               <legend>
                  Informations de <span style={{ color: "red", fontWeight: "bold" }}> Connexion</span>
               </legend>
               {error.step === 3 && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}
               <div name="password" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Mot de passse </label>
                     <input
                        maxLength={50}
                        className="inputSignIn"
                        type="password"
                        required
                        placeholder=""
                        value={formInscription.password}
                        onChange={(event) =>
                           setFormInscription((prevForm) => ({ ...prevForm, password: event.target.value }))
                        }
                     />
                  </div>
               </div>

               <div name="confirmPassword" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Confirmer le mot de passse </label>
                     <input
                        maxLength={50}
                        className="inputSignIn"
                        type="password"
                        required
                        placeholder=""
                        value={formInscription.confirmPassword}
                        onChange={(event) =>
                           setFormInscription((prevForm) => ({ ...prevForm, confirmPassword: event.target.value }))
                        }
                     />
                  </div>
                  {errorServeur && <MessageErrorServeur />}
               </div>
            </fieldset>
         )}

         {activeStep === 4 && (
            <fieldset>
               <legend>
                  Enregistrement <span style={{ color: "green", fontWeight: "bold" }}> ...</span>
               </legend>
            </fieldset>
         )}

         {activeStep >= 1 && (
            <div className="divContainButton">
               {/* <Button color="error" variant="contained" disabled={activeStep === 4} size={tailleBouton}>
                  Annuler
               </Button> */}
               <span>.</span>
               <div style={{ display: "flex", gap: 10 }}>
                  <Button
                     variant="outlined"
                     onClick={handleBack}
                     disabled={activeStep === 0 || activeStep === 4}
                     // size={tailleBouton}
                  >
                     Precedant
                  </Button>
                  {activeStep >= steps.length - 1 ? (
                     <Button onClick={() => actionSaveEtudiant()} variant="contained" size={tailleBouton}>
                        Enregister
                     </Button>
                  ) : (
                     <Button variant="contained" size={tailleBouton} onClick={handleNext}>
                        Suivant
                     </Button>
                  )}
               </div>
            </div>
         )}

         <div style={{ marginTop: 15, cursor: "pointer" }}>
            <span>
               Vous avez déja un compte?{" "}
               <Link to={"/signIn"} style={{ textDecoration: "none" }}>
                  <span style={{ color: "green", fontWeight: "bold" }}>connectez Vous</span>
               </Link>
            </span>
         </div>
      </>
   );
}
