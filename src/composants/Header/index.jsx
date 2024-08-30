import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import "./headerCSS.css";
import * as FaIcons from "react-icons/fa";
import { Avatar, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import SignInSignUp from "../SignInSignUp";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { itemData, itemDataAdmin, settingsProfil } from "./itemData";
//import { AccountCircle } from "@mui/icons-material";
import { userProfile } from "../../utils/data";
import Cookies from "js-cookie";
import LanguageIcon from "@mui/icons-material/Language";
//import { removeUserCookie } from "../../utils/fonctions";

export default function Header() {
   return <HeaderComponent />;
}

const HeaderComponent = () => {
   const { language, setLanguage, setUser, user } = useContext(AppContext);
   const [openMenuProfil, setOpenMenuProfil] = useState(false);
   const [openVerticalMenu, setOpenVerticalMenu] = useState(false);
   const navigation = useNavigate();
   const location = useLocation();

   let isAdmin = user && user.profil === userProfile.ADMIN_USER;
   let isProf = user && user.profil === userProfile.PROFESSEUR_USER;
   let isFrench = language === "FR";
   const deconnexion = () => {
      setUser(null);
      Cookies.remove("user");
      navigation("/");
   };

   const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
   };

   let itemDataFilter = !user
      ? itemData.filter((item) => item.id !== 2)
      : user.profil !== userProfile.ADMIN_USER
      ? itemData
      : itemDataAdmin;

   return (
      <>
         <div
            className="mainDivHeader"
            style={{
               width: "100%",
               backgroundColor: isAdmin ? "#51b447" : isProf ? "#406293" : "whitesmoke",
               display: "flex",
               flexDirection: "row",
               fontWeight: "bold",
               alignItems: "center",
               justifyContent: "space-between",
            }}
         >
            <div className="largeScreanList" style={{ zIndex: 10, width: "100%" }}>
               <div className="logoDiv">
                  <img className="logo" src="/images/logos02.png" alt="Logo du programme leadership" />
               </div>
               <div
                  className="allItemDiv"
                  style={{
                     height: "60px",
                     width: "60%",
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "flex-end",
                     alignItems: "center",
                     gap: 15,
                  }}
               >
                  {itemDataFilter.map((item) => (
                     <div
                        className={"itemListDiv " + (location.pathname === item.lien ? " activeItemMenu" : "")}
                        style={{
                           flex: 1,
                           height: "50%",

                           display: "flex",
                           flexDirection: "row",
                           alignItems: "center",
                           justifyContent: "center",
                           borderRadius: 30,
                        }}
                        key={item.id + "headerItem"}
                        onClick={() => navigation(item.lien)}
                     >
                        <span className="itemList">{isFrench ? item.nom : item.nomEn}</span>
                     </div>
                  ))}

                  <div
                     className="buttonAction"
                     style={{
                        marginRight: 20,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                     }}
                  >
                     {user ? (
                        <div className="buttonAction">
                           <Button variant="outlined" color="error" onClick={() => deconnexion()}>
                              {isFrench ? "Deconnexion" : "LogOut"}
                           </Button>
                        </div>
                     ) : (
                        <div
                           style={{
                              fontSize: "17px",
                              //width: "100px",
                              background: "green",
                              color: "white",
                              borderRadius: 20,
                              padding: 5,
                              paddingLeft: 20,
                              paddingRight: 20,
                              //height: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                           }}
                           onClick={() => {
                              navigation("/signup");
                           }}
                        >
                           S'inscrire
                        </div>
                     )}
                     <select id="language-select" value={language} onChange={handleLanguageChange}>
                        <option value="EN">{"English"}</option>
                        <option value="FR">{"Français"}</option>
                     </select>
                     {user && (
                        <div>
                           <Tooltip title="Open settings">
                              <IconButton
                                 onClick={() => {
                                    setOpenMenuProfil(true);
                                 }}
                                 sx={{ p: 0 }}
                              >
                                 <Avatar alt="Remy Sharp" src="/images/avatar.png" />
                                 {/* <AccountCircle size={50} /> */}
                              </IconButton>
                           </Tooltip>
                           <Menu
                              sx={{ mt: "45px" }}
                              id="menu-appbar"
                              anchorOrigin={{
                                 vertical: "top",
                                 horizontal: "right",
                              }}
                              keepMounted
                              transformOrigin={{
                                 vertical: "top",
                                 horizontal: "right",
                              }}
                              open={openMenuProfil}
                              onClose={() => {
                                 setOpenMenuProfil(false);
                              }}
                           >
                              {settingsProfil.map((setting) => (
                                 <MenuItem
                                    key={setting.id + "idsetpro"}
                                    onClick={() => {
                                       setOpenMenuProfil(false);
                                       setting.id === 3 ? deconnexion() : navigation(setting.lien);
                                    }}
                                 >
                                    <Typography textAlign="center">
                                       <span
                                          style={{
                                             color: setting.id === 3 ? "red" : "black",
                                             fontWeight: setting.id === 3 ? "800" : "",
                                          }}
                                       >
                                          {isFrench ? setting.nom : setting.nomEn}
                                       </span>
                                    </Typography>
                                 </MenuItem>
                              ))}
                           </Menu>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            <div className="smallScreanList">
               <div className="logoDiv">
                  <img className="logo" src="/images/logoprogrammeleadership.png" alt="Logo programme leadership" />
               </div>
               <div
                  className="buttonAction"
                  style={{
                     marginRight: 20,
                     zIndex: 2,
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "center",
                     gap: 5,
                     position: "relative",
                  }}
               >
                  <FaIcons.FaBars
                     size={30}
                     onClick={() => {
                        setOpenVerticalMenu((prev) => !prev);
                     }}
                  />
                  {/* <FaIcons.FaLock
                     size={30}
                     onClick={() => {
                        setOpenVerticalMenu((prev) => !prev);
                     }}
                  /> */}
                  {openVerticalMenu && (
                     <div className="verticalMenu">
                        {itemDataFilter.map((item) => (
                           <div
                              className={"itemListDiv " + (location.pathname === item.lien ? " activeItemMenu" : "")}
                              style={{
                                 flex: 1,
                                 height: "40px",
                                 display: "flex",
                                 flexDirection: "row",
                                 alignItems: "center",
                                 justifyContent: "center",
                              }}
                              key={item.id + "headerItem"}
                              onClick={() => navigation(item.lien)}
                           >
                              <span className="itemList">{isFrench ? item.nom : item.nomEn}</span>
                           </div>
                        ))}
                        {user ? (
                           <div className="buttonAction">
                              <Button variant="outlined" color="error" onClick={() => deconnexion()} fullWidth>
                                 {isFrench ? "Deconnexion" : "LogOut"}
                              </Button>
                           </div>
                        ) : (
                           <div style={{ textAlign: "center" }}>
                              <SignInSignUp signIn={false} fullWidth={true} />
                           </div>
                        )}

                        <select
                           id="language-select"
                           value={language}
                           style={{ textAlign: "center", minHeight: "40px", marginBottom: 10 }}
                           onChange={handleLanguageChange}
                        >
                           <option value="EN">{"English"}</option>
                           <option value="FR">{"Francais"}</option>
                        </select>

                        <Button
                           variant="outlined"
                           color="error"
                           fullWidth
                           style={{ marginBottom: 10 }}
                           onClick={() => {
                              setOpenVerticalMenu((prev) => !prev);
                           }}
                        >
                           Fermer
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};
