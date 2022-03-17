const express = require('express');
const http = require('http');
const {randomBytes} = require('crypto')
const app = express();

app.use(express.json());

http.createServer(app).listen(8080, () => {
    console.log('Server started on port 8080');
});

const users = {
    1234 : {
        id: 1234,
        username: 'Shubham',
        email: 'shubham999garg@gmail.com', 
        password: 'garg1234' 
    }
};

const notes = {
    1234 : [{
            title : 'First Title',
            content : 'First comment'
        },
        {
            title : 'Second Title',
            content : 'Second comment'
        }
    ]
};

app.post("/login", (req, res) => {
    //console.log(req.body);
    var {email, password} = req.body;
    var userEmail, userId, loginRes;
    for(var key in users){
        if(users[key].email !== email){
            loginRes = "Invalid username or password";
        }
        else if(users[key].password !== password){
            loginRes = "Invalid username or password";
        }
        else{
            userEmail = email;
            userId = users[key].id;
            res.status(200).json(users[userId]);
        }
    }
        res.status(209).send(loginRes);
        
});

app.post("/register", (req, res) => {
    //console.log(req.body);
    var {username, email, password} = req.body;
    var userEmail, userId;
    for(var key in users){
        if(users[key].email === email){
            userEmail = email;
            userId = users[key].id;
        }
    }
    if(!userEmail){
        const id = randomBytes(4).toString('hex');
        users[id] = {
        id,username,email,password
    }
    res.status(200).json(users[id]);
    }else{
        res.status(209).send('User already registered');
}
});


app.get('/notes/:id', (req, res) => {
    const posts = notes[req.params.id];
    //console.log(posts);
    if(posts){
       res.status(200).json(posts);
    }else {
        res.status(209);

    }
})

app.post('/notes/:id', (req, res) => {
    const content = {
        title: req.body.title,
        content: req.body.content
    };
    //console.log(content);
    if(notes[req.params.id]){
    notes[req.params.id].push(content);
    //console.log(notes);
    res.status(200).send(notes[req.params.id]);
    }
    else {
        notes[req.params.id] = [content];
        res.status(200).send(notes[req.params.id]);
    }
    //console.log(notes[req.params.id]);

});


app.delete('/notes/:userid/delete/:id', (req, res) => {

     let newNotes= notes[req.params.userid].filter((item, index) => {
         console.log(item, index, req.params.id);
        return index != req.params.id;
    });
    notes[req.params.userid] = newNotes;
    //console.log(newNotes);
    res.status(200).send(newNotes);

})

