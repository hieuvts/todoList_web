import "./appStyle.scss";
import "antd/dist/antd.css";
import SignIn from "./Pages/Authentication/SignIn";
import SignUp from "./Pages/Authentication/SignUp";
import Todos from "./Pages/Todos";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logosvg from "./images/logo.svg";
function App() {
  return (
    <Router>
      <header>
        <Link className="logo" to="/">
          <img src={logosvg} alt="Home page" width="60px" height="60px" />
        </Link>
        <nav>
          <ul className="nav-link">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">SignIn</Link>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/todos">
          <Todos />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
