import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";

//import "antd/dist/antd.css";
import Header from "./../../composants/Header/index";
import "./homeCSS.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SignInSignUp from "../../composants/SignInSignUp";
import { AppContext } from "../../context";
import { removeUserCookie } from "../../utils/fonctions";

const Home = () => {
   const { language, setLanguage, setUser, user } = useContext(AppContext);
   const navigation = useNavigate();
   let isFrench = language === "FR";
   const deconnexion = () => {
      setUser(null);
      removeUserCookie();
      navigation("/");
   };

   return (
      <>
         <Header />
         <div
            className="divTitre"
            style={{ display: "flex", flexDirection: "column", gap: 15, padding: isMobile ? 10 : 30 }}
         >
            <div style={{ textAlign: isMobile ? "center" : "left" }}>
               <h3 className={"spantitle1"}>
                  Programme de Capacitation <span style={{ color: "#FDA811" }}>entrepreneurial</span>
               </h3>
            </div>
            <div className="divSoustexte" style={{ textAlign: isMobile ? "center" : "left" }}>
               <span>
                  <span style={{ fontWeight: "700" }}>Plus de 1000 jeunes </span> formés aux notions elementaires de
                  l'entrepreurnariat, de la gestion d'entreprise et de l'autorentabilité.
                  <Link to={"/apropos"} style={{ textDecorationLine: "none" }}>
                     {" "}
                     <span style={{ color: "red" }}>En savoir plus...</span>
                  </Link>
               </span>
            </div>
            <div
               style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: isMobile ? 5 : 25,
                  flexWrap: "wrap",
                  justifyContent: isMobile ? "space-evenly" : "flex-start",
               }}
            >
               {!user ? (
                  <>
                     <SignInSignUp signIn={false} classButtom="boutton01" variantButton="contained" />
                     <SignInSignUp signIn={true} classButtom="boutton01" variantButton="outlined" />
                  </>
               ) : (
                  <div className="buttonAction">
                     <Button variant="outlined" color="error" onClick={() => deconnexion()}>
                        {isFrench ? "Deconnexion" : "LogOut"}
                     </Button>
                  </div>
               )}
            </div>

            <div style={{ marginBottom: 15 }}>
               <h3>Presentation</h3>
               <p name="texte de presentation du Programme de Massification Entrepreneuriale">
                  Le<span style={{ fontWeight: 700 }}>Programme de Massification Entrepreneuriale</span> est une
                  initiative ambitieuse visant à promouvoir l'esprit d'entreprise et les compétences en leadership au
                  sein de divers groupes socio-économiques au Cameroun. Ce programme a pour objectif de doter les
                  individus des connaissances, des outils et du soutien nécessaires pour créer, développer et pérenniser
                  des entreprises compétitives, contribuant ainsi à la croissance économique du pays, à la création
                  d'emplois et à la prospérité à long terme.
               </p>
            </div>
            <div style={{ marginBottom: 15 }}>
               <h3>Objectifs du programme</h3>
               <p>
                  Le <span style={{ fontWeight: 700 }}>Programme de Massification Entrepreneuriale</span> poursuit un
                  objectif pluridimensionnel :
                  <ul>
                     <li>
                        <span style={{ fontWeight: 700 }}>
                           Renforcer les compétences en leadership et en entrepreneuriat{" "}
                        </span>
                        chez les jeunes, les étudiants, les enseignants et les familles d'entrepreneurs.
                     </li>
                     <li>
                        <span style={{ fontWeight: 700 }}>Soutenir les projets à fort potentiel </span>
                        chez les jeunes, les étudiants, les enseignants et les familles d'entrepreneurs.
                     </li>
                     <li>
                        <span style={{ fontWeight: 700 }}>Equiper les investisseurs </span>
                        des compétences nécessaires pour intégrer des capitaux dans des entreprises viables et guider
                        les projets matures dans la mise en place de conseils d'administration efficaces.
                     </li>
                  </ul>
               </p>
            </div>
            <div style={{ marginBottom: 15 }}>
               <h3>Public cible</h3>
               <p>
                  Le <span style={{ fontWeight: 700 }}>Programme de Massification Entrepreneuriale</span> cible
                  stratégiquement des bénéficiaires clés :
                  <ul>
                     <li>
                        <span style={{ fontWeight: 700 }}>Jeunes porteurs de projets :</span> Equiper les aspirants
                        entrepreneurs des fondamentaux du leadership et du sens des affaires, leur permettant de lancer
                        et de développer des entreprises compétitives.
                     </li>

                     <li>
                        <span style={{ fontWeight: 700 }}>Jeunesse en général : </span>
                        Au-delà des porteurs de projets, le programme diagnostique le potentiel entrepreneurial des
                        jeunes individus et les intègre dans des programmes de formation au leadership et aux
                        compétences pour renforcer leur employabilité.
                     </li>
                     <li>
                        <span style={{ fontWeight: 700 }}>Etudiants et élèves : </span>
                        Favoriser l'esprit d'entreprise et le leadership chez les étudiants et les élèves, en les
                        préparant à de futures initiatives entrepreneuriales.
                     </li>

                     <li>
                        <span style={{ fontWeight: 700 }}>Educateurs : </span>
                        Offrir aux éducateurs une formation spécialisée en pédagogie entrepreneuriale, les habilitant à
                        intégrer efficacement des outils de renforcement des compétences entrepreneuriales dans leurs
                        programmes d'enseignement.
                     </li>

                     <li>
                        <span style={{ fontWeight: 700 }}>Projets à fort potentiel : </span>
                        Proposer un mentorat et un soutien ciblés aux projets prometteurs, en améliorant leurs
                        perspectives d'emploi et leur viabilité financière à long terme.
                     </li>

                     <li>
                        <span style={{ fontWeight: 700 }}>Familles d'entrepreneurs : </span>
                        Sensibiliser les familles à l'esprit d'entreprise, encourager leur implication et fournir des
                        outils pour identifier les talents entrepreneuriaux. De plus, le programme plaide pour une
                        culture de consommation des produits camerounais.
                     </li>
                     <li>
                        <span style={{ fontWeight: 700 }}>Investisseurs : </span>
                        Organiser des ateliers pour les investisseurs, les dotant des connaissances et des compétences
                        nécessaires pour intégrer efficacement des capitaux dans les entreprises.
                     </li>
                  </ul>
                  En autonomisant ces groupes divers, le
                  <span style={{ fontWeight: 700 }}>Programme de Massification Entrepreneuriale</span> vise à stimuler
                  la transformation économique et le développement durable au Cameroun.
               </p>
            </div>
         </div>
         {/* <img className='imageFille' src="/images/fille01.png" alt="une jeune ecoliere" /> */}
         <div className="imageFille" style={{ backgroundImage: "url(/images/fille01.png)" }}></div>

         <footer className="footerHome" style={{ backgroundImage: "url(/images/footerImage.png)" }}>
            .
            {/* <img src="/images/footerImage.png" alt="Ma superbe image" style={{ height: 150, bottom: 0, maxWidth: '100vw' }} /> */}
         </footer>
      </>
   );
};

export default Home;
