import React from 'react'
import './footerCSS.css';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <div className='mainDivFooter'>

            <div className='containDivFooter' >
                <div className='subContainDivFooter'>
                    <div>
                        <img className='imageLogoFooter' src='/images/logo02.png' />
                    </div>

                    <span>Leardship@programe.com </span>
                    <span>+237 6956 568 123 </span>
                    <span>Omnisport, Yaoundé</span>
                </div>
                <div className='subContainDivFooter'>
                    <span className='sousTitreFooter' style={{ fontWeight: 'bold' }}>Compte</span>
                    <span className='subItemContaindivFooter'>Dashboard</span>
                    <span className='subItemContaindivFooter'>Deconexion</span>

                </div>
                <div className='subContainDivFooter'>
                    <span className='sousTitreFooter' style={{ fontWeight: 'bold' }}>A propos</span>
                    <Link to={'/apropos'} style={{ textDecorationLine: 'none', }}><span className='subItemContaindivFooter'>Qui somme nous...?</span></Link>
                    <Link to={'/apropos'} style={{ textDecorationLine: 'none', }}><span className='subItemContaindivFooter'>Nos objectif</span></Link>

                </div>
                <div className='subContainDivFooter'>
                    <span className='sousTitreFooter' style={{ fontWeight: 'bold' }}>Réseaux sociaux</span>
                    <span className='subItemContaindivFooter'>Facebook</span>
                    <span className='subItemContaindivFooter'>Linkeding</span>
                    <span className='subItemContaindivFooter'>Twitter / X</span>
                </div>
            </div>

            <div style={{ textAlign: 'center', color: '#656567' }}>
                <span style={{ fontSize: '18px' }}>© 2024 Groupe IRI.</span>
            </div>

            <div className='footerImageFooter' style={{ backgroundImage: 'url(/images/footerImage.png)' }}>

            </div>
        </div>
    )
}

export default Footer