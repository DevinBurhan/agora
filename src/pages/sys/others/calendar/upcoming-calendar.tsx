import { EventClickArg, EventInput } from '@fullcalendar/core';
//  fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayjs from 'dayjs';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Card from '@/components/card';
import { useUpcomingAppointmentApi } from '@/states/appointment/appointment.hook';
import { useUserInfo } from '@/store/authStore';
import { useSettings } from '@/store/settingStore';
import { useResponsive } from '@/theme/hooks';

import CalendarEvent from './calendar-event';
import CalendarEventDetail, { CalendarEventDataType } from './calendar-event-detail';
import CalendarHeader, { HandleMoveArg, ViewType } from './calendar-header';
import { StyledCalendar } from './styles';

const DefaultEventInitValue = {
  appointment_id: '',
  name: '',
  co_host_id: '',
  description: '',
  is_co_host: false,
  schedule_date_time: dayjs(),
};

export default function UpcomingCalendar() {
  const fullCalendarRef = useRef<FullCalendar>(null);
  const [view, setView] = useState<ViewType>('dayGridMonth');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const { themeMode } = useSettings();
  const { screenMap } = useResponsive();
  const [calEventsArr, setCalEventsArr] = useState<any[]>([]);
  const { id: userId } = useUserInfo();
  const { data: appointmentResp } = useUpcomingAppointmentApi();
  const [eventInitValue, setEventInitValue] =
    useState<CalendarEventDataType>(DefaultEventInitValue);

  useEffect(() => {
    if (appointmentResp) {
      const events: EventInput[] = appointmentResp.map((item) => ({
        id: item.appointment_id,
        title: item.name,
        start: dayjs(item.schedule_date_time).toISOString(),
        end: dayjs(item.schedule_date_time).endOf('day').toISOString(),
        color: '#00b8d9',
        doctorId: item.is_co_host === false ? userId : item.co_host_id.user_id,
        coHostId: item.is_co_host === true ? item.co_host_id.user_id : userId,
        description: item.description,
      }));
      setCalEventsArr(events);
      fullCalendarRef.current!.getApi().addEventSource(events);
    }
  }, [appointmentResp, userId]);

  useEffect(() => {
    if (screenMap.xs) {
      setView('listWeek');
    }
  }, [screenMap]);

  /* calendar header events */
  const handleMove = (action: HandleMoveArg) => {
    const calendarApi = fullCalendarRef.current!.getApi();
    switch (action) {
      case 'prev':
        calendarApi.prev();
        break;
      case 'next':
        calendarApi.next();
        break;
      case 'today':
        calendarApi.today();
        break;
      default:
        break;
    }
    setDate(calendarApi.getDate());
  };
  const handleViewTypeChange = (view: ViewType) => {
    setView(view);
  };

  useLayoutEffect(() => {
    const calendarApi = fullCalendarRef.current!.getApi();
    setTimeout(() => {
      calendarApi.changeView(view);
    });
  }, [view]);

  // click event and open modal
  const handleEventClick = (arg: EventClickArg) => {
    const { id } = arg.event;
    const selectedData: any =
      appointmentResp && appointmentResp.find((val) => val.appointment_id === id);
    const newEventValue: CalendarEventDataType = {
      appointment_id: id,
      name: selectedData.name,
      co_host_id: selectedData.co_host_id,
      description: selectedData.description,
      is_co_host: selectedData.is_co_host,
      schedule_date_time: selectedData.schedule_date_time,
    };
    setEventInitValue(newEventValue);
    setOpen(true);
  };

  const handleCancel = () => {
    setEventInitValue(DefaultEventInitValue);
    setOpen(false);
  };

  return (
    <Card className="h-full w-full">
      <div className="h-full w-full">
        <StyledCalendar $themeMode={themeMode}>
          <CalendarHeader
            now={date}
            view={view}
            onMove={handleMove}
            onCreate={() => setOpen(true)}
            onViewTypeChange={handleViewTypeChange}
          />
          <FullCalendar
            ref={fullCalendarRef}
            timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialDate={date}
            initialView={screenMap.xs ? 'listWeek' : view}
            events={calEventsArr ?? []}
            eventContent={CalendarEvent}
            editable={false}
            selectable={false}
            selectMirror
            dayMaxEvents
            headerToolbar={false}
            eventClick={handleEventClick}
          />
        </StyledCalendar>
      </div>
      <CalendarEventDetail open={open} data={eventInitValue} onCancel={handleCancel} />
    </Card>
  );
}
