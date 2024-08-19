import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Course from './pages/Course';
import Dashboard from './pages/Dashboard';
import { AppContext } from './context';
import Module from './pages/Module';
import Apropos from './pages/Apropos';
import Transition from './pages/Transition';
import Cookies from "js-cookie";

// import Header from './composants/Header';
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
import Article from './pages/AdminPages/Media/Article';
import CreateArticle from './pages/AdminPages/Media/Article/CreateArticle';
import ShowArticle from './pages/AdminPages/Media/Article/ShowArticle';
import Media, { MediaWithDefaultIdRubrique } from './pages/Media';
import ArticlePublic from './pages/Media/Article';
import 'typeface-roboto';
import AlterRubrique from './pages/AdminPages/Media/Rubrique/AlterRubrique';
import AlterArticle from './pages/AdminPages/Media/Article/AlterArticle';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import ModuleAdmin from './pages/AdminPages/ContenuFormation/ModuleAdmin';
import ShowModuleAdmin from './pages/AdminPages/ContenuFormation/ModuleAdmin/ShowModuleAdmin';
import CreateModuleAdmin from './pages/AdminPages/ContenuFormation/ModuleAdmin/CreateModuleAdmin';
import AlterModuleAdmin from './pages/AdminPages/ContenuFormation/ModuleAdmin/AlterModuleAdmin';
import CourAdmin from './pages/AdminPages/ContenuFormation/CourAdmin';
import ShowCourAdmin from './pages/AdminPages/ContenuFormation/CourAdmin/ShowCourAdmin';
import CreateCourAdmin from './pages/AdminPages/ContenuFormation/CourAdmin/CreateCourAdmin';
import AlterCourAdmin from './pages/AdminPages/ContenuFormation/CourAdmin/AletrCourAdmin';
import Inscription002 from './pages/Inscription/inscrption002';
import ValidationInscription from './pages/ValidationPages/ValidationInscription';
import ControlValidationCompteEtudiant from './pages/ValidationPages/ControlValidationCompteEtudiant';
import Home from './pages/Home';
import Apropos02 from './pages/Apropos/Apropos02';
//import AlterRubrique from './pages/AdminPages/Media/Rubrique/AlterRubrique';

//const AppContext = createContext();

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState('FR');
  const [user, setUser] = useState(null)
  const [large, setLarge] = useState(false);
  const serveurURL = "https://api.programmeleadership.net/elearningapi"; // before build
  //const serveurURL = "http://localhost:9006/elearningapi";

  useEffect(() => {
      const intervalId = setInterval(checkUserOnCookies(user, setUser), 4000);
      // Nettoyage de l'intervalle lorsque le composant est démonté
      return () => clearInterval(intervalId);
  }, [user,setUser]);

  return (

    <AppContext.Provider value={{ language, setLanguage, user, setUser, isOnline, setIsOnline,serveurURL }}>
      <CheckInternetConnection isOnline={isOnline} setIsOnline={setIsOnline} />

      <Router>
        {(user && user.profil !== userProfile.ETUDIANT_USER) &&
          <Sidebar large={large} setLarge={setLarge} />
        }
        <div className={(large) ? "mainDiv large" : (!user || (user.profil === userProfile.ETUDIANT_USER) ? "mainDiv large" : "mainDiv")}>
          <Routes>


            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/home02" element={<Home />}></Route>
            <Route path="/inscription" element={<Inscription002 />}></Route>
            <Route path="/inscriptiontest031" element={<Inscription002 />}></Route>
            <Route path="/registration" element={<Inscription002 />}></Route>
            
            <Route path="/signup" element={<Inscription002 />}></Route>
            <Route path="/connexion" element={<Connexion />}></Route>
            <Route path="/signin" element={<Connexion />}></Route>

            <Route path="/validationcompte/:lienConfirmation" element={<ValidationInscription />}></Route>
            <Route path="/controlevalidationcompte/:matricule" element={<ControlValidationCompteEtudiant />}></Route>

            <Route path="/apropos" element={<Apropos02 />}></Route>
            <Route path="/apropos02" element={<Apropos02 />}></Route>
            <Route path="/about" element={<Apropos02 />}></Route>
            <Route path="/transition" element={<Transition />}></Route>



            {(!user || user.profil !== userProfile.ADMIN_USER) &&
            <>
            <Route path="/articles" element={<Media />}></Route>
            <Route path="/medias" element={<Media />}></Route>
            <Route path="/medias/rubrique/:idRubrique" element={<MediaWithDefaultIdRubrique />}></Route>
            <Route path="/medias/rubrique/:nomRubrique/:idRubrique" element={<MediaWithDefaultIdRubrique />}></Route>
            <Route path="/article/:lienArticle" element={<ArticlePublic />}></Route>
            </>
            }
            
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

                <Route path="/modules" element={<ModuleAdmin />}></Route>
                <Route path="/module/creer" element={<CreateModuleAdmin />}></Route>
                <Route path="/module/ajouter" element={<CreateModuleAdmin />}></Route>
                <Route path="/module/alter/:idModule" element={<AlterModuleAdmin />}></Route>
                <Route path="/module/:idModule" element={<ShowModuleAdmin />}></Route>


                <Route path="/cours" element={<CourAdmin />}></Route>
                <Route path="/cour/ajouter" element={<CreateCourAdmin />}></Route>
                <Route path="/cour/alter/:idChapitre" element={<AlterCourAdmin />}></Route>
                <Route path="/cour/:idChapitre" element={<ShowCourAdmin />}></Route>


                <Route path="/rubrique/" element={<Rubrique />}></Route>
                <Route path="/rubrique/creer" element={<CreateRubrique />}></Route>
                <Route path="/rubrique/alter/:idRubrique" element={<AlterRubrique />}></Route>
                <Route path="/rubrique/:idRubrique" element={<ShowRubrique />}></Route>

                <Route path="/article/" element={<Article />}></Route>
                <Route path="/article/creer" element={<CreateArticle />}></Route>
                <Route path="/article/alter/:idArticle" element={<AlterArticle />}></Route>
                <Route path="/article/:idArticle" element={<ShowArticle />}></Route>

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
  });

}



const checkUserOnCookies = (user, setUser) => {
  const userCookie = Cookies.get("user");

  if (userCookie) {
    const parsedUser = JSON.parse(userCookie);
    if (JSON.stringify(parsedUser) !== JSON.stringify(user)) {
        // Les utilisateurs sont différents, mettons à jour l'état
        setUser(parsedUser);
    }
    // Sinon, ils sont identiques, aucune action nécessaire
  } else if (user !== null) {
    // Le cookie "user" n'existe pas, mais l'argument user n'est pas null
    // Sauvegardons le cookie
    Cookies.set("user", JSON.stringify(user));
  }
}