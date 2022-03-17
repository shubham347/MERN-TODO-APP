import React, { useState } from "react";
import useForm from "./useForm";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Form(props) {

  const [isLoggedIn, SetIsLogedIn] = useState();
  const navigate = useNavigate();
  
    const formLogin = () => {

        // console.log("Callback function when form is submitted!");
        // console.log("Form Values ", values);
        // console.log("Error Values ", errors);
         
        props.isRegistered ? 
            axios.post('/login', values)
            .then(res => {
              if(res.status === 200){
                SetIsLogedIn(true);
                localStorage.setItem('logged_user', JSON.stringify(res.data));
                navigate('/notes');
              }      
              else{
                SetIsLogedIn(false);
                localStorage.removeItem('logged_user');
                alert(res.data);
              }      
            })
            .catch(err => console.log("err ",err))
         :
          axios.post('/register', values)    
          .then(res => {
          if(res.status === 200){
            SetIsLogedIn(true);
            localStorage.setItem('logged_user', JSON.stringify(res.data));
            alert("User Registered");
            navigate('/');
          }      
          else{
            SetIsLogedIn(false);
            localStorage.removeItem('logged_user');
            alert('User already reistered');
          }      
        })
         .catch(err => console.log(err))
      
         
      }
      
      //Custom hook call  
      const {handleChange, values, errors, handleSubmit} = useForm(formLogin);
      

  return (
    <form className="form" onSubmit={handleSubmit}>
      {!props.isRegistered && (
        <input onChange={handleChange} type="text" minLength='1' name="username" value={values.username} placeholder="Full Name" required />
      )}
      <input onChange={handleChange} type="email" name="email" placeholder="E-mail" values={values.email}  required  />
      <input onChange={handleChange} minLength='8' type="password" name="password" values={values.password}  placeholder="Password" required />
      <p style={{ color: "red"}}>{errors.email}</p>
      <button type="submit">{props.isRegistered ? "Login" : "Register"}</button>
    </form>
  );
}   

export default Form;
