setInterval(function () {
    // Send a request to the server to check the status of the task
    fetch("/check-status/" + job_id)
        .then(function (response) {
            return response.json();
        })
        .then(function (status) {
            // If the status has changed, refresh the page
            if (status.status !== current_status) {
                location.reload();
            }
        });
}, 1000);


