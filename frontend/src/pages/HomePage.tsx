import { useEffect, useState } from "react";
import { useEventStore } from "../store/eventStore";
import BetModal from "../components/BetModal";
import LogoutButton from "../components/LogoutButton";
import { SportsEvent } from "../utils/types";
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";

const HomePage: React.FC = () => {
  const { events, loadEvents, loading, error } = useEventStore();
  const [selectedEvent, setSelectedEvent] = useState<SportsEvent | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadEvents(); // Fetch data using Zustand store
  }, []);

  const handlePlaceBet = (event: SportsEvent) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <Container maxWidth="lg" className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" className="flex-grow text-center font-bold">
          Sports Events
        </Typography>
        <LogoutButton />
      </div>

      {/* Loading & Error Handling */}
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography className="text-red-500 text-center">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={event.event_id}>
              <Card className="shadow-md rounded-lg">
                <CardContent className="flex flex-col gap-4">
                  <Typography variant="h6" className="font-semibold">
                    {event.event_name}
                  </Typography>
                  <Typography>Odds: {event.odds}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePlaceBet(event)}
                    className="w-full"
                  >
                    Place Bet
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Bet Modal */}
      {showModal && selectedEvent && (
        <BetModal event={selectedEvent} onClose={() => setShowModal(false)} />
      )}
    </Container>
  );
};

export default HomePage;
