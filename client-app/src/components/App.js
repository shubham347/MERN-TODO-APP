import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Notes from "./Notes";

    function App() {

        const isLoggedIn = Boolean(localStorage.getItem('logged_user'));
        console.log(isLoggedIn);

    return (
        <div> 
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/notes"  element={isLoggedIn ? <Notes /> : <Navigate from="/notes" to="/" /> } />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes> 
        </Router>
        </div>
    );
    }

export default App;


