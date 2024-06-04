import { Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import './headerContentCSS.css';
import { AppContext } from '../../context';
import { useNavigate } from 'react-router-dom';

function HeaderContent() {
    const { language, user } = useContext(AppContext);
    const [selectedNav, setSelectedNav] = useState(1)
    const navigation = useNavigate();
    return (
        <>
            <div className='mainHaderContent' style={{ backgroundImage: 'url(/images/footerImage.png)' }}>
                <div className='subDivHeaderContent' style={{}}>
                    <div className='userProfilButtonAction'>
                        <div className='userProfil'>
                            <div className='profil'></div>
                            <div className='infoUser'>
                                <span className='nomCompletHedercontent'>{user ? (user.nom + " " + user.prenom) : 'Faux nom Talla andre marie'}</span>
                                <span className='metierHedercontent'>{user ? user.profession : "fausse profession"}</span>
                            </div>
                        </div>
                        <div className='buttonAction'>
                            <Button variant='outlined' color='error' onClick={() => { navigation(-1) }} >{language == 'FR' ? 'Page precedente' : 'Preview page'}</Button>
                        </div>
                    </div>
                    <div className='navigationHeaderContent'>
                        <div onClick={() => { setSelectedNav(1) }} className={'itemNavigationHeaderContent' + ((selectedNav === 1) ? " selectedNav" : '')}>
                            <spam>TABLEAU DE BORD</spam>
                        </div>
                        <div onClick={() => { setSelectedNav(2) }} className={'itemNavigationHeaderContent' + ((selectedNav === 2) ? " selectedNav" : '')}>
                            <span>PARAMETRE</span>
                        </div>
                    </div>
                </div>

            </div >

            {/* <div className='footerImageFooter' style={{ backgroundImage: 'url(/images/footerImage.png)' }}>

            </div> */}
        </>

    )
}

export default HeaderContent;