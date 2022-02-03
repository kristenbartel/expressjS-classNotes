// clients are the browsers on various screens and devices these clients send requests to servers for a response. Servers send a response status 200 OK with requested data in form of OBJECT-- the server is always listening and waiting for the client request. Express can build a server by requiring a module, invoke the module, then use methods for GET and POST-- posts rely on callback functions that are BUILT IT-- so read about them here-- https://expressjs.com/

//if your project requires a package, first thing is install the dependencies. For example here we have run >> npm install express --save

// to run this- >>node filname and Then, load http://localhost:port#/ in a browser to see the output.

// place the server you created in Postman-- send and ensure it is running. Postman is the first place to check if a project throws an error

//app.post and app.listen are methods 

// Routing refers to HOW an application responds to the client request-- these are common routing methods and they take this syntax >> app.METHOD(PATH, HANDLER) Where:
        // app is an instance of express.
        // METHOD is an HTTP request method, in lowercase.
        // PATH is a path on the server.
        // HANDLER is the function executed when the route is matched.

const express = require('express')
const app = express()
const port = 3000
const friendsArray = require('./db') //>> ./ means this folder
console.log(friendsArray)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// this is an app that should be put in another file, but it was created here during class as part of the demo
app.get('/friends', (req, res) => {
        let htmlData = `<ul>`;
        for (let friend of friendsArray) {
            htmlData += `<li>
            <a href="/friends/${friend.handle}">${friend.name}</a>
            </li>`
        }
        htmlData += `<ul>`
        res.send(htmlData);
})
// the colon is the symbol that tells jS to expect a parameter- in this case 
app.get('/friends/:handle', (req, res) => {
    const {handle} = req.params;
    console.log('handle is', handle, req.params)
    const friend = friendsArray.find(friend => friend.handle === handle);
    // res.send(`<h1>${handle}</h1>`)
    if (friend) {
        let htmlData = ``;
        htmlData += `<h1>${friend.name}</h1>`;
        htmlData += `<h2>${friend.handle}</h2>`;
        res.send(htmlData);
    } else {
        res.status(404).send(`No friend with handle ${handle}`)
    }
})


app.get('/kristen', (req, res) => {
    res.send(`this is kristen's first get route`)
})



// serves static files such as images, css files, and JavaScript files, use the express.static built-in middleware function in Express. This is a very basic way to bring in static files 
app.use(express.static('public'))
// here is another way
// app.get('/django', (req, res) => {
//     res.sendFile()
// })

// below are additional routing methods

app.post('/', function (req, res) {
    res.send('Got a POST request')
  })

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
  })

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })

// listen must go below all other methods for routing
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



        

