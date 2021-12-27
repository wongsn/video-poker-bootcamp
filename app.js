import express from 'express'
import cookieParser from 'cookie-parser'
import methodOverride from 'method-override'

const app = express()
app.use(express.urlencoded( { extended: false }))
app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use(cookieParser())

app.use('/static', express.static('public'))


app.get('/', (req,res)=> {

  res.render('index')

})

app.listen(3000)