import Menu from "./screens/Menu.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Regles from "./screens/Regles.jsx";
import ChoixJoueurs from "./screens/choixJoueurs.jsx";
import ChoixCamp from "./screens/ChoixCamp.jsx";
import ChoixTaillePlateau from "./screens/ChoixTaillePlateau.jsx";
import Jeu from "./screens/Jeu.jsx";
import FinJeu from './screens/FinJeu.jsx';

const App = () => {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/Regles" element={<Regles />} />
            <Route path="/NbJoueurs" element={<ChoixJoueurs />} />
            <Route path="/NbJoueurs/ChoixCamp" element={<ChoixCamp />} />
            <Route path="/NbJoueurs/ChoixTaillePlateau" element={<ChoixTaillePlateau />} />
            <Route path="/NbJoueurs/ChoixCamp/ChoixTaillePlateau" element={<ChoixTaillePlateau />} />
            <Route path="/NbJoueurs/ChoixTaillePlateau/Jeu" element={<Jeu />} />
            <Route path="/NbJoueurs/ChoixCamp/ChoixTaillePlateau/Jeu" element={<Jeu />} />
            <Route path="/fin-jeu/:resultat/:joueur" element={<FinJeu />} />
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
