import React from "react";
import {createRoot} from 'react-dom/client';
import Nav from "./components/layout/nav/nav";
import Menu from "./components/layout/menu/menu";
import Content from "./components/layout/content/content";
import {BrowserRouter} from "react-router-dom";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <html lang="en" >
    <head>
      <title>Free online dev toolbox</title>
    </head>
    <body>
      <BrowserRouter>
        <div className="window">
          <Nav>
          </Nav>
          <Menu>
          </Menu>
          <Content>
          </Content>
          
        </div>
      </BrowserRouter>

    </body>
    </html>
      )
};

const root = createRoot(
  document.getElementById('root')
);
root.render(App());