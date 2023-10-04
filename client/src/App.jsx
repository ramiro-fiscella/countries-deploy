import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import { CountryDetail, Home, Landing, ActivityForm, ErrorPage } from "./views";
import { NavBar } from "./components";

import "./App.css";

const URL = "https://countries-deploy-production.up.railway.app/";

axios.defaults.baseURL = URL;

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" ? <NavBar /> : null}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/countries" element={<Home />} />
        <Route exact path="/countries/:id" element={<CountryDetail />} />
        <Route exact path="/activities" element={<ActivityForm />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
