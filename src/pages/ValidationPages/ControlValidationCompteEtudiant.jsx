import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../composants/Header";
import { useFetch } from "../../utils/hooks/FetchData";
import Footer from "../../composants/Footer";
import { CircularProgress } from "@mui/material";
import { MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent";

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
      <Container ref={TopElementRef} fluid style={{ width: "100%", padding: 0, margin: 0 }}>
         <Header />
         <Row style={{ justifyContent: "center" }}>
            <div className="mainDivConnexion">
               <div
                  className="divFormulaire"
                  style={{ display: "flex", flexDirection: "column" }}
                  //onKeyUp={(event) => handleKeyPress(event)}
               >
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
                        <div>
                           <h2>Vos données ont bien été enregistrées.</h2>
                           <br />
                           <h5>
                              Pour finaliser le processus d'inscription, vous devez ouvrir l’e-mail qui a été envoyé à
                              votre adresse e-mail et cliquer sur le lien de validation.
                           </h5>
                           <span style={{ fontSize: 13 }}>
                              Si vous ne retrouvez pas l’e-mail dans votre boîte de messagerie, vérifiez dans les
                              dossiers <spam style={{ color: "red", fontSize: 14 }}>spam</spam> de votre boite mail...
                           </span>
                        </div>
                     </>
                  ) : (
                     <>
                        <div>
                           <h2>Félicitations ! Votre compte est désormais valide. 😊</h2>
                           <br />
                           <h3>
                              La formation commence le 2 septembre 2024. À partir de cette date, vous pourrez vous
                              connecter à votre compte pour suivre votre formation.
                           </h3>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </Row>

         <Footer />
      </Container>
   );
}
