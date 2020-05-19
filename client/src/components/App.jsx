import React, {useState, useEffect} from "react";
import {Route} from "react-router-dom";
import jwtDecode from "jwt-decode";
import TopNavigation from "./TopNavigation";
import {AsyncLoad, lazyLoad} from "./AsyncLoad";
import HomePage from "./HomePage";
import {setAuthorizationHeader} from "./api";
import UserContext from "./contexts/UserContext";

const FilmsPage = AsyncLoad(lazyLoad("./FilmsPage"));
const SignupPage = AsyncLoad(lazyLoad("./SignupPage"));
const LoginPage = AsyncLoad(lazyLoad("./LoginPage"));

const initialState = {
  token: "",
  role: "",
};

const App = props => {
  const [user, setUser] = useState(initialState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.filmToken) {
      setUser({
        token: localStorage.filmToken,
        role: jwtDecode(localStorage.filmToken).user.role,
      });
      setAuthorizationHeader(localStorage.filmToken);
    }
  }, []);

  const setMess = message => setMessage(message);

  const login = token => {
    setUser({
      token,
      role: jwtDecode(token).user.role,
    });
    localStorage.filmToken = token;
    setAuthorizationHeader(token);
  };

  const logout = () => {
    setUser({token: null, role: ""});
    delete localStorage.filmToken;
    setAuthorizationHeader();
  };

  return (
    <div className="container ui pt-3">
      <TopNavigation
        isAdmin={!!user.token && user.role === "admin"}
        isAuth={!!user.token}
        logout={logout}
      />

      {message && (
        <div onClick={() => setMessage("")} className="ui info message">
          {message}
          <i className="close icon"></i>
        </div>
      )}

      <Route exact path="/" component={HomePage} />

      <UserContext.Provider value={{user}}>
        <Route
          path="/films"
          render={props => {
            return <FilmsPage {...props} user={user} />;
          }}
        />
      </UserContext.Provider>

      <Route
        path="/signup"
        render={props => {
          return <SignupPage {...props} setMessage={setMess} />;
        }}
      />

      <Route
        path="/login"
        render={props => {
          return <LoginPage {...props} login={login} />;
        }}
      />
    </div>
  );
};

export default App;
