      google.charts.load("current", {"packages":["corechart"]});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ["bottom", "left"],
          ["2004",  1000  ],
          ["3",     5]
        ]);

        var options = {
          title: "Company Performance",
          curveType: "function",
          legend: { position: "bottom" }
        };

        var chart = new google.visualization.LineChart(document.getElementById("curve_chart"));

        chart.draw(data, options);
      }

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }
  getRandomFloat(0, 100)
