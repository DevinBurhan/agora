import type { EventContentArg } from '@fullcalendar/core';

export default function CalendarEvent(eventInfo: EventContentArg) {
  const { timeText, event, backgroundColor } = eventInfo;

  return (
    <div
      className="fc-event-main-wrapper px-2"
      style={{
        color: backgroundColor,
      }}
    >
      <div className="fc-event-main-frame">
        <div className="fc-event-time mr-1">{timeText}</div>
        <div className="fc-event-title-container">
          <div className="fc-event-title fc-sticky">{event.title}</div>
        </div>
      </div>
    </div>
  );
}
