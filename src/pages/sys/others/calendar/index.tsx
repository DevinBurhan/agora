import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
//  fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayjs from 'dayjs';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Card from '@/components/card';
import { useAppointmentListApi, useDeleteAppointment } from '@/states/appointment/appointment.hook';
import { useSettings } from '@/store/settingStore';
import { useResponsive } from '@/theme/hooks';

import CalendarEvent from './calendar-event';
import CalendarEventForm, { CalendarEventFormFieldType } from './calendar-event-form';
import CalendarHeader, { HandleMoveArg, ViewType } from './calendar-header';
import { StyledCalendar } from './styles';

const DefaultEventInitValue = {
  id: '',
  title: '',
  description: '',
  doctorId: '',
  coHostId: '',
  start: dayjs(),
  end: dayjs(),
  color: '',
};

export default function Calendar() {
  const fullCalendarRef = useRef<FullCalendar>(null);
  const [view, setView] = useState<ViewType>('dayGridMonth');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const { themeMode } = useSettings();
  const { screenMap } = useResponsive();
  const [searchData, setSearchData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesize, setPagesize] = useState(100);
  const [calEventsArr, setCalEventsArr] = useState<any[]>([]);
  const params = {
    page: currentPage,
    limit: pagesize,
    search: searchData,
  };
  const { data: appointmentResp, refetch } = useAppointmentListApi(params);
  const [eventInitValue, setEventInitValue] =
    useState<CalendarEventFormFieldType>(DefaultEventInitValue);
  const [eventFormType, setEventFormType] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    if (appointmentResp) {
      const events: EventInput[] = appointmentResp.appointment_list.map((item) => ({
        id: item.appointment_id,
        title: item.name,
        start: dayjs(item.schedule_date_time).toISOString(),
        end: dayjs(item.schedule_date_time).endOf('day').toISOString(),
        color: '#00b8d9',
        doctorId: item.doctor_id.user_id,
        coHostId: item.co_host_id.user_id,
        description: item.description,
      }));
      setCalEventsArr(events);
      fullCalendarRef.current!.getApi().addEventSource(events);
    }
  }, [appointmentResp]);

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

  // select date range
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    setOpen(true);
    setEventFormType('add');
    setEventInitValue({
      id: '',
      title: '',
      description: '',
      doctorId: '',
      coHostId: '',
      start: dayjs(selectInfo.startStr),
      end: dayjs(selectInfo.endStr),
      allDay: selectInfo.allDay,
    });
  };

  // click event and open modal
  const handleEventClick = (arg: EventClickArg) => {
    const { title, extendedProps, allDay, start, end, backgroundColor, id } = arg.event;
    setOpen(true);
    setEventFormType('edit');
    const newEventValue: CalendarEventFormFieldType = {
      id,
      title,
      allDay,
      doctorId: extendedProps.doctorId,
      coHostId: extendedProps.coHostId,
      color: backgroundColor,
      description: extendedProps.description,
    };
    if (start) {
      newEventValue.start = dayjs(start);
    }

    if (end) {
      newEventValue.end = dayjs(end);
    }
    setEventInitValue(newEventValue);
  };

  // on success create/edit api refetch list api
  const handleSuccess = () => {
    refetch();
    handleCancel();
  };

  const { mutate: deleteMutate } = useDeleteAppointment(handleSuccess);

  const handleCancel = () => {
    setEventInitValue(DefaultEventInitValue);
    setOpen(false);
    setEventFormType('add');
  };

  // delete event
  const handleDelete = async (valId: string) => {
    if (valId) {
      await deleteMutate({ id: valId });
    }
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
            events={calEventsArr}
            eventContent={CalendarEvent}
            editable
            selectable
            selectMirror
            dayMaxEvents
            headerToolbar={false}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />
        </StyledCalendar>
      </div>
      <CalendarEventForm
        open={open}
        type={eventFormType}
        initValues={eventInitValue}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onSuccessForm={handleSuccess}
      />
    </Card>
  );
}
