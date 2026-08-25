// Ensure window.HcomCargoData is loaded and available
var plotData = window.HcomCargoData; // Data passed from Flask

// Define bin settings for uniform width
var binSize = 0.01;
var xMin = Math.min(...plotData.background.defence_cargo_normalised);
var xMax = Math.max(...plotData.background.defence_cargo_normalised);

// Compute histogram bins manually
function computeHistogram(data, binSize) {
    let bins = {};
    data.forEach(value => {
        let bin = Math.floor(value / binSize) * binSize; // Assign value to bin
        bins[bin] = (bins[bin] || 0) + 1;
    });
    return Object.values(bins);
}

var histogramCounts = computeHistogram(plotData.background.defence_cargo_normalised, binSize);
var maxY = Math.max(...histogramCounts) || 1;  // Prevent division by 0
var dotYPosition = maxY * 0.05;  // Place dots slightly above highest histogram bar

// Layout for all plots
var layout = {
    barmode: 'overlay',
    xaxis: {
        title: { text: 'Fraction of cargo annotated as defence' },
        range: [xMin, xMax],
        zeroline: false,
        showgrid: false,
        showline: true,
        linecolor: 'black',
        linewidth: 1
    },
    yaxis: {
        title: { text: 'Counts' },
        range: [0, maxY * 1.1], // Extend y-axis slightly to fit dots
        showgrid: false,
        zeroline: false,
        showline: true,
        linecolor: 'black',
        linewidth: 1
    },
    margin: { l: 50, r: 70, t: 40, b: 40 }, // Adjusted right margin to fit legend
    legend: {
        x: 0.98,  // Align legend to the right inside the plot
        y: 0.95,
        xanchor: 'right',  // Ensures it does not overflow outside the figure
        font: { size: 11 }
    }
};

function updatePlot(tab) {
    document.getElementById('hotspot_cargo_plot').style.display = 'block';
    var trace_background, trace_selected, data, xAxisTitle;

    // Set the X-axis title based on the selected tab
    switch (tab) {
        case 'defence':
            xAxisTitle = 'Fraction of cargo annotated as defence';
            trace_background = {
                x: plotData.background.defence_cargo_normalised,
                name: "All hotspots",
                type: "histogram",
                opacity: 1,
                marker: { color: '#858B8E' },
                xbins: { start: xMin, end: xMax, size: binSize },
                histnorm: "count"
            };
            trace_selected = {
                x: plotData.selected.defence_cargo_normalised,
                y: new Array(plotData.selected.defence_cargo_normalised.length).fill(dotYPosition),
                mode: "markers",
                name: "Hotspots with the protein family",
                marker: { color: '#B264A890', size: 12.5, symbol: 'circle-x', line: { color: 'black', width: 1 }},
                type: "scatter"
            };
            break;
        case 'AMR':
            xAxisTitle = 'Fraction of cargo annotated as AMR';
            trace_background = {
                x: plotData.background.AMR_cargo_normalised,
                name: "All hotspots",
                type: "histogram",
                opacity: 1,
                marker: { color: '#858B8E' },
                xbins: { start: xMin, end: xMax, size: binSize },
                histnorm: "count"
            };
            trace_selected = {
                x: plotData.selected.AMR_cargo_normalised,
                y: new Array(plotData.selected.AMR_cargo_normalised.length).fill(dotYPosition),
                mode: "markers",
                name: "Hotspots with the protein family",
                marker: { color: '#FAA43B', size: 12.5, symbol: 'circle-x', line: { color: 'black', width: 1 }},
                type: "scatter"
            };
            break;
        case 'virulence':
            xAxisTitle = 'Fraction of cargo annotated as virulence';
            trace_background = {
                x: plotData.background.virulence_cargo_normalised,
                name: "All hotspots",
                type: "histogram",
                opacity: 1,
                marker: { color: '#858B8E' },
                xbins: { start: xMin, end: xMax, size: binSize },
                histnorm: "count"
            };
            trace_selected = {
                x: plotData.selected.virulence_cargo_normalised,
                y: new Array(plotData.selected.virulence_cargo_normalised.length).fill(dotYPosition),
                mode: "markers",
                name: "Hotspots with the protein family",
                marker: { color: '#F15A55', size: 12.5, symbol: 'circle-x', line: { color: 'black', width: 1 }},
                type: "scatter"
            };
            break;
        case 'anti_defence':
            xAxisTitle = 'Fraction of cargo annotated as anti-defence';
            trace_background = {
                x: plotData.background.anti_defence_cargo_normalised,
                name: "All hotspots",
                type: "histogram",
                opacity: 1,
                marker: { color: '#858B8E' },
                xbins: { start: xMin, end: xMax, size: binSize },
                histnorm: "count"
            };
            trace_selected = {
                x: plotData.selected.anti_defence_cargo_normalised,
                y: new Array(plotData.selected.anti_defence_cargo_normalised.length).fill(dotYPosition),
                mode: "markers",
                name: "Hotspots with the protein family",
                marker: { color: '#5EA5D9', size: 12.5, symbol: 'circle-x', line: { color: 'black', width: 1 }},
                type: "scatter"
            };
            break;
    }

    // Update layout with the dynamic x-axis title
    layout.xaxis.title.text = xAxisTitle;

    // Update plot data
    data = [trace_background, trace_selected];

    // Use Plotly.react to update the plot with new data and layout
    Plotly.react('hotspot_cargo_plot', data, layout);
}

// Add event listeners to the navigation links for tab switching
document.querySelectorAll('.nav-link').forEach(button => {
    button.addEventListener('click', function() {
        var tab = this.id.split('-').slice(1).join('-');
        updatePlot(tab);
    });
});

// Initialize the plot with the 'defence' tab selected
updatePlot('defence');
