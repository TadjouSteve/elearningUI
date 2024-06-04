import React, { useContext, useState } from 'react'
import { AppContext } from '../../context';
import './headerCSS.css';
import { Avatar, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import SignInSignUp from '../SignInSignUp';
import { useNavigate, useLocation } from 'react-router-dom';
import { itemData, itemDataAdmin, settingsProfil } from './itemData';
import { AccountCircle } from '@mui/icons-material';
import { userProfile } from '../../utils/data';
import { removeUserCookie } from '../../utils/fonctions';

export default function Header() {
    const { language, setLanguage, setUser, user } = useContext(AppContext);
    const navigation = useNavigate();
    const [showSignInsignOn, setShowSignInsignOn] = useState(false)
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const deconnexion = () => {
        setUser(null);
        removeUserCookie();
        navigation('/');
    }

    let isFrench = language === 'FR';

    return (
        <HeaderComponent />
    )
}


const HeaderComponent = () => {
    const { language, setLanguage, setUser, user } = useContext(AppContext);
    const [openMenuProfil, setOpenMenuProfil] = useState(false)
    const navigation = useNavigate();
    const location = useLocation();

    let isAdmin = user && user.profil === userProfile.ADMIN_USER;
    let isProf = user && user.profil === userProfile.PROFESSEUR_USER;
    let isFrench = language === 'FR';
    const deconnexion = () => {
        setUser(null);
        navigation('/');
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };


    let itemDataFilter = !user ? itemData.filter(item => item.id !== 2) : (user.profil !== userProfile.ADMIN_USER ? itemData : itemDataAdmin);

    return (
        <>
            <div className='mainDivHeader' style={{
                marginBottom: "5px", width: "100%", backgroundColor: (isAdmin ? '#51b447' : isProf ? '#406293' : 'whitesmoke'), display: "flex", flexDirection: 'row', fontWeight: 'bold', alignItems: 'center', justifyContent: 'space-between'
            }}>
                <div className='largeScreanList' style={{ zIndex: 10, width: "100%", }} >
                    <div className='logoDiv'>
                        <img className='logo' src="/images/logoprogrammeleadership.png" alt="Logo programme leadership" />
                    </div>
                    <div className='allItemDiv' style={{ gap: 2, height: '60px', width: '60%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

                        {itemDataFilter.map(item => (
                            <div className={'itemListDiv ' + (location.pathname === item.lien ? ' activeItemMenu' : '')} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} key={item.id + 'headerItem'} onClick={() => navigation(item.lien)}>
                                <span className='itemList' >
                                    {isFrench ? item.nom : item.nomEn}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className='buttonAction' style={{ marginRight: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        {user ?
                            <div className='buttonAction'>
                                <Button variant='outlined' color='error' onClick={() => deconnexion()} >{isFrench ? 'Deconnexion' : 'LogOut'}</Button>
                            </div>
                            :
                            <SignInSignUp signIn={false} justTexte={true} />

                        }
                        <select
                            id="language-select"
                            value={language}
                            onChange={handleLanguageChange}
                        >
                            <option value="EN">{'English'}</option>
                            <option value="FR">{'Français'}</option>
                        </select>
                        {user &&
                            <div>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={() => { setOpenMenuProfil(true) }} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/images/avatar.png" />
                                        {/* <AccountCircle size={50} /> */}
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openMenuProfil}
                                    onClose={() => { setOpenMenuProfil(false) }}
                                >
                                    {settingsProfil.map((setting) => (
                                        <MenuItem key={setting.id + 'idsetpro'} onClick={() => { setOpenMenuProfil(false); setting.id === 3 ? deconnexion() : navigation(setting.lien) }}>
                                            <Typography textAlign="center"><span style={{ color: setting.id === 3 ? 'red' : 'black', fontWeight: setting.id === 3 ? '800' : '' }}>{isFrench ? setting.nom : setting.nomEn}</span></Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        }
                    </div>
                </div>

                <div className='smallScreanList' >
                    <div className='logoDiv'>
                        <img className='logo' src="/images/logoprogrammeleadership.png" alt="Logo programme leadership" />
                    </div>
                    <div className='buttonAction' style={{ marginRight: 20, zIndex: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        {user ?
                            <div className='buttonAction'>
                                <Button variant='outlined' color='error' onClick={() => deconnexion()} >{isFrench ? 'Deconnexion' : 'LogOut'}</Button>
                            </div>
                            :
                            <SignInSignUp signIn={false} />

                        }
                        <select
                            id="language-select"
                            value={language}
                            onChange={handleLanguageChange}
                        >
                            <option value="EN">{'EN'}</option>
                            <option value="FR">{'FR'}</option>
                        </select>

                    </div>
                </div>
            </div >
        </>
    )
}