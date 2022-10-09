const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// data promise & log to console
const dataPromise = d3.json(url);
console.log("data promise: ", dataPromise);

// Use `d3.json` to create variable data for charts

  d3.json(url).then((data) => {
  var otu_ids = result.otu_ids;
  var sample_values = result.sample_values;

function buildCharts(sample) {
//  Create a horizontal bar chart

  var traceBar = [
    {
      y:otu_ids.slice(0, 9).map(otuID => `OTU ${otuID}`).reverse(),
      x:sample_values.slice(0,9).reverse(),
      type:"bar",
      orientation:"h"
    }
  ];

  var barLayout = {
    title: "top 10 OTUs Found",
  };

  Plotly.newPlot("bar", traceBar, barLayout);
 
// Create a bubble chart that displays each sample 

  var traceBubble = [
    {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        color: otu_ids,
        size: sample_values,
      }
    }
  ];

  var bubbleLayout = {
    xaxis: { title: "OTU ID"}
  };

  Plotly.newPlot("bubble", traceBubble, bubbleLayout);
}

function buildTable (sample) {

  // Use `d3.json` to create variable data for metadata chart
    d3.json(url).then((data) => {
      var metadata = data.metadata;
      var resultsarray = metadata.filter(sampleobject => 
        sampleobject.id == sample);
      var result = resultsarray[0]
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h5").text(`${key}: ${value}`);
      });
    });
}


function init() {

// #selDataset from html for the dropdown select element
var dropdown = d3.select("#selDataset");
  
// Use the list of samples for dropdown
d3.json(url).then((data) => {
  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
    dropdown
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  // Initial sample to use for visuals 
  const initialSample = sampleNames[0];
  buildCharts(initialSample);
  buildTable(initialSample);
});
}

init();