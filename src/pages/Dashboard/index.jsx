import React, { useContext } from "react";
import Header from "../../composants/Header";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Alert, AlertTitle, Button, CircularProgress, Divider } from "@mui/material";
//import { modules } from '../../utils/data'
import { useNavigate } from "react-router-dom";
import { modules } from "../../utils/data/index.ts";
import Footer from "../../composants/Footer/index.jsx";
import HeaderContent from "../../composants/HeaderContent/index.jsx";
import "./dashboardCSS.css";
import { AppContext } from "../../context/index.jsx";
import { useFetch } from "../../utils/hooks/FetchData/index.jsx";
import { MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent/index.jsx";
import { SceletonSmallArticleHorizontal } from "../../composants/Sceletons/index.jsx";

export default function Dashboard() {
   const { isOnline, language, setUser, user } = useContext(AppContext);
   const { isLoading, data, error } = useFetch("/etudiant/dashboard/" + (user ? user.id : 0), "GET");
   //console.log("data dashboard", data);
   const navigation = useNavigate();
   var isfrench = language === "FR";
   return (
      <>
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
            <Header />
            <HeaderContent />

            <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10 }}>
               <div className="textePresentationDashboardDiv" style={{ fontWeight: "bold" }}>
                  <span className="textePresentationDashboardspan">
                     Explorez nos Modules de Formation: Plongez dans notre programme de formation complet! Découvrez des
                     modules spécialement conçus pour vous aider à maîtriser les compétences essentielles en matière de
                     rentabilité et de fonctionnement. Que vous soyez un novice ou un entrepreneur chevronné, ces
                     modules vous guideront vers le succès.
                  </span>
               </div>
            </Row>

            {isLoading ? (
               <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10 }}>
                  <div className="maincontaintModulesDiv">
                     {Array.from({ length: 4 }, (_, index) => (
                        <SceletonSmallArticleHorizontal />
                     ))}
                  </div>
               </Row>
            ) : error ? (
               <MessageErrorServeurWithVarialbleHeight />
            ) : (
               <>
                  <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10 }}>
                     <div style={{ margin: "5px", fontWeight: "blod", fontSize: 20 }}>
                        Récapitulatiif de vos activités
                     </div>
                     <div className="mainStatBlocDashboard">
                        <div className="statItemDashbord" style={{ backgroundColor: "#ffeee8" }}>
                           <div className="icnDashbord"></div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.courLu} sur {data.chapitreTotal}
                              </span>
                              <span className="texteStatDashboard">Cour deja lu</span>
                           </div>
                        </div>
                        <div className="statItemDashbord" style={{ backgroundColor: "#ebebff" }}>
                           <div className="icnDashbord"></div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.qcmvalide} sur {data.qcmTotal}
                              </span>
                              <span className="texteStatDashboard">QCM Validés</span>
                           </div>
                        </div>

                        <div className="statItemDashbord" style={{ backgroundColor: "#e1f7e3" }}>
                           <div className="icnDashbord"></div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.moduleAccessible} sur {data.moduleTotal}
                              </span>
                              <span className="texteStatDashboard">Module accessible</span>
                           </div>
                        </div>

                        <div className="statItemDashbord" style={{ backgroundColor: "#FFEEE8" }}>
                           <div className="icnDashbord"></div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">{data.questionPose ? data.questionPose : 0}</span>
                              <span className="texteStatDashboard">Vos questions</span>
                           </div>
                        </div>
                     </div>

                     <>
                        {/* <Col style={{ margin: 10 }}>
                        <div className="statItemDashbord" style={{ backgroundColor: "#ffeee8" }}>
                           <div className="icnDashbord"></div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.courLu} sur {data.chapitreTotal}
                              </span>
                              <span className="texteStatDashboard">Cour deja lu</span>
                           </div>
                        </div>
                     </Col>
                     <Col style={{ margin: 10 }}>
                        <div className="statItemDashbord" style={{ backgroundColor: "#ebebff" }}>
                           <div className="icnDashbord"></div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.qcmvalide} sur {data.qcmTotal}
                              </span>
                              <span className="texteStatDashboard">QCM Validés</span>
                           </div>
                        </div>
                     </Col>
                     <Col style={{ margin: 10 }}>
                        <div className="statItemDashbord" style={{ backgroundColor: "#e1f7e3" }}>
                           <div className="icnDashbord"></div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.moduleAccessible} sur {data.moduleTotal}
                              </span>
                              <span className="texteStatDashboard">Module accessible</span>
                           </div>
                        </div>
                     </Col>
                     <Col style={{ margin: 10 }}>
                        <div className="statItemDashbord" style={{ backgroundColor: "#FFEEE8" }}>
                           <div className="icnDashbord"></div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">{data.questionPose ? data.questionPose : 0}</span>
                              <span className="texteStatDashboard">Vos questions</span>
                           </div>
                        </div>
                     </Col> */}
                     </>
                  </Row>

                  <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10, justifyContent: "center" }}>
                     <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="maincontaintModulesDiv">
                           {data.modules.map((module, index) => (
                              <div
                                 className="mainModuleBloc"
                                 onClick={() => {
                                    module.isAccessible && navigation("/module/" + module.idModule);
                                 }}
                              >
                                 <div className="imageIlliustrationModuleDiv">
                                    <Image
                                       src={module?.nomImage ? module.nomImage : "/images/illustration/default.png"}
                                       alt="imageIllustrativedu module"
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
                                 <div className="titreModuleDashboard">
                                    <span style={{ fontWeight: 600, textAlign: "center" }}>
                                       {isfrench ? module.titre : module.titreEn}
                                    </span>
                                 </div>
                                 <div className="actionButton">
                                    {module.isAccessible ? (
                                       <Button
                                          onClick={() => {
                                             navigation("/module/" + module.idModule);
                                          }}
                                          variant="contained"
                                          color="success"
                                          sx={{ width: "100%", height: "100%", borderRadius: 0 }}
                                       >
                                          Commencer avec ce module
                                       </Button>
                                    ) : (
                                       <Button variant="contained" color="error" sx={{ width: "100%", height: "100%" }}>
                                          Module Verrouiller
                                       </Button>
                                    )}
                                 </div>
                                 <div className="nonbreChapitreModuledashboardDiv">
                                    <span className="nonbreChapitreModuledashboardText"></span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </Row>
               </>
            )}

            <Row
               style={{
                  backgroundColor: "rgba(36,172,242,0.3)",
                  borderRadius: 5,
                  margin: 20,
                  marginTop: 30,
                  padding: 20,
               }}
            >
               <Col>
                  <div>
                     <div style={{ fontWeight: "bold", fontSize: 17 }}>Fonctionement de la formation:</div>
                     <ol>
                        <li style={{ margin: 5 }}>
                           <span style={{ fontWeight: "bold" }}>Chapitres et Quiz:</span> Chaque module est divisé en
                           plusieurs chapitres. À la fin de chaque chapitre, vous trouverez un quiz à compléter. Ces
                           quiz vous permettront de vérifier vos connaissances et de renforcer votre compréhension des
                           sujets abordés.
                        </li>
                        <li style={{ margin: 5 }}>
                           <span style={{ fontWeight: "bold" }}>Progression Graduelle:</span> Les modules ne sont pas
                           tous accessibles simultanément. Au début, seul le premier module est déverrouillé. Chaque
                           semaine, un nouveau module sera accessible. Cette approche progressive vous permettra de
                           suivre la formation de manière structurée et d’assimiler les informations étape par étape
                        </li>
                        <li style={{ margin: 5 }}>
                           <span style={{ fontWeight: "bold" }}>Attestation de Réussite:</span> À la fin de la
                           formation, si vous avez complété tous les chapitres et réussi les quiz, vous recevrez une
                           attestation qui témoigne de votre engagement et de vos compétences nouvellement acquises.
                        </li>
                     </ol>
                  </div>
               </Col>
            </Row>

            <Footer />
         </Container>
      </>
   );
}
