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
                                 Félicitations, <span style={{ color: "black" }}>{nomEtudiant}</span> ! <br />
                                 Votre candidature au Salon de l'entrepreneuriat a été enregistrée avec succès.
                              </h2>
                              <span>
                                 Le Salon de l'entrepreneuriat se tiendra du 04 au 09 octobre 2024. Préparez-vous dès
                                 maintenant pour cet événement exceptionnel !
                              </span>

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
                           <img src="/images/welcome.png" alt="deuxpersonne" />
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
