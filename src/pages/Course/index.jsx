import React, { useContext, useState } from "react";
import Header from "../../composants/Header";
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Alert,
   AlertTitle,
   Backdrop,
   Button,
   Checkbox,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeaderContent from "../../composants/HeaderContent";
import { chapitre, chapitre as chapitreEnDur } from "../../utils/data/index.ts";
import ReactPlayer from "react-player";
import Footer from "../../composants/Footer/index.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/index.jsx";
import { useFetch } from "../../utils/hooks/FetchData/index.jsx";
import {
   MessageErrorServeur,
   MessageErrorServeurWithVarialbleHeight,
} from "../../composants/MessageComponent/index.jsx";
import "./courseCSS.css";
import { SceletonBigArticle } from "../../composants/Sceletons/index.jsx";
import SaveComponent from "../../composants/SaveComponent/index.jsx";
import { ErrorRounded } from "@mui/icons-material";
//import { Button } from 'bootstrap'

export default function Course() {
   const { isOnline, language, user } = useContext(AppContext);
   const { idChapitre } = useParams();
   const { isLoading, data, error } = useFetch("/etudiant/chapitre/" + (user ? user.id : 0) + "/" + idChapitre, "GET");
   const divTest = <div style={{ height: "100%", width: "100%", backgroundColor: "white" }}></div>;
   var isfrench = language === "FR";
   return (
      <>
         <Container fluid style={{ width: "100%", padding: 0, margin: 0 }}>
            <Header />
            <HeaderContent />
            <div className="vousetesici">
               <span className="vousetesiciTexte">
                  Vous êtes ici:
                  <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                     Tableau de bord
                  </Link>
                  <span> {">"} </span>
                  <Link to={"/module/" + data?.module?.idModule} style={{ textDecoration: "none" }}>
                     {data ? data?.module?.titre : ""}
                  </Link>
                  <span> {">"} </span>
                  <Link to={"/course/" + idChapitre} style={{ textDecoration: "none" }}>
                     {data ? data?.titre : ""}
                  </Link>
               </span>
            </div>
            <Row fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
               {isLoading ? (
                  <SceletonBigArticle />
               ) : error ? (
                  <MessageErrorServeurWithVarialbleHeight />
               ) : (
                  <ViewChapitreNew chapitre={data} />
               )}
            </Row>
            {}
            <Footer />
         </Container>
      </>
   );
}

const ViewChapitreNew = ({ chapitre }) => {
   chapitre = chapitre ? chapitre : {};
   const [showAnswer, setShowAnswer] = useState(false);
   const { isOnline, language, user } = useContext(AppContext);
   var isfrench = language === "FR";
   const [valider, setValider] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [errorVideo, setErrorVideo] = useState(false);

   const [activeQCM, setActiveQCM] = useState([]);

   const handleVideoLoad = () => {
      setIsLoading(false);
   };

   const handleVideoError = () => {
      setErrorVideo(true);
      setIsLoading(false);
   };

   const handleValider = () => {
      console.log("activeQCM == ", activeQCM);
   };

   return (
      <div className="bigcontaintCour">
         <div className="maindivContaintchapitre">
            <div className="titreModuleDiv">
               <span className="titreModuleText">{chapitre.module?.titre}</span>
            </div>
            <div className="titreChapitreDiv">
               <span className="titrechapitreText">{chapitre.titre}</span>
            </div>
            {chapitre.preanbule && (
               <div name="preanbule" className="preanbulediv" style={{ marginBottom: 15 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>
                     Preanbule: <span style={{ fontWeight: 500 }}>{chapitre.preanbule}</span>
                  </span>
               </div>
            )}
            {chapitre.video && (
               <div
                  style={{
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "center",
                     marginTop: 5,
                     marginBottom: 5,
                  }}
               >
                  {isLoading && (
                     <div
                        style={{
                           position: "absolute",
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           height: "300px",
                        }}
                     >
                        <CircularProgress />{" "}
                        {/* Remplacez par votre indicateur de progression circulaire personnalisé */}
                        <span>Chargement de la video...</span>
                     </div>
                  )}
                  {errorVideo && (
                     <div
                        style={{
                           position: "absolute",
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           height: "300px",
                        }}
                     >
                        <span>Impossible de charger la video du cour...! Controler votre connexion</span>
                     </div>
                  )}
                  <ReactPlayer
                     url={chapitre.video}
                     className="reactplayer"
                     controls={true}
                     onReady={handleVideoLoad}
                     onError={handleVideoError}
                  />{" "}
                  {/* Replace with your video URL https://www.youtube.com/watch?v=TvgfzI7rFYU */}
               </div>
            )}

            {chapitre.texte && (
               <div className="texteChapitre" style={{ paddingLeft: 10, marginTop: 15 }}>
                  <p dangerouslySetInnerHTML={{ __html: chapitre.texte }} className="texteCour"></p>
               </div>
            )}

            {chapitre.blocs.map((bloc, indexBloc) => (
               <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                     <h5 style={{ fontWeight: "bold" }}>{indexBloc + 1 + ") " + bloc.titre}</h5>
                  </AccordionSummary>
                  <AccordionDetails>
                     <div className="bloc" style={{ paddingLeft: 10 }}>
                        {bloc.video && <LecteurVideo urlVideo={bloc.video} />}
                        <div className="texteChapitre" style={{ paddingLeft: 10, marginTop: 15 }}>
                           {bloc.texte && (
                              <p dangerouslySetInnerHTML={{ __html: bloc.texte }} className="texteBloc"></p>
                           )}
                        </div>

                        {bloc.sousBlocs &&
                           bloc.sousBlocs.map((sousBloc, indexSousBloc) => (
                              <div className="sousBloc" style={{ paddingLeft: 20 }}>
                                 <h6 style={{ fontWeight: "bold" }}>
                                    {indexBloc + 1 + "." + (indexSousBloc + 1) + ") " + sousBloc.titre}
                                 </h6>
                                 <p>{sousBloc.texte}</p>
                              </div>
                           ))}
                     </div>
                  </AccordionDetails>
               </Accordion>
            ))}

            {chapitre.qcms && chapitre.qcms.length > 0 && (
               <div name="bloc_Global_QCM" style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 17, fontWeight: "bold" }}>
                     <span>Repondez au QCM pour valider ce cour:</span>
                  </div>
                  <div style={{ fontSize: 14, fontStyle: "italic", color: "gray" }}>
                     <span>
                        Question à choix multiple, chaque QCM peut contenir une ou plusieurs proposition juste...!
                     </span>
                  </div>

                  <div name="ListQCM" style={{ paddingLeft: 15, marginTop: 10 }}>
                     {chapitre.qcms.map((qcm, index) => (
                        <DisplayQCM
                           qcm={qcm}
                           index={index}
                           width="930"
                           height="523"
                           activeQCM={activeQCM}
                           setActiveQCM={setActiveQCM}
                           showAnswer={showAnswer}
                        />
                     ))}
                  </div>
                  <div style={{ display: "flex", marginTop: 10 }}>
                     <Validation activeQCM={activeQCM} setShowAnswer={setShowAnswer} idChapitre={chapitre.idChapitre} />
                  </div>
               </div>
            )}
            <QROBloc chapitre={chapitre} />
            {/* {chapitre.qros && chapitre.qros.length > 0 && (
               <div className="MainBlocAllQRO">
                  <div style={{ fontSize: 17, fontWeight: "bold" }}>
                     <span>Questions a reponse ouverte...</span>
                  </div>
                  <div style={{ fontSize: 14, fontStyle: "italic", color: "gray", marginBottom: 15 }}>
                     <span>
                        Vous êtes invités à répondre à chaque question. Dans le cas des activités pratiques, faites-nous
                        un résumé de comment vous avez procédé et quel résultat vous avez obtenu.
                     </span>
                  </div>
                  <div className="listQRO">
                     {chapitre.qros.map((qro, index) => (
                        <DisplayQRO
                           qro={qro}
                           index={index}
                           formLinksQRO={formLinksQRO}
                           setFormLinksQRO={setFormLinksQRO}
                        />
                     ))}
                  </div>

                  <div style={{ margin: 10, marginTop: 15 }}>
                     <Button variant="outlined">Envoyer vos reponses...!</Button>
                  </div>
               </div>
            )} */}
         </div>
      </div>
   );
};

const DisplayQCM = ({ qcm, index, activeQCM, setActiveQCM, showAnswer }) => {
   const { isOnline, language, user } = useContext(AppContext);
   var isfrench = language === "FR";

   const changeValueSelected = (event, propositionId) => {
      if (event.target.checked) {
         let newActiveQCM = [...activeQCM];
         let qcmIsRegister = false;
         activeQCM.forEach((itemQCM) => {
            if (itemQCM.id === qcm.id) {
               let itemQCM01 = itemQCM;
               qcmIsRegister = true;
               if (itemQCM.propositions && !itemQCM.propositions.includes(propositionId)) {
                  itemQCM01.propositions.push(propositionId);
                  newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id);
                  newActiveQCM.push(itemQCM01);
               } else if (!itemQCM.propositions) {
                  itemQCM01.propositions = [propositionId];
                  newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id);
                  newActiveQCM.push(itemQCM01);
               }
            }
         });

         if (!qcmIsRegister) {
            let qcmActive = { id: qcm.id, propositions: [propositionId] };
            newActiveQCM.push(qcmActive);
         }
         setActiveQCM([...newActiveQCM]);
      } else {
         let newActiveQCM = [...activeQCM];
         let qcmIsRegister = false;
         activeQCM.forEach((itemQCM) => {
            if (itemQCM.id === qcm.id) {
               let itemQCM01 = itemQCM;
               qcmIsRegister = true;
               if (itemQCM.propositions && itemQCM.propositions.includes(propositionId)) {
                  itemQCM01.propositions = itemQCM.propositions.filter((item) => item !== propositionId);
                  newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id);
                  newActiveQCM.push(itemQCM01);
               }
            }
         });
         setActiveQCM([...newActiveQCM]);
      }
   };

   return (
      <>
         <div name="itemQCM" key={index + "erp1x"}>
            <div style={{ fontSize: 15, fontWeight: "bold" }}>
               <span>{1 * index + 1 + " ) " + (isfrench ? qcm.intitule : qcm.intituleEn)}</span>
            </div>
            {qcm.propositions.map((proposition, index02) => (
               <div key={proposition.id + index02} style={{ fontSize: 16, fontStyle: "italic", color: "gray" }}>
                  <input
                     type="checkbox"
                     style={{ width: 20, height: 20, margin: 10 }}
                     onChange={(event) => changeValueSelected(event, proposition.id)}
                  />
                  <span>
                     {isfrench ? proposition.valeur : proposition.valeurEn}
                     {showAnswer && proposition.etat > 0 && (
                        <span style={{ color: "green", fontWeight: "bold", fontSize: 17, fontStyle: "italic" }}>
                           {" "}
                           {isfrench ? "- Correct" : "True"}
                        </span>
                     )}
                     {showAnswer && proposition.etat <= 0 && (
                        <span style={{ color: "red", fontWeight: "bold", fontSize: 17, fontStyle: "italic" }}>
                           {" "}
                           {isfrench ? "- Incorrect" : "False"}
                        </span>
                     )}
                     {/* <span>{(proposition.etat > 0) ? (isfrench ? "Vrai" : "True") : (isfrench ? "Faux" : "false")}</span> */}
                  </span>
               </div>
            ))}
         </div>
      </>
   );
};

const Validation = ({ activeQCM, setShowAnswer, idChapitre }) => {
   const [open, setOpen] = useState(false);
   const [save, setSave] = useState(true);
   const [error, setError] = useState(false);
   const [reponse, setReponse] = useState(null);
   const { isOnline, language, setUser } = useContext(AppContext);
   var isfrench = language === "FR";

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      if (reponse) {
         setShowAnswer(true);
      }

      setOpen(false);
      setSave(true);
      setError(false);
      setReponse(null);
   };

   const handleValider = () => {
      console.log("activeQCM == ", activeQCM);
   };

   return (
      <>
         <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Valider
         </Button>
         <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
            <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
            >
               <DialogTitle id="alert-dialog-title">
                  {isfrench ? "Validation des reponses" : "Validation of answers"}
               </DialogTitle>
               <DialogContent>
                  {save && !error && !reponse && <CircularProgress color="inherit" />}

                  {save && (
                     <SaveQcmChoice
                        activeQCM={activeQCM}
                        setReponse={setReponse}
                        setSave={setSave}
                        setError={setError}
                        idChapitre={idChapitre}
                        setShowAnswer={setShowAnswer}
                     />
                  )}
                  {error && (
                     <div style={{ width: "100%", marginBottom: "5px" }}>
                        <Alert severity="error">
                           <AlertTitle>{isfrench ? "Erreur" : "Error"}</AlertTitle>
                           {isOnline ? (
                              <span>
                                 {language === "FR" ? "Probleme avec le serveur...!" : "Problem with the server...!"}
                              </span>
                           ) : (
                              <span>
                                 {language === "FR"
                                    ? "Vous êtes hors connexion, controler votre connexion internet"
                                    : "You are offline, check your internet connection"}
                              </span>
                           )}
                        </Alert>
                     </div>
                  )}

                  {reponse && !save && !error && (
                     <div style={{ width: "100%", marginBottom: "5px" }}>
                        <div>
                           <span style={{ color: "green", fontWeight: "bold", fontSize: 16, margin: 10 }}>
                              Resultat:
                           </span>
                        </div>
                        <div style={{ fontWeight: "bold", fontSize: 17, margin: 10 }}>
                           <span
                              style={{
                                 color: reponse.totalQcm / 2 <= reponse.qcmValide ? "green" : "red",
                                 fontSize: 21,
                              }}
                           >
                              {reponse.qcmValide}
                           </span>
                           <span>{reponse.qcmValide > 0 ? " QCM validés sur " : " QCM validé sur "}</span>
                           <span style={{ fontSize: 21, color: "green" }}>{reponse.totalQcm}</span>{" "}
                        </div>
                     </div>
                  )}
               </DialogContent>
               <DialogActions>
                  {(!save || error) && (
                     <Button onClick={handleClose} autoFocus>
                        {isfrench ? "Fermer" : "Close"}
                     </Button>
                  )}
               </DialogActions>
            </Dialog>
         </Backdrop>
      </>
   );
};

const SaveQcmChoice = ({ activeQCM, setReponse, idChapitre, setError, setSave, setShowAnswer }) => {
   console.log("activeQCM == ", activeQCM);
   const { user } = useContext(AppContext);
   const { isLoading, data, error } = useFetch(
      "/etudiant/validerqcm/" + (user ? user.id : 0) + "/" + idChapitre,
      "POST",
      activeQCM
   );

   if (!isLoading && !error && data) {
      console.log("data == ", data);
      setReponse(data);
      setSave(false);
   } else if (!isLoading && error) {
      setError(true);
      setSave(false);
   }
};

const QROBloc = ({ chapitre }) => {
   const { language, user } = useContext(AppContext);
   var isfrench = language === "FR";
   //const { language, user } = useContext(AppContext);
   const [update, setUpdate] = useState(false);
   //const [showDialogSendSucces, setShowDialogSendSucces] = useState(false);
   const [open, setOpen] = useState(false);
   const [formLinksQRO, setFormLinksQRO] = useState([]);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      signUpError: null,
      step: -1,
   });
   chapitre = chapitre ? chapitre : {};

   const validationReponseQro = () => {
      setError((prev) => ({ ...prev, textError: null, step: -1 }));
      setErrorServeur(false);
      setSave(true);
      //console.log("liste de reponse == ", formLinksQRO);
   };

   const apresEnregistrement = () => {
      setOpen(true);
   };

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         {chapitre.qros && chapitre.qros.length > 0 && (
            <div className="MainBlocAllQRO">
               <div style={{ fontSize: 17, fontWeight: "bold" }}>
                  <span>Questions à réponse ouverte...</span>
               </div>
               <div style={{ fontSize: 14, fontStyle: "italic", color: "gray", marginBottom: 15 }}>
                  <span>
                     Vous êtes invités à répondre à chaque question. Dans le cas des activités pratiques, faites-nous un
                     résumé de la manière dont vous avez procédé et des résultats obtenus.
                  </span>
               </div>
               {error.textError && (
                  <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
               )}
               {errorServeur && <MessageErrorServeur />}
               {!save && (
                  <div className="listQRO">
                     {chapitre.qros.map((qro, index) => (
                        <DisplayQRO
                           qro={qro}
                           index={index}
                           formLinksQRO={formLinksQRO}
                           setFormLinksQRO={setFormLinksQRO}
                           update={update}
                        />
                     ))}
                  </div>
               )}
               <div style={{ margin: 10, marginTop: 15, display: "flex", flexDirection: "column" }}>
                  <div>
                     {error.textError && (
                        <span style={{ color: "red", fontWeight: 700, fontSize: 17 }}>{error.textError}</span>
                     )}
                     {errorServeur && <MessageErrorServeur />}
                  </div>
                  <Button variant="outlined" onClick={validationReponseQro}>
                     Envoyer vos reponses...!
                  </Button>
               </div>
            </div>
         )}
         {save && <span>save is true</span>}
         {save && (
            <SaveComponent
               setSave={setSave}
               requestURL={`/etudiant/reponseqro/`}
               requestBody={formLinksQRO}
               requestMethode={"POST"}
               requestParam={user.matricule}
               setErrorServeur={setErrorServeur}
               setError={setError}
               setUpdate={setUpdate}
               //redirected={true}
               //setActiveStep={setActiveStep}
               functionToExcecuteAfterGoodOperation={apresEnregistrement}
            />
         )}

         <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
            <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
            >
               <DialogTitle id="alert-dialog-title">
                  {isfrench ? "Validation des reponses" : "Validation of answers"}
               </DialogTitle>
               <DialogContent>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>
                     <span>
                        Vos réponses ont été enregistrées et seront évaluées par nos experts du domaine afin de vous
                        attribuer une note.
                     </span>
                     <br />
                     <br />
                     <span>
                        Néanmoins, vous pouvez toujours apporter des modifications à vos réponses si vous avez de
                        nouvelles idées.
                     </span>
                  </div>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                     {isfrench ? "Fermer" : "Close"}
                  </Button>
               </DialogActions>
            </Dialog>
         </Backdrop>
      </>
   );
};

const DisplayQRO = ({ qro, index, formLinksQRO, setFormLinksQRO, update }) => {
   const { language, user } = useContext(AppContext);
   const [changeReponse, setChangeReponse] = useState(false);
   var isfrench = language === "FR";

   const { isLoading, data, error } = useFetch(
      `/etudiant/reponseqro/${user.matricule}/${qro.id}/`,
      "GET",
      null,
      null,
      update
   );
   ///console.log("data qroEtudiant 02 == ", data);
   const setresponseToQro = (event) => {
      let newFormLinksQRO = [...formLinksQRO];
      let qroIsRegister = false;
      formLinksQRO.forEach((itemFormLink, index) => {
         if (itemFormLink.idElement === qro.id) {
            let formLink = itemFormLink;
            qroIsRegister = true;
            formLink.texte = event.target.value;
            newFormLinksQRO = newFormLinksQRO.filter((item) => item.idElement !== qro.id);
            newFormLinksQRO.push(formLink);
            // itemQCM01.propositions.push(propositionId);
            //newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id);
            //newActiveQCM.push(itemQCM01);
         }
      });

      if (!qroIsRegister) {
         let formLink = { idElement: qro.id, texte: event.target.value };
         newFormLinksQRO.push(formLink);
      }
      setFormLinksQRO([...newFormLinksQRO]);
   };

   let textarea = (
      <textarea
         style={{ padding: 5, borderRadius: 5 }}
         type="text"
         rows={3}
         defaultValue={data?.reponse}
         placeholder={isfrench ? "Ecrire ici..." : "Write here.."}
         onChange={(event) => setresponseToQro(event)}
      />
   );

   return (
      <div className="itemQRODiv">
         <div name="intituleQROfrancais" className="divChamp">
            <div className="subDivChamp">
               <label className="labelQro" style={{ fontSize: "16px", fontWeight: 500 }}>
                  {index + 1 + " ) "} {isfrench ? qro.intitule : qro.intituleEn}
               </label>
               {isLoading ? (
                  <div style={{ marginLeft: "40%" }}>
                     <CircularProgress size={40} />
                  </div>
               ) : error ? (
                  <MessageErrorServeur />
               ) : data && data.reponse && !changeReponse ? (
                  <div
                     style={{
                        minHeight: 100,
                        border: "2px solid gray",
                        borderRadius: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "space-between",
                        padding: 5,
                     }}
                  >
                     <span style={{ fontWeight: 500, fontSize: 15, color: "gray" }}> Votre reponse:</span>
                     <span style={{ fontWeight: 700, fontSize: 16, fontStyle: "italic" }}>{data.reponse}</span>

                     <Button
                        color="error"
                        variant="contained"
                        size="small"
                        style={{ width: "100px", marginTop: 5 }}
                        onClick={() => {
                           setChangeReponse(true);
                        }}
                     >
                        Modifier
                     </Button>
                  </div>
               ) : (
                  textarea
               )}

               {/* <textarea
                  style={{ padding: 5, borderRadius: 5 }}
                  type="text"
                  rows={3}
                  placeholder={isfrench ? "Ecrire ici..." : "Write here.."}
                  onChange={(event) => setresponseToQro(event)}
               /> */}
            </div>
         </div>
      </div>
   );
};

const LecteurVideo = ({ urlVideo }) => {
   const [isLoading, setIsLoading] = useState(true);
   const [errorVideo, setErrorVideo] = useState(false);

   const handleVideoLoad = () => {
      setIsLoading(false);
   };

   const handleVideoError = () => {
      setErrorVideo(true);
      setIsLoading(false);
   };
   return (
      <>
         <div
            style={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               marginTop: 5,
               marginBottom: 5,
            }}
         >
            {isLoading && (
               <div
                  style={{
                     position: "absolute",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "300px",
                  }}
               >
                  <CircularProgress /> {/* Remplacez par votre indicateur de progression circulaire personnalisé */}
                  <span>Chargement de la video...</span>
               </div>
            )}
            {errorVideo && (
               <div
                  style={{
                     position: "absolute",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "300px",
                  }}
               >
                  <span>Impossible de charger la video de cette partie du cour...! Controler votre connexion</span>
               </div>
            )}
            <ReactPlayer
               url={urlVideo}
               className="reactplayer"
               controls={true}
               onReady={handleVideoLoad}
               onError={handleVideoError}
            />{" "}
            {/* Replace with your video URL https://www.youtube.com/watch?v=TvgfzI7rFYU */}
         </div>
      </>
   );
};
