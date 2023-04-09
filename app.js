import {initializeApp} from 'firebase/app'
import { getDatabase, ref, onValue, get, child } from "firebase/database"

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjWZQCOzbCbk-WCNFcnEa63IKBLeN__rE",
    authDomain: "greenhouse-data-ba439.firebaseapp.com",
    databaseURL: "https://greenhouse-data-ba439-default-rtdb.firebaseio.com",
    projectId: "greenhouse-data-ba439",
    storageBucket: "greenhouse-data-ba439.appspot.com",
    messagingSenderId: "441207116334",
    appId: "1:441207116334:web:886fda5e3ca917181a05bf",
    measurementId: "G-VNCV0J82WB"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Realtime Database and get a reference to the service
  const db = getDatabase(app);
  var x = [];
  var y = [];
  var h = [];
  
  // Get the data from Firebase
  const readingsRef = ref(db, '/')
  get(child(readingsRef, `/`)).then((snapshot) => {
    if (snapshot.exists()) {
      const records = snapshot.val()
      Object.keys(records).forEach((key) => {
        x.push(records[key].Timestamp)
        y.push(records[key].Temperature)
        h.push(records[key].Humidity)
        console.log(records[key].Temperature)
      });
          //   // Render the chart
    
    const TESTER = document.getElementById('tester');
    Plotly.newPlot( TESTER, [{
    x: x,
    y: y }], {
    margin: { t: 0 }});

    let value = y[y.length - 3];
    let ranges = [0, 32, 50, 80, 90, 100];
    let color = ['lightblue', 'blue', 'green', 'yellow', 'red', 'darkred'];

    // Find the index of the range that contains the value
    let valueIndex = 0;
    for (let i = 0; i < ranges.length - 1; i++) {
      if (value >= ranges[i] && value < ranges[i + 1]) {
        valueIndex = i;
        break;
      }
    }

    var tempData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: y[y.length - 3],
        title: { text: "Temperature" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: { axis: { range: [null, 140] }, bar: { color: color[valueIndex] }}
      }
    ];
    
    var layout = { width: 600, height: 400 };
    Plotly.newPlot('temperature-chart', tempData, layout);

    var humidityData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: h[h.length - 3],
        title: { text: "Humidity" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: { axis: { range: [null, 1] } }
      }
    ];
    
    var layout = { width: 600, height: 400 };
    Plotly.newPlot('humidity-chart', humidityData, layout);
    }})


    
    // .once('value')
    // .then((snapshot) => {
    //   snapshot.forEach((childSnapshot) => {
    //     const reading = childSnapshot.val();
    //     data.labels.push(new Date(reading.timestamp));
    //     data.datasets[0].data.push(reading.temperature);
    //   });