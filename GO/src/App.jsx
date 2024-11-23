import Menu from "./screens/Menu.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Regles from "./screens/Regles.jsx";
import NbJoueurs from "./screens/NbJoueurs.jsx";
import ChoixCamp from "./screens/ChoixCamp.jsx";

const App = () => {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/Regles" element={<Regles />} />
            <Route path="/NbJoueurs" element={<NbJoueurs />} />
            <Route path="/NbJoueurs/ChoixCamp" element={<ChoixCamp />} />
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
