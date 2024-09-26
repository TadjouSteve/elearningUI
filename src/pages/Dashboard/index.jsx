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
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TextSnippetSharpIcon from "@mui/icons-material/TextSnippetSharp";
import HelpCenterSharpIcon from "@mui/icons-material/HelpCenterSharp";

export default function Dashboard() {
   const { isOnline, language, setUser, user } = useContext(AppContext);
   const { isLoading, data, error } = useFetch("/etudiant/dashboard/" + (user ? user.id : 0), "GET");
   console.log("data dashboard", data);
   const navigation = useNavigate();
   var isfrench = language === "FR";
   return (
      <>
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
            <Header />
            <HeaderContent />

            <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10 }}>
               <div className="textePresentationDashboardDiv" style={{ fontWeight: "bold" }}>
                  {isfrench ? (
                     <span className="textePresentationDashboardspan">
                        Explorez nos modules de formation : Plongez dans notre programme complet ! Découvrez des modules
                        spécialement conçus pour vous aider à maîtriser les compétences essentielles en matière de
                        rentabilité et de fonctionnement. Que vous soyez novice ou entrepreneur chevronné, ces modules
                        vous guideront vers le succès.
                     </span>
                  ) : (
                     <span className="textePresentationDashboardspan">
                        Explore our training modules: Dive into our comprehensive curriculum! Discover modules
                        specifically designed to help you master essential skills in profitability and operations.
                        Whether you are a novice or a seasoned entrepreneur, these modules will guide you to success.
                     </span>
                  )}
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
                        {isfrench ? "Récapitulatif de vos activités" : "Summary of your activities"}
                     </div>
                     <div className="mainStatBlocDashboard">
                        <div className="statItemDashbord" style={{ backgroundColor: "#ffeee8" }}>
                           <div className="icnDashbord">
                              <TextSnippetSharpIcon style={{ width: "100%", height: "100%" }} />
                           </div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.courLu} sur {data.chapitreTotal}
                              </span>
                              <span className="texteStatDashboard">
                                 {isfrench ? "Cours déjà lu" : "Course already read"}
                              </span>
                           </div>
                        </div>
                        <div className="statItemDashbord" style={{ backgroundColor: "#ebebff" }}>
                           <div className="icnDashbord">
                              <QuestionAnswerIcon style={{ width: "100%", height: "100%" }} />
                           </div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.qroRepondu} sur {data.qroTotal}
                              </span>
                              <span className="texteStatDashboard">
                                 {isfrench ? "Réponses envoyées" : "Responses sent"}
                              </span>
                           </div>
                        </div>

                        <div className="statItemDashbord" style={{ backgroundColor: "#e1f7e3" }}>
                           <div className="icnDashbord">
                              <ViewModuleIcon style={{ width: "100%", height: "100%" }} />
                           </div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">
                                 {data.moduleAccessible} sur {data.moduleTotal}
                              </span>
                              <span className="texteStatDashboard">
                                 {isfrench ? "Module accessible" : "Accessible module"}
                              </span>
                           </div>
                        </div>

                        <div className="statItemDashbord" style={{ backgroundColor: "#FFEEE8" }}>
                           <div className="icnDashbord">
                              <HelpCenterSharpIcon style={{ width: "100%", height: "100%" }} />
                           </div>
                           <div className="texteStatDashbord">
                              <span className="numberStatDashboard">{data.questionPose ? data.questionPose : 0}</span>
                              <span className="texteStatDashboard">Vos questions</span>
                           </div>
                        </div>
                     </div>
                  </Row>

                  {/*<Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10, justifyContent: "center" }}>
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
                                          {isfrench ? "Accédez à ce module" : "Access this module"}
                                       </Button>
                                    ) : (
                                       <Button variant="contained" color="error" sx={{ width: "100%", height: "100%" }}>
                                          {isfrench ? "Module verrouillé" : "Locked module"}
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
                  </Row>*/}

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
                                 <div class="b-formation " style={{ height: "100%" }}>
                                    <div class="b-formation-content" style={{ height: "100%" }}>
                                       <div class="b-formation-image" style={{ height: "77%" }}>
                                          <Image
                                             src={
                                                module?.nomImage ? module.nomImage : "/images/illustration/default.png"
                                             }
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
                                       <div class="b-formation-title">
                                          <div class="b-formation-icon">
                                             <img
                                                width="70"
                                                height="70"
                                                src="images/idea.png"
                                                alt="illustration module"
                                             />
                                          </div>
                                          <h6 class="">
                                             <a href="" class="formation-link">
                                                {isfrench ? module.titre : module.titreEn}
                                             </a>
                                          </h6>
                                       </div>
                                       <div class="b-formation-overlay">
                                          <div class="b-formation-overlay-icon">
                                             <img
                                                width="55"
                                                height="55"
                                                src="images/idea.png"
                                                alt="illustration module"
                                             />
                                          </div>
                                          <h6 class="b-formation-overlay-title">
                                             <span class="formation-link" style={{ color: "white" }}>
                                                {isfrench ? module.titre : module.titreEn}
                                             </span>
                                          </h6>
                                          <div class="b-formation-overlay-desc">
                                             {/** ici on peut mettre la description */}
                                             <span style={{ fontSize: 14 }}>
                                                <span style={{ fontWeight: "500", fontSize: "18px" }}>
                                                   {module.totalChapitre}
                                                </span>
                                                {isfrench
                                                   ? ` Cours disponible${
                                                        module.totalChapitre === 1 ? "" : "s"
                                                     } dans ce module`
                                                   : "Course available in this module"}
                                             </span>
                                             <br />

                                             {module.chapitreLu > 0 && module.chapitreLu < module.totalChapitre && (
                                                <span style={{ fontSize: 16, color: "yellow" }}>
                                                   <span style={{ fontWeight: "500", fontSize: "18px" }}>
                                                      {module.chapitreLu}
                                                   </span>
                                                   {isfrench
                                                      ? ` Cours déjà lu${module.chapitreLu === 1 ? "" : "s"}`
                                                      : " Course already read"}
                                                </span>
                                             )}

                                             {module.chapitreLu >= module.totalChapitre && (
                                                <span style={{ fontSize: 16, color: "yellow" }}>
                                                   {isfrench
                                                      ? " Vous avez suivi tous les cours présents dans ce module"
                                                      : " You have completed all the courses in this module"}
                                                </span>
                                             )}

                                             {module.chapitreLu === 0 && (
                                                <span style={{ fontSize: 17, color: "yellow" }}>
                                                   {isfrench
                                                      ? " Vous n’avez lu aucun cours de ce module."
                                                      : " You have not read any courses in this module."}
                                                </span>
                                             )}
                                          </div>
                                          {module.isAccessible ? (
                                             <span href="details-formation.html" class="b-formation-overlay-button">
                                                <span
                                                   onClick={() => {
                                                      navigation("/module/" + module.idModule);
                                                   }}
                                                   style={{ cursor: "pointer" }}
                                                >
                                                   {isfrench ? "Accédez à ce module" : "Access this module"}
                                                </span>
                                                <span class="b-formation-overlay-icon"></span>
                                             </span>
                                          ) : (
                                             <Button
                                                variant="contained"
                                                color="error"
                                                sx={{ width: "100%", height: "40px" }}
                                             >
                                                {isfrench ? "Module verrouillé" : "Locked module"}
                                             </Button>
                                          )}
                                       </div>
                                    </div>
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
                     <div style={{ fontWeight: "bold", fontSize: 17 }}>
                        {isfrench ? "Fonctionnement de la formation" : "How the training works"}:
                     </div>
                     {isfrench ? (
                        <ol>
                           <li style={{ margin: 5 }}>
                              <span style={{ fontWeight: "bold" }}>Chapitres et Questions:</span> Chaque module est
                              divisé en plusieurs chapitres. À la fin de chaque chapitre, vous trouverez des questions à
                              réponse ouverte. Ces questions vous permettront de vérifier vos connaissances et de
                              renforcer votre compréhension des sujets abordés.
                           </li>
                           <li style={{ margin: 5 }}>
                              <span style={{ fontWeight: "bold" }}>Progression Graduelle:</span> Les modules ne sont pas
                              tous accessibles simultanément. Au début, seul le premier module est déverrouillé. Chaque
                              semaine, un nouveau module sera accessible. Cette approche progressive vous permettra de
                              suivre la formation de manière structurée et d’assimiler les informations étape par étape
                           </li>
                           <li style={{ margin: 5 }}>
                              <span style={{ fontWeight: "bold" }}>Attestation de Réussite:</span> À la fin de la
                              formation, si vous avez complété tous les chapitres et répondu aux questions à réponse
                              ouverte, vous recevrez une attestation qui témoigne de votre engagement et de vos
                              compétences nouvellement acquises.
                           </li>
                        </ol>
                     ) : (
                        <ol>
                           <li style={{ margin: 5 }}>
                              <span style={{ fontWeight: "bold" }}>Chapters and Questions:</span> Each module is divided
                              into several chapters. At the end of each chapter, you will find open- answer questions.
                              These questions will allow you to test your knowledge and reinforce your understanding of
                              the topics covered.
                           </li>
                           <li style={{ margin: 5 }}>
                              <span style={{ fontWeight: "bold" }}>Gradual Progression:</span> Not all modules are
                              accessible simultaneously. At the beginning, only the first module is unlocked. Each week,
                              a new module will be accessible. This progressive approach will allow you to follow the
                              training in a structured manner and assimilate the information step by step
                           </li>
                           <li style={{ margin: 5 }}>
                              <span style={{ fontWeight: "bold" }}>Certificate of Achievement:</span> At the end of the
                              training, if you have completed all the chapters and answered the open- answer questions,
                              you will receive a certificate that demonstrates your commitment and your newly acquired
                              skills.
                           </li>
                        </ol>
                     )}
                  </div>
               </Col>
            </Row>

            <Footer />
         </Container>
      </>
   );
}
