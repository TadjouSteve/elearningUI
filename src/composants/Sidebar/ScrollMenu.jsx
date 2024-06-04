import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import './Sidebar.css';
//import * as FaIcons from "react-icons/fa";
//import { SidebarDatas } from "./SidebarDatas";


function ScrollMenu({ subMenu, color, className, mother, motherSelected }) {


    const [indexSubMenuSelected, setIndexSubMenuSelected] = useState(-1);
    const setSelected = (order) => {
        setIndexSubMenuSelected(order);
    }

    useEffect(() => {
        if (motherSelected !== mother && motherSelected !== 0) {
            setSelected(-1);
        }

    }, [motherSelected, mother])

    return (
        <>  {/* Il doit y avoir une espace entre la class: submenu-tex et la class: className Si non vous allez rater l'application du CSS */}
            <div className={"submenu-text " + className}  >
                {subMenu.map((item, index) => {
                    return (
                        <>
                            {(5 >= item.userLevel) &&
                                <Link key={index} to={item.path} style={{ "color": (indexSubMenuSelected === index) ? color : 'white' }} onClick={() => setSelected(index)}>
                                    <span>{item.title}</span>
                                </Link>
                            }
                        </>

                    )
                })}
            </div>
        </>
    )
}

export default ScrollMenu;