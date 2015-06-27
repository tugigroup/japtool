google.load("visualization", "1", {packages: ["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Lession'],
        ['Learned', 50],
        ['Not Learned', 50],
    ]);

    var options = {
        title: 'Overview Lession'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}
google.setOnLoadCallback(drawChart1);
function drawChart1() {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Question'],
        ['True', 11],
        ['Faile', 2]
    ]);

    var options = {
        title: 'Overview Question'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart1'));

    chart.draw(data, options);
}
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
    // Some raw data (not necessarily accurate)
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Done', 'Goal of the day','Average'],
        ['Begin', 1, 3,3.3],
        ['07/06', 2, 3,3.3],
        ['07/07', 5, 3,3.3],
        ['07/08', 4, 3,3.3],
        ['today', 4, 3,3.3],
        ['07/10', , 3,3.3],
        ['End', , 3,3.3]
    ]);

    var options = {
        title: 'Lession description chart',
        vAxis: {title: "Number of lession"},
        hAxis: {title: "Day"},
        seriesType: "bars",
        series: {1: {type: "line"},2: {type: "line"}}
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}