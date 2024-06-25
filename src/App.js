import './App.css';
import Loading from "./component/Loading";
import Main from "./component/Main";
import Search from "./component/Search";
import DetailedPage from "./component/DetailedPage";
import Map from "./component/Map";
import {Route, Routes} from "react-router-dom";
import Login from "./component/Login";
import Header from "./component/Header";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Loading/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="detail/:title" element={<DetailedPage/>}/>
        </Routes>
        {/*/!*<Search/>*!/*/}
        {/*/!*<Map/>*!/*/}

    </div>
  );
}

export default App;
