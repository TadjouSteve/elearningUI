import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';
import * as FaIcons from "react-icons/fa";
import { SidebarDatas } from "./SidebarDatas";
import ScrollMenu from "./ScrollMenu";
//import streengeLogo from '../../util/images/streenge_baniere_svg.svg';
//import { streengeData } from "../../util/streengeFunctions";
import { useNavigate } from "react-router-dom";

function Sidebar({ setLarge, large }) {
    const navigation = useNavigate();
    const [indexMenuSelected, setIndexMenuSelected] = useState(0);
    const showSidebar = () => { /*setSidebar(!sidebar);*/ setLarge(!large) };
    const setSelected = (order) => {
        !(indexMenuSelected === order) ? setIndexMenuSelected(order) : setIndexMenuSelected(0);
    }
    return (
        <div>
            <div className='navbar' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <div id="logo" style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <div>
                        <img
                            alt="Logo iri"
                            width="50px"
                            height="40px"
                            src={'/images/logoprogrammeleadership.png'}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars size={30} onClick={showSidebar} />
                        </Link>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginRight: "10px", alignItems: "center" }}>
                    <div id="info_user" onClick={() => { navigation("/home/") }} style={{ display: "flex", flexDirection: "column", padding: "5px", marginRight: "10px", cursor: "pointer" }}>
                        <span>Utilisateur: <span style={{ margin: "0px", fontSize: "20px", fontWeight: "600" }}> {'mon du user'} </span></span>
                    </div>
                    <div>
                        <span style={{ fontSize: "17px", fontWeight: "600", cursor: "pointer" }}>Deconnexion</span>
                    </div>
                </div>
            </div>
            <div className={!large ? 'sidbar' : 'sidbar active'} style={{ maxHeight: "100vh", overflowY: "auto" }}>
                {SidebarDatas.map((item, index) => {
                    return (
                        <>
                            {(5 >= item.userLevel) &&
                                <div key={index} className={item.cName} onClick={() => { if (!(item.subMenu)) { navigation(item.path) } }}   >
                                    <nav style={{ "color": (indexMenuSelected === item.order) ? item.color : 'white' }} onClick={() => setSelected(item.order)} className={(indexMenuSelected === item.order) ? 'nav-selected' : null}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                        {item.subMenu ? ((indexMenuSelected === item.order) ? <FaIcons.FaAngleUp /> : <FaIcons.FaAngleDown />) : null}
                                    </nav>
                                    {(indexMenuSelected === item.order) ? (item.subMenu ? <ScrollMenu subMenu={item.subMenu} color={item.color} className={""} mother={item.order} motherSelected={indexMenuSelected} /> : null) : (item.subMenu ? <ScrollMenu subMenu={item.subMenu} color={item.color} className={" close"} mother={item.order} motherSelected={indexMenuSelected} /> : null)}

                                </div>
                            }
                        </>

                    )
                })}
            </div>
        </div>
    );
}


export default Sidebar;