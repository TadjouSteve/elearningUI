import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Course from './pages/Course';
import Dashboard from './pages/Dashboard';
import { AppContext } from './context';
import Module from './pages/Module';
import Apropos from './pages/Apropos';
import Transition from './pages/Transition';
import Header from './composants/Header';
import { userProfile } from './utils/data';
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import Etudiant from './pages/AdminPages/Etudiant';
import ShowEtudiant from './pages/AdminPages/Etudiant/ShowEtudiant';
import Sidebar from './composants/Sidebar';
import './App.css';
import Professeur from './pages/AdminPages/Professeur';
import ShowProfesseur from './pages/AdminPages/Professeur/ShowProfesseur';
import StatEtudiant from './pages/AdminPages/Etudiant/StatEtudiant';
import Error404Page from './pages/404ErrorPage';
import CreateProfesseur from './pages/AdminPages/Professeur/CreateProfesseur';
import Rubrique from './pages/AdminPages/Media/Rubrique';
import CreateRubrique from './pages/AdminPages/Media/Rubrique/CreateRubrique';
import ShowRubrique from './pages/AdminPages/Media/Rubrique/ShowRubrique';
//const AppContext = createContext();

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState('FR');
  const [user, setUser] = useState(null)
  const [large, setLarge] = useState(false);

  return (

    <AppContext.Provider value={{ language, setLanguage, user, setUser, isOnline, setIsOnline }}>
      <CheckInternetConnection isOnline={isOnline} setIsOnline={setIsOnline} />

      <Router>
        {(user && user.profil !== userProfile.ETUDIANT_USER) &&
          <Sidebar large={large} setLarge={setLarge} />
        }
        <div className={(large) ? "mainDiv large" : (!user || (user.profil === userProfile.ETUDIANT_USER) ? "mainDiv large" : "mainDiv")}>
          <Routes>


            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/apropos" element={<Apropos />}></Route>
            <Route path="/about" element={<Apropos />}></Route>
            <Route path="/transition" element={<Transition />}></Route>


            {(user && user.profil === userProfile.ETUDIANT_USER) &&
              <>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/course/:idChapitre" element={<Course />}></Route>
                <Route path="/module/:idModule" element={<Module />}></Route>
              </>
            }

            {(user && user.profil === userProfile.PROFESSEUR_USER) &&
              <>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/course/:idChapitre" element={<Course />}></Route>
                <Route path="/module/:idModule" element={<Module />}></Route>
              </>
            }

            {(user && user.profil === userProfile.ADMIN_USER) &&
              <>
                <Route path="/dashboard" element={<AdminDashboard />}></Route>
                <Route path="/etudiants" element={<Etudiant />}></Route>
                <Route path="/statetudiant" element={<StatEtudiant />}></Route>
                <Route path="/etudiant/:matriculeEtudiant" element={<ShowEtudiant />}></Route>
                <Route path="/professeur" element={<Professeur />}></Route>
                <Route path="/professeurs" element={<Professeur />}></Route>
                <Route path="/professeur/ajouter" element={<CreateProfesseur />}></Route>
                <Route path="/professeur/creer" element={<CreateProfesseur />}></Route>
                <Route path="/professeur/:matricule" element={<ShowProfesseur />}></Route>
                <Route path="/rubrique/" element={<Rubrique />}></Route>
                <Route path="/rubrique/creer" element={<CreateRubrique />}></Route>
                <Route path="/rubrique/:idRubrique" element={<ShowRubrique />}></Route>

              </>
            }

            <Route path="/*" element={<Error404Page />}></Route>
            {/* <Route path="/*" element={<Home />}></Route> */}

          </Routes>
        </div>

      </Router>
    </AppContext.Provider>
  );
}

export default App;







function CheckInternetConnection({ isOnline, setIsOnline }) {

  const checkInternet = async () => {
    try {
      const response = await fetch('https://www.google.com');
      if (response.ok) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkInternet, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

}



const checkUserOnCookies = (user, setUser) => {

}