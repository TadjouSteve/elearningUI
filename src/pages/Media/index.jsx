import React, { useEffect, useRef, useState } from "react";
import Header from "../../composants/Header";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../composants/Footer";
import { useFetch } from "../../utils/hooks/FetchData";
import { CircularProgress } from "@mui/material";
import { MessageErrorServeur, MessageErrorServeurWithVarialbleHeight } from "../../composants/MessageComponent";
import "./mediaCSS.css";
import { DisplayImage } from "../AdminPages/Media/Article/ShowArticle/imageArticleAction";
import { useNavigate, useParams } from "react-router-dom";
import { SceletonDiv, SceletonSmallArticleHorizontal } from "../../composants/Sceletons";

export function MediaWithDefaultIdRubrique() {
   const { idRubrique } = useParams();
   return <Media defaultIdSelectedRubrique={idRubrique} />;
}

export default function Media({ defaultIdSelectedRubrique }) {
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/media/rubriques/${pageNumber}`, "GET", null, filter, update);

   const [idSelectedRubrique, setIdSelectedRubrique] = useState(
      defaultIdSelectedRubrique ? defaultIdSelectedRubrique : 0
   );
   const changeRubrique = (rubrique) => {
      setIdSelectedRubrique(rubrique.id);
      //setUpdate((prevUp) => !prevUp);
   };

   const mainTitreRef = useRef(null);

   useEffect(() => {
      mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
   }, [idSelectedRubrique]);
   return (
      <>
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
            <Header />

            <>
               <Row>
                  <Col>
                     <div
                        ref={mainTitreRef}
                        style={{
                           backgroundColor: "white",
                           display: "flex",
                           flexDirection: "column",
                           padding: 10,
                           borderRadius: 5,
                        }}
                     >
                        <span>Nos Rubriques</span>
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
                           {isLoading ? (
                              // <div style={{ marginLeft: "40%" }}>
                              //    <CircularProgress size={40} />
                              // </div>
                              Array.from({ length: 3 }, (_, index) => (
                                 <SceletonDiv
                                    haveCircularProgress={"30px"}
                                    width={"150px"}
                                    height={35}
                                    borderRadius={5}
                                    circularProgressSize={10}
                                 />
                              ))
                           ) : error ? (
                              <MessageErrorServeur />
                           ) : data && data.content && data.content.length > 0 ? (
                              <>
                                 {data.content.map((rubrique, index) => (
                                    <div
                                       style={{
                                          minWidth: "150px",
                                          border: "1px solid gray",
                                          borderRadius: 10,
                                          padding: 5,
                                          cursor: "pointer",
                                       }}
                                       className={idSelectedRubrique === rubrique.id ? "rubriqueselected01" : ""}
                                       onClick={() => changeRubrique(rubrique)}
                                    >
                                       {rubrique.nom}
                                    </div>
                                 ))}
                              </>
                           ) : (
                              <span style={{ fontSize: 17, fontWeight: 700 }}>Rubrique Nom disponible...</span>
                           )}
                        </div>
                     </div>
                  </Col>
               </Row>
               {isLoading ? (
                  <DisplayArticlesRubriques isSceleton={true} />
               ) : error ? (
                  <MessageErrorServeurWithVarialbleHeight />
               ) : data && data.content && data.content.length > 0 ? (
                  <DisplayArticlesRubriques
                     idSelectedRubrique={idSelectedRubrique}
                     setIdSelectedRubrique={setIdSelectedRubrique}
                     rubriques={data.content}
                     update={update}
                  />
               ) : null}
            </>

            <Footer />
         </Container>
      </>
   );
}

const DisplayArticlesRubriques = ({ idSelectedRubrique, setIdSelectedRubrique, rubriques, update, isSceleton }) => {
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const [nomRubrique, setNomRubrique] = useState(null);
   const { isLoading, data, error } = useFetch(
      `/public/media/listarticlerubrique/${
         idSelectedRubrique ? idSelectedRubrique : isSceleton ? 0 : rubriques[0].id
      }/${pageNumber}`,
      "GET",
      null,
      filter,
      update
   );
   let rubrique = isSceleton
      ? { id: -1, nom: "Rubrique" }
      : idSelectedRubrique
      ? rubriques.find((rubrique) => rubrique.id === idSelectedRubrique)
      : rubriques[0];

   return (
      <>
         <Row style={{ marginTop: 20, marginBottom: 30 }}>
            <Col>
               <div
                  style={{
                     width: "100%",
                     backgroundColor: "white",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center",
                     padding: 10,
                     paddingBottom: 20,
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
                     <span style={{ fontSize: 18, fontWeight: "bold" }}>{rubrique ? rubrique.nom : nomRubrique}</span>
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
                     {isLoading || isSceleton ? (
                        Array.from({ length: 4 }, (_, index) => <SceletonSmallArticleHorizontal />)
                     ) : error ? (
                        <MessageErrorServeurWithVarialbleHeight height={"400px"} />
                     ) : (
                        <>
                           {data && data.content && data.content.length > 0 ? (
                              <>
                                 {data.content.map((article, index) => (
                                    <DisplaySmallBodyArticleHorizontal
                                       article={article}
                                       nomRubrique={nomRubrique}
                                       setNomRubrique={setNomRubrique}
                                    />
                                 ))}
                              </>
                           ) : null}
                           {/* {Array.from({ length: 4 }, (_, index) => (
                              <SceletonSmallArticleHorizontal />
                           ))} */}
                        </>
                     )}
                  </div>
               </div>
            </Col>
         </Row>
      </>
   );
};

const DisplaySmallBodyArticleHorizontal = ({ article, setNomRubrique, nomRubrique }) => {
   let navigation = useNavigate();
   if (!nomRubrique && setNomRubrique) {
      setNomRubrique(article ? article.rubrique.nom : "");
   }
   return (
      <>
         <div
            className="mediablocArticle"
            onClick={() => {
               navigation(`/article/${article.lien}`);
            }}
         >
            <div name="nomArticle" className="mediablocArticleImanage">
               {article.imageArticles && article.imageArticles.length > 0 ? (
                  <DisplayImage idArticle={article.id} idImage={article.imageArticles[0].id} />
               ) : null}
            </div>
            <div name="titreArticle" className="mediablocArticleSurTitreDiv">
               <span className="mediablocArticleSurTitreDivTexte">{article.surTitre}</span>
            </div>
            <div name="titreArticle" className="mediablocArticleTitreDiv">
               <span className="mediablocArticleTitreTexte">{article.titre}</span>
            </div>
            <div name="datePublication" className="mediablocArticleDateDiv01">
               <span className="mediablocArticleDateTexte01">
                  {article.datePublication
                     ? new Date(article.datePublication).toLocaleDateString("fr-FR", {
                          weekday: "long", // Jour de la semaine (ex. "mercredi")
                          day: "numeric", // Jour du mois (ex. 10)
                          month: "long", // Mois (ex. "juin")
                          year: "numeric",
                          hour: "2-digit", // Heure (ex. 15)
                          minute: "2-digit", // Minutes (ex. 30)
                       })
                     : null}
               </span>
            </div>
         </div>
      </>
   );
};
