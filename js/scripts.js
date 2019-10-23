
var data;
var year = 1999;
var manufacturing = [];
var nine = [];
var totalSeven = [];
var twentyseventeen = [];
var total = [];





$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": "table.txt"
    } );
    
    buildChart();
    loadData1();
    loadData2();
} );
function loadData1(){
    $.ajax({
        type:"GET",
        url:"table.json",
        dataType:"text",
        success: parseData1
});
}
function loadData2(){
    $.ajax({
        type:"GET",
        url:"table2.json",
        dataType:"text",
        success: parseData2
});
}
function parseData1(data){
    // console.log(data);
    dataObj = $.parseJSON(data);
     console.log(dataObj);

    for (var i = 0; i < 21; i++) {
        //sets data to arrays for charts
        manufacturing.push(dataObj[i]["Manufacturing Industry"]);
        
       
        if (dataObj[i]["Year"] == 1999) {
        
            nine.push(dataObj[i]["Value of shipments from E-commerce"]);
            // console.log(twentyseventeen);
            
            
        }
         
}
buildChart(); 
}
function parseData2(data){
    // console.log(data);
    dataObj = $.parseJSON(data);
     console.log(dataObj);

    for (var i = 0; i < 21; i++) {
        // //sets data to arrays for charts
        // manufacturing.push(dataObj[i]["Manufacturing Industry"]);
        
       
        if (dataObj[i]["Year"] == 2017) {
        
            twentyseventeen.push(dataObj[i]["Value of shipments from E-commerce"]);
            totalSeven.push(dataObj[i]["Total value of shipments"]);
            // console.log(twentyseventeen);
            total[i] = twentyseventeen[i]/totalSeven[i]
           
            
        }
        
         
}

buildChart(); 
//console.log(total);

}



function buildChart(){
    Highcharts.chart('container-chart1', {
        chart: {
          type: 'area',
          inverted: true
        },
        title: {
          text: 'E-commerce shipment values from 1999 to 2017'
        },
        subtitle: {
          style: {
            position: 'absolute',
            right: '0px',
            bottom: '10px'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
          categories: manufacturing
        },
        yAxis: {
          title: {
            text: 'Value of E-commerce shipments'
          },
          allowDecimals: true,
          min: 5000,
          max: 800000
        },
        plotOptions: {
          area: {
            fillOpacity: 0.5
          }
        },
        series: [{
          name: 'Value of E-commerce shipments in 1999',
          data: nine
        }, {
          name: 'Value of E-commerce shipments in 2017',
          data: twentyseventeen
        }]
      });

      //chart 2
      Highcharts.chart('container-chart2', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'E-commerce across manufacturing industries'
        },
        
        xAxis: {
            categories: manufacturing
          },
        yAxis: {
          title: {
            text: 'Value of total shipments'
          }
      
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.1f}%'
            }
          }
        },
      
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
      
        series: [
          {
            name: "Manufacturing Industries",
            colorByPoint: true,
            data: total
          }
        ]
        
          
        
      });


      //chart 3
      Highcharts.chart('container-chart3', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: 'Total<br>value<br>Shipment<br>Breakdown<br>2017',
          align: 'center',
          verticalAlign: 'middle',
          y: 60
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
          }
        },
        series: [{
          type: 'pie',
          name: 'Top 5',
          innerSize: '50%',
          data: [
            ['Traditional Commerce', 33.26],
            ['E-commerce', 66.74],
           
            {
            
              dataLabels: {
                enabled: false
              }
            }
          ]
        }]
      });
      
}
