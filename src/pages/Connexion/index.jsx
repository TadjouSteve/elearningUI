import React, { useContext, useState } from "react";
import "./connexionCSS.css";
import SaveComponent from "../../composants/SaveComponent";
import Footer from "../../composants/Footer";
import { Container, Row } from "react-bootstrap";
import Header from "../../composants/Header";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { MessageErrorServeur } from "../../composants/MessageComponent";

export default function Connexion() {
   const { isOnline, language, setUser } = useContext(AppContext);
   const [formConnexion, setFormConnexion] = useState({});
   const [save, setSave] = useState(false);
   const [activeStep, setActiveStep] = useState(0);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      signUpError: null,
      step: -1,
   });
   let navigation = useNavigate();
   const actionSendformConnexion = () => {
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

   const handleKeyPress = (event) => {
      if (event.key === "Enter") {
         //setSave(true);
         //setErrorServeur(false);
         actionSendformConnexion();
      }
   };
   return (
      <>
         <Container fluid style={{ padding: 0, backgroundColor: "white" }}>
            <Header />
            <Row style={{ justifyContent: "center" }}>
               <div className="mainDivConnexion">
                  <FormConnexion
                     error={error}
                     formConnexion={formConnexion}
                     setFormConnexion={setFormConnexion}
                     save={save}
                     setSave={setSave}
                     handleKeyPress={handleKeyPress}
                     requestMethode="POST"
                     setError={setError}
                     errorServeur={errorServeur}
                     activeStep={activeStep}
                     setActiveStep={setActiveStep}
                     actionSendformConnexion={actionSendformConnexion}
                  />
               </div>
            </Row>
            {save && (
               <SaveComponent
                  setSave={setSave}
                  requestURL={"/login/"}
                  requestBody={formConnexion}
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

const FormConnexion = ({
   formConnexion,
   setFormConnexion,
   error,
   setSave,
   save,
   handleKeyPress,
   errorServeur,
   actionSendformConnexion,
}) => {
   return (
      <>
         <div
            className="divFormulaire"
            style={{ display: "flex", flexDirection: "column" }}
            onKeyUp={(event) => handleKeyPress(event)}
         >
            <div style={{ textAlign: "center", marginTop: 20, marginBottom: 40 }}>
               <span className="signInTitle" style={{}}>
                  Connectez-Vous...!
               </span>
            </div>

            <fieldset>
               <legend>
                  Informations de <span style={{ color: "red", fontWeight: "bold" }}> Connexion</span>
               </legend>
               {error.textError && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
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
                        value={formConnexion.emailOrPhone}
                        onChange={(event) =>
                           setFormConnexion((prevForm) => ({ ...prevForm, login: event.target.value }))
                        }
                     />
                  </div>
               </div>

               <div name="confirmPassword" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Mot de passe </label>
                     <input
                        maxLength={50}
                        className="inputSignIn"
                        name="password"
                        type="password"
                        required
                        placeholder=""
                        value={formConnexion.password}
                        onChange={(event) =>
                           setFormConnexion((prevForm) => ({ ...prevForm, password: event.target.value }))
                        }
                     />
                  </div>
               </div>

               {errorServeur && <MessageErrorServeur />}
            </fieldset>

            <div className="divContainButton">
               {/* <Button color="error" variant="contained">
                  Annuler
               </Button> */}
               <span>.</span>
               <div style={{ display: "flex", gap: 10 }}>
                  <Button variant="contained" onClick={() => actionSendformConnexion()} disabled={save}>
                     Connexion
                  </Button>
               </div>
            </div>
            <div style={{ marginTop: 15, cursor: "pointer" }}>
               <span>
                  Vous n'avez pas de compte?{" "}
                  <Link to={"/inscription"} style={{ textDecoration: "none" }}>
                     <span style={{ color: "green", fontWeight: "bold" }}>Créer votre compte</span>
                  </Link>
               </span>
            </div>
         </div>
      </>
   );
};
