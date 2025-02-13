import { Request, Response } from "express";
import pool from "../database";

export const getAllEvents = async (_: Request, res: Response) => {
  try {
    const client = await pool.connect();

    const result = await client.query("SELECT * FROM events");
    const events = result.rows;

    client.release();
    
    res.status(200).json(events);
  } catch (error) {
    console.error("[GetAllEvents]: Error retrieving events: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single event by ID
export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM events WHERE event_id = $1", [id]);
    const event = result.rows[0];
    client.release();

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("[GetEventById]: Error retrieving event: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  const { event_name, odds } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO events (event_name, odds) VALUES ($1, $2) RETURNING *",
      [event_name, odds]
    );
    const newEvent = result.rows[0];
    client.release();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("[CreateEvent]: Error creating event: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an event by ID
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { event_name, odds } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE events SET event_name = $1, odds = $2 WHERE event_id = $3 RETURNING *",
      [event_name, odds, id]
    );
    const updatedEvent = result.rows[0];
    client.release();

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("[UpdateEvent]: Error updating event: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete an event by ID
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query("DELETE FROM events WHERE event_id = $1 RETURNING *", [id]);
    const deletedEvent = result.rows[0];
    client.release();

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("[DeleteEvent]: Error deleting event: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};