document.addEventListener("DOMContentLoaded", function () {
    const CommunityClassesData = window.CommunityClassesData;
    const ctx = document.getElementById("donutChartFamilyClasses").getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: CommunityClassesData.labels,
            datasets: [{
                data: CommunityClassesData.data,
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
