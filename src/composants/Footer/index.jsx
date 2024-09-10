import React, { useContext } from "react";
import "./footerCSS.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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

   const listNumeroWhatSapp = ["", "", "", ""];

   return (
      // <>
      //    <footer class="footer">
      //       <div class="wapper">
      //          <div class="row-col">
      //             <div class="cat-col-25">
      //                <div class="pad-cat">
      //                   <div class="img logo-footer">
      //                      <img src="images/logo-footer.png" alt="" />
      //                   </div>
      //                   <div class="widget-footer">
      //                      <div class="menu-container">
      //                         <h4 class="titre-footer-rx text-center">Suivez-nous</h4>
      //                         <div class="footer-social-links">
      //                            <a
      //                               href="https:web.facebook.com/Leadershipprogramm/?_rdc=1&_rdr"
      //                               title="Facebook"
      //                               target="_blank"
      //                            >
      //                               <i class="fa-brands fa-facebook"></i>
      //                            </a>
      //                            <a
      //                               href="https:www.linkedin.com/company/programmeleadership"
      //                               title="Linkedin"
      //                               target="_blank"
      //                            >
      //                               <i class="fa-brands fa-linkedin"></i>
      //                            </a>
      //                            <a
      //                               href="https:api.whatsapp.com/send?phone=237695835877&text=Hi%20Programme%20Leadership"
      //                               title="Whatsapp"
      //                               target="_blank"
      //                            >
      //                               <i class="fa-brands fa-whatsapp"></i>
      //                            </a>
      //                         </div>
      //                      </div>
      //                   </div>
      //                </div>
      //             </div>
      //             <div class="cat-col-30">
      //                <div class="pad-cat">
      //                   <h4 class="titre-footer">À propos</h4>
      //                   <div class="widget-footer">
      //                      <ul>
      //                         <li>
      //                            <a href="#">Qui sommes nous?</a>
      //                         </li>
      //                         <li>
      //                            <a href="#">Nos objectifs</a>
      //                         </li>
      //                         <li>
      //                            <a href="#">Connexion</a>
      //                         </li>
      //                         <li>
      //                            <a href="#">S'inscrire pour suivre une formation</a>
      //                         </li>
      //                      </ul>
      //                   </div>
      //                </div>
      //             </div>
      //             <div class="cat-col-40">
      //                <div class="pad-cat">
      //                   <h4 class="titre-footer">Contact</h4>
      //                   <div class="widget-footer">
      //                      <ul>
      //                         <li>Palais de Congrès, Bastos Golf, Yaoundé Cameroun</li>
      //                         <li>contact@programmeleadership.org</li>
      //                         <li>+237 697 84 03 20 / +237 699 94 71 95</li>
      //                         <li>Site web : www.proqrammeleadership.orc</li>
      //                      </ul>
      //                   </div>
      //                </div>
      //             </div>
      //          </div>
      //       </div>
      //       <div class="wapper">
      //          <div class="row-col">
      //             <div class="cat-col-100">
      //                <div class="copyright_text text-center">
      //                   Programme Leadership © 2024, All Rights Reserved, by Group IRI.
      //                </div>
      //             </div>
      //          </div>
      //       </div>
      //    </footer>
      // </>

      <div className="mainDivFooter" style={{ backgroundColor: "white" }}>
         <div className="blocFooterMainDiv" style={{ gap: 25 }}>
            <div className="SousblocFooterDiv01" style={{ gap: 2 }}>
               <span>
                  <span style={{ textDecoration: "underline" }}>NOUS</span> CONTACTER
               </span>
               <span>
                  <a
                     className="lienc1"
                     style={{ color: "white" }}
                     href="https://chat.whatsapp.com/HZvUzVRNNHFFZNyden9NEi"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <span style={{ textDecoration: "uderline" }}>Nous ecrire sur WhatsApp </span>{" "}
                     <WhatsAppIcon sx={{ fontSize: "40px", color: "white" }} />
                  </a>
               </span>
               <span>
                  <span style={{ textDecoration: "uderline" }}>Tel:</span> +237 695 83 58 77 / +237 691 26 55 25
               </span>
               <span>
                  <span style={{ textDecoration: "uderline" }}>SITE WEB: </span>{" "}
                  <a
                     className="lienc1"
                     style={{ color: "white" }}
                     href="https:programmeleadership.org"
                     target="_blank"
                     rel="noreferrer"
                  >
                     www.programmeleadership.org
                  </a>
               </span>
            </div>

            <div className="SousblocFooterDiv01">
               <span>
                  <span style={{ textDecoration: "underline" }}>NOUS</span> SUIVRE
               </span>
               <div>
                  <span>
                     <a href="https:web.facebook.com/Leadershipprogramm/?_rdc=1&_rdr" target="_blank" rel="noreferrer">
                        <FacebookIcon sx={{ fontSize: "60px", color: "white" }} />
                     </a>

                     <a
                        className="lienc1"
                        style={{ color: "white" }}
                        href="https://chat.whatsapp.com/HZvUzVRNNHFFZNyden9NEi"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <WhatsAppIcon sx={{ fontSize: "60px", color: "white" }} />
                     </a>
                     <a href="https:www.linkedin.com/company/programmeleadership" target="_blank" rel="noreferrer">
                        <LinkedInIcon sx={{ fontSize: "60px", color: "white" }} />
                     </a>
                  </span>
               </div>
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
