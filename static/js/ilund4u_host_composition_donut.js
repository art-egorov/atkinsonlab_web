if (window.HostPieData && typeof d3 !== 'undefined') {
  const values = window.HostPieData.values;
  const labels = window.HostPieData.labels;

  const min = Math.min(...values);
  const max = Math.max(...values);

  const scale = d3.scaleSequential()
    .domain([min, max])
    .interpolator(d3.interpolateBlues);

  const colors = values.map(v => scale(v));

  const data = [{
    values: values,
    labels: labels,
    type: 'pie',
    hole: 0,
    sort: true,
    textinfo: 'label+percent',  // 👈 only show percent inside
    hoverinfo: 'label+value+percent', // 👈 full info on hover
    marker: { colors: colors },
    textposition: 'inside',
    insidetextorientation: 'auto'
  }];

  const layout = {
    title: 'Host distribution',
    margin: { t: 0, b: 0, l: 0, r: 0 },
    showlegend: false
  };

  Plotly.newPlot('hostPieChart', data, layout);
}
