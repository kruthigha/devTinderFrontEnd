import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Connections from "./components/connections";
import Feed from "./components/feed";
import Profile from "./components/profile"
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store = { appStore }>
        <BrowserRouter basename="/">
          <Routes>
            {/*parent route */}
            <Route path="/" element={<Body />}>
              {/*child route */}
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/requests" element={<Requests/>}/>

            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
