import { useState } from 'react';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { CalendarEvent } from '../../../@types/CalendarEvents';
import BaseCalendar from './BaseCalendar';
import EventModal from '../../ui/EventModal/EventModal';

import './Calendar.scss';

// Calendar 2: View on base calendar
const BigCalendar = () => {
  // Event is gonna be used to show the event view of the clicked event
  const [event, setEvent] = useState<CalendarEvent>();

  return (
    <div className="full-calendar">
      <BaseCalendar
        onShowEventView={(event) => {
          setEvent(event);
        }}
      />

      {event && (
        <EventModal
          showEvent={true}
          event={event}
          titleValue=""
          descriptionValue=""
          onClose={() => setEvent(undefined)}
        />
      )}
    </div>
  );
};

export default BigCalendar;
