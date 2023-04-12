import { DBSCAN } from "ml-kmeans";

function euclideanDistance(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += (a[i] - b[i]) ** 2;
    }
    return Math.sqrt(sum);
}

function detectAnomalies(data, eps, minPts) {
    const dbscan = new DBSCAN({
        eps,
        minPts,
        distanceFunction: euclideanDistance,
    });

   
    const dataArray = data.map((d) => [d.no2_concentration]);

    const clusters = dbscan.fit(dataArray);

    const newData = data.map((d, i) => {
        if (clusters[i] === -1) {
            return { ...d, prediction: "anomaly" };
        } else {
            return { ...d, prediction: "normal" };
        }
    });

    return newData;
}
