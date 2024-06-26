import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';

import { GoogleEvent } from '../../../@types/Events';

import EventCard from '../../ui/EventCard/EventCard';
import Spinner from '../../ui/Loading/Spinner';

const GoogleEventCard = () => {
  const [googleEvents, setGoogleEvents] = useState<GoogleEvent[]>([]); // Explicitly typed as GoogleEvent[]
  const [loading, setLoading] = useState(false);

  const calendarID = import.meta.env.VITE_CALENDAR_ID;
  const apiKey = import.meta.env.VITE_API_KEY;

  const getEvents = (calendarID: string, apiKey: string) => {
    setLoading(true);
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response) => {
            let googleEvents = response.result.items as GoogleEvent[]; // Cast response items to GoogleEvent[]

            setGoogleEvents(googleEvents);
          },
          function (err) {
            console.error('Error fetching events:', err);
            setGoogleEvents([]); // Don't remove: clears events in case of error
          }
        );
    }
    gapi.load('client', initiate);
    setLoading(false);
  };

  useEffect(() => {
    getEvents(calendarID, apiKey);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <ul>
        {googleEvents.map((event) => (
          <EventCard
            key={event.id}
            isGoogleEvent={true}
            event={{
              title: event.summary || '',
              start_time: event.start?.date
                ? new Date(event.start.date)
                : new Date('No start date'),
              end_time: event.end?.date
                ? new Date(event.end.date)
                : new Date('No end date'),
              location: event.location || '',
              status: event.status || '',
              htmlLink: event.htmlLink || '',
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default GoogleEventCard;
