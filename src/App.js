// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./layout/Layout.jsx";
import SeriesDetail from "./pages/SeriesDetail.jsx";
import Soundtracks from "./pages/Soundtracks.jsx";
import SeriesAll from "./pages/SeriesAll.jsx";
import CharactersAll from "./pages/CharactersAll.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="soundtracks" element={<Soundtracks />} />
        <Route path="series">
          <Route index element={<SeriesAll />} />
          <Route path=":seriesSlug" element={<SeriesDetail />} />
        </Route>
        <Route path="characters" element={<CharactersAll />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
