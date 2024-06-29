import './App.css';
import Loading from "./component/Loading";
import {Route, Routes} from "react-router-dom";
import Header from "./component/Header";
import React from "react";
import Bookmark from "./component/Bookmark";
import KakaoCallback from "./component/KakaoCallback";
import KakaoMap from "./component/KakaoMap";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Loading/>}/>
              <Route path="/main/*" element={<Header/>}/>
              <Route path="/OAuth" element={<KakaoCallback/>}/>
              <Route path="/map/:lat/:lng" element={<KakaoMap/>}/>
          </Routes>
      </div>
  );
}

export default App;
