import React from "react";
import "./footerCSS.css";
import { Link } from "react-router-dom";
function Footer() {
   return (
      <div className="mainDivFooter">
         <div className="containDivFooter">
            <div className="subContainDivFooter" style={{ fontWeight: "700" }}>
               <div>
                  <img className="imageLogoFooter" src="/images/logo02.png" alt="logo programme leadership cameroun" />
               </div>

               <span>contact@programmeleadership.net </span>
               <span style={{ fontSize: 14, fontWeight: 700 }}>+237 697 84 83 20 / +237 699 94 71 95 </span>
               <span>Sous prefecture Tsinga, Ancien immeuble Afrique media</span>
            </div>
            <div className="subContainDivFooter">
               <span className="sousTitreFooter" style={{ fontWeight: "bold" }}>
                  Compte
               </span>
               <span className="subItemContaindivFooter">Tableau de board</span>
               <span className="subItemContaindivFooter">Deconexion</span>
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
