import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';
import Header from '../component/Header';
import detectAnomalies from '../component/dbscan';
import { ConstructionOutlined } from '@mui/icons-material';
import ScatterPlot from '../component/scatter';

function csvprocess(csvData) {
  const lines = csvData.split("\r\n");
  const result = [];
  const headers = lines[0].split(",");
  headers[headers.indexOf('Sampling Date')] = 'date';
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      if (headers[j] == 'date')
        obj[headers[j]] = currentLine[j];
      else
        obj[headers[j]] = parseFloat(currentLine[j]);
    }

    result.push(obj);
  }

  return result;
}

function checkpred(pred) {
  return pred.prediction == 1;
}

function checkanom(pred) {
  return pred.prediction == -1;
}
function displayCalendar(jsonData, choice) {

  let anomalies = jsonData;
  let jsonData1 = jsonData.filter(checkpred);
  anomalies = anomalies.filter(checkanom);
  console.log(jsonData1);
  console.log(anomalies);
  let selGas;
  if (choice == "0")
    selGas = "NO2"
  else if (choice == "1")
    selGas = "SO2"
  else if (choice == "2")
    selGas = "RSPM/PM10"
  else if (choice == "3")
    selGas = "SPM"
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
      title: selGas + " : " + event[selGas],
      start: event.date,
      allDay: true
    }))
  };



  let newEvents = anomalies.map(event => ({
    title: selGas + " : " + event[selGas],
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
  let [startDate, setStartDate] = useState();
  let [events, setEvents] = useState([]);
  let [csvData, setCsvData] = useState([]);
  let [selectedValue, setSelectedValue] = useState("0");
  let [mostRecentSelectedValue, setMostRecentSelectedValue] = useState("0");
  const [showPlot, setShowPlot] = useState(false);
  let [ogcsv, setOgCsv] = useState();

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };

  useEffect(() => {
    setMostRecentSelectedValue(selectedValue);
    console.log("Selected option changed to:", selectedValue);
    const file = new File([ogcsv], 'data.csv', { type: 'text/csv' });
    const eventx = { target: { files: [file] } };
    submitBtn(eventx);

  }, [selectedValue]);

  const handleShowPlot = () => {
    setShowPlot(true);
  };

  const handleClosePlot = () => {
    setShowPlot(false);
  };

  let olddata = localStorage.getItem('formdata')
  let oldArr = JSON.parse(olddata)
  let profileData;
  oldArr.map(arr => {
    if (arr.email == sessionStorage.getItem('@user')) {
      profileData = arr;
    }
  });
  oldArr = oldArr.map(arr => (arr.email != sessionStorage.getItem('@user')));

  const submitBtn = (event) => {

    const file = event.target.files[0];
    console.log(file);
    setOgCsv(file);
    console.log(selectedValue);

    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      const csvDatax = fileReader.result;
      console.log(csvDatax);
      const data = csvprocess(csvDatax);
      const updateData = detectAnomalies(data, selectedValue);
      setCsvData(updateData);

      profileData.data = [];
      profileData.data.push(updateData);
      oldArr.push(profileData);
      localStorage.setItem('formdata', JSON.stringify(oldArr));

      let eventData = displayCalendar(updateData, selectedValue);
      eventData = eventData.events;
      console.log(eventData);
      setEvents(eventData);
      setStartDate(eventData[0].start)
    };

  };


  const handleGoTo = () => {
    const firstEvent = events[0];
    console.log(firstEvent);
    if (firstEvent) {
      const firstDate = new Date(firstEvent.start);
      calendarRef.current.getApi().gotoDate(firstDate);
    }
  };

  const calendarRef = React.createRef();

  const downloadCSV = () => {
    let csvRows = [];
    let headers = Object.keys(csvData[0]);
    csvRows.push(headers.join(','));
    for (let row of csvData) {
      let values = headers.map(header => {
        let val = row[header]
        return `${val}`;
      });
      csvRows.push(values.join(','));
    }
    let data = csvRows.join('\r\n');
    console.log(data);
    const csvContent = "data:text/csv;charset=utf-8," + data;
    //csvData.map(row => console.log(row));

    const encodedURI = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", "output.csv");
    document.body.appendChild(link);
    link.click();
  }


  return (
    <>
      <Header />
      <div className="flex flex-col bg-white min-w-0 break-words ml-10 mt-5 pt-5 pl-5 mb-6 pb-5 shadow-xl rounded-lg" style={{ width: 'fit-content' }}>
        <label for="csvFile">Upload a CSV File:</label>
        <input type="file" id="csvFile" accept=".csv" onChange={submitBtn} />
      </div>
      <div className='flex'>
        <div id='Calendar1'>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            headerToolbar={{
              start: 'title',
              end: 'go-to-first-date today prev,next'
            }}
            customButtons={{
              'go-to-first-date': {
                text: 'Start Date',
                click: handleGoTo
              }
            }}
            fixedWeekCount={false}
            initialView="dayGridMonth"
            events={events}
          />
        </div>
        <div>
          <button onClick={downloadCSV} className='ml-10 mt-1 bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'>Download CSV</button>
          <div className='flex flex-col text-white m-10 font-bold'>
            <label>
              <input
                type="radio"
                value="0"

                checked={selectedValue === "0"}
                onChange={handleOptionChange}
                name="radioGroup"
                className='m-2'
              />
              NO2
            </label>
            <label>
              <input
                type="radio"
                value="1"
                checked={selectedValue === "1"}
                onChange={handleOptionChange}
                name="radioGroup"
                className='m-2'
              />
              SO2
            </label>
            <label>
              <input
                type="radio"
                value="2"
                checked={selectedValue === "2"}
                onChange={handleOptionChange}
                name="radioGroup"
                className='m-2'
              />
              RSPM/PM10
            </label>
            <label>
              <input
                type="radio"
                value="3"
                checked={selectedValue === "3"}
                onChange={handleOptionChange}
                name="radioGroup"
                className='m-2'
              />
              SPM
            </label>
          </div>
          <div>
            <button onClick={handleShowPlot} className="w-15 mt-5 ml-10 h-10 bg-pink-600 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type='button'>
              Show Scatter Plot
            </button>
            {
              showPlot && (
                <div className="popup-window bg-gray-200 rounded-lg p-5" style={{ left: '-100px', overflow: 'hidden',width:'850px',height:'450px' }} >
                  <div className="popup-header">
                    <button onClick={handleClosePlot} className="text-pink-700">Close</button>
                  </div>
                  <div className="popup-content">
                    <ScatterPlot data={csvData} selectedGas={selectedValue} />
                  </div>
                </div>
              )              
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;