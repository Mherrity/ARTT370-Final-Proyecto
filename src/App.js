import logo from './logo.svg';
import './App.css';
import * as Pages from './pages'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>

      <Switch>
          <Route path="/first-test">
            <Pages.FirstTest/>
          </Route>

          <Route path="/music-floor">
            <Pages.MusicFloor/>
          </Route>

          <Route path="/">
            <Pages.MusicFloor/>
          </Route>

          <Route path="/fs-shader">
            <Pages.FSShader/>
          </Route>

          <Route path="/geo-p">
            <Pages.GeoPierce/>
          </Route>

      </Switch>

    </Router>
  );
}

export default App;
