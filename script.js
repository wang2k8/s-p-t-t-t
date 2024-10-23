// Biến toàn cục
let time = 0;
let interval;

// Tạo biểu đồ tốc độ
let ctx = document.getElementById('speed-chart').getContext('2d');
let speedChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Thời gian đo
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
                title: {
                    display: true,
                    text: 'Time (s)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Speed (Mbps)'
                },
                beginAtZero: true,
                max: 100 // Đặt giá trị tối đa là 100
            }
        }
    }
});

// Tạo các gauge cho download và upload
let downloadGauge = new Gauge(document.getElementById("download-gauge")).setOptions({
    angle: 0.15, 
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.035,
        color: '#1BF2DD'
    },
    staticLabels: {
        font: "10px Arial",
        labels: [0, 20, 40, 60, 80, 100], // Cập nhật nhãn thành 0-100
        color: "#FFFFFF",
        fractionDigits: 0
    },
    limitMax: true,
    colorStart: '#1BF2DD',
    colorStop: '#1BF2DD',
    strokeColor: '#E0E0E0',
    highDpiSupport: true
});
downloadGauge.maxValue = 100; // Cập nhật giá trị tối đa cho gauge
downloadGauge.setMinValue(0);
downloadGauge.animationSpeed = 32;

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
        font: "10px Arial",
        labels: [0, 20, 40, 60, 80, 100], // Cập nhật nhãn thành 0-100
        color: "#FFFFFF",
        fractionDigits: 0
    },
    limitMax: true,
    colorStart: '#F20574',
    colorStop: '#F20574',
    strokeColor: '#E0E0E0',
    highDpiSupport: true
});
uploadGauge.maxValue = 100; // Cập nhật giá trị tối đa cho gauge
uploadGauge.setMinValue(0);
uploadGauge.animationSpeed = 32;

// Hàm tính toán ping
async function calculatePing() {
    let startTime = Date.now();
    try {
        await fetch('https://www.google.com', { method: 'HEAD' });
        let ping = Date.now() - startTime;
        document.getElementById('ping').innerText = `${ping} ms`;
        return ping;
    } catch (error) {
        console.error('Ping calculation error:', error);
        document.getElementById('ping').innerText = 'Error';
        return null;
    }
}

// Hàm tính toán tốc độ download giả lập
function simulateDownloadSpeed() {
    let downloadSpeed = Math.random() * 100; // Tốc độ ngẫu nhiên từ 0 đến 100 Mbps
    document.getElementById('download').innerText = `${downloadSpeed.toFixed(2)} Mbps`;
    downloadGauge.set(downloadSpeed);
    return downloadSpeed;
}

// Hàm tính toán tốc độ upload giả lập
function simulateUploadSpeed() {
    let uploadSpeed = Math.random() * 100; // Tốc độ ngẫu nhiên từ 0 đến 100 Mbps
    document.getElementById('upload').innerText = `${uploadSpeed.toFixed(2)} Mbps`;
    uploadGauge.set(uploadSpeed);
    return uploadSpeed;
}

// Hàm bắt đầu quá trình kiểm tra tốc độ
async function startTest() {
    document.getElementById('status').innerText = 'Testing...';

    // Reset lại các giá trị trước đó
    time = 0;
    speedChart.data.labels = [];
    speedChart.data.datasets[0].data = [];
    speedChart.data.datasets[1].data = [];
    speedChart.update();

    // Tính ping
    await calculatePing();

    // Bắt đầu đo tốc độ sau mỗi giây
    interval = setInterval(() => {
        let downloadSpeed = simulateDownloadSpeed();
        let uploadSpeed = simulateUploadSpeed();

        // Cập nhật biểu đồ
        speedChart.data.labels.push(time);
        speedChart.data.datasets[0].data.push(downloadSpeed);
        speedChart.data.datasets[1].data.push(uploadSpeed);
        speedChart.update();

        time++;

        // Dừng sau 30 giây
        if (time >= 30) {
            clearInterval(interval);
            document.getElementById('status').innerText = 'Test Completed';
        }
    }, 1000);
}
