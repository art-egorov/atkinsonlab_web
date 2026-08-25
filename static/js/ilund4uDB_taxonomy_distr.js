document.addEventListener("DOMContentLoaded", function () {
    const taxinfoData = window.TaxInfoData;

    // Sort data by tax_perc in descending order
    taxinfoData.sort((a, b) => b.tax_perc - a.tax_perc);

    // Extract sorted labels and data
    const labels = taxinfoData.map(entry => entry.tax_name);
    const data = taxinfoData.map(entry => entry.tax_perc);

    // Define colours for tax_domain
    const domainColors = {
        "Bacteria": "#425970",
        "Archaea": "#7E3355"
    };
    const backgroundColors = taxinfoData.map(entry => domainColors[entry.tax_domain] || "#999999");

    // Create the bar chart
    const ctx = document.getElementById("taxBarChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "% of genomes",
                data: data,
                backgroundColor: backgroundColors,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,  // Allow manual control over height
            scales: {
                x: { title: { display: true, text: "Family" } },
                y: { title: { display: true, text: "% of genomes" }, beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
});
