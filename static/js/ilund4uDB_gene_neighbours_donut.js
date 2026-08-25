document.addEventListener("DOMContentLoaded", function () {
    const CommunityClassesData = window.IslandNeighboursData;
    const ctx = document.getElementById("donutChartIslandNeighbours").getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: CommunityClassesData.labels,
            datasets: [{
                data: CommunityClassesData.data,
                backgroundColor: ["#B264A8", "#5EA5D9", "#F15A55", "#FAA43B", "#BDC5C9"]
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
