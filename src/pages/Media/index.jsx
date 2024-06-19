import React, { useState } from "react";
import Header from "../../composants/Header";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../composants/Footer";
import { useFetch } from "../../utils/hooks/FetchData";
import { CircularProgress } from "@mui/material";
import { MessageErrorServeur } from "../../composants/MessageComponent";
import "./mediaCSS.css";
import { DisplayImage } from "../AdminPages/Media/Article/ShowArticle/imageArticleAction";
export default function Media() {
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/media/rubriques/${pageNumber}`, "GET", null, filter, update);

   const [idSelectedRubrique, setIdSelectedRubrique] = useState(0);

   return (
      <>
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
            <Header />
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
                           <span>Nos Rubrique</span>
                           <div
                              style={{
                                 width: "100%",
                                 backgroundColor: "white",
                                 display: "flex",
                                 flexDirection: "row",
                                 justifyContent: "flex-start",
                                 flexWrap: "wrap",
                                 gap: 10,
                                 padding: 10,
                                 borderRadius: 5,
                              }}
                           >
                              {data && data.content && data.content.length > 0 ? (
                                 <>
                                    {data.content.map((rubrique, index) => (
                                       <div
                                          style={{
                                             minWidth: "150px",
                                             border: "1px solid gray",
                                             borderRadius: 10,
                                             padding: 5,
                                          }}
                                          className="mediaRibrique"
                                       >
                                          {rubrique.nom}
                                       </div>
                                    ))}
                                 </>
                              ) : null}
                           </div>
                        </div>
                     </Col>
                  </Row>
                  {data && data.content && data.content.length > 0 ? (
                     <DisplayArticlesRubriques
                        idSelectedRubrique={idSelectedRubrique}
                        setIdSelectedRubrique={setIdSelectedRubrique}
                        rubriques={data.content}
                        update={update}
                     />
                  ) : null}
               </>
            )}
            <Footer />
         </Container>
      </>
   );
}

const DisplayArticlesRubriques = ({ idSelectedRubrique, setIdSelectedRubrique, rubriques, update }) => {
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const { isLoading, data, error } = useFetch(
      `/media/listarticlerubrique/${idSelectedRubrique ? idSelectedRubrique : rubriques[0].id}/${pageNumber}`,
      "GET",
      null,
      filter,
      update
   );
   let rubrique = idSelectedRubrique ? rubriques.find((rubrique) => rubrique.id === idSelectedRubrique) : rubriques[0];

   return (
      <>
         <Row style={{ marginTop: 20 }}>
            <div
               style={{
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <div
                  style={{
                     width: "100%",
                     margin: 20,
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "flex-start",
                  }}
               >
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>{rubrique.nom}</span>
               </div>

               <div
                  style={{
                     maxWidth: "800px",
                     backgroundColor: "white",
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "center",
                     flexWrap: "wrap",
                     gap: 30,
                  }}
               >
                  {isLoading ? (
                     <div style={{ marginLeft: "40%" }}>
                        <CircularProgress size={40} />
                     </div>
                  ) : error ? (
                     <MessageErrorServeur />
                  ) : (
                     <>
                        {data && data.content && data.content.length > 0 ? (
                           <>
                              {data.content.map((article, index) => (
                                 <DisplayArticle article={article} />
                              ))}
                           </>
                        ) : null}
                     </>
                  )}
               </div>
            </div>
         </Row>
      </>
   );
};

const DisplayArticle = ({ article }) => {
   return (
      <>
         <div className="mediablocArticle">
            <div style={{ width: "100%" }}>
               {article.imageArticles && article.imageArticles.length > 0 ? (
                  <DisplayImage idArticle={article.id} idImage={article.imageArticles[0].id} />
               ) : null}
            </div>
            <div style={{ padding: 5 }}>
               <span style={{ fontSize: 18, fontWeight: "bold" }}>{article.titre}</span>
            </div>
         </div>
      </>
   );
};
