import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { removeUserCookie } from "../../utils/fonctions";
import Header from "../../composants/Header";
import "./home02CSS.css";
import { Prev } from "react-bootstrap/esm/PageItem";
import * as FaIcons from "react-icons/fa";
import { Button } from "@mui/material";
import SignInSignUp from "../../composants/SignInSignUp";
import Footer from "../../composants/Footer";

const tabulation = <span style={{ padding: "0 0 0 20px" }}></span>;

export default function Home() {
   const { language, setLanguage, setUser, user } = useContext(AppContext);
   const [readMore01, setRemore01] = useState(false);
   const navigation = useNavigate();
   const mainTitreRef = useRef(null);

   const handleResetFocus = () => {
      mainTitreRef.current.scrollIntoView({ behavior: "smooth" });
   };

   let isFrench = language === "FR";
   const deconnexion = () => {
      setUser(null);
      removeUserCookie();
      navigation("/");
   };
   return (
      <>
         <Header />
         <div
            className="homeHeroDiv"
            style={{
               backgroundImage:
                  "linear-gradient(270deg, rgba(2, 44, 16, 0.65) 63.5%, rgba(196, 196, 196, 0) 100%),url(/images/banane01.png)",
            }}
         >
            <div className="homeHeroMainDivTexte">
               <h1 className={"homeHeroMainH1Texte"}>
                  {isFrench ? (
                     <>
                        Programme de capacitation des <span style={{ color: "#FDA811" }}>entrepreneurs </span> à l’auto
                        rentabilité et à la gestion d’entreprise : entreprises locales à fort potentiel d’import
                        substitution
                     </>
                  ) : (
                     <>
                        <span style={{ color: "#FDA811" }}>Entrepreneurs’</span> SelfProfitability and Business
                        Management Capacity Program: Local company with strong import-substitution potential
                     </>
                  )}

                  {/* Programme de Capacitation <span style={{ color: "#FDA811" }}>entrepreneurial</span> */}
               </h1>

               <span className="homeHeroMainspan01">
                  Plus de 1000 jeunes formés aux notions élémentaires de l'entreprenariat, de la gestion d'entreprise et
                  de l'auto rentabilité.
               </span>
               <Link to={"/apropos"} style={{ textDecorationLine: "none" }}>
                  <span className="homeHeroMainspan02">En savoir plus...</span>
               </Link>

               <div className="blocBoutonAction">
                  {!user ? (
                     <>
                        <SignInSignUp signIn={false} classButtom="boutton01" variantButton="contained" />
                        <SignInSignUp signIn={true} classButtom="boutton01" variantButton="outlined" />
                     </>
                  ) : (
                     <div className="buttonAction">
                        <Button variant="outlined" color="error" onClick={() => deconnexion()}>
                           {isFrench ? "Deconnexion" : "LogOut"}
                        </Button>
                        <Button
                           variant="contained"
                           color="error"
                           style={{ marginLeft: 10 }}
                           onClick={() => navigation("/dashboard")}
                        >
                           {isFrench ? "Tableau de bord" : "Dashboard"}
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         </div>

         <div ref={mainTitreRef} className="contextMainDiv">
            <div className="contextTitreDiv">
               <span>{isFrench ? "Le Contexte" : "Background"}</span>
            </div>
            <div className={readMore01 ? " contextTexteViewAll" : "contextTexteViewSmall"}>
               <p
                  className="contextParagraphe"
                  name="texte de presentation du Programme de Massification Entrepreneuriale"
               >
                  {tabulation}
                  {isFrench ? (
                     <>
                        Le Cameroun regorge de nombreux atouts et potentialités, à même de déservir la forte demande de
                        l'économie Nationale et Sous-régionale en Afrique. Cependant les défis liés à une production
                        insuffisante et à la concurrence des produits importés entravent la solidification et le
                        développement compétitif et durable de cette économie potentielle.Dans les faits il faut
                        considérer que, la faiblesse de la production et du faible taux de transformation, résultant de
                        l’état embryonnaire de l’industrialisation des process, favorisent la prolifération des produits
                        importés sur le marché local. Cet état de chose justifie à suffisance la balance commerciale
                        hautement déficitaire, estimé selon l’Institut National des Statistiques à 1. 478 milliards de
                        FCFA.
                     </>
                  ) : (
                     <>
                        Cameroon is full of many assets and potential that can serve the strong demand of the national
                        and subregional economy in Africa. However, the challenges associated with insufficient
                        production and competition from imported products hinder the solidification, the competitive and
                        sustainable development of this potential economy. In fact, it must be considered that the low
                        production and processing rate, resulting from the embryonic state of process industrialisation,
                        favours the proliferation of imported products on the local market. This state of affairs
                        sufficiently justifies the high trade deficit, estimated according to the National Institute of
                        Statistics at 1.478 billion CFA francs.
                     </>
                  )}
                  <br />
                  <br />
                  {isFrench ? (
                     <>
                        Pour inverser ces processus, et favoriser la restructuration industrielle du Pays, le
                        gouvernement du Cameroun a initié le processus d’Import-Substitution qui consiste à réduire
                        l’importation et favoriser la consommation de la production locale. Pour ce faire il souhaite
                        renforcer les compétences des jeunes dirigeants et créateurs d’entreprises locales de même que
                        leurs aptitudes à irriger durablement des industries rentables compétitives sur le plan National
                        et International. Il a ainsi mandaté l’Institut de Recherche en Intelligences de la création et
                        de la mise en œuvre du Programme de Capacitation des 1000 jeunes Entrepreneurs.
                     </>
                  ) : (
                     <>
                        To reverse these processes, and promote the country’s industrial restructuring, the Cameroonian
                        government has initiated the Import Substitution process, which consists in reducing imports and
                        promoting consumption of local production. In order to do this, it wishes to strengthen the
                        skills of young leaders and creators of local businesses and their skills to build sustainable,
                        profitable industries that are competitive at national and international level. It has thus
                        mandated the Institute for Research in Intelligence to create and implement the 1000 Young
                        Entrepreneurs Capability Program.
                     </>
                  )}
                  <br />
                  <br />
                  <span style={{ fontWeight: 700, padding: "0 0 0 20px" }}>
                     {" "}
                     {isFrench
                        ? " Le programme de Capacitation des 1000 Jeunes entrepreneurs à l’auto-rentabilité et au fonctionnement "
                        : "The 1000 Young Entrepreneurs SelfProfitability and Functioning Capacity Program "}
                  </span>
                  {isFrench ? (
                     <>
                        est une initiative dont la vision est de capitaliser sur les ressources locales créatrices de
                        valeur ajoutée et de promouvoir l’entrepreneuriat pour tous, en Afrique et au Cameroun. Afin
                        d’atteindre les objectifs visés par la politique d’import-substitution au Cameroun, ce programme
                        entend favoriser le partage d’expériences, renforcer les capacités pratiques et la maitrise des
                        process locaux de gestion entrepreneuriale d’entreprise durables compétitives , et de former en
                        leadership l’écosystème immédiat de l’Entrepreneur. À la fin de ce programme de formation,
                        l’Etat du Cameroun sera riche d’environ 5000 Chefs d’entreprise et porteurs de projets qui
                        seront capacités au leadership, au fonctionnement efficace, à l’auto rentabilité, à la
                        structuration et à la gouvernance de leurs entreprises.
                     </>
                  ) : (
                     <>
                        is an initiative whose vision is to capitalise on local resources that create added value and
                        promote entrepreneurship for all, in Africa and Cameroon. In order to achieve the objectives of
                        the import-substitution policy in Cameroon, this programme aims to promote the sharing of
                        experience; strengthen the practical capacities and mastery of local processes of competitive
                        sustainable enterprise entrepreneurship management; and to train in leadership the immediate
                        ecosystem of the Entrepreneur. By the end of this training programme, Cameroon will have around
                        5,000 entrepreneurs and project leaders who will be capable of providing leadership, efficient
                        operation, self-profitability, structuring and governance to their companies.
                     </>
                  )}
               </p>
               <div className={readMore01 ? "" : "flouteur"}></div>
            </div>
            <div
               className={readMore01 ? "contextDivRedMoreOrNot red" : "contextDivRedMoreOrNot"}
               onClick={(e) => {
                  setRemore01((prev) => !prev);
                  handleResetFocus();
               }}
            >
               {readMore01 ? "Reduire le Texte  " : isFrench ? "lire plus  " : "read more"}
               {readMore01 ? <FaIcons.FaAngleUp size={40} /> : <FaIcons.FaAngleDown size={40} />}
            </div>
         </div>

         <div className="activiteMainDiv">
            <div className="activiteTitreDiv">
               <span className="activiteTitreTexte">
                  {isFrench ? "LES ACTIVITÉS DU PROGRAMME" : "PROGRAMME ACTIVITIES"}
               </span>
            </div>
            <div className="activiteDivText">
               <span>
                  {isFrench ? (
                     <>
                        La Capacitation au fonctionnement durable et à l’auto rentabilité de chacun des 1000
                        Entrepreneurs ou du porteur de projet est la principale activité du Programme. Elles se décline
                        selon les savoir-faire suivants, dont l’Entrepreneur bénéficiera :{" "}
                     </>
                  ) : (
                     <>
                        The ability of each of the 1,000 Entrepreneurs and Project Leaders to operate sustainably and be
                        self-profitable is the main activity of the Programme. It is based on the following know-how
                        which the Entrepreneur will benefit from :
                     </>
                  )}
               </span>
            </div>
            <div
               style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  gap: 15,
                  flexWrap: "wrap",
                  padding: "4%",
               }}
            >
               <div className="activiteSouBloc">
                  <div className="activiteSouBlocTitre">
                     <span>{isFrench ? "Phase de Formation Présentielle :" : "ClassTraining Phase :"}</span>
                  </div>
                  <div className="activiteSouBlocTexteDiv">
                     <span>
                        {isFrench ? (
                           <>
                              Durant 6 jours, Au moins 100 entrepreneurs dans chaque région du Cameroun sont
                              collectivement capacités par des formateurs et encadreurs issues du Top Management de
                              grandes multinationales Africaines :MTN, ACTIVA, ECOBANK, DANGOTE,AFRILAND FISRT BANK,
                              BOISSONS DU CAMEROUN, etc. Des Dirigeants d’Entreprises africaines Leaders du marché local
                              complexe depuis au moins 10 années dans chacun des secteurs entrepreneuriaux
                              d’import-substitution, formeront : DOVV, ZÉNITH ASSURANCE, DOUBLE T CREATIVE, OBIV
                              Solutions, CABINET ELESYST, etc.
                              <br />
                              <br />
                              Cette phase sera encadré par des sessions de cours, des conférences et ateliers
                              présentiels de travail.
                           </>
                        ) : (
                           <>
                              During 06 days, at least 100 entrepreneurs in each region of Cameroon are collectively
                              trained by trainers and coaches from the Top Management of large African multinationals: ,
                              ACTIVA, DANGOTE, AFRILAND FISRT BANK, etc. Leaders of African companies that have been
                              leaders of the complex local market for at least 10 years in each of the
                              import-substitution entrepreneurial sectors, will train: DOVV, ZÉNITH ASSURANCE, DOUBLE T
                              CREATIVE, OBIV Solutions, ELESYSTCABINET, etc..
                              <br />
                              <br />
                              This phase will be framed by lectures, lectures and face-to-face workshops.
                           </>
                        )}
                     </span>
                  </div>
               </div>
               <div className="activiteSouBloc">
                  <div className="activiteSouBlocTitre">
                     <span> {isFrench ? "Phase de formation en ligne :" : "On-line training phase :"}</span>
                  </div>
                  <div className="activiteSouBlocTexteDiv">
                     <span>
                        {isFrench ? (
                           <>
                              Durant 3 semaines, les pratiques et applications des process acquis pendant la formation
                              présentielle se feront entre les entrepreneurs et les acteurs de suivi sur le terrain et
                              sur le marché.
                           </>
                        ) : (
                           <>
                              During 03 weeks, the practices and applications of the processes acquired during in-person
                              training will take place between the entrepreneurs and the monitoring actors in the field
                              and on the market.
                           </>
                        )}
                     </span>
                  </div>
               </div>
            </div>
         </div>

         <div className="objecticMaincDiv">
            <div
               className="objectifSousBloc01"
               style={{
                  backgroundImage:
                     "linear-gradient(270deg, rgba(2, 44, 16, 0.65) 63.5%, rgba(196, 196, 196, 0) 100%),url(/images/hommesurpc02.png)",
               }}
            >
               <span>
                  {isFrench
                     ? "OBJECTIFS ET ACTIVITÉS SPÉCIFIQUES CONNEXES"
                     : "SPECIFIC RELATED OBJECTIVES AND ACTIVITIES"}
               </span>
            </div>
            <div className="objectifSousBloc02">
               <span className="objecticDescription">
                  {isFrench
                     ? "Les activités spécifiques connexes du programme visent à Impacter durablement les investisseurs ," +
                       "les familles d’Entrepreneurs , les étudiants et les enseignants autour de la valorisation de leur " +
                       "potentiel entrepreneurial par :"
                     : "The specific related activities of the programme aim to have a lasting impact on investors, business" +
                       "families, students and teachers in developing their entrepreneurial potential through :"}
               </span>
               <ul>
                  <li>
                     {/* <span style={{ fontWeight: 700 }}>Phase de formation en ligne: </span> */}
                     {isFrench ? (
                        <>
                           <b>La formation des investisseurs locaux l’importance</b> sur d’investir sur les projets
                           locaux rentables et durables
                        </>
                     ) : (
                        <>
                           <b>Training local investors and the importance</b> of investing in profitable and sustainable
                           local projects
                        </>
                     )}
                  </li>
                  <li>
                     {isFrench ? (
                        <>
                           <b>L’initiation et la mise en place de 1000 Conseils d’administration</b> ou comités de
                           pilotages au sein des entreprises bénéficiaires du Programme, afin de leur permettre d’être
                           structurées avec durabilité
                        </>
                     ) : (
                        <>
                           <b>Initiation and establishment of 1000 boards of directors</b> or steering committees within
                           the companies benefiting from the Programme, in order to enable them to be structured with
                           sustainability
                        </>
                     )}
                  </li>
                  <li>
                     {isFrench ? (
                        <>
                           <b>La sensibilisation et la formation des 1000 familles</b> au soutien des entrepreneurs et à
                           La mise sur pieds des entreprises qui assureront leurs rentabilités sur le long terme
                        </>
                     ) : (
                        <>
                           <b>Raising awareness and training of 1,000 families</b> to support entrepreneurs and set up
                           businesses that will ensure their long-term profitability
                        </>
                     )}
                  </li>
                  <li>
                     {isFrench ? (
                        <>
                           <b>L’initiation et la certification de 1000 jeunes étudiants et élèves</b> au leadership et à
                           l’entrepreneuriat sur toute l’étendue du territoire national
                        </>
                     ) : (
                        <>
                           <b>Initiation and certification of 1,000 young students and students</b> for leadership and
                           entrepreneurship across the country
                        </>
                     )}
                  </li>
                  <li>
                     {isFrench ? (
                        <>
                           <b>La formation de 3000 enseignants à la pédagogie entrepreneuriale</b> dans les 10 régions
                           du Cameroun
                        </>
                     ) : (
                        <>
                           <b>Training of 3,000 teachers in entrepreneurial pedagogy</b> in Cameroon's 10 regions
                        </>
                     )}
                  </li>
               </ul>
            </div>
         </div>

         <div className="pubilcMainDiv">
            <div className="publicTitreDiv">
               <span>{isFrench ? "PUBLIC CIBLE" : "TARGET AUDIENCE"}</span>
            </div>
            <div className="publicBolc01">
               <div className="imagePublicbloc01" style={{ backgroundImage: "url(/images/cible01.png)" }}></div>
               <div className="publicTextMainDiv">
                  <span className="publicTitre01">{isFrench ? " Cible Principale" : " Main Target"}</span>
                  <span className="publicTexte01">
                     {isFrench ? (
                        <>
                           Les Entrepreneurs et porteurs de projets issues des 10 régions du Cameroun et investis dans
                           les filières d’import substitution :
                        </>
                     ) : (
                        <>
                           Entrepreneurs and project leadersfrom the 10 regions of Cameroon invested in import
                           substitution sectors:
                        </>
                     )}
                  </span>
                  <span className="publicTexte02">
                     {isFrench ? (
                        <>
                           cacao-café, l'huile de palme, le sucre, le riz, le maïs, la banane-plantain, le poisson, le
                           lait et la viande. Confection textile de coton, cuir et confection de chaussure,
                           transformation de bois, sprofessions libérales, etc
                        </>
                     ) : (
                        <>
                           cocoa-coffee, palm oil, sugar, rice, maize, banana plantain, fish, milk and meat. Textile
                           making of cotton, leather and footwear, wood processing, professional services, etc.
                        </>
                     )}
                  </span>
               </div>
            </div>
            <div className="publicBolc02">
               <span className="publicTitre01">
                  {isFrench ? "Cibles Connexe Strategique" : "Strategic Related Target"}
               </span>
               <span className="publicTexte03">
                  {isFrench ? (
                     <>
                        Il s’agit de tout acteur permettant d’accompagner la solidification structurelle du tissu
                        Entrepreneuriale en temps réel:
                     </>
                  ) : (
                     <>
                        This is any actor that can support the structural solidification of the Entrepreneurial fabric
                        in real time:
                     </>
                  )}
               </span>
               <div className="SouspublicBolc">
                  <div className="SouspublicBolcItem">
                     <div className="imageSousblocItem" style={{ backgroundImage: "url(/images/cible02.png)" }}></div>
                     <spam className="publicTitre02">{isFrench ? "Les investisseurs locaux" : "Local investors"}</spam>
                     <spam className="publicTexte03">
                        {isFrench ? (
                           <>
                              Il s’agit des personnes physiques ou morales ayant la capacité de mettre à disposition des
                              financements pour le développement des entreprises appartenant aux entrepreneurs capacités
                              dans le cadre du programme
                           </>
                        ) : (
                           <>
                              These are natural or legal persons with the capacity to provide financing for the
                              development of enterprises belonging to capable entrepreneurs under the programme
                           </>
                        )}
                     </spam>
                  </div>

                  <div className="SouspublicBolcItem">
                     <div className="imageSousblocItem" style={{ backgroundImage: "url(/images/cible01.png)" }}></div>
                     <spam className="publicTitre02">
                        {isFrench ? "Les famille des 1000 Entrepreneurs" : "Families of the 1000 Entrepreneurs"}
                     </spam>
                     <spam className="publicTexte03">
                        {isFrench ? (
                           <>
                              Il s’agit des familles de l’entrepreneur capacité et qui constituent son principal pilier
                              social et son principal apport en fond de roulement courant de démarrage.
                           </>
                        ) : (
                           <>
                              These are the families of the Capacity Entrepreneur who are its main social pillar and its
                              main source of current working capital for start-ups.
                           </>
                        )}
                     </spam>
                  </div>
                  <div className="SouspublicBolcItem">
                     <div className="imageSousblocItem" style={{ backgroundImage: "url(/images/cible01.png)" }}></div>
                     <spam className="publicTitre02">{isFrench ? "Les Enseignants" : "Teachers"}</spam>
                     <spam className="publicTexte03">
                        {isFrench ? (
                           <>Il s’agit des enseignants à capacité et en Andragogie Entrepreneuriale</>
                        ) : (
                           <>These are teachers to be able to teach in Entrepreneurial Andragogy</>
                        )}
                     </spam>
                  </div>
                  <div className="SouspublicBolcItem">
                     <div className="imageSousblocItem" style={{ backgroundImage: "url(/images/cible02.png)" }}></div>
                     <spam className="publicTitre02">{isFrench ? "Les élèves et étudiants" : "Students"}</spam>
                     <spam className="publicTexte03">
                        {isFrench ? (
                           <>
                              Il s’agit de tout élève ou étudiant inscrit au Cameroun, disposé à être initié au
                              Leadership et a l’Entrepreneuriat et aux compétences professionnelles, afin de se
                              projetter sur le long terme dans le processus de créations d’entreprises durables et
                              rentables.
                           </>
                        ) : (
                           <>
                              Any student enrolled in Cameroon who is willing to be introduced to Leadership,
                              Entrepreneurship and Professional Skills, in order to take a long-term perspective in the
                              process of creating sustainable and profitable businesses.
                           </>
                        )}
                     </spam>
                  </div>
               </div>
            </div>
         </div>
         <BlocPartenaire />
         <Footer />
      </>
   );
}

export const BlocPartenaire = () => {
   return (
      <div className="partenaireMainDiv">
         <div className="partenaireTitreDiv">
            <span>Nos partenaires</span>
         </div>
         <spam className="parteniareTexte">Nous cheminons main dans la main  avec nos partenaires stratégiques</spam>
         <div className="partenaireLogoMainDiv">
            <img className="imgageLogoPartenaire" src="/images/partenaire/activa.png" alt="logo mtn" />
            <img className="imgageLogoPartenaire" src="/images/partenaire/bange.png" alt="logo mtn" />
            <img className="imgageLogoPartenaire" src="/images/partenaire/boisson.png" alt="logo mtn" />
            <img className="imgageLogoPartenaire" src="/images/partenaire/dangote.png" alt="logo mtn" />
            <img className="imgageLogoPartenaire" src="/images/partenaire/cabinetelesyst.png" alt="logo mtn" />
            <img className="imgageLogoPartenaire" src="/images/partenaire/gicam.png" alt="logo mtn" />
            <img className="imgageLogoPartenaire" src="/images/partenaire/fiduca.png" alt="logo mtn" />
         </div>
      </div>
   );
};
