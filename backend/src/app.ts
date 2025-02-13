import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from "./controllers/event";
import * as auth from "./controllers/auth";
import authGuard from "./middleware/authGuard";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post("/auth/register", auth.register);
app.post("/auth/login", auth.login);

app.get("/api/events", authGuard, getAllEvents);
app.get("/api/events/:id", authGuard, getEventById);
app.post("/api/events", authGuard, createEvent);
app.put("/api/events/:id", authGuard, updateEvent);
app.delete("/api/events/:id", authGuard, deleteEvent);


export default app;