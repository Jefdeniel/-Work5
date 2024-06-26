import moment from 'moment';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Event } from '../../../@types/Events';
import { TimeBlock } from '../../../@types/TimeBlock';
import {
  GET_DATE_FORMATS,
  GET_VIEW_FORMATS,
} from '../../../constants/calendar';
import useFetchedEvents from '../../../hooks/UseFetchedEvents';
import { SettingsContext } from '../../../store/SettingsContext';
import EventCard from '../../ui/EventCard/EventCard';
import AddEventModal from '../events/Modals/AddEventModal';
import EditEventModal from '../events/Modals/EditEventModal';
import CustomToolbar from './SmallComponents/CustomToolbar/CustomToolbar';
import TimeBlockCard from './SmallComponents/TimeBlockCard/TimeBlockCard';

import useFetch from '../../../hooks/useFetch';
import DeleteEventModal from '../events/Modals/DeleteEventModal';
import './BaseCalendar.scss';
import './Calendar.scss';

type Keys = keyof typeof Views;
const DnDCalendar = withDragAndDrop<Event | TimeBlock>(Calendar);
interface CalendarProps {
  onShowEventView: (event: Event) => void;
}

const STEP = 15;
const TIMESLOTS = 60 / STEP;

const id = 1;

const BaseCalendar = ({ onShowEventView }: CalendarProps) => {
  const { fetchData: deleteEvent } = useFetch('DELETE', [
    'events',
    id.toString() ?? '',
  ]);

  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [isSmallCalendarOpen, setIsSmallCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [newEventTimes, setNewEventTimes] = useState<{
    start: Date;
    end: Date;
  }>();

  const { events, timeBlocks, setEvents } = useFetchedEvents();

  const localizer = momentLocalizer(moment);
  const { week_start_day, weekend_visibility, time_format } =
    useContext(SettingsContext);

  useEffect(() => {
    const dateAndTimeFormats = GET_DATE_FORMATS(time_format);
    const customViewFormats = GET_VIEW_FORMATS(time_format);

    moment.updateLocale('es-es', {
      week: {
        dow: week_start_day === 'Monday' ? 1 : 0,
      },
      longDateFormat: dateAndTimeFormats,
      formats: customViewFormats,
    });
  }, [week_start_day, time_format, localizer]);

  // MODALS

  const handleOpenEditEventModal = () => {
    setShowEditEventModal(true);
  };

  const handleOpenAddEventModal = () => {
    setShowAddEventModal(true);
  };

  const closeEditEventModal = () => {
    setShowEditEventModal(false);
  };

  const closeAddEventModal = () => {
    setShowAddEventModal(false);
  };

  const handleDeleteEventModal = () => {
    setShowDeleteEventModal(true);
  };

  const closeDeleteEventModal = () => {
    setShowDeleteEventModal(false);
  };

  const components = useMemo(
    () => ({
      event: ({ event }: { event: Event | TimeBlock }) => {
        if ((event as TimeBlock).type === 'timeBlocker') {
          return <TimeBlockCard title={event.title} />;
        }
        return (
          <EventCard
            event={event as Event}
            color={(event as Event).color}
            onDoubleClick={handleOpenEditEventModal}
            onEdit={handleOpenEditEventModal}
            onDelete={handleDeleteEventModal}
          />
        );
      },
    }),
    []
  );

  const allEvents: (Event | TimeBlock)[] = useMemo(
    () => [...events, ...timeBlocks],
    [events, timeBlocks]
  );

  const initProps = useMemo(
    () => ({
      views: weekend_visibility
        ? [Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]
        : [Views.DAY, Views.WORK_WEEK, Views.MONTH, Views.AGENDA],
      defaultView: weekend_visibility ? Views.WEEK : Views.WORK_WEEK,
      onSelectSlot: ({ start, end }) => {
        setNewEventTimes({ start, end });
        setSelectedEvent(undefined);
        handleOpenAddEventModal();
      },
      onDoubleClickEvent: (event) => {
        setSelectedEvent(event);
        setNewEventTimes(undefined);
        handleOpenEditEventModal();
      },
      events: allEvents,
      style: { width: '100%', height: '100%' },
      components: components,
      selectable: true,
      format: time_format === '24H' ? 'HH:mm' : 'hh:mm A',
    }),
    [weekend_visibility, allEvents, time_format, components, onShowEventView]
  );

  const handleSearchFocus = () => {
    setIsSmallCalendarOpen(true);
  };

  const handleDateChange = (newDate: Date) => {
    if (newDate instanceof Date) {
      setDate(newDate);
      setIsSmallCalendarOpen(false);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredEvents = events.filter((event) =>
        event?.title?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filteredEvents);
    } else {
      setFilteredEvents([]);
    }
  };

  const handleEventClickForSearch = (event: Event) => {
    console.log('Event clicked: ', event);
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEventTimes({ start, end });
    handleOpenAddEventModal();
  };

  const handleDoubleClickEvent = (event: Event) => {
    setSelectedEvent(event);
    handleOpenEditEventModal();
  };

  return (
    <div className={'full-calendar'}>
      <CustomToolbar
        searchQuery={searchQuery}
        handleSearchInput={handleSearchInput}
        filteredEvents={filteredEvents}
        handleEventClick={handleEventClickForSearch}
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
        handleSearchFocus={handleSearchFocus}
        isSmallCalendarOpen={isSmallCalendarOpen}
        handleDateChange={handleDateChange}
      />

      {showDeleteEventModal && selectedEvent && (
        <DeleteEventModal
          event={selectedEvent}
          onClose={closeDeleteEventModal}
          onRemoveEvent={deleteEvent}
        />
      )}

      {showEditEventModal && selectedEvent && (
        <EditEventModal event={selectedEvent} onClose={closeEditEventModal} />
      )}
      {showAddEventModal && newEventTimes && (
        <AddEventModal
          start={newEventTimes.start.toISOString()}
          end={newEventTimes.end.toISOString()}
          onClose={closeAddEventModal}
          setEvents={setEvents}
        />
      )}

      <DnDCalendar
        {...initProps}
        selectable
        date={date}
        view={view}
        step={STEP}
        events={allEvents}
        toolbar={false}
        onView={setView}
        onNavigate={setDate}
        localizer={localizer}
        components={components}
        timeslots={TIMESLOTS}
        onSelectSlot={handleSelectSlot}
        style={{ width: '100%', height: '74%' }}
        onDoubleClickEvent={handleDoubleClickEvent}
        defaultView={weekend_visibility ? Views.WEEK : Views.WORK_WEEK}
      />
    </div>
  );
};

export default BaseCalendar;
