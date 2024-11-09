import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../composants/Header";
import { useFetch } from "../../utils/hooks/FetchData";
import Footer from "../../composants/Footer";
import { CircularProgress } from "@mui/material";
import { MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent";
import "./validationCSS.css";

export default function ControlValidationCompteEtudiant() {
   const { matricule } = useParams();
   const [update, setUpdate] = useState(false);
   const [done, setDone] = useState(false);

   const { isLoading, data, error } = useFetch(
      `/login/controle/compte/etudiant/${matricule}`,
      "GET",
      null,
      null,
      update
   );
   const TopElementRef = useRef(null);

   useEffect(() => {
      // Mettre à jour l'état toutes les 5 secondes
      const intervalId = setInterval(() => {
         if (!isLoading) {
            setDone(true);
         }
         setUpdate((prev) => !prev);
      }, 5000);

      // Nettoyer l'intervalle lorsque le composant est démonté
      return () => clearInterval(intervalId);
   }, [isLoading]);
   useEffect(() => {
      TopElementRef.current.scrollIntoView({ behavior: "smooth" });
   }, []);

   return (
      <>
         <div style={{ width: "100%" }}>
            <Header />
            <section ref={TopElementRef} class="merci">
               <div class="wapper">
                  <div class="row-col">
                     <div class="cat-col-60 cat-sm-50">
                        <div class="pad-cat">
                           <div class="b-formation ">
                              <div class="b-merci mb-30">
                                 {isLoading && !done ? (
                                    <div style={{ marginLeft: "40%" }}>
                                       <CircularProgress size={40} />
                                    </div>
                                 ) : error ? (
                                    <MessageErrorServeurWithVarialbleHeight />
                                 ) : data.errorAPI ? (
                                    <div style={{ color: "red" }}>
                                       <span style={{ color: "red", fontSize: 17 }}>{data.message}</span>
                                    </div>
                                 ) : data.confirmation === -1 ? (
                                    <>
                                       <h2>Félicitations ! Votre compte est désormais valide.</h2>

                                       <div>
                                          <span>Connectez-vous pour débuter votre formation</span>
                                       </div>
                                       <div class="lien-connexion mt-20">
                                          <a href="/connexion" class="btn btn-insc">
                                             Se Connecter
                                          </a>
                                       </div>
                                    </>
                                 ) : (
                                    <>
                                       <h2>Félicitations ! Votre compte est désormais valide.</h2>

                                       <div>
                                          <span>Connectez-vous pour débuter votre formation</span>
                                       </div>
                                       <div class="lien-connexion mt-20">
                                          <a href="/connexion" class="btn btn-insc">
                                             Se Connecter
                                          </a>
                                       </div>
                                    </>
                                 )}
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
      </>
   );
}
