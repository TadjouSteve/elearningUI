import React, { useEffect, useRef, useState } from "react";
import "./articleCSS.css";
import Header from "../../../composants/Header";
import { Col, Container, Row } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { MessageErrorServeur, MessageErrorServeurWithVarialbleHeight } from "../../../composants/MessageComponent";
import Footer from "../../../composants/Footer";
import { useFetch } from "../../../utils/hooks/FetchData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DisplayImage } from "../../AdminPages/Media/Article/ShowArticle/imageArticleAction";
import { SceletonBigArticle, SceletonDiv } from "../../../composants/Sceletons";

export default function ArticlePublic() {
   const navigation = useNavigate();
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   const [update, setUpdate] = useState(false);
   const { lienArticle } = useParams();
   const { isLoading, data, error } = useFetch(`/media/rubriques/${pageNumber}`, "GET", null, null, update);
   const fetchArticle = useFetch(`/public/media/article/${lienArticle}`, "GET", null, filter, update);

   const [idSelectedRubrique, setIdSelectedRubrique] = useState(0);

   let table3 = [{ id: 0 }, { id: 1 }, { id: 2 }];

   const openRubrique = (rubrique) => {
      navigation(`/medias/rubrique/${rubrique.id}`);
   };

   return (
      <>
         <Container fluid style={{ width: "100vw", margin: 0, padding: 0 }}>
            <Header />
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
                        ) : (
                           <>
                              {data && data.content && data.content.length > 0 ? (
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
                                          className={"rubriqueselected0218"}
                                          onClick={() => openRubrique(rubrique)}
                                       >
                                          {rubrique.nom}
                                       </div>
                                    ))}
                                 </>
                              ) : null}
                           </>
                        )}
                     </div>
                  </div>
               </Col>
            </Row>

            <Row style={{ marginTop: 15 }}>
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
                     {fetchArticle.isLoading ? (
                        <SceletonBigArticle />
                     ) : fetchArticle.error ? (
                        <MessageErrorServeurWithVarialbleHeight height={"400px"} />
                     ) : fetchArticle.data.errorAPI ? (
                        <div
                           style={{
                              width: "100%",
                              backgroundColor: "white",
                              display: "flex",
                              flexDirection: "column",
                              padding: 10,
                              borderRadius: 5,
                              alignItems: "center",
                              minHeight: "400px",
                              alignContent: "center",
                              justifyContent: "center",
                           }}
                        >
                           <span style={{ fontSize: 20, fontWeight: 700 }}>{fetchArticle.data.message}</span>
                        </div>
                     ) : (
                        <>
                           <div>
                              <span className="texteAllLien">
                                 Vous etes ici:
                                 <Link to={"/medias"} className="lienPosition">
                                    media
                                 </Link>{" "}
                                 {">"}
                                 <Link
                                    to={`/medias/rubrique/${fetchArticle.data.rubrique.id}`}
                                    className="lienPosition"
                                 >
                                    {fetchArticle.data.rubrique.nom}
                                 </Link>{" "}
                                 {/* {">"}
                                 <Link to={`/article/${fetchArticle.data.lien}`} className="lienPosition">
                                    {fetchArticle.data.titre}
                                 </Link>{" "} */}
                              </span>
                           </div>
                           <DisplayFullBodyArticle article={fetchArticle.data} />
                        </>
                     )}
                  </div>
               </Col>
            </Row>
            <Footer />
         </Container>
      </>
   );
}

export const DisplayFullBodyArticle = ({ article }) => {
   const mainTitreRef = useRef(null);

   useEffect(() => {
      mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
   }, []);

   return (
      <div
         style={{
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
         }}
      >
         <article ref={mainTitreRef} className="corpsArticle">
            {article.surTitre && (
               <div name="surTitre" className="surTitreDiv">
                  <span className="surTitreTexte">{article.surTitre}</span>
               </div>
            )}
            <h1 className="titreArticle">{article.titre}</h1>

            <p dangerouslySetInnerHTML={{ __html: article.sousTitre }} className="sousTitre"></p>
            {/* <p className="sousTitre">{article.sousTitre}</p> */}

            <div className="blocDate">
               <span className="dateArticleTexte">
                  Publie le :
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
            <div className="blocImageArticle">
               {article.imageArticles && article.imageArticles.length > 0 ? (
                  <>
                     <div className="imageArticle01">
                        <DisplayImage idArticle={article.id} idImage={article.imageArticles[0].id} />
                     </div>
                     <div className="titreImage">
                        <span className="titreImageTexte" style={{ margin: 0 }}>
                           {article.imageArticles[0].titre}
                        </span>
                     </div>
                  </>
               ) : null}
            </div>
            <div className="nomAutheur">
               <span>
                  Par:<span style={{ fontWeight: 600 }}>{article.auteur}</span>
               </span>
            </div>
            <div className="blocTexteArticle">
               <div
                  dangerouslySetInnerHTML={{ __html: article.texte }}
                  style={{ whiteSpace: "pre-wrap", textAlign: "justify", marginTop: 10 }}
               ></div>
            </div>
         </article>
      </div>
   );
};
