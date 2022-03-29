import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import './App.css';
import { reducer, initialState } from './reducers/userReducer';
import OtherUserProfile from "./pages/OtherUserProfile";
import Postsfromfollowing from "./pages/Postsfromfollowing";

export const UserContext = createContext();

const CustomRouting = () => {
  

  const Navigate = useNavigate ();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch({ type: "USER", payload: userInfo });
      //Navigate('/');//user logged in so redirect to home
    } else {
      Navigate('/login');
    }
  }, []);//called when component mounts and get called only once

  return (
    <Routes>
       <Route exact path="/" element={<Home/>} />
       <Route exact path="/login" element={<Login/>} />
       <Route exact path="/signup" element={<Signup/>} />
       <Route exact path="/profile/:userId" element={<Profile/>} />
       <Route exact path="/create-post" element={<CreatePost/>}/> 
       <Route exact path="/postsfromfollowing" element={<Postsfromfollowing/>} />
      
      
  
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
      <BrowserRouter>
        <NavBar />
        <CustomRouting />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
