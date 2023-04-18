import React, { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ScatterPlot = ({ data, choice }) => {
    const [trial, setTrial] = useState();
    const [scatterData, setScatterData] = useState(null);

    function checkpred(pred) {
        return pred.prediction == 1;
    }

    function checkanom(pred) {
        return pred.prediction == -1;
    }

    let anomalies = data;
    data = data.filter(checkpred);
    anomalies = anomalies.filter(checkanom);
    console.log(data);
    console.log(anomalies);

    let selGas;
    if (choice == "0" || choice == undefined)
        selGas = "NO2"
    else if (choice == "1")
        selGas = "SO2"
    else if (choice == "2")
        selGas = "RSPM/PM10"
    else if (choice == "3")
        selGas = "SPM"
    console.log(choice);

    let data_xy = data.map((record) => ({
        x: new Date(record.date).getTime(),
        y: parseFloat(record[selGas]),
    }))
    let anomalies_xy = anomalies.map((record) => ({
        x: new Date(record.date).getTime(),
        y: parseFloat(record[selGas]),
    }))
    console.log(data_xy);
    return (
        <div>
            <ScatterChart
                width={800}
                height={400}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <CartesianGrid />
                <XAxis dataKey="x" type="number" domain={['auto', 'auto']} tickFormatter={(tick) => new Date(tick).toLocaleDateString()} name="Date" />
                <YAxis dataKey="y" type="number" domain={['auto', 'auto']} name="concentration" unit="μg/m3" />
                <Legend />
                <Scatter name="Normal Data" data={data_xy} fill="green" />
                <Scatter name="Anomalies" data={anomalies_xy} fill="red" />
            </ScatterChart>
        </div>
    );
};

export default ScatterPlot;
