import express from 'express';
import dotenv from "dotenv";
import logger from './logger.js';
import morgan from 'morgan';

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
  
        };
        logger.info(JSON.stringify(logObject));
      }
    }
  }));

let courseData = []
let newId = 1

app.post("/putdata", (req, res) => {
    const { courseName, coursePrice } = req.body
    const newData = {
        courseId: newId++,
        name: courseName,
        price: coursePrice
    }
    courseData.push(newData)
    res.status(200).send(newData)
})

app.get("/data/:id", (req, res) => {
    const data = courseData.find(data => data.courseId === parseInt(req.params.id))
    if (!data) {
        return res.status(404).send("Course not found")
    }
    return res.status(200).send(data)
})

app.put("/update/:id", (req, res) => {
    const id = req.params.id
    const data = courseData.find((data) => data.courseId === parseInt(id))
    if (!data) {
        return res.status(404).send("Course not found")
    }
    data.price = 499
    return res.status(200).send(data)
})

app.delete("/data/remove/:id", (req, res) => {
    const id = req.params.id;
    const data = courseData.find(data => data.courseId === parseInt(id))
    if (!data) {
        return res.status(404).send("Something went wrong")
    }
    courseData.splice(id, 1)
    return res.status(200).send("Data is deleted successfully")
})

app.get("/", (req, res) => {
    res.send(courseData)
})

app.get("/login", (req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.json("It is a login route")
})

app.get("/logout", (req, res) => {
    res.send("It is a logout route")
})

app.listen(port, () => {
    console.log(`Server is listining on port: ${port} ...`);
})