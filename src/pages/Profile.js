import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './popup.css';

function displayCalendar(jsonData) {
    function checkpred(pred) {
        return pred.prediction === 1;
    }
    function checkanom(pred) {
        return pred.prediction === -1;
    }
    let anomalies = jsonData;
    let jsonData1 = jsonData.filter(checkpred);
    anomalies = anomalies.filter(checkanom);
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
            title: "Normal",
            start: event.date,
            allDay: true
        }))
    };

    let newEvents = anomalies.map(event => ({
        title: "Anomaly",
        start: event.date,
        allDay: true,
        eventDisplay: 'list-item',
        backgroundColor: 'red'
    }));
    for (let i in newEvents)
        (calendarx.events).push(newEvents[i]);
    return calendarx;
}



const Profile = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    let [startDate, setStartDate] = useState();
    let [events, setEvents] = useState([]);
    console.log(startDate);

    const handleButtonClick = () => {
        let eventData = displayCalendar(pdata);
        eventData = eventData.events;
        console.log(eventData);
        setEvents(eventData);
        setStartDate(eventData[0].start)
        setShowCalendar(true);
    };

    const handleCloseCalendar = () => {
        setShowCalendar(false);
    };

    let olddata = localStorage.getItem('formdata')
    let oldArr = JSON.parse(olddata)
    let profileData;
    console.log(sessionStorage.getItem('@user'));
    oldArr.map(arr => {
        if (arr.email == sessionStorage.getItem('@user')) {
            profileData = arr;
        }
    });

    const pdata = profileData.data[profileData.data.length - 1];




    const tableRows = profileData.data[profileData.data.length - 1].map((row, index) => {
        if (index <= 5) {
            const tableCells = [<td td key={0} style={{ border: '1px solid', padding: '3px' }}> {row.date}</td>, <td key={1} style={{ border: '1px solid', padding: '3px' }}>{row.NO2}</td>, <td key={2} style={{ border: '1px solid', padding: '3px' }}>{row.SO2}</td>, <td td key={0} style={{ border: '1px solid', padding: '3px' }}> {row['RSPM/PM10']}</td>, <td td key={0} style={{ border: '1px solid', padding: '3px' }}> {row.SPM}</td>, <td td key={0} style={{ border: '1px solid', padding: '3px' }}> {row.prediction}</td>];

            return <tr key={index} style={{ border: '1px solid' }} >{tableCells}</tr>;
        }
    });

    const handleGoTo = () => {
        const firstEvent = events[0];
        console.log(firstEvent);
        if (firstEvent) {
            const firstDate = new Date(firstEvent.start);
            calendarRef.current.getApi().gotoDate(firstDate);
        }
    };

    const calendarRef = React.createRef();
    const csvDownload = () => {
        let csvRows = [];
        let headers = Object.keys(pdata[0]);
        csvRows.push(headers.join(','));
        for (let row of pdata) {
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
    //https://64.media.tumblr.com/bed5455fdd7789656247fb01ed60ad31/93c34c0b6d121aef-6a/s400x600/15a48a245b0ef5bb4f5215d177116cf9c4150531.png
    console.log(profileData);
    return (
        <>
            <div>
                <div className="pt-20">
                    <div className="px-20">
                        <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <button onClick={() => {
                                        window.location.replace('/');
                                    }} className="mt-5 h-10 bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                        Back
                                    </button>
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div>
                                            <img width={180} height={180} alt="..." src="https://i.pinimg.com/736x/9f/3d/f6/9f3df65834f2e4eca80594ca0e28ccc6.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button onClick={() => {
                                                sessionStorage.removeItem('@user');
                                                window.location.replace('/');
                                            }} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button onClick={() => {
                                                let olddata = localStorage.getItem('formdata');
                                                let oldArr = JSON.parse(olddata);
                                                oldArr = oldArr.map(arr => (arr.email != sessionStorage.getItem('@user')));
                                                localStorage.setItem("formdata", JSON.stringify(oldArr));
                                                sessionStorage.removeItem('@user');
                                                window.location.replace('/');
                                            }} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {profileData.name}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        Date of Birth : {profileData.dob.length > 0 ? profileData.dob : "N/A"}
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> Email : {profileData.email}
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>Password : {'*'.repeat(profileData.password.length)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg p-5">
                            <div className="font-bold">
                                Last Uploaded Data:
                            </div>
                            <div className="flex">
                                <div>
                                    {
                                        profileData.data ?
                                            (
                                                <table style={{ border: '1px solid', textAlign: 'center', width: '1000px', marginLeft: '5px' }}>
                                                    <thead>
                                                        <tr style={{ border: '1px solid' }}>
                                                            <th style={{ border: '1px solid', padding: '3px' }}>Date</th>
                                                            <th style={{ border: '1px solid', padding: '3px' }}>NO2</th>
                                                            <th style={{ border: '1px solid', padding: '3px' }}>SO2</th>
                                                            <th style={{ border: '1px solid', padding: '3px' }}>RSPM</th>
                                                            <th style={{ border: '1px solid', padding: '3px' }}>SPM</th>
                                                            <th style={{ border: '1px solid', padding: '3px' }}>Prediction</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            tableRows
                                                        }
                                                    </tbody>
                                                </table>

                                            ) : "None uploaded"
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <button onClick={csvDownload} className="w-15 mt-5 ml-10 h-10 bg-pink-600 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                        Download
                                    </button>
                                    <button onClick={handleButtonClick} className="w-15 mt-5 ml-10 h-10 bg-pink-600 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                        View
                                    </button>
                                    {
                                        showCalendar && (
                                            <div className="popup-window bg-gray-200 rounded-lg p-5" style={{left:'20px',overflow:'hidden'}} >
                                                <div className="popup-header">
                                                    <button onClick={handleCloseCalendar} className="text-pink-700">Close</button>
                                                </div>
                                                <div className="popup-content" id="cal2">
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
                                                        events={events}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default Profile;