const express = require("express")
const morgan = require("morgan")

const app = express()
app.use(express.json())

morgan.token("reqBody",(req)=>{return JSON.stringify(req.body)})

app.use(morgan(":method :url :status :res[content-length] :reqBody - :response-time ms")
);



const persons = [ 
    { 
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    { 
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523" 
    },
    { 
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    { 
        id: 4,
        name: "Mary Poppendy",
        number: "39-23-6423122"
    }
]


const infoPersons = persons.length



//Ejercicio 0
app.get("/", (request, response) => { 
    response.send("<h1>Hello world</h1>")
})

//Ejercicio 1
app.get("/api/persons", (req, resp) => { 
     resp.json(persons)
 })

 //Ejercicio 2
app.get("/info", (req, resp) =>{ 
resp.send(`Phonebook has info for ${infoPersons} people  ${new Date()}`)
})

 //Ejercicio 3
 app.get("/api/persons/:id", (req, resp) =>{ 
    const { id } = req.params
    const person = persons.find(item => item.id === Number(id))
     if (person) {
         resp.json(person)
        } else {
            resp.status(404).end()
        }
    })


//Ejercicio 4
app.delete("/api/persons/result/:id", (req, resp) => {

    const { id }  = req.params
    const resultPersons = persons.filter(item => item.id !== Number(id))
    resp.json(resultPersons)
        
})


   //Ejercicio 5 y 6



app.post("/api/persons/",(req,resp)=>{
    
    const newPerson = req.body
    
    newPerson.id = Number(Math.random()*100)

    const newEnter = persons.some(item => item.name === newPerson.name)
    if(newEnter){
       
        resp.status(404).json("Ese nombre ya está registrado, ingrese otro nombre")
    
    } else if(newPerson.number === undefined){
        
        resp.status(404).json("Ingresa un número")

    } else{
    
        const newPersons = persons.concat(newPerson)
        resp.json(newPersons)

    }

})




const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost: ${PORT}`)
 })