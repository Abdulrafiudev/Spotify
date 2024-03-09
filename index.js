import express from "express"
import axios from "axios"
import body_parser from "body-parser"

let app = express()
let port = 3000
app.use(express.static(`public`))
app.use(body_parser.urlencoded({ extended: true }));


app.get(`/`, (req, res) => {
  res.render(`index.ejs`)
})




app.listen(port, () => {
  console.log(`Server is active at port ${port}`)
})
