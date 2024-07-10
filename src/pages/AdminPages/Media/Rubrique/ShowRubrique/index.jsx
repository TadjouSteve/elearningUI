import { Button, CircularProgress, Container } from "@mui/material";
import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import { useFetch } from "../../../../../utils/hooks/FetchData";

export default function ShowRubrique() {
   const { idRubrique } = useParams();
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/media/rubrique/${idRubrique}`, "GET", null, null, update);
   //console.log("data rubrique == ", data)

   const handleModifierClick = () => {
      // Logique pour gérer le clic sur le bouton "Modifier"
      navigation(`/rubrique/alter/${idRubrique}`);
   };

   return (
      <>
         <div
            className="headerPage"
            style={{
               backgroundColor: "#17bd08cc",
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
            }}
         >
            <div
               id="Links"
               style={{
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: "500",
                  color: "white",
               }}
            >
               <span>
                  Rubrique <span>{data && data.nom ? `${data.nom}` : null}</span>
               </span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/rubrique"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Rubriques{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={"/rubrique/" + idRubrique} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     {data && data.nom ? `${data.nom}` : null}{" "}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
               <Button variant="contained" onClick={handleModifierClick} color="success">
                  Modifier
               </Button>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation(-1);
                  }}
                  color="error"
               >
                  Bloquer
               </Button>
            </div>
         </div>

         <Container fluid>
            {isLoading ? (
               <div style={{ marginLeft: "40%" }}>
                  <CircularProgress size={40} />
               </div>
            ) : error ? (
               <MessageErrorServeur />
            ) : (
               <>
                  <Row>
                     <Col>
                        <div
                           style={{
                              backgroundColor: "white",
                              display: "flex",
                              flexDirection: "column",
                              padding: 10,
                              borderRadius: 5,
                           }}
                        >
                           <h3>Informations générales</h3>
                           <span>Nom: {data.nom}</span>
                           <span>Categorie: {data.categorie}</span>
                           <span>Orde / Positionnement: {data.ordre}</span>
                           <span>description: {data.description}</span>
                           <span>Nombre Article: {data.nombreArticle}</span>
                        </div>
                     </Col>
                  </Row>
                  <ListArticleRubrique idRubrique={data.id} />
               </>
            )}
         </Container>
      </>
   );
}

const ListArticleRubrique = ({ idRubrique }) => {
   const [pageNumber, setPageNumber] = useState(0);
   const { isLoading, data, error } = useFetch(
      `/media/listarticlerubrique/${idRubrique}/${pageNumber}`,
      "GET",
      null,
      null
   );
   //console.log("data artices de la rubrique == ", data)
   return (
      <>
         <Row style={{ marginTop: 10 }}>
            <div style={{ margin: 15 }}>
               <span>Liste des arcticles de cette rubrique</span>
            </div>
            {isLoading ? (
               <div style={{ marginLeft: "40%" }}>
                  <CircularProgress size={40} />
               </div>
            ) : error ? (
               <MessageErrorServeur />
            ) : data && data.content && data.content.length > 0 ? (
               <Col>
                  <Table width={"100%"} hover size="sm" style={{ marginBottom: "0px" }}>
                     <thead
                        className="header"
                        style={{
                           position: "sticky",
                           top: 0,
                           background: "white",
                        }}
                     >
                        <tr>
                           <th>N°</th>
                           <th>Titre</th>
                           <th>Date creation</th>
                           <th>Nbr vues</th>
                           <th>Statut</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.content.map((article, index) => (
                           <tr key={article.id} style={{ height: "40px" }}>
                              <td>{index + 1}</td>
                              <td>{article.titre}</td>
                              <td className="body_tr">
                                 {new Date(article.date).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                 })}{" "}
                              </td>
                              <td>
                                 {article.etat} {article.etat > 1 ? " vues" : " vue"}
                              </td>
                              <td
                                 style={{
                                    backgroundColor:
                                       article.statut === "PUBLIER"
                                          ? "green"
                                          : article.statut === "SUSPENDU"
                                          ? "red"
                                          : "#fff",
                                    fontWeight: 700,
                                    color: article.statut === "EN_ATTENTE" ? "black" : "white",
                                    textAlign: "center",
                                 }}
                              >
                                 {article.statut}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               </Col>
            ) : (
               <div
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <h3>Aucun article trouvé pour cette rubrique</h3>
               </div>
            )}
         </Row>
      </>
   );
};
