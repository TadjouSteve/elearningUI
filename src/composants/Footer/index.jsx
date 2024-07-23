import React, { useContext } from "react";
import "./footerCSS.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import Cookies from "js-cookie";

function Footer() {
   const { language, setLanguage, setUser, user } = useContext(AppContext);
   const navigation = useNavigate();
   const location = useLocation();

   let isFrench = language === "FR";
   const deconnexion = () => {
      setUser(null);
      Cookies.remove("user");
      navigation("/");
   };

   return (
      <div className="mainDivFooter">
         <div className="containDivFooter" style={{ cursor: "pointer" }}>
            <div className="subContainDivFooter" style={{ fontWeight: "600" }}>
               <div>
                  <img className="imageLogoFooter" src="/images/logo02.png" alt="logo programme leadership cameroun" />
               </div>

               <span>contact@programmeleadership.org </span>
               <span style={{ fontSize: 15, fontWeight: 600 }}>+237 697 84 03 20 / +237 699 94 71 95 </span>
               <span>Palais de Congrès, Bastos Golf, Yaoundé Cameroun</span>
            </div>

            <div className="subContainDivFooter">
               <span className="sousTitreFooter" style={{ fontWeight: "bold" }}>
                  Compte
               </span>
               {!user ? (
                  <>
                     <Link style={{ textDecoration: "none" }} to={"/connexion"}>
                        <span className="subItemContaindivFooter" style={{ color: "red" }}>
                           Connexion
                        </span>
                     </Link>
                     <Link style={{ textDecoration: "none" }} to={"/inscription"}>
                        <span className="subItemContaindivFooter" style={{ color: "red" }}>
                           S'inscrire pour suivre une formation
                        </span>
                     </Link>
                  </>
               ) : (
                  <>
                     <span className="subItemContaindivFooter" onClick={() => navigation("/dashboard")}>
                        Tableau de board
                     </span>
                     <span className="subItemContaindivFooter" onClick={() => deconnexion()} style={{ color: "red" }}>
                        Deconexion
                     </span>
                  </>
               )}
            </div>
            <div className="subContainDivFooter">
               <span className="sousTitreFooter" style={{ fontWeight: "bold" }}>
                  A propos
               </span>
               <Link to={"/apropos"} style={{ textDecorationLine: "none" }}>
                  <span className="subItemContaindivFooter">Qui sommes nous...?</span>
               </Link>
               <Link to={"/apropos"} style={{ textDecorationLine: "none" }}>
                  <span className="subItemContaindivFooter">Nos objectifs</span>
               </Link>
            </div>
            <div className="subContainDivFooter">
               <span className="sousTitreFooter" style={{ fontWeight: "bold" }}>
                  Réseaux sociaux
               </span>
               <span className="subItemContaindivFooter">Facebook</span>
               <span className="subItemContaindivFooter">Linkeding</span>
               <span className="subItemContaindivFooter">Twitter / X</span>
            </div>
         </div>

         <div style={{ textAlign: "center", color: "#656567" }}>
            <span style={{ fontSize: "18px" }}>© 2024 Groupe IRI.</span>
         </div>

         <div className="footerImageFooter" style={{ backgroundImage: "url(/images/footerImage.png)" }}></div>
      </div>
   );
}

export default Footer;
