import { history } from "./history";
import { Route, Router } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NewsFeed from "./pages/NewsFeed";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <>
      {sessionStorage.getItem('@user') ?
        <>
          <Router history={history}>
            <Route path="/profile" exact component={Profile} />
            <Route path="/Feed" exact component={NewsFeed} />
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
