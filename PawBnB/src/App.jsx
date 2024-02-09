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
      <h1>Hola xd</h1>
    </>
  );
}

export default App;
