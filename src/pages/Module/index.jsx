import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../composants/Header";
import { chapitre, modules } from "../../utils/data/index.ts";
//import { useDeviceDetect } from 'react-device-detect';
//import { isMobile } from 'react-device-detect';
//import ReactPlayer from 'react-player'
import { Alert, AlertTitle, Button, CircularProgress } from "@mui/material";
import HeaderContent from "../../composants/HeaderContent/index.jsx";
import { Container, Image, Row } from "react-bootstrap";
import "./moduleCSS.css";
import { useFetch } from "../../utils/hooks/FetchData/index.jsx";
import { AppContext } from "../../context/index.jsx";
import { SceletonSmallArticleHorizontal } from "../../composants/Sceletons/index.jsx";
import { MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent/index.jsx";

export default function Module({ chapitres }) {
   const { isOnline, language, user } = useContext(AppContext);
   const { idModule } = useParams();
   const navigation = useNavigate();
   const { isLoading, data, error } = useFetch("/etudiant/module/" + (user ? user.id : 0) + "/" + idModule, "GET");
   var isfrench = language === "FR";
   var module = modules.find((module) => module.idModule * 1 === idModule * 1);
   console.log("modulle == ", data);
   if (!module) {
      module = {};
   }
   return (
      <>
         <Header />
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
            <HeaderContent />
            {/*justifyContent: 'space-evenly', flexWrap: 'wrap' */}
            <div className="vousetesici">
               <span style={{ fontSize: 13 }}>
                  Vous etes ici:
                  <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                     Tableau de bord
                  </Link>
                  <span> {">"} </span>
                  <Link to={"/module/" + idModule} style={{ textDecoration: "none" }}>
                     {data && data.length > 0 ? data[0].titreModule : ""}
                  </Link>
               </span>
            </div>
            <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10, justifyContent: "center" }}>
               <div className="listChapitreModule">
                  {isLoading ? (
                     <div className="maincontaintChapitreDiv">
                        {Array.from({ length: 4 }, (_, index) => (
                           <SceletonSmallArticleHorizontal />
                        ))}
                     </div>
                  ) : error ? (
                     <MessageErrorServeurWithVarialbleHeight />
                  ) : (
                     <div className="maincontaintChapitreDiv">
                        {data &&
                           data.length > 0 &&
                           data
                              .sort((a, b) => a.ordre - b.ordre)
                              .map((chapitre, index) => (
                                 <div className="mainChapitreBloc">
                                    <div
                                       className="chapitreModule"
                                       key={index}
                                       onClick={() => {
                                          navigation("/course/" + chapitre.idChapitre);
                                       }}
                                    >
                                       <div className="ImageChapitreModule">
                                          <Image
                                             src={
                                                chapitre?.imageURL
                                                   ? chapitre.imageURL
                                                   : "/images/illustration/default.png"
                                             }
                                             alt="imageIllustrativedu chapitre"
                                             id="myImg"
                                             style={{
                                                maxWidth: "100%",
                                                width: "100%",
                                                height: "100%",
                                                borderTopRightRadius: 5,
                                                borderTopLeftRadius: 5,
                                             }}
                                          />
                                       </div>
                                       <div className="titreChapitrediv">
                                          <span className="titreChapitreTexte">{chapitre.titre}</span>
                                       </div>
                                       <div className="statutChapitre">
                                          <Button
                                             onClick={() => {
                                                navigation("/course/" + chapitre.idChapitre);
                                             }}
                                             variant={!chapitre.firstTime ? "outlined" : "contained"}
                                             color={!chapitre.firstTime ? "info" : "success"}
                                             sx={{ width: "100%" }}
                                          >
                                             {!chapitre.firstTime ? "Relire ce cour" : "Commencer le cour"}
                                          </Button>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                     </div>
                  )}
               </div>
            </Row>
         </Container>
      </>
   );
}
