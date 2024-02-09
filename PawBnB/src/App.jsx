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
//hook
import { Routes, Route } from 'react-router-dom';
//style
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
