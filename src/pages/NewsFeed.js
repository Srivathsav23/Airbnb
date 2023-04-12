import React, { useState, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { type } from '@testing-library/user-event/dist/type';
import './Calendar.css';
import Header from '../component/Header';
import detectAnomalies from '../component/dbscan';

function csvprocess(csvData) {
  const lines = csvData.split("\n");
  const result = [];
  const headers = lines[0].split(",");
  headers[headers.indexOf('Sampling Date')] = 'date';
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }

    result.push(obj);
  }

  return result;
}

function displayCalendar(jsonData) {
  function checkpred(pred) {
    return pred.predictions == 1;
  }
  function checkanom(pred) {
    return pred.predictions == -1;
  }
  console.log(jsonData[jsonData.length - 2]);
  let anomalies = jsonData;
  let jsonData1 = jsonData.filter(checkpred);
  anomalies = anomalies.filter(checkanom);
  console.log(jsonData1);
  console.log(anomalies);
  let calendarx =
  {
    initialView: 'dayGridMonth',
    fixedWeekCount: false,
    height: 'auto',
    validRange: {
      start: jsonData[0].date,
      end: jsonData[jsonData.length - 2].date
    },
    initialDate: jsonData[0].date,
    events: jsonData1.map(event => ({
      title: "NO2 : " + event.NO2,
      start: event.date,
      allDay: true
    }))
  };



  let newEvents = anomalies.map(event => ({
    title: " NO2 : " + event.NO2,
    start: event.date,
    allDay: true,
    eventDisplay: 'list-item',
    backgroundColor: 'red'
  }));
  for (let i in newEvents)
    (calendarx.events).push(newEvents[i]);
  return calendarx;
}

const Feed = () => {

  let [events, setEvents] = useState([]);

  const submitBtn = async (event) => {
    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = async () => {
      const csvData = fileReader.result;
      const jsonData = csvprocess(csvData);
      console.log(jsonData);
      let eventData = displayCalendar(jsonData);
      console.log(eventData.events);
      eventData = eventData.events;
      console.log(eventData);
      setEvents(eventData);
    };
  };

  return (
    <>
      <label for="csvFile" className='text-white'>Upload a CSV File:</label>
      <br />
      <input type="file" id="csvFile" accept=".csv" onChange={submitBtn} className='text-white' />
      <FullCalendar
        plugins={[dayGridPlugin]}
        fixedWeekCount={false}
        initialView="dayGridMonth"
        events={events}
      />
    </>
  );
};

export default Feed;