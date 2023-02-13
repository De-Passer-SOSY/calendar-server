const knex = require("knex");

const db = knex({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "calendar-user",
        password: "calendar-pwd",
        database: "calendar-db"
    }
});

const express = require("express");

const app = express();
app.use(express.json());

app.get("/events", (request, response) => {
    db("events").select().then(events => {
        response.status(200).json(events);
    });
});

app.post("/create", (request, response) => {
    db("events").insert({ name: request.body.name, date: request.body.date, end: request.body.end,  })
        .then(() => { response.status(201).send() });
});

app.listen(3000);