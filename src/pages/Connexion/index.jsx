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
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { userProfile } from "../../utils/data";

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
      // Cookies.set("user", JSON.stringify(data));
      // setUser(data);
      // // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
      // navigation("/dashboard");
      //console.log("data user get == ", data);
      if (data.openDashboard) {
         Cookies.set("user", JSON.stringify(data));
         setUser(data);
         // console.log("cookie save == ", JSON.parse(Cookies.get("user")));
         navigation("/dashboard"); //dashboard
      } else {
         navigation("/controlevalidationcompte/" + data.matricule); //dashboard
      }
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
   const [showPassWord, setShowPassWord] = useState(false);
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
                     <label name="label_for_email_or_phone" className="labelSignIn">
                        Téléphone ou Email{" "}
                     </label>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                           maxLength={50}
                           style={{ width: "100%" }}
                           name="email_phone"
                           className="inputSignIn"
                           type="text"
                           required
                           placeholder=""
                           value={formConnexion.emailOrPhone}
                           onChange={(event) =>
                              setFormConnexion((prevForm) => ({ ...prevForm, login: event.target.value }))
                           }
                        />
                        <PermIdentityOutlinedIcon />
                     </div>
                  </div>
               </div>

               <div name="confirmPassword" className="divChamp">
                  <div className="subDivChamp">
                     <label className="labelSignIn">Mot de passe </label>
                     <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                           maxLength={50}
                           className="inputSignIn"
                           style={{ width: "100%" }}
                           name="password"
                           type={showPassWord ? "text" : "password"}
                           required
                           placeholder=""
                           value={formConnexion.password}
                           onChange={(event) =>
                              setFormConnexion((prevForm) => ({ ...prevForm, password: event.target.value }))
                           }
                        />
                        {showPassWord ? (
                           <VisibilityOffOutlinedIcon
                              onClick={() => {
                                 setShowPassWord(false);
                              }}
                           />
                        ) : (
                           <VisibilityOutlinedIcon
                              onClick={() => {
                                 setShowPassWord(true);
                              }}
                           />
                        )}
                     </div>
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
