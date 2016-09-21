export default {
  tooltip: {
    trigger: 'item',
    formatter: params => {
      let { name, data } = params;
      return `${ name } - ${ data }`;
    }
  },
  grid: { 
    show: false,
    top: 0,
    right: 0,
    left: 0
  },
  color: [ '#979db4' ],
  legend: { show: false },
  xAxis: {
    data: [],
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: {
      interval: 0,
      margin: 16,
      textStyle: {
        fontFamily: 'PingFangSC',
        fontSize: 14,
        color: '#737688'
      }
    }
  },
  yAxis: {
    position: 'top',
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false }
  },
  series: [{
    type: 'bar',
    barWidth: 36,
    barGap: '32',
    barCategoryGap: '32',
    markLine: {
      symbol: 'circle',
      symbolSize: 0,
      silent: true,
      lineStyle: {
        normal: { opacity: .3 }
      },
      data: [{
        type: 'average',
        label: { normal: { show: false } }
      }]
    },
    itemStyle: {
      normal: {
        barBorderRadius: [ 3, 3, 0 ,0 ]
      }
    },
    data: [],
    label: {
      normal: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#737688',
          fontFamily: 'SFNSText',
          fontSize: 14
        },
        formatter: '{c}'
      }
    },
  }]
};
