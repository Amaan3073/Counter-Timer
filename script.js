let x;

document.getElementById("start-button").addEventListener("click", function () {
    // Get user input for start and end dates
    const startDateInput = new Date().getTime();
    const endDateInput = document.getElementById("end-date").value;

    // Validate input
    if (!startDateInput || !endDateInput) {
        alert("Please Set Date and Time.");
        return;
    }

    // Convert input to timestamps
    const startDate = new Date(startDateInput).getTime();
    const endDate = new Date(endDateInput).getTime();

    // Validate if end date is after start date
    if (endDate <= startDate) {
        alert("End date must be after the start date.");
        return;
    }

    // Clear any existing interval
    if (x) {
        clearInterval(x);
    }

    // Start the countdown
    x = setInterval(function updateTime() {
        const now = new Date().getTime();

        const distanceCovered = now - startDate;
        const distancePending = endDate - now;

        // Calculate days, hours, minutes, seconds
        const oneDayInMillis = 24 * 60 * 60 * 1000;
        const oneHourInMillis = 60 * 60 * 1000;
        const oneMinInMillis = 60 * 1000;
        const oneSecInMillis = 1000;

        const days = Math.floor(distancePending / oneDayInMillis);
        const hrs = Math.floor((distancePending % oneDayInMillis) / oneHourInMillis);
        const mins = Math.floor((distancePending % oneHourInMillis) / oneMinInMillis);
        const secs = Math.floor((distancePending % oneMinInMillis) / oneSecInMillis);

        // Update the countdown display
        document.querySelector("#days span").textContent = String(days).padStart(2, "0");
        document.querySelector("#hours span").textContent = String(hrs).padStart(2, "0");
        document.querySelector("#minutes span").textContent = String(mins).padStart(2, "0");
        document.querySelector("#seconds span").textContent = String(secs).padStart(2, "0");

        // Calculate progress percentage
        const totalDistance = endDate - startDate;
        const percentCover = (distanceCovered / totalDistance) * 100;

        document.getElementById("progress-bar").style.width = percentCover + "%";

        // If the countdown is over
        if (distancePending < 0) {
            clearInterval(x);
            document.querySelector("#countdown").textContent = "EXPIRED";
            document.querySelector("#countdown").style = "font-size:1.5rem;";
            document.getElementById("progress-bar").style.width = "100%";
        }
    }, 1000);
});