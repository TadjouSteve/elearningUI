import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../composants/Header";
import Footer from "../../composants/Footer";
import "./zzAfterSuccessCandidatureCSS.css";

export default function AfterSuccessCandidature() {
   const { nomEtudiant } = useParams();

   return (
      <div style={{ width: "100%" }}>
         <Header />
         <section class="merci">
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-60 cat-sm-50">
                     <div class="pad-cat">
                        <div class="b-formation ">
                           <div class="b-merci mb-30">
                              <h2>
                                 Félicitations , <span style={{ color: "black" }}>{nomEtudiant}</span> ! <br />
                                 votre candidature à l’exposition du Salon des 1000 Jeunes Entrepreneurs a été
                                 enregistrée avec succès.
                              </h2>
                              <span>
                                 Le salon des 1000 Jeunes Entrepreneurs se tiendra du 26 au 30 Octobre 2024 à Yaoundé.
                                 Un Stand d’exposition vous sera gratuitement attribué pour ces 5 jours d’exposition si
                                 à cette date vous êtes en conformité avec les informations demandées , et validez
                                 l’ensemble de vos modules de formation en Autorentabilité et Fonctionnement durable
                                 disponibles sur{" "}
                                 <a href="https://programmeleadership.org">www.programmeleadership.org </a>
                              </span>
                              <br />
                              <br />

                              <div>
                                 <span>
                                    Preparez vous pour cet événement National à Fort potentiel de réseautage, de fortes
                                    ventes et de grands investissements.
                                 </span>
                              </div>
                              <div class="lien-connexion mt-20">
                                 <a href="/connexion" class="btn btn-insc">
                                    Se Connecter
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="cat-col-40 cat-sm-50">
                     <div class="pad-cat">
                        <div class="img">
                           <img src="/images/image1045.jpg" alt="deuxpersonne" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <Footer />
      </div>
   );
}
