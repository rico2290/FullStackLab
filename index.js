const express = require('express')
const axios = require('axios')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine','ejs' )
app.use(bodyParser.urlencoded({extended: true}))


const port = process.env.port || 3000 

app.get('/', async(request, response) => {
    const content = await axios.get('https://fullstacklab-6b9bb.firebaseio.com/teste.json')
    console.log(content.data)
    response.render('index', {i: content.data})
})
//renderizar para nova pagina
app.get('/categorias/nova', (req, res)=>{
    res.render('categorias/nova')
})

app.post('/categorias/nova', async(req, res)=>{
    //console.log(req.body)
    await axios.post('https://fullstacklab-6b9bb.firebaseio.com/categorias.json', {
        categoria: req.body.categoria})
    res.send(req.body)
})
 

app.listen(port, (erro) => {
    if(erro){
        console.log('Ops! deu erro')
    }else{
        console.log('FullStackLab server is running on port:',port)
    }
})