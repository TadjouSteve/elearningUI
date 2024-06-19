import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../composants/Header'
import { Col, Container, Row } from 'react-bootstrap'
import './adminDashbordCSS.css';
import { useFetch } from '../../../utils/hooks/FetchData';
import { MessageErrorServeur } from '../../../composants/MessageComponent';
import { AppContext } from '../../../context';
import { CircularProgress } from '@mui/material';
export default function AdminDashboard() {
    // backgroundColor: '#e1e4e4'
    const { isOnline, language } = useContext(AppContext);
    const [update, setUpdate] = useState(false)
    const { isLoading, data, error } = useFetch('/admin/dashboard', 'GET', null, null, update)

    useEffect(() => {
        const intervale = setInterval(() => {
            if (!isLoading && error) {
                setUpdate(!update);
            }
        }, 30000);
        return () => clearInterval(intervale);
    }, [isLoading, error, update]);

    return (
        <>
            <Container fluid style={{ margin: 0, padding: 0, }} >


                <div>Tableau de bord administrateur</div>

                {isLoading ?
                    <div style={{ marginLeft: '40%' }} >
                        <CircularProgress size={40} />
                    </div>
                    : error ?
                        <MessageErrorServeur />
                        :
                        <>
                            <Row style={{ margin: 20 }}>
                                <Col md={3} >
                                    <div className='statItemDiv'>
                                        <div className='statNumber'>
                                            <span>{data.etudiantInscrit}</span>
                                        </div>
                                        <div className='stattext'>
                                            <span>Etudiants Inscrits</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3} >
                                    <div className='statItemDiv'>
                                        <div className='statNumber'>
                                            <span>{data.profActif + " /" + data.profTotal}</span>
                                        </div>
                                        <div className='stattext'>
                                            <span>Professeur actif</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3} >
                                    <div className='statItemDiv'>
                                        <div className='statNumber'>
                                            <span>{data.moduleActif + " /" + data.moduleTotal}</span>
                                        </div>
                                        <div className='stattext'>
                                            <span>Module Actif</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3} >
                                    <div className='statItemDiv'>
                                        <div className='statNumber'>
                                            <span>{data.chapitreTotal}</span>
                                        </div>
                                        <div className='stattext'>
                                            <span>Chapitres</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ margin: 20 }}>
                                <Col md={3} >
                                    <div className='statItemDiv'>
                                        <div className='statNumber'>
                                            <span>{data.qcmValide}</span>
                                        </div>
                                        <div className='stattext'>
                                            <span>QCM Validés</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3} >
                                    <div className='statItemDiv'>
                                        <div className='statNumber'>
                                            <span>{data.tauxReuissite + " %"}</span>
                                        </div>
                                        <div className='stattext'>
                                            <span>Taux de Reussite QCM</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3} >
                                    <div className='statItemDiv'>
                                        <div className='statNumber'>
                                            <span>{data.questionPose}</span>
                                        </div>
                                        <div className='stattext'>
                                            <span>Questions posées</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3} >
                                    {/* 
                                    <div className='statItemDiv'>
                                        <div className='statNumber'>
                                            <span>00</span>
                                         </div>
                                         <div className='stattext'>
                                            <span>Chapitres</span>
                                        </div>
                                    </div> 
                                    */}
                                </Col>
                            </Row>
                        </>
                }
            </Container>
        </>
    )
}

// Path: src/pages/AdminPages/AdminDashboard/index.jsx
// Compare this snippet from src/composants/Header/index.jsx:

