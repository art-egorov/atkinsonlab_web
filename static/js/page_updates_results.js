setInterval(function () {
    console.log("Script is running");
    // Send a request to the server to check the status of the task
    fetch("/check-status/" + job_id)
        .then(function (response) {
            return response.json();
        })
        .then(function (status) {
            // If the status has changed, refresh the page
            if (status.status !== current_status || status.position !==
                current_position || status.meta.cleanlog !== current_logs) {
                location.reload();
            }
        });
}, 1500);


