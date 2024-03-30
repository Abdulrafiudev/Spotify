import express from "express"
import axios from "axios"
import body_parser from "body-parser"
import env from "dotenv"

let app = express()
let port = 3000
app.use(express.static(`public`))
app.use(body_parser.urlencoded({ extended: true }));

env.config()

let clientID = process.env.CLIENT_ID
let clientSecret = process.env.CLIENT_SECRET


async function get_token(){
  try{
    let response =await axios.post(`https://accounts.spotify.com/api/token`, {client_id: clientID, client_secret: clientSecret, grant_type: "client_credentials"}, {
      headers:{
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    })
    let result = response.data
    let your_token = result.access_token
    console.log(result)
    console.log(your_token)
    return your_token
    
  }
 
  catch(error){
     console.error(`Failed to get access token`)
  }
}




app.get(`/`, async (req, res) => {

      res.render(`index.ejs`)
})

app.post(`/user`, async (req, res) => {
  try{
    let user_id = req.body.input
    
    let response = await axios.get(`https://api.spotify.com/v1/users/${user_id}`, {
      headers:{
        Authorization: `Bearer ${await get_token()}`
      }
    })
    let result = response.data
    console.log(result)
    res.render(`information.ejs`, {result})
  }
  catch(error){
    console.error(`Failed to make request`, error.message)
    res.render(`index.ejs`, {error: `Invalid user`})
  }
})




app.listen(port, () => {
  console.log(`Server is active at port ${port}`)
})
