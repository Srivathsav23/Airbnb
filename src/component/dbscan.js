const dbscan = require("dbscanjs");

function euclideanDistance(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += (a[i] - b[i]) ** 2;
    }
    return Math.sqrt(sum);
}

function detectAnomalies(data, choice) {
    console.log(data);
    let datasx = {};
    const timestamps = data.map(d => Math.floor((new Date(d.date).getTime()) / 86400000)+25569);
    let concentrations, minpts, eps = 5;
    if (choice == "0") {
        concentrations = data.map(d => d.NO2);
        minpts = 5;
    }
    else if (choice == "1") {
        concentrations = data.map(d => d.SO2);
        minpts = 3;
    }
    else if (choice == "2") {
        concentrations = data.map(d => d['RSPM/PM10']);
        minpts = 15;
    }
    else if (choice == "3") {
        concentrations = data.map(d => d.SPM);
        minpts = 30;
        eps = 7;
    }
    const X = [];
    for (let i = 0; i < timestamps.length; i++) {
        X.push([timestamps[i], concentrations[i]]);
    }
    console.log(X);
    const clusters = dbscan(X, euclideanDistance, minpts, eps);
    console.log(clusters);
    let count1 = 0, count0 = 0;
    for (let i in clusters) {
        if (clusters[i] == -1)
            count0++;
        else
            count1++;
    }

    console.log(count1)
    console.log(count0)
    const newData = data.map((d, i) => {
        if (clusters[i] === -1) {
            return { ...d, prediction: -1 };
        } else {
            return { ...d, prediction: 1 };
        }
    });
    console.log(newData);
    const acc = newData.map(x => {
        if (x.predictions == x.prediction)
            return 1;
        else
            return -1;
    });
    console.log("accuracy = ", (acc.filter(x => x == 1).length) / newData.length);
    return newData;
}

export default detectAnomalies;