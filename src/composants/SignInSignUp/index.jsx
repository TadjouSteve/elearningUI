import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import "./signInSignUpCSS.css";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { useFetch } from "../../utils/hooks/FetchData";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import Cookies from "js-cookie";
import zIndex from "@mui/material/styles/zIndex";

const etoileSpanRed = <span style={{ color: "red" }}> *</span>;

export default function SignInSignUp({ signIn, variantButton, classButtom, justTexte, fullWidth }) {
   const { language } = useContext(AppContext);
   let isFrench = language === "FR";

   const [isSignIn, setIsSignIn] = useState(signIn);
   const [open, setOpen] = useState(false);
   const [formSignIn, setFormSignIn] = useState({});
   const [formSignUp, setFormSignUp] = useState({});
   const navigation = useNavigate();

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClickOpenForm = () => {
      navigation(signIn ? "/signin" : "/signup");
   };
   const handleClose = () => {
      setOpen(false);
      setFormSignUp({});
      setFormSignIn({});
   };

   const toggleSignInSignUp = () => {
      setIsSignIn((previsSignIn) => !previsSignIn);
   };

   return (
      <>
         {justTexte ? (
            <span onClick={handleClickOpenForm} className="justTexte" style={{ cursor: "pointer" }}>
               {!signIn ? (isFrench ? "S'inscrire" : "Register ") : isFrench ? "Se connecter" : "Sign in"}{" "}
            </span>
         ) : (
            <Button
               className={classButtom ? classButtom : "boutton01"}
               variant={variantButton ? variantButton : "contained"}
               onClick={handleClickOpenForm}
               color="error"
               fullWidth={fullWidth ? true : false}
            >
               {!signIn ? (isFrench ? "S'inscrire" : "Register ") : isFrench ? "Se connecter" : "Sign in"}
            </Button>
         )}
         {/* <Dialog
            fullWidth={true}
            maxWidth="md"
            open={open}
            PaperProps={{
               component: "form",
               onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const email = formJson.email;
                  console.log(email);
                  handleClose();
               },
            }}
         >
            <div className="dialogSign">
               <div className="banderoleSignin" style={{ backgroundImage: "url(/images/footerImagedebout.png)" }}></div>

               {isSignIn ? (
                  <SignIn
                     formSignIn={formSignIn}
                     setFormSignIn={setFormSignIn}
                     setIsSignIn={setIsSignIn}
                     setOpen={setOpen}
                     handleClose={handleClose}
                     toggleSignInSignUp={toggleSignInSignUp}
                     style={{ zIndex: 2 }}
                  />
               ) : (
                  <SignUp
                     formSignUp={formSignUp}
                     setFormSignUp={setFormSignUp}
                     setIsSignIn={setIsSignIn}
                     setOpen={setOpen}
                     handleClose={handleClose}
                     toggleSignInSignUp={toggleSignInSignUp}
                     style={{ zIndex: 2 }}
                  />
               )}
            </div>
         </Dialog> */}
      </>
   );
}

const steps = ["Etape 1", "Etape 2", "Etape 3"];
const SignUp = ({ formSignUp, setFormSignUp, setOpen, setIsSignIn, handleClose, toggleSignInSignUp }) => {
   const [activeStep, setActiveStep] = React.useState(0);
   const [skipped, setSkipped] = React.useState(new Set());
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      signUpError: null,
      step: -1,
   });

   const isStepOptional = (step) => {
      return step === -1;
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };

   const handleNext = () => {
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
      setSave(false);
      setErrorServeur(false);
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

   const setNom = (event) => {
      setFormSignUp((prevForm) => ({ ...prevForm, nom: event.target.value }));
   };

   const setPrenom = (event) => {
      setFormSignUp((prevForm) => ({ ...prevForm, prenom: event.target.value }));
   };

   const setDateNaissance = (event) => {
      setFormSignUp((prevForm) => ({ ...prevForm, dateNaissance: event.target.value }));
   };

   const setLieuNaissance = (event) => {
      setFormSignUp((prevForm) => ({ ...prevForm, lieuNaissance: event.target.value }));
   };

   const setTelephone = (event) => {
      setFormSignUp((prevForm) => ({ ...prevForm, telephone: event.target.value }));
   };

   const setEmail = (event) => {
      setFormSignUp((prevForm) => ({ ...prevForm, email: event.target.value }));
   };

   const setChiffreAffaire = (event) => {
      if (!isNaN(event.target.value) && event.target.value > 0) {
         setFormSignUp((prevForm) => ({ ...prevForm, chiffreAffaire: event.target.value }));
      }
   };
   const handleKeyPress = (event) => {
      if (event.key === "Enter") {
         if (activeStep >= steps.length - 1) {
            setActiveStep(3);
            setSave(true);
            setErrorServeur(false);
         } else {
            handleNext();
         }
      }
   };

   return (
      <>
         <div className="divFormulaire" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ textAlign: "center", marginTop: 20 }}>
               <span className="signInTitle">Créer votre compte</span>
            </div>
            <div style={{ marginTop: 10, marginBottom: 10 }}>
               <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                     const stepProps = {};
                     const labelProps = {};

                     if (isStepSkipped(index)) {
                        stepProps.completed = false;
                     }
                     return (
                        <Step key={label} {...stepProps}>
                           <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                     );
                  })}
               </Stepper>
            </div>
            {activeStep === 0 && (
               <fieldset>
                  {error.step === 0 && (
                     <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.signUpError}</span>
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
                           value={formSignUp.nom}
                           onChange={(e) => setNom(e)}
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
                           value={formSignUp.prenom}
                           onChange={(e) => setPrenom(e)}
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
                           value={formSignUp.dateNaissance}
                           onChange={(e) => setDateNaissance(e)}
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
                           value={formSignUp.lieuNaissance}
                           onChange={(e) => setLieuNaissance(e)}
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
                           value={formSignUp.telephone}
                           onChange={(e) => setTelephone(e)}
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
                           value={formSignUp.email}
                           onChange={(e) => setEmail(e)}
                        />
                     </div>
                  </div>
               </fieldset>
            )}
            {activeStep === 1 && (
               <fieldset>
                  <legend>
                     Informations <span style={{ color: "blue" }}>Professionels</span>
                  </legend>

                  {error.step == 1 && (
                     <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.signUpError}</span>
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
                           value={formSignUp.profession}
                           onChange={(event) =>
                              setFormSignUp((prevForm) => ({ ...prevForm, profession: event.target.value }))
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
                           value={formSignUp.nomEntreprise}
                           onChange={(event) =>
                              setFormSignUp((prevForm) => ({ ...prevForm, nomEntreprise: event.target.value }))
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
                           value={formSignUp.chiffreAffaire}
                           onChange={(event) => setChiffreAffaire(event)}
                        />
                     </div>
                  </div>

                  <div name="Region" className="divChamp">
                     <div className="subDivChamp">
                        <label className="labelSignIn">Region de residence </label>
                        <input
                           className="inputSignIn"
                           type="text"
                           maxLength={60}
                           required
                           placeholder="..."
                           value={formSignUp.region}
                           onChange={(event) =>
                              setFormSignUp((prevForm) => ({ ...prevForm, region: event.target.value }))
                           }
                        />
                     </div>
                  </div>
               </fieldset>
            )}

            {activeStep === 2 && (
               <fieldset>
                  <legend>
                     Informations de <span style={{ color: "red", fontWeight: "bold" }}> Connexion</span>
                  </legend>
                  {error.step == 2 && (
                     <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.signUpError}</span>
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
                           value={formSignUp.password}
                           onChange={(event) =>
                              setFormSignUp((prevForm) => ({ ...prevForm, password: event.target.value }))
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
                           value={formSignUp.confirmPassword}
                           onChange={(event) =>
                              setFormSignUp((prevForm) => ({ ...prevForm, confirmPassword: event.target.value }))
                           }
                        />
                     </div>
                  </div>
               </fieldset>
            )}

            {activeStep === 3 && (
               <fieldset>
                  <legend>
                     Enregistrement <span style={{ color: "green", fontWeight: "bold" }}> ...</span>
                  </legend>
                  {save && (
                     <ValidationSingInSignUp
                        setErrorServeur={setErrorServeur}
                        formSignUp={formSignUp}
                        setActiveStep={setActiveStep}
                        setError={setError}
                        setSave={setSave}
                     />
                  )}
                  {errorServeur && <MessageErrorServeur />}
               </fieldset>
            )}

            <div className="divContainButton">
               <Button color="error" variant="contained" onClick={handleClose} disabled={activeStep === 3}>
                  Annuler
               </Button>
               <div style={{ display: "flex", gap: 10 }}>
                  <Button
                     variant="outlined"
                     onClick={handleBack}
                     disabled={activeStep === 0 || (activeStep === 3 && save === true)}
                  >
                     Precedant
                  </Button>
                  {activeStep >= steps.length - 1 ? (
                     <Button
                        variant="contained"
                        onClick={() => {
                           setActiveStep(3);
                           setSave(true);
                           setErrorServeur(false);
                        }}
                     >
                        Enregister
                     </Button>
                  ) : (
                     <Button variant="contained" onClick={handleNext}>
                        Suivant
                     </Button>
                  )}
               </div>
            </div>
            <div style={{ marginTop: 15, cursor: "pointer" }}>
               <span>
                  Vous avez déja un compte?{" "}
                  <span onClick={toggleSignInSignUp} style={{ color: "green", fontWeight: "bold" }}>
                     connectez Vous
                  </span>
               </span>
            </div>
         </div>
      </>
   );
};

const SignIn = ({ formSignIn, setFormSignIn, setOpen, setIsSignIn, handleClose, toggleSignInSignUp }) => {
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      signInError: null,
      step: -1,
   });

   const handleKeyPress = (event) => {
      if (event.key === "Enter") {
         setSave(true);
         setErrorServeur(false);
      }
   };
   return (
      <>
         <div
            className="divFormulaire"
            style={{ display: "flex", flexDirection: "column" }}
            onKeyUp={(event) => handleKeyPress(event)}
         >
            <div style={{ textAlign: "center", marginTop: 20, marginBottom: 40 }}>
               <span className="signInTitle" style={{}}>
                  Connectez Vous...!
               </span>
            </div>

            <fieldset>
               <legend>
                  Informations de <span style={{ color: "red", fontWeight: "bold" }}> Connexion</span>
               </legend>
               {error.signInError && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.signInError}</span>
               )}

               <div name="password" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Téléphone ou Email </label>
                     <input
                        maxLength={50}
                        name="email  telephone"
                        className="inputSignIn"
                        type="text"
                        required
                        placeholder=""
                        value={formSignIn.emailOrPhone}
                        onChange={(event) => setFormSignIn((prevForm) => ({ ...prevForm, login: event.target.value }))}
                     />
                  </div>
               </div>

               <div name="confirmPassword" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Mot de passe </label>
                     <input
                        maxLength={50}
                        className="inputSignIn"
                        type="password"
                        required
                        placeholder=""
                        value={formSignIn.password}
                        onChange={(event) =>
                           setFormSignIn((prevForm) => ({ ...prevForm, password: event.target.value }))
                        }
                     />
                  </div>
               </div>

               {save && (
                  <ValidationSingInSignUp
                     setErrorServeur={setErrorServeur}
                     formSignIn={formSignIn}
                     setSave={setSave}
                     isSignIn={true}
                     setError={setError}
                  />
               )}

               {errorServeur && <MessageErrorServeur />}
            </fieldset>

            <div className="divContainButton">
               <Button color="error" variant="contained" onClick={handleClose}>
                  Annuler
               </Button>
               <div style={{ display: "flex", gap: 10 }}>
                  <Button
                     variant="contained"
                     onClick={() => {
                        setSave(true);
                        setErrorServeur(false);
                     }}
                     disabled={save}
                  >
                     Connexion
                  </Button>
               </div>
            </div>
            <div style={{ marginTop: 15, cursor: "pointer" }}>
               <span>
                  Vous n'avez pas de compte?{" "}
                  <span onClick={toggleSignInSignUp} style={{ color: "green", fontWeight: "bold" }}>
                     Créer votre compte
                  </span>
               </span>
            </div>
         </div>
      </>
   );
};

const ValidationSingInSignUp = ({
   isSignIn,
   formSignIn,
   formSignUp,
   setActiveStep,
   setError,
   setSave,
   setErrorServeur,
}) => {
   const { isOnline, language, setUser } = useContext(AppContext);
   const { isLoading, data, error } = useFetch(
      isSignIn ? "/login/" : "/etudiant/enregistrement/",
      "POST",
      isSignIn ? formSignIn : formSignUp
   );
   const navigation = useNavigate();

   if (isLoading) {
      return (
         <div style={{ marginLeft: "40%" }}>
            <CircularProgress size={40} />
         </div>
      );
   } else if (error) {
      setErrorServeur(true);
      setSave(false);
   } else if (!isLoading && !error) {
      if (data.errorAPI) {
         //console.log('errorAPI === ', data.errorAPI)
         if (!isSignIn) {
            setError((prevError) => ({ ...prevError, step: data.index, signUpError: data.message }));
            setActiveStep(data.index);
         } else {
            setError((prevError) => ({ ...prevError, signInError: data.message }));
            setSave(false);
         }
      } else {
         console.log("user connect == ", data);
         Cookies.set("user", JSON.stringify(data));
         setUser(data);
         //console.log("cookie save == ", JSON.parse(Cookies.get('user')))
         navigation("/dashboard");
      }
   }
};

const MessageErrorServeur = () => {
   const { isOnline, language, setUser } = useContext(AppContext);

   if (isOnline) {
      return (
         <div style={{ width: "100%", marginBottom: "5px" }}>
            <Alert severity="error">
               <AlertTitle>Erreur</AlertTitle>
               <span>{language == "FR" ? "Probleme avec le serveur...!" : "Problem with the server...!"}</span>
            </Alert>
         </div>
      );
   } else {
      return (
         <div style={{ width: "100%", marginBottom: "5px" }}>
            <Alert severity="error">
               <AlertTitle>Erreur</AlertTitle>
               <span>
                  {language == "FR"
                     ? "Vous êtes hors connexion, contrôler votre connexion internet"
                     : "You are offline, check your internet connection"}
               </span>
            </Alert>
         </div>
      );
   }
};
