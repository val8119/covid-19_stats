// Variables
var totalConf;
var totalRec;
var totalDth;

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open("GET", "https://api.covid19api.com/summary", true);

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    var newConfirmed = data.Global.NewConfirmed;
    var totalConfirmed = data.Global.TotalConfirmed;
    totalConf = totalConfirmed;
    var newDeaths = data.Global.NewDeaths;
    var totalDeaths = data.Global.TotalDeaths;
    totalDth = totalDeaths;
    var newRecovered = data.Global.NewRecovered;
    var totalRecovered = data.Global.TotalRecovered;
    totalRec = totalRecovered;

    document.getElementById("newConfirmed").innerHTML = newConfirmed.toLocaleString();
    document.getElementById("totalConfirmed").innerHTML = totalConfirmed.toLocaleString();
    document.getElementById("newDeaths").innerHTML = newDeaths.toLocaleString();
    document.getElementById("totalDeaths").innerHTML = totalDeaths.toLocaleString();
    document.getElementById("newRecovered").innerHTML = newRecovered.toLocaleString();
    document.getElementById("totalRecovered").innerHTML = totalRecovered.toLocaleString();

    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);

    // Add data
    chart.data = [{
        "title": "Total confirmed",
        "number": document.getElementById("totalConfirmed").innerHTML
    }, {
        "title": "Total recovered",
        "number": document.getElementById("totalRecovered").innerHTML
    }, {
        "title": "Total deaths",
        "number": document.getElementById("totalDeaths").innerHTML
    }];

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "number";
    pieSeries.dataFields.category = "title";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
}

// Send request
request.send();