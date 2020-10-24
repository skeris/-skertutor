      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        let batyamassiv = [
          ['bottom', 'left'],
        ];

        for (let i = 0; i < 101; i++) {
          batyamassiv.push([i+'',0])
        } 

        for (let i = 0; i < 999; i++) {
          //console.log(getRandomInt(0,100))
            batyamassiv[getRandomInt(0,100)+1][1]+=1
        } 

        var data = google.visualization.arrayToDataTable(batyamassiv);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      
  getRandomInt(0, 100)
