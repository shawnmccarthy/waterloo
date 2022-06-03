import express from "express"; //importing a module
const app = express(); //creating an expres app
const { PORT = 3000 } = process.env; //try to get to the PORT from environment variable else use 3000
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data.js";
import * as utilities from "./utils/functions.js"
import {isInvalidId} from "./utils/functions.js";

app.use(bodyParser.json()).use(cors())

app.get("/", (request, response) =>
    response.send("Hello World, Waterloo!")
);

app.get("/api/v1/doctors", (req, res) => {
        res.json(data.doctors);
    }
);

app.get("/api/v1/doctors/:id", (req, res) => {
        if (utilities.isInvalidId(req.params.id)) {
            return res.status(400).json({ error: "Invalid id." })
        }
        const id = parseInt(req.params.id);
        const doctor = data.doctors.find((doc) => doc.id === id);
        if (!doctor) {
            res.status(404).json({error: "Doctor not found."});
        }
        return res.json(doctor);
    }
);

app.post("/api/v1/doctors", (req, res) => {
        if (!req.body.name) {
            return res.status(400).json({error: "Doctor needs a name parameter."});
        }
        const nextId = data.doctors.length + 1;
        const doctor = { id: nextId, name: req.body.name };
        data.doctors.push(doctor);
        res.status(201).json(doctor); // 201 == resource created
    }
)

app.get("/api/v1/visits", (req,res) => {
        const { doctorid, patientid } = req.query; // localhost:3000/api/v1/visits?patientid=1
        let visits = data.visits;
        if (doctorid) {
            visits = visits.filter(
                (visit) => visit.doctorid === parseInt(doctorid, 10)
            );
        }
        if (patientid) {
            visits = visits.filter(
                (visit) => visit.patientid === parseInt(patientid, 10)
            );
        }
        return res.json(visits)
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
