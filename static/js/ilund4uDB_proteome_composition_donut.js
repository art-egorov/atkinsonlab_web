document.addEventListener("DOMContentLoaded", function () {
    const CDSClassesData = window.CDSClassesData;
    const ctx = document.getElementById("donutCDSClasses").getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: CDSClassesData.labels,
            datasets: [{
                data: CDSClassesData.data,
                backgroundColor: ["#BDC5C9", "#F1B953", "#F27289"]
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
});
