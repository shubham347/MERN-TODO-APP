import React, { useState, useEffect } from "react";
import { StyledEngineProvider } from '@mui/material/styles';
import ResponsiveDrawer from './Header';
import Footer from "./Footer";
import Note from "./Note";
import "../Styles/Notes.css";
import CreateArea from "./CreateArea";
import axios from "axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [displayFlag, setDisplayFlag] = useState(false);


  useEffect(() => {
    const user = localStorage.getItem('logged_user');
    console.log('UserData ',JSON.parse(user).id);
    const userId = JSON.parse(user).id;
    console.log(userId);

    axios.get(`/notes/${userId}`)
    .then((response) => {
        if(response.status === 200) {
        setNotes(response.data);
        }
        else {
          setNotes([]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  
  function addNote(newNote) {
    const user = localStorage.getItem('logged_user');
    //console.log('UserData ',JSON.parse(user).id);
    const userId = JSON.parse(user).id;
    //console.log(userId);

    axios.post(`/notes/${userId}`, newNote)
    .then(response => {
      setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    })
    .catch(err => {
      console.log(err);
    })
  }

  function deleteNote(id) {
    
    const user = localStorage.getItem('logged_user');
    // console.log('UserData ',JSON.parse(user).id);
    const userId = JSON.parse(user).id;
    // console.log(userId);
    // console.log(id);

    axios.delete(`/notes/${userId}/delete/${id}`)
    .then(response => {
        setNotes(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <StyledEngineProvider>
            <ResponsiveDrawer />
      </StyledEngineProvider>
      <div>
      <h3 style={{margin: '0 auto 0 520px' }}>To Do</h3>
      <button className="add-btn" onClick={() => {setDisplayFlag(true)}}>+</button>
      {displayFlag &&
      <CreateArea onAdd={addNote} />}
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      </div>
      <Footer />
    </div>
  );
}


export default Notes;