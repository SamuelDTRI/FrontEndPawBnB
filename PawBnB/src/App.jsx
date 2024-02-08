//pages
import {
  Landing,
  Home,
  SignUpOwners,
  SignUpSitters,
  SitterProfile,
  DashboardOwner,
  DashboardSitter,
} from "./Views/indexViews";
//redux
import { useSelector, useDispatch } from "react-redux";
import { sumCount, resCount } from "./redux/countSlice";
//hook
import { Routes, Route } from 'react-router-dom';
//style
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  const sumClick= () => {
    dispatch(sumCount());
  }

  const resClick= () => {
    dispatch(resCount());
  }

  return (
    <>
      {/* <h1>Hola xd</h1>
      <h2>Contador de ejemplo con Redux Toolkit</h2>
      <div>
        <h3>{count.count}</h3>
        <button onClick={()=>resClick()}>Anterior</button>
        <button onClick={()=>sumClick()}>Siguiente</button>
      </div> */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
