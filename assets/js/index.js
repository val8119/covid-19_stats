var request = new XMLHttpRequest();

request.open("GET", "https://api.covid19api.com/summary", true);

request.onload = function () {
    var data = JSON.parse(this.response);

    var newConfirmed = data.Global.NewConfirmed;
    var totalConfirmed = data.Global.TotalConfirmed;
    var newDeaths = data.Global.NewDeaths;
    var totalDeaths = data.Global.TotalDeaths;
    var newRecovered = data.Global.NewRecovered;
    var totalRecovered = data.Global.TotalRecovered;

    document.getElementById("newConfirmed").innerHTML = newConfirmed.toLocaleString();
    document.getElementById("totalConfirmed").innerHTML = totalConfirmed.toLocaleString();
    document.getElementById("newDeaths").innerHTML = newDeaths.toLocaleString();
    document.getElementById("totalDeaths").innerHTML = totalDeaths.toLocaleString();
    document.getElementById("newRecovered").innerHTML = newRecovered.toLocaleString();
    document.getElementById("totalRecovered").innerHTML = totalRecovered.toLocaleString();

    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("chartdiv", am4charts.PieChart);

    chart.data = [{
        "title": "Total recovered",
        "number": totalRecovered
    }, {
        "title": "Total deaths",
        "number": totalDeaths
    }, {
        "title": "Unresolved",
        "number": totalConfirmed - totalRecovered - totalDeaths
    }];

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "number";
    pieSeries.dataFields.category = "title";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
}

request.send();