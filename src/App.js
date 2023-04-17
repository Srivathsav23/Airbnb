import { history } from "./history";
import { Route, Router } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <>
      {sessionStorage.getItem('@user') ?
        <>
          <Router history={history}>
            <Route path="/profile" exact component={Profile} />
            <Route path="/" exact component={Feed} />
          </Router>
        </> :
        <Router history={history}>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Router>
      }
    </>
  );
}

export default App;
