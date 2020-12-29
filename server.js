let express = require('express')
let app = express()
let bodyParser = require('body-parser') // permet de parser les request
let session = require('express-session')

// Moteur de tempates
app.set('view engine', 'ejs')

// middleware
app.use('/assets' ,express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'adafdadf', // mise en place d'une clés secrète qui servira à chiffrer notre cookie
    resave:false,
    saveUninitialized: true, 
    cookie:  {secure: false} // car on ne traite pas avec de l'https
}))
app.use(require('./middlewares/flash'))

// Routes
app.get('/', (request, response) => {
        let Message = require('./models/message')
        Message.all(function (messages) {
       response.render('pages/index', {messages: messages} ) 
    })
})

app.get('/qsn', (request, response) => {
        
       response.render('pages/qsn' ) 
    
})

app.get('/contacteznous', (request, response) => {
        
       response.render('pages/contacteznous' ) 
    
})

app.get('/mag', (request, response) => {
        
       response.render('pages/mag' ) 
    
})



// que se passe t'il quand j'ai une une requete qui est envoyé
app.post('/', (request, response) => {

    // si elle est fausse, je la rentre dans l'erreur
        if ( request.body.message === undefined || request.body.message === '') 
            {
               
                request.flash('error', "vous n'avez pas posté de message")
                
                
                response.redirect('/')
                // sinon, je la stock dans un base de données
            } else {

                let Message = require('./models/message')
                Message.create(request.body.message, function () { 
                    request.flash('success', "Merci !")
                    response.redirect('/')
                })
            }
        
    })

app.get('/message/:id', (request, response) => {
    let Message = require('./models/message')
    Message.find(request.params.id, function (message) {
        response.render('messages/show', {message: message})
    })
})


app.listen(8080)

