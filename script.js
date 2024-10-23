// Chart.js for graph
let ctx = document.getElementById('speed-chart').getContext('2d');
let speedChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Time labels
        datasets: [
            {
                label: 'Download Speed (Mbps)',
                borderColor: '#1BF2DD',
                data: [],
                fill: false,
            },
            {
                label: 'Upload Speed (Mbps)',
                borderColor: '#F20574',
                data: [],
                fill: false,
            }
        ]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            }
        }
    }
});

// Variables to store time and data
let time = 0;
let interval;
let downloadSpeedData = [];
let uploadSpeedData = [];

// Initialize the gauge objects
let downloadGauge = new Gauge(document.getElementById("download-gauge")).setOptions({
    angle: 0.15, // Gauge angle
    lineWidth: 0.2, // The thickness of the gauge arc
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#1BF2DD' // Fill color
    },
    staticLabels: {
        font: "10px Arial",  // Gauge labels font
        labels: [0, 100, 200, 300, 400, 500],  // Speed labels
        color: "#FFFFFF",  // Color for the labels
        fractionDigits: 0  // Labels decimal points
    },
    limitMax: true, // Max value fixed
    colorStart: '#1BF2DD', // Start color
    colorStop: '#1BF2DD', // End color
    strokeColor: '#E0E0E0', // Background color
    highDpiSupport: true // High resolution support
});
downloadGauge.maxValue = 500; // Max value for download speed
downloadGauge.setMinValue(0);  // Min value
downloadGauge.animationSpeed = 32; // Speed of animation

let uploadGauge = new Gauge(document.getElementById("upload-gauge")).setOptions({
    angle: 0.15,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.035,
        color: '#F20574'
    },
    staticLabels: {
        font: "10px Arial",  // Labels font
        labels: [0, 100, 200, 300, 400, 500],  // Speed labels
        color: "#FFFFFF",
        fractionDigits: 0
    },
    limitMax: true,
    colorStart: '#F20574',
    colorStop: '#F20574',
    strokeColor: '#E0E0E0',
    highDpiSupport: true
});
uploadGauge.maxValue = 500; // Max value for upload speed
uploadGauge.setMinValue(0);  
uploadGauge.animationSpeed = 32;

// Start Test Function
function startTest() {
    document.getElementById('status').innerText = 'Testing...';
    
    // Reset data
    time = 0;
    downloadSpeedData = [];
    uploadSpeedData = [];
    speedChart.data.labels = [];
    speedChart.data.datasets[0].data = [];
    speedChart.data.datasets[1].data = [];
    speedChart.update();

    // Start interval to simulate speed test every second
    interval = setInterval(() => {
        let ping = Math.floor(Math.random() * 50) + 20; // random ping between 20-70ms
        let downloadSpeed = Math.random() * 500; // random download speed up to 500 Mbps
        let uploadSpeed = Math.random() * 500; // random upload speed up to 500 Mbps

        // Update gauge and chart
        downloadGauge.set(downloadSpeed);
        uploadGauge.set(uploadSpeed);

        downloadSpeedData.push(downloadSpeed);
        uploadSpeedData.push(uploadSpeed);
        speedChart.data.labels.push(time);
        speedChart.data.datasets[0].data.push(downloadSpeed);
        speedChart.data.datasets[1].data.push(uploadSpeed);
        speedChart.update();

        document.getElementById('ping').innerText = `${ping} ms`;
        document.getElementById('download').innerText = `${downloadSpeed.toFixed(2)} Mbps`;
        document.getElementById('upload').innerText = `${uploadSpeed.toFixed(2)} Mbps`;

        time++;

        // Stop after 30 seconds
        if (time >= 30) {
            clearInterval(interval);
            document.getElementById('status').innerText = 'Test Completed';
        }
    }, 1000);
}
