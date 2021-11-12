import Link from "next/link";

import React, { lazy } from "react";
import { Provider } from "react-redux";
import { store } from "../provider";
import Profile from "./profile/Profile";

const Home = lazy(() => import("../component/Home"));
const Notice = lazy(() => import("./notice"));

function App() {
  return (
    <Provider store={store}>
      <div style={{ width: "mx-auto" }} className="mx-auto">
        <header className="app-bar bg-primary shadow">
          <Profile />
        </header>
        <main style={{ marginLeft: "mx-auto", marginTop: "20px" }}>
          <h4 className="ms-2 my-2">Admin</h4>
          <nav
            className="drawer-menu position-fixed bg-light shadow-sm"
            style={{ marginLeft: "mx-auto", markerMid: "200px" }}
          >
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/notice">Notice</Link>
              </li>
            </ul>
          </nav>
        </main>
      </div>
    </Provider>
  );
}

export default App;
