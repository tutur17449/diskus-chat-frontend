import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import store from "./store";
import Header from "./components/Header";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Chat} />
              <Route path="/login" component={Login} />
            </Switch>
          </main>
        </Router>
      </Provider>
    </AuthProvider>
  );
};

export default App;
