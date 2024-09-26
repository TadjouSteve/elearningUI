import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { calculateTimeLeft, removeUserCookie } from "../../utils/fonctions";
import Header from "../../composants/Header";
import "./home02CSS.css";
import { Prev } from "react-bootstrap/esm/PageItem";
import * as FaIcons from "react-icons/fa";
import { Button } from "@mui/material";
import SignInSignUp from "../../composants/SignInSignUp";
import Footer from "../../composants/Footer";

const tabulation = <span style={{ padding: "0 0 0 20px" }}></span>;

export default function Home() {
   const { language, setLanguage, setUser, user } = useContext(AppContext);
   const [readMore01, setRemore01] = useState(false);
   const navigation = useNavigate();
   const mainTitreRef = useRef(null);

   const handleResetFocus = () => {
      mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
   };

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

   useEffect(() => {
      const timer = setInterval(() => {
         setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   let isFrench = language === "FR";
   const deconnexion = () => {
      setUser(null);
      removeUserCookie();
      navigation("/");
   };
   return (
      <div style={{ width: "100%" }}>
         <Header />

         <section class="banniere">
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-100">
                     <div class="pad-cat">
                        <div class="titre-banniere text-white">
                           <h2 class="text-white">
                              Programme de capacitation des entrepreneurs à l’auto rentabilité et à la gestion
                              d’entreprise : entreprises locales à fort potentiel d’import substitution
                           </h2>
                           <p class="text-white">
                              Plus de 1000 jeunes formés aux notions de l'entreprenariat, de la gestion d'entreprise et
                              de l'auto rentabilité.
                           </p>
                           <a class="rm" href="/apropos">
                              En savoir plus
                           </a>
                           <div class="lien-connexion mt-20 ">
                              {!user ? (
                                 <>
                                    <Link
                                       to="/inscription"
                                       class="btn btn-insc"
                                       style={{ marginLeft: 15, marginTop: 15 }}
                                    >
                                       {isFrench ? "S'inscrire" : "Register "}
                                    </Link>
                                    <Link
                                       to="/connexion"
                                       class="btn btn-login text-white"
                                       style={{ marginLeft: 15, marginTop: 15 }}
                                    >
                                       {isFrench ? "Se connecter" : "Sign in"}
                                    </Link>
                                 </>
                              ) : (
                                 <>
                                    <Link
                                       to="/dashboard"
                                       class="btn btn-insc"
                                       style={{ marginLeft: 15, marginTop: 15 }}
                                    >
                                       {isFrench ? "Tableau de bord" : "Dashboard"}
                                    </Link>
                                    <span
                                       to="#"
                                       onClick={() => deconnexion()}
                                       class="btn btn-login text-white"
                                       style={{ marginLeft: 15, marginTop: 15, background: "red" }}
                                    >
                                       {isFrench ? "Deconnexion" : "LogOut"}
                                    </span>
                                 </>
                              )}
                           </div>

                           <div class="lien-connexion mt-0" style={{ padding: 0 }}>
                              <Link
                                 to="/candidature/salon/entrepreneur"
                                 class="btn btn-insc"
                                 style={{ marginLeft: 15, marginTop: 0 }}
                              >
                                 {isFrench
                                    ? "Inscription au Salon de l'Entrepreneuriat"
                                    : "Registration for the Entrepreneurship Fair "}
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section class="contexte">
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-100">
                     <div class="pad-cat text-center">
                        <div class="pl-title text-center m-auto">
                           <div>
                              <a
                                 href={`${process.env.PUBLIC_URL}/documents/programme_formation.pdf`}
                                 download="Chronogramme_programme_Leadership_1000_jeunes.pdf"
                                 className="download-button02"
                              >
                                 Télécharger le Programme de formation
                              </a>
                           </div>
                           <div class="pl-title-subtitle text-center">
                              <span>Le contexte</span>
                           </div>
                           <h2 class="pl-title-heading text-center">
                              Le Cameroun regorge de nombreux atouts et potentialités
                           </h2>
                        </div>
                        <div class="contextview text-center">
                           <p class="context-paragraphe">
                              Des capacités à même de déservir la forte demande de l'économie Nationale et
                              Sous-régionale en Afrique. Cependant les défis liés à une production insuffisante et à la
                              concurrence des produits importés entravent la solidification et le développement
                              compétitif et durable de cette économie potentielle.Dans les faits il faut considérer que,
                              la faiblesse de la production et du faible taux de transformation, résultant de l’état
                              embryonnaire de l’industrialisation des process, favorisent la prolifération des produits
                              importés sur le marché local. Cet état de chose justifie à suffisance la balance
                              commerciale hautement déficitaire, estimé selon l’Institut National des Statistiques à{" "}
                              <strong>1. 478 milliards de FCFA</strong>.<br />
                              <br />
                              Pour inverser ces processus, et favoriser la restructuration industrielle du Pays, le
                              gouvernement du Cameroun a initié le processus d’Import-Substitution qui consiste à
                              réduire l’importation et favoriser la consommation de la production locale. Pour ce faire
                              il souhaite renforcer les compétences des jeunes dirigeants et créateurs d’entreprises
                              locales de même que leurs aptitudes à irriger durablement des industries rentables
                              compétitives sur le plan National et International. Il a ainsi mandaté l’Institut de
                              Recherche en Intelligences de la création et de la mise en œuvre du Programme de
                              Capacitation des 1000 jeunes Entrepreneurs.
                              <br />
                              <br />
                              <span style={{ fontWeight: 700, padding: "0px 0px 0px 20px" }}>
                                 {" "}
                                 Le programme de Capacitation des 1000 Jeunes entrepreneurs à l’auto-rentabilité et au
                                 fonctionnement{" "}
                              </span>
                              est une initiative dont la vision est de capitaliser sur les ressources locales créatrices
                              de valeur ajoutée et de promouvoir l’entrepreneuriat pour tous, en Afrique et au Cameroun.
                              Afin d’atteindre les objectifs visés par la politique d’import-substitution au Cameroun,
                              ce programme entend favoriser le partage d’expériences, renforcer les capacités pratiques
                              et la maitrise des process locaux de gestion entrepreneuriale d’entreprise durables
                              compétitives , et de former en leadership l’écosystème immédiat de l’Entrepreneur. À la
                              fin de ce programme de formation, l’Etat du Cameroun sera riche d’environ 5000 Chefs
                              d’entreprise et porteurs de projets qui seront capacités au leadership, au fonctionnement
                              efficace, à l’auto rentabilité, à la structuration et à la gouvernance de leurs
                              entreprises.
                           </p>
                           <div class="flouteur"></div>
                        </div>
                        <div class="text-center">
                           <a class="contextrm" href="#">
                              {/* <span>Lire la suite</span> */}
                              <i class="fas fa-angle-down"></i>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section class="activite">
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-40">
                     <div class="pad-cat">
                        <div class="pl-title text-center m-auto">
                           <div class="pl-title-subtitle">
                              <span>Les formations</span>
                           </div>
                           <h2 class="pl-title-heading">Les activités du programme</h2>
                        </div>
                     </div>
                  </div>
                  <div class="cat-col-60">
                     <div class="pad-cat">
                        <div class="act-desc">
                           La Capacitation au fonctionnement durable et à l’auto rentabilité de chacun des 1000
                           Entrepreneurs et porteurs de projet est la principale activité du Programme. Elle se décline
                           selon les savoir-faire suivants dont l’Entrepreneur bénéficiera :
                        </div>
                     </div>
                  </div>
                  <div class="cat-col-50">
                     <div class="pad-cat">
                        <div class="img">
                           <img src="images/contexte-1.jpg" />
                        </div>
                     </div>
                  </div>
                  <div class="cat-col-50">
                     <div class="pad-cat">
                        <div class="bloc-activite">
                           <h3 class="color-theme3">Phase de formation en présentielle</h3>
                           <p>
                              Durant 06 jours, au moins 100 entrepreneurs dans chaque région du Cameroun sont
                              collectivement capacités par des formateurs et encadreurs issues du Top Management de
                              grandes multinationales Africaine : MTN, ACTIVA, ECOBANK, DANGOTE, AFRILAND FISRT BANK,
                              BOISSONS DU CAMEROUN, etc. Des Dirigeants d’Entreprises africaines Leaders du marché local
                              complexe depuis au moins 10 années dans chacun des secteurs entrepreneuriaux
                              d’import-substitution, formeront: DOVV, ZÉNITH ASSURANCE, DOUBLE T CREATIVE, OBI V
                              Solutions, CABINET ELES YST, etc. Cette phase sera encadré par des sessions de cours, des
                              conférences et ateliers présentiels de travail.
                           </p>
                        </div>
                        <div class="bloc-activite">
                           <h3 class="color-theme3">Phase de formation en ligne</h3>
                           <p>
                              Durant 03 semaines, les pratiques et applications des process acquis pendant la formation
                              en présentielle se feront entre les entrepreneurs et les acteurs de suivi sur le terrain
                              et sur le marché.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section class="objectif">
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-50 cat-col-empty">
                     <div class="pad-cat"></div>
                  </div>
                  <div class="cat-col-50">
                     <div class="pad-cat">
                        <div class="pl-title text-center m-auto">
                           <div class="pl-title-subtitle">
                              <span>Aspirations</span>
                           </div>
                           <h2 class="pl-title-heading">Objectifs spécifiques & Activités connexes</h2>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row-col">
                  <div class="cat-col-40">
                     <div class="pad-cat">
                        <div class="img-obj">
                           <div class="img-obj-abs">
                              <img src="images/connexe.jpg" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="cat-col-60">
                     <div class="pad-cat">
                        <div class="list-ob-all">
                           <ul class="list-ob">
                              <li>
                                 <div class="list-icon-outer">
                                    <div class="list-icon-wapper bg-theme1">
                                       <span>01</span>
                                    </div>
                                 </div>
                                 <div class="list-icon-info">
                                    <strong>La formation desinvestisseurs locaux</strong> l’importance d’investir sur
                                    les projets locaux rentables et durables;
                                 </div>
                              </li>
                              <li>
                                 <div class="list-icon-outer">
                                    <div class="list-icon-wapper bg-theme2">
                                       <span>02</span>
                                    </div>
                                 </div>
                                 <div class="list-icon-info">
                                    <strong>
                                       L’initiation et la mise en place de 1000 Conseils d’administration ou comités de
                                       pilotages
                                    </strong>{" "}
                                    au sein des entreprises bénéficiaires du Programme, afin de leur permettre d’être
                                    structurées avec durabilité;
                                 </div>
                              </li>
                              <li>
                                 <div class="list-icon-outer">
                                    <div class="list-icon-wapper bg-theme3">
                                       <span>03</span>
                                    </div>
                                 </div>
                                 <div class="list-icon-info">
                                    <strong>La sensibilisation et la formation des 1000 familles</strong> soutien des
                                    entrepreneurs et à La mise sur pieds des entreprises qui assureront leurs
                                    rentabilités sur le long terme;
                                 </div>
                              </li>
                              <li>
                                 <div class="list-icon-outer">
                                    <div class="list-icon-wapper bg-theme4">
                                       <span>04</span>
                                    </div>
                                 </div>
                                 <div class="list-icon-info">
                                    <strong>L’initiation et la certification de 1000 jeunes étudiants</strong> et élèves
                                    au leadership et à l’entrepreneuriat sur toute l’étendue du territoire national;
                                 </div>
                              </li>

                              <li>
                                 <div class="list-icon-outer">
                                    <div class="list-icon-wapper bg-theme5">
                                       <span>05</span>
                                    </div>
                                 </div>
                                 <div class="list-icon-info">
                                    <strong>La formation de 3000 enseignants</strong> à la pédagogie entrepreneuriale
                                    dans les 10 régions du Cameroun.
                                 </div>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section class="cible">
            <div class="wapper">
               <div class="cible-1">
                  <div class="row-col">
                     <div class="cat-col-40">
                        <div class="pad-cat">
                           <div class="img">
                              <img src="images/cible1.jpg" alt="" />
                           </div>
                        </div>
                     </div>
                     <div class="cat-col-60">
                        <div class="pad-cat">
                           <div class="bloc-cible">
                              <div class="pl-title">
                                 <div class="pl-title-subtitle">
                                    <span class="text-white">Public cible</span>
                                 </div>
                                 <h2 class="pl-title-heading text-white">Cible Principale</h2>
                              </div>
                              <div class="separateur pt-30 pb-30">
                                 <span></span>
                              </div>
                              <div class="bloc-cible-text">
                                 <h3 class="text-white">
                                    Les Entrepreneurs et porteurs de projets issues des 10 régions du Cameroun et
                                    investis dans les filières d'import substitution{" "}
                                 </h3>
                                 <p>
                                    cacao-café, l'huile de palme, le sucre, le riz, le maïs, la banane- plantain, le
                                    poisson, le lait et la viande. Confection textile de coton, cuir et confection de
                                    chaussure, transformation de bois, professions libérales, etc
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section class="cible-second-all pt-60">
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-100">
                     <div class="pad-cat">
                        <div class="pl-title text-center m-auto">
                           <div class="pl-title-subtitle text-center">
                              <span>Nos clibles</span>
                           </div>
                           <h2 class="pl-title-heading text-center">Cibles connexes stratégique</h2>
                           <p>
                              Il s’agit de tout acteur permettant d'accompagner la solidification structurelle du tissu
                              Entrepreneuriale en temps réel:{" "}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section class="cible-second">
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-25 cat-sm-50">
                     <div class="pad-cat">
                        <div class="mini-bloc-cible-box">
                           <div class="mini-bloc-cible-image">
                              <span class="cible-circle bg-theme1">01</span>
                              <span class="cible-circle-image">
                                 <img src="images/cc1.jpg" alt="" />
                              </span>
                           </div>
                        </div>
                        <div class="mini-bloc-cible text-center">
                           <h4 class="">Les investisseurs locaux</h4>
                           <p>
                              Il s'agit des personnes physiques ou morales ayant la capacité de mettre à disposition des
                              financements pour le développement des entreprises appartenant aux entrepreneurs capacités
                              dans le cadre du programme
                           </p>
                        </div>
                     </div>
                  </div>
                  <div class="cat-col-25 cat-sm-50">
                     <div class="pad-cat">
                        <div class="mini-bloc-cible-box">
                           <div class="mini-bloc-cible-image ">
                              <span class="cible-circle bg-theme2">02</span>
                              <span class="cible-circle-image">
                                 <img src="images/cc2.jpg" alt="" />
                              </span>
                           </div>
                        </div>
                        <div class="mini-bloc-cible text-center">
                           <h4 class="">Les familles des 1000 entrepreneurs</h4>
                           <p>
                              Il s’agit des familles de l'entrepreneur capacité et qui constituent son principal pilier
                              social et son principal apport en fond de roulement courant de démarrage.
                           </p>
                        </div>
                     </div>
                  </div>
                  <div class="cat-col-25 cat-sm-50">
                     <div class="pad-cat">
                        <div class="mini-bloc-cible-box">
                           <div class="mini-bloc-cible-image mini-bloc-cible-image2 ">
                              <span class="cible-circle bg-theme3">03</span>
                              <span class="cible-circle-image">
                                 <img src="images/cc3.jpg" alt="" />
                              </span>
                           </div>
                        </div>
                        <div class="mini-bloc-cible text-center">
                           <h4 class="">Les Enseignants</h4>
                           <p>Il s'agit des enseignants à capacité et en Andragogie Entrepreneuriale</p>
                        </div>
                     </div>
                  </div>
                  <div class="cat-col-25 cat-sm-50">
                     <div class="pad-cat">
                        <div class="mini-bloc-cible-box">
                           <div class="mini-bloc-cible-image">
                              <span class="cible-circle bg-theme4">04</span>
                              <span class="cible-circle-image">
                                 <img src="images/cc4.jpg" alt="" />
                              </span>
                           </div>
                        </div>
                        <div class="mini-bloc-cible text-center">
                           <h4 class="">Les élèves et étudiants</h4>
                           <p>
                              Il s'agit de tout élève ou étudiant inscrit au Cameroun, disposé à être initié au
                              Leadership et a l'Entrepreneuriat et aux compétences professionnelles, afin de se projeter
                              sur le long terme dans le processus de créations d'entreprises durables et rentables.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <BlocPartenaire />
         <Footer />
      </div>
   );
}

export const BlocPartenaire = () => {
   return (
      <section class="partenaire">
         <div class="wapper">
            <div class="row-col">
               <div class="cat-col-100">
                  <div class="pad-cat">
                     <div class="pl-title text-center m-auto">
                        <h3 class="">Nos partenaires</h3>
                        <p>Nous cheminons main dans la main avec nos partenaires stratégiques </p>
                     </div>
                     <div class="logo-partenaire text-center">
                        <img src="images/partenaires/activa.png" alt="" />
                        <img src="images/partenaires/bange.png" alt="" />
                        <img src="images/partenaires/dangote.png" alt="" />
                        <img src="images/partenaires/boisson.png" alt="" />
                        <img src="images/partenaires/cabinetelesyst.png" alt="" />
                        <img src="images/partenaires/gicam.png" alt="" />
                        <img src="images/partenaires/fiduca.png" alt="" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

/*



*/
