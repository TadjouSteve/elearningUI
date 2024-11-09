import { Button, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import "./headerContentCSS.css";
import "./headerCSS02.css";
import { AppContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function HeaderContent({ titre, link }) {
   const { language, user } = useContext(AppContext);
   const [selectedNav, setSelectedNav] = useState(1);
   const navigation = useNavigate();
   return (
      <>
         <section class="ban-header">
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-100">
                     <div class="pad-cat">
                        <div className="userProfilButtonAction" style={{}}>
                           <div className="userProfil">
                              <IconButton sx={{ p: 0 }}>
                                 <AccountCircleIcon sx={{ fontSize: "55px", color: "white" }} />
                                 {/* <AccountCircle size={50} /> */}
                              </IconButton>
                              <div className="infoUser">
                                 <span className="nomCompletHedercontent">
                                    {user ? user.nom + " " + user.prenom : "votre nom"}
                                 </span>
                                 <span className="metierHedercontent">{user ? user.profession : ""}</span>
                              </div>
                           </div>
                           <div className="buttonAction">
                              <Button
                                 variant="contained"
                                 color="warning"
                                 onClick={() => {
                                    navigation(-1);
                                 }}
                                 className="buttonPrecedentHeaderContent"
                                 //style={{ width: 100, fontSize: 9 }}
                              >
                                 {language === "FR" ? "Page precedente" : "Preview page"}
                              </Button>
                           </div>
                        </div>
                        <div class="ban-header-title text-center">
                           <h1>{titre ? titre : "Nos formations"}</h1>
                           <ul class="thm-breadcrumb">
                              <li>
                                 <Link to="/home">Accueil</Link>
                              </li>
                              <li>
                                 <Link to="/dashboard">Tableau de bord</Link>
                              </li>

                              {link && link.url && link.texte && (
                                 <li>
                                    {" "}
                                    <Link to={link.url}>{link.texte}</Link>
                                 </li>
                              )}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section>
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-100">
                     <div class="formation-cat pb-10" style={{ display: "flex", justifyContent: "center" }}>
                        <ul class="formation-type" style={{ padding: 0, margin: 0 }}>
                           <li class="active">
                              <Link to="/dashboard">Tableau de bord</Link>
                           </li>
                           {/* <li>
                              <Link to="#">Paramètres</Link>
                           </li> */}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* <div className="mainHaderContent" style={{ backgroundImage: "url(/images/footerImage.png)" }}>
            <div className="subDivHeaderContent" style={{}}>
               <div className="userProfilButtonAction">
                  <div className="userProfil">
                     <div className="profil"></div>
                     <div className="infoUser">
                        <span className="nomCompletHedercontent">
                           {user ? user.nom + " " + user.prenom : "Faux nom Talla andre marie"}
                        </span>
                        <span className="metierHedercontent">{user ? user.profession : "fausse profession"}</span>
                     </div>
                  </div>
                  <div className="buttonAction">
                     <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                           navigation(-1);
                        }}
                        className="buttonPrecedentHeaderContent"
                        //style={{ width: 100, fontSize: 9 }}
                     >
                        {language == "FR" ? "Page precedente" : "Preview page"}
                     </Button>
                  </div>
               </div>
               <div className="navigationHeaderContent">
                  <div
                     onClick={() => {
                        setSelectedNav(1);
                        navigation("/dashboard");
                     }}
                     className={"itemNavigationHeaderContent" + (selectedNav === 1 ? " selectedNav" : "")}
                  >
                     <spam>TABLEAU DE BORD</spam>
                  </div>
                  <div
                     onClick={() => {
                        setSelectedNav(2);
                     }}
                     className={"itemNavigationHeaderContent" + (selectedNav === 2 ? " selectedNav" : "")}
                  >
                     <span>PARAMÈTRES</span>
                  </div>
               </div>
            </div>
         </div> */}
      </>
   );
}

export default HeaderContent;
