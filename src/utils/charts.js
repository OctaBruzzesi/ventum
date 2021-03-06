const monthsLabels = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

const averageTypes = {
  promedio: 'Promedio',
  sumatoria: 'Sumatoria'
};

const trimestersLabels = [
  '1° </br> 2016',
  '2°',
  '3°',
  '4°',
  '1° </br> 2017',
  '2°',
  '3°',
  '4°',
  '1° </br> 2018',
  '2°',
  '3°',
  '4°',
  '1° </br> 2019',
  '2°',
  '3°',
  '4°',
];

const yearsLabels = [
  '2016',
  '2017',
  '2018',
  '2019',
];

const chartTypes = {
  line: 'Line',
  bar: 'Bar',
};

const chartText = {
  newChart: 'NUEVA GRÁFICA',
  deleteChart: 'ELIMINAR',
  greenColor: 'success',
  redColor: 'danger',
};

const animation = {
  draw: (data) => {
    if (data.type === 'point') {
      data.element.animate({
        opacity: {
          begin: (data.index + 1) * 80,
          dur: 500,
          from: 0,
          to: 1,
          easing: 'ease',
        },
      });
    } else if (data.type === 'line') {
      data.element.animate({
        d: {
          begin: 600,
          dur: 700,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          easing: 'ease',
        },
      });
    }
  },
};

export {
  monthsLabels, trimestersLabels, yearsLabels, animation, chartText, chartTypes, averageTypes
};
