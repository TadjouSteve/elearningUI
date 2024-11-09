import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../utils/hooks/FetchData";
import { useParams } from "react-router-dom";
import Footer from "../../composants/Footer";
import { Container, Row } from "react-bootstrap";
import Header from "../../composants/Header";
import { Backdrop, CircularProgress } from "@mui/material";
import { MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent";

export default function ValidationInscription() {
   const { lienConfirmation } = useParams();
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(
      `/login/validation/inscription/${lienConfirmation}`,
      "GET",
      null,
      null,
      update
   );
   const TopElementRef = useRef(null);
   useEffect(() => {
      TopElementRef.current.scrollIntoView({ behavior: "smooth" });
   }, []);
   return (
      <div style={{ width: "100%" }}>
         <Header />
         <section ref={TopElementRef} class="merci">
            <div class="wapper">
               <div class="row-col">
                  <div class="cat-col-60 cat-sm-50">
                     <div class="pad-cat">
                        <div class="b-formation ">
                           <div class="b-merci mb-30">
                              {isLoading ? (
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
                                    <h2>Votre compte a bien été confirmer</h2>

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
                                    <h2>Votre compte a bien été confirmer</h2>

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
   );
}
