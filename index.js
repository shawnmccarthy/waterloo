import express from "express"; //importing a module
const app = express(); //creating an expres app
const { PORT = 3000 } = process.env; //try to get to the PORT from environment variable else use 3000
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data.js";

app.use(bodyParser.json()).use(cors())

app.get("/", (request, response) =>
    response.send("Hello World, Waterloo!")
);

app.get("/api/v1/doctors", (req, res) => {
        res.json(data.doctors);
    }
);

app.get("/api/v1/doctors/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const doctor = data.doctors.find((doc) => doc.id === id);
        if (!doctor) {
            res.status(404).json({error: "Doctor not found."});
        }
        return res.json(doctor);
    }
);

app.get("/healthcheck", (req, res) => {
   let healthcheck = {
       uptime: process.uptime(),
       message: "OK",
       timestamp: Date.now()
   }

   try {
       res.send(healthcheck);
   }catch(error) {
       healthcheck.message = error;
       res.status(503).send(healthcheck);
   }
});

app.listen(PORT, () =>
    console.log(`Hello World, I'm listening http://localhost:${PORT}/`)
);

export default app; // for testing purposes only
