// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
let table=  document.getElementById('datatable');

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work', 8],
    ['Eat', 2],
    ['TV', 4],
    ['Gym', 2],
    ['Sleep', 8]
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'My Average Day', 'width':550, 'height':400};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
  // var table = new google.visualization.DataTable(document.getElementById('datatable'));
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task');
  data.addColumn('number', 'Hours per Day');
  data.addRows([
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', {v:7, f:'7.000'}]
]);
  console.log(table);
}
