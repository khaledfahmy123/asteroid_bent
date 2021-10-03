export const changeChart = (file_p) => {
  var y_value = [{ min: 7, max: 40 }];
  let data = [];
  var file = [];
  $.get(file_p, {}, function (content) {
    let lines = content.split("\n").map((e) => parseFloat(e));
    lines.pop();
    file = lines;
    y_value.push({ min: Math.min(...file) - 6, max: Math.max(...file) + 6 });
    console.log(Math.max(...file) - 6);
    data.push({
      x: data.length + 1,
      y: file[0],
    });
  });
  console.log(y_value);
  const getNewSeries = (d) => {
    let data = d;

    data.push({
      x: data.length + 1,
      y:
        file[data.length - Math.floor(data.length / file.length) * file.length],
    });

    return data;
  };
  var initData = data;
  var options = {
    series: [
      {
        data: initData.slice(),
      },
    ],
    chart: {
      id: "realtime",
      width: 500,
      height: 350,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    style: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    fill: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    stroke: {
      curve: "smooth",
      colors: ["#37b6cf", "#E91E63", "#9C27B0"],
    },
    title: {
      text: "Light Curve",
      align: "left",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "numeric",
      range: 160,
    },
    yaxis: {
      min: parseInt(Math.min(...file)) || 7,
      max: parseInt(Math.max(...file)) || 40,
    },
    legend: {
      show: false,
    },
  };
  $(".chart-cont").html("<section id='chart'></section>");
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

  window.setInterval(function () {
    data = getNewSeries(data);
    chart.updateSeries([
      {
        data: data,
      },
    ]);
  }, 180);
};
