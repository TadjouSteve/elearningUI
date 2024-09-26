import React from "react";
import "./AproposCSS.css";
import Header from "../../composants/Header";
import { BlocPartenaire } from "../Home";
import Footer from "../../composants/Footer";
import { Col, Row } from "react-bootstrap";
import SignInSignUp from "../../composants/SignInSignUp";

export default function Apropos02() {
   return (
      <>
         <div style={{ width: "100%" }}>
            <Header />
            {/*<div
               className="aboutHeroDiv"
               style={{
                  backgroundImage:
                     "linear-gradient(270deg, rgba(2, 26, 10, 0.471) 63.5%, rgba(239, 39, 39, 0) 100%),url(/images/personneliri.jpg)",
               }}
            >
               <span className="quiSommeNousTest01">Qui sommes-nous ?</span>
               <span className="quiSommeNousTest02">LE PROGRAMME LEADERSHIP</span>
            </div>*/}

            <section class="ban-header ban-header-about">
               <div class="wapper">
                  <div class="row-col">
                     <div class="cat-col-100">
                        <div class="pad-cat">
                           <div class="ban-header-title text-center">
                              <span>Qui sommes-nous?</span>
                              <h1>Le Programme Leadership</h1>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <section class="apropos">
               <div class="wapper">
                  <div class="row-col">
                     <div class="cat-col-50">
                        <div class="pad-cat">
                           <p>
                              L’Institut de Recherche en Intelligences (IRI) est une société à responsabilité limitée.
                              Créée en 2016 avec pour siège Yaoundé, au lieudit Avenue Rosa Park Golf, et dont le
                              capital est de 10 millions de FCFA. Spécialisée dans la conception et la mise en œuvre des
                              programmes de compétitivité, elle accompagne le gouvernement du Cameroun dans le
                              déploiement de ses politiques en faveur de la croissance et du développement, tout en
                              intégrant une forte participation du capital humain. C’est dans cette optique qu’en 2016,
                              elle a conçu le programme LEADERSHIP, qui a pour but de renforcer en leadership,
                              entrepreneuriat et compétences professionnelles pratiques locales, le capital humain
                              bénéficiaire de la Stratégie Nationale de Développement dans les secteurs de
                              l’auto-employabilité, de la bonne gouvernance et de l’éducation. Le groupe IRI, c’est
                              également plusieurs secteurs d’activités existants, parmi lesquels l’agro-industrie et la
                              transformation minérale.
                           </p>
                        </div>
                     </div>
                     <div class="cat-col-50">
                        <div class="pad-cat">
                           <div class="img">
                              <img src="images/about.jpg" alt="" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <section class="agenda">
               <div class="wapper">
                  <div class="bloc-agenda">
                     <div class="bloc-agenda-overlay"></div>
                     <div class="agenda-content">
                        <div class="row-col-reverse">
                           <div class="cat-col-60">
                              <div class="pad-cat">
                                 <div class="pl-title">
                                    <div class="pl-title-subtitle">
                                       <span>Agenda</span>
                                    </div>
                                    <h2 class="pl-title-heading">Programme 1000 Entrepreneurs jeunes</h2>
                                 </div>
                                 <ul>
                                    <li>
                                       <b>Du 02 au 13 Septembre 2024 :</b> Premières Sessions d’initiation aux
                                       fondements du Leadership en Ligne
                                    </li>
                                    <li>
                                       <b>11 septembre 2024:</b> cérémonie protocolaire de lancement du programme de
                                       formation des 1000 jeunes entrepreneurs
                                    </li>
                                    <li>
                                       <b>Du 16 au 28 Septembre 2024 :</b> Sessions présentielles et pratiques sur le
                                       terrain dans les régions
                                    </li>
                                    <li>
                                       <b>26 Septembre 2024 :</b> Évaluation des 100 Meilleurs projets Nationaux.{" "}
                                    </li>
                                    <li>
                                       <b>Du 27 Septembre au 02 Octobre 2024 :</b> Exposition des 100 Entrepreneurs
                                       Nationaux au salon de l’entrepreneuriat
                                    </li>
                                    <li>
                                       <b>02 Octobre 2024:</b> Cérémonie Nationale de clôture et de remise des
                                       attestations.
                                    </li>
                                 </ul>
                              </div>
                           </div>
                           <div class="cat-col-40">
                              <div class="pad-cat">
                                 <div class="img img-agenda">
                                    <img src="images/about-2.jpg" alt="une_image" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <section class="des-propos">
               <div class="wapper">
                  <div class="pad-cat-5">
                     <div class="row-col">
                        <div class="cat-col-100">
                           <div class="pad-cat">
                              <div class="row-col">
                                 <div class="cat-col-25 cat-sm-50 des-propos-elt des-propos-elt-1 bg-theme1">
                                    <div class="apropoimg">
                                       <div class="des-propos-elt-overlay"></div>
                                    </div>
                                 </div>
                                 <div class="cat-col-25 cat-sm-50 des-propos-elt-text-content des-propos-elt-text-content-1 bg-theme1">
                                    <div class="des-propos-elt-text">
                                       <div class="apropos-pad">
                                          <div class="des-propos-elt-text-wrap text-white">
                                             <h2 class="title-heading">Fournir des compétences pratiques</h2>
                                             <div class="des-propos-elt-desc-wrap">
                                                Nous nous attachons à fournir des compétences pratiques qui
                                                correspondent aux exigences actuelles de l'industrie. Nos cours sont
                                                conçus pour doter les apprenants des connaissances et des outils
                                                nécessaires pour exceller dans leur domaine de prédilection.
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="cat-col-25 cat-sm-50 des-propos-elt des-propos-elt-2 bg-theme2">
                                    <div class="apropoimg">
                                       <div class="des-propos-elt-overlay"></div>
                                    </div>
                                 </div>
                                 <div class="cat-col-25 cat-sm-50 des-propos-elt-text-content des-propos-elt-text-content-2 bg-theme2">
                                    <div class="des-propos-elt-text">
                                       <div class="apropos-pad">
                                          <div class="des-propos-elt-text-wrap text-white">
                                             <h2 class="title-heading">Favoriser la créativité</h2>
                                             <div class="des-propos-elt-desc-wrap">
                                                Nos cours permettent aux apprenants de développer leur propre style et
                                                de trouver des solutions uniques aux problèmes.
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="row-col-reverse">
                                 <div class="cat-col-25 cat-sm-50 des-propos-elt des-propos-elt-3 bg-theme3">
                                    <div class="apropoimg">
                                       <div class="des-propos-elt-overlay"></div>
                                    </div>
                                 </div>
                                 <div class="cat-col-25 cat-sm-50 des-propos-elt-text-content des-propos-elt-text-content-3 bg-theme3">
                                    <div class="des-propos-elt-text">
                                       <div class="apropos-pad">
                                          <div class="des-propos-elt-text-wrap text-white">
                                             <h2 class="title-heading">Promouvoir la collaboration</h2>
                                             <div class="des-propos-elt-desc-wrap">
                                                Nous croyons au pouvoir de la collaboration et du travail d'équipe. Nos
                                                cours encouragent les interactions entre les apprenants et leur
                                                permettent de développer des compétences de communication et de
                                                collaboration essentielles.
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="cat-col-25 cat-sm-50 des-propos-elt des-propos-elt-4">
                                    <div class="apropoimg">
                                       <div class="des-propos-elt-overlay"></div>
                                    </div>
                                 </div>
                                 <div class="cat-col-25 cat-sm-50 des-propos-elt-text-content des-propos-elt-text-content-4 bg-theme4">
                                    <div class="des-propos-elt-text">
                                       <div class="apropos-pad">
                                          <div class="des-propos-elt-text-wrap text-white">
                                             <h2 class="title-heading">Rester à l'avant-garde</h2>
                                             <div class="des-propos-elt-desc-wrap">
                                                Nous sommes passionnés par l'innovation et nous nous engageons à offrir
                                                des cours à la pointe des dernières technologies et tendances du marché.
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <BlocPartenaire />
            <Footer />
         </div>
      </>
   );
}
