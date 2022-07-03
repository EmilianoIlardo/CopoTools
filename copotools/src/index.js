import React from "react";
import {createRoot} from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/about" element= {<About />}/>
          <Route path="/topics/*" element= {<Topics />}/>
          <Route path="/" element= {<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`components`}>Components</Link>
        </li>
        <li>
          <Link to={`props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Routes>
        <Route path={`:topicId`} element={<Topic />} />
          
        <Route path={''} element={<h3>Please select a topic.</h3>} />
      </Routes>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

const root = createRoot(
  document.getElementById('root')
);
root.render(App());