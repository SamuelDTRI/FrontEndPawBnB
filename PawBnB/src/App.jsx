import {
  Landing,
  Home,
  SignUpOwners,
  SignUpSitters,
  SitterProfile,
  DashboardOwner,
  DashboardSitter,
} from "./Views/indexViews";
import Footer from "./Components/Footer/Footer"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import SearchBar from "./Components/SearchBar/SearchBar";
import NavBar from "./Components/NavBar/NavBar";

function App() {

  return (
    <div>
       
      <NavBar/>
      <Footer/> 
      
    </div>
  );
}

export default App;
