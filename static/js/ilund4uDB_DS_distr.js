document.addEventListener("DOMContentLoaded", function () {
    var DS_bakcground = window.DS_distr;
    var DS_of_defence = window.DS_of_defence;  // Distribution of known defence families
    var DS_value = window.DS_value;       // Single value to highlight

    // Define histogram bin settings
    var binSize = 0.02;  // Adjust bin width as needed
    var xMin = Math.min(...DS_bakcground);
    var xMax = Math.max(...DS_bakcground);

    // Compute histogram counts manually to determine ymax
    function computeHistogram(data, binSize) {
        let bins = {};
        data.forEach(value => {
            let bin = Math.floor(value / binSize) * binSize; // Assign value to bin
            bins[bin] = (bins[bin] || 0) + 1;
        });
        return Object.values(bins);
    }

    var histogramCounts = computeHistogram(DS_bakcground, binSize);
    var maxY = Math.max(...histogramCounts) || 1;  // Prevent division by zero
    var yMax = maxY * 1.1;  // Extend y-axis slightly

    var trace_histogram = {
        x: DS_bakcground,
        type: "histogram",
        name: "Distribution for all protein clusters",
        marker: { color: '#919191' },
        opacity: 1,
        xbins: { start: xMin, end: xMax, size: binSize },
        histnorm: "count"
    };

    // Create a single point trace
    var trace_point = {
        x: [DS_value],
        y: [maxY * 0.05],  // Position at y=0
        mode: "markers",
        name: "Current Family",
        marker: { color: "#b276b2", size: 12, symbol: "circle-x", line: { color: 'black', width: 1 } },
        type: "scatter"
    };

    // Define layout
    var layout = {
        xaxis: {
            title: { text: "Defence Association Score" },
            range: [xMin, xMax],
            showline: true,
            linecolor: "black",
            linewidth: 1
        },
        yaxis: {
            title: { text: "Counts" },
            range: [0, yMax],  // Set y-axis from 0 to 1.1 * ymax
            showline: true,
            linecolor: "black",
            linewidth: 1,
            showgrid: false  // **Remove horizontal grid lines**
        },
        margin: { l: 50, r: 70, t: 40, b: 40 }, // Adjusted right margin to fit legend
        legend: {
            x: 0.98,  // Align legend to the right inside the plot
            y: 0.95,
            xanchor: 'right',  // Ensures it does not overflow outside the figure
            font: { size: 11 }
        }
    };

    // Plot the figure
    Plotly.newPlot("DS_distribution", [trace_histogram, trace_point], layout);
});
