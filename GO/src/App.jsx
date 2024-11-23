import Menu from "./screens/Menu.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Regles from "./screens/Regles.jsx";
import ChoixJoueurs from "./screens/choixJoueurs.jsx";
import ChoixCamp from "./screens/ChoixCamp.jsx";
import Jeu from "./screens/Jeu.jsx";

const App = () => {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/Regles" element={<Regles />} />
            <Route path="/NbJoueurs" element={<ChoixJoueurs />} />
            <Route path="/NbJoueurs/ChoixCamp" element={<ChoixCamp />} />
            <Route path="/NbJoueurs/ChoixCamp/Jeu" element={<Jeu />} />
            <Route path="/NbJoueurs/Jeu" element={<Jeu />} />

          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
