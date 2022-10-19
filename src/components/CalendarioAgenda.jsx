import React from 'react';
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import { localizer, getMessagesES } from './Agenda/helpers';
import { CalendarioEventoBox } from './Agenda/CalendarioEventoBox';
import { CalendarioModal } from './Agenda/CalendarioModal'


const locales = {
  'en-US': enUS,
}

const eventos = [{
  title: "Cumpleaños de Nacho",
  notes: "Comprar torta",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name:"Nacho"
  }
}]

export default function CalendarioAgenda() {

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week" );

  // Se podria utilizar un custom hook para no tener todo acá
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({event, start, end, isSelected});

    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white"
    }

    return (
      style
    )
  };

  const onDoubleClick = (event) => {
    console.log({doubleClick: event});
  };

  const onSelect = (event) => {
    console.log({click: event});
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event)
  };

  return (
    <>
      <div>CalendarioAgenda</div>

      <Calendar
        culture='es'
        localizer={localizer}
        events={eventos}
        defaultView = { lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 88px)" }}
        messages={ getMessagesES() }
        eventPropGetter = { eventStyleGetter }
        components= {{
          event: CalendarioEventoBox
        }}
        onDoubleClickEvent = { onDoubleClick }
        onSelectEvent = { onSelect }
        onView = {onViewChanged}
      />

      <CalendarioModal />
    </>
  )
}
