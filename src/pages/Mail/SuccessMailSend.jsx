import React from "react";
import { Container, Row } from "react-bootstrap";

export default function SuccessMailSend() {
   return (
      <Container fluid>
         <Row>
            <div>
               <span style={{ color: "green", fontSize: "20px", fontWeight: "800" }}>
                  L’envoi des mails a bien été initié Tous les étudiants ayant le ou les profil(s) sélectionné(s)
                  recevront le mail au fur et à mesure.
               </span>
            </div>
         </Row>
      </Container>
   );
}
