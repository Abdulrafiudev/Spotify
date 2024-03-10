import express from "express"
import axios from "axios"
import body_parser from "body-parser"

let app = express()
let port = 3000
app.use(express.static(`public`))
app.use(body_parser.urlencoded({ extended: true }));

let your_token = "BQBxmP3aUieVaKwKxtCr5bsGou58eE2lrEm4uYD6odZ8Bmw6irqxx834dJJYMZKWMQ5x-jDAOFoXJGn-4romS8xueD7gmSjIkX_RIRr9OEPr5iOLsq8"


app.get(`/`, (req, res) => {
  res.render(`index.ejs`)
})

app.post(`/user`, async (req, res) => {
  try{
    let user_id = req.body.input
    let response = await axios.get(`https://api.spotify.com/v1/users/${user_id}`, {
      headers:{
        Authorization: `Bearer ${your_token}`
      }
    })
    let result = response.data
    console.log(result)
    res.render(`index.ejs`, {result})
  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {result: `Invalid user`})
  }
})




app.listen(port, () => {
  console.log(`Server is active at port ${port}`)
})
