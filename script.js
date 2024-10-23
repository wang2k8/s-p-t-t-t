// Thay đổi maxValue của download và upload gauge
downloadGauge.maxValue = 1000; // Max value for download speed
uploadGauge.maxValue = 1000;   // Max value for upload speed

// Thêm các nhãn giá trị nhỏ hơn cho gauge
downloadGauge.setOptions({
    staticLabels: {
        labels: [0, 50, 100, 250, 500, 750, 1000],  // Thêm giá trị đo nhỏ hơn
    }
});

uploadGauge.setOptions({
    staticLabels: {
        labels: [0, 50, 100, 250, 500, 750, 1000],  // Thêm giá trị đo nhỏ hơn
    }
});

// Sửa đổi hàm startTest
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

    let sumDownloadSpeed = 0;
    let sumUploadSpeed = 0;
    let count = 0;

    // Start interval to simulate speed test every 3 seconds
    interval = setInterval(() => {
        let ping = Math.floor(Math.random() * 100) + 10; // random ping between 10-110ms
        let downloadSpeed = Math.random() * 1000; // random download speed up to 1000 Mbps
        let uploadSpeed = Math.random() * 1000;   // random upload speed up to 1000 Mbps

        sumDownloadSpeed += downloadSpeed;
        sumUploadSpeed += uploadSpeed;
        count++;

        // Lấy trung bình tốc độ sau mỗi vài giây
        let avgDownloadSpeed = sumDownloadSpeed / count;
        let avgUploadSpeed = sumUploadSpeed / count;

        // Update gauge and chart
        downloadGauge.set(avgDownloadSpeed);
        uploadGauge.set(avgUploadSpeed);

        downloadSpeedData.push(avgDownloadSpeed);
        uploadSpeedData.push(avgUploadSpeed);
        speedChart.data.labels.push(time);
        speedChart.data.datasets[0].data.push(avgDownloadSpeed);
        speedChart.data.datasets[1].data.push(avgUploadSpeed);
        speedChart.update();

        document.getElementById('ping').innerText = `${ping} ms`;
        document.getElementById('download').innerText = `${avgDownloadSpeed.toFixed(2)} Mbps`;
        document.getElementById('upload').innerText = `${avgUploadSpeed.toFixed(2)} Mbps`;

        time++;

        // Stop after 30 seconds
        if (time >= 30) {
            clearInterval(interval);
            document.getElementById('status').innerText = 'Test Completed';
        }
    }, 3000); // Thay đổi khoảng thời gian đo thành 3 giây
}