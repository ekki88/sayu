import './App.css';
import Loading from "./component/Loading";
import {Route, Routes} from "react-router-dom";
import Header from "./component/Header";
import React from "react";
import Bookmark from "./component/Bookmark";
import KakaoCallback from "./component/KakaoCallback";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Loading/>}/>
              <Route path="/main/*" element={<Header/>}/>
              <Route path="/OAuth" element={<KakaoCallback/>}/>
          </Routes>
      </div>
  );
}

export default App;
