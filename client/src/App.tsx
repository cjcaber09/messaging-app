// import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import MessageContent from "./components/layout/MessageContent";
import Sidebar from "./components/layout/sideBar";
import Login from "./components/Login";
import { UseAuth } from "./context/authProvider";

function App() {
  const { user } = UseAuth();
  return (
    <>
      {user ? (
        <div>
          <section>
            <Header></Header>
          </section>
          <div className="flex mt-4 gap-4">
            <Sidebar />
            <MessageContent />
          </div>
        </div>
      ) : (
        <Login></Login>
      )}
    </>
  );
}

export default App;
