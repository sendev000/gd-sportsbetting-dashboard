import axios from "axios";
import { SportsEvent } from "../utils/types";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const API_BASE_URL = `${import.meta.env.VITE_WEB_SERVER_URL}/api`;

/**
 * Fetch sports events from the backend.
 * Handles API errors gracefully.
 */
export const fetchEvents = async (): Promise<SportsEvent[]> => {

  try {
    const response = await axiosInstance.get("/events");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching events:", error);

    // Check if error is a network issue
    if (!error.response) {
      toast.error("Network error! Please check your internet connection.");
    } else if (error.response.status >= 500) {
      toast.error("Server error! Please try again later.");
    } else if (error.response.status === 404) {
      toast.error("Events not found.");
    } else {
      toast.error("Failed to fetch events. Please try again.");
    }

    return []; // Return an empty array as fallback
  }
};