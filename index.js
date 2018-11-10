const express = require ('express')
const app = express()
const axios = require ('axios')
const bodyparser = require ('body-parser')


app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({extended:true}))

const port = process.env.port || 3000 

//let i = 10
app.get('/', async(request, response) => {
    const content = await axios.get('https://fullstacklab-6b9bb.firebaseio.com/teste.json')
    await axios.post('https://fullstacklab-6b9bb.firebaseio.com/categorias.json',{categoria: 'Receitas'})
    console.log(content.data)
    response.render('index',{i: content.data})
})

app.get('/categorias/nova', (req, res)=>{
    res.render('categorias/nova')
})
app.post('/categorias/nova', async(req, res)=>{
    await axios.post('https://fullstacklab-6b9bb.firebaseio.com/categorias.json',{categoria: req.body.categoria})
    //console.log(req.body)
    res.send(req.body)
})
app.listen(port, (error)=>{
    if (error) {
        console.log('Opá!!! deu erro')
    }
    console.log('FullStack Server is running on port:',port)
})
