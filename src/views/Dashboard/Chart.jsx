import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import _ from 'underscore';
import ChartistGraph from 'react-chartist';
import Star from '@material-ui/icons/Star';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Select from 'components/Select/Select';
import Button from 'components/CustomButtons/Button';

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle';

import { getDynamicSections } from '../../utils/sections';
import {
  monthsLabels, trimestersLabels, yearsLabels, animation, chartText, chartTypes, averageTypes,
} from '../../utils/charts';

const Chart = ({ data, sections, removeFavourites, classes }) => {
  const getWaterValuesOrderedByYear = (values) => {
    const formatedValues = [
      0,
      0,
      0,
      0,
    ];

    const counters = [
      0,
      0,
      0,
      0,
    ];

    if ('Sumatoria' === averageTypes.sumatoria) {
      values.forEach((item) => {
        const index = moment(item.date).year() - 2016;
        const value = formatedValues[index]; // sorry
        formatedValues[index] = value + Number(item.value);
      });
    } else {
      values.forEach((item) => {
        const index = moment(item.date).year() - 2016;
        const value = formatedValues[index]; // sorry
        formatedValues[index] = value + Number(item.value);
        counters[index] += 1;
      });

      let cont = 0;
      formatedValues.forEach((item) => {
        const count = counters[cont];

        if (count > 0) {
          formatedValues[cont] = item / count;
        }

        cont += 1;
      });
    }
    return formatedValues;
  };

  const getWaterValuesOrderedByTrimester = (values) => {
    const formatedValues = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ];

    if (calculationForm === averageTypes.sumatoria) {
      values.forEach((item) => {
        const yearValue = (moment(item.data).year() - 2016) * 4;
        const trimesterValue = Math.floor(moment(item.data).month() / 3);
        const value = formatedValues[yearValue + trimesterValue];
        formatedValues[yearValue + trimesterValue] = value + Number(item.value);
      });
    } else {
      const counters = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ];

      values.forEach((item) => {
        const yearValue = (moment(item.data).year() - 2016) * 4;
        const trimesterValue = Math.floor(moment(item.data).month() / 3);
        const value = formatedValues[yearValue + trimesterValue];
        formatedValues[yearValue + trimesterValue] = value + Number(item.value);
        counters[yearValue + trimesterValue] = counters[yearValue + trimesterValue] + 1;
      });

      let cont = 0;
      formatedValues.forEach((item) => {
        const count = counters[cont];

        if (count > 0) {
          formatedValues[cont] = item / count;
        }

        cont += 1;
      });
    }

    return formatedValues;
  };

  const getWaterValuesOrderedByMonth = (values) => {
    const formatedValues = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ];

    if (calculationForm === averageTypes.sumatoria) {
      values.forEach((item) => {
        const value = formatedValues[moment(item.date).month()];
        if (moment(item.date).year() === Number(selectedYear)) {
          formatedValues[moment(item.date).month()] = value + Number(item.value);
        }
      });
    } else {
      const counters = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ];

      values.forEach((item) => {
        const index = moment(item.date).month();
        const value = formatedValues[index];
        if (moment(item.date).year() === Number(selectedYear)) {
          formatedValues[index] = value + Number(item.value);
          counters[index] += 1;
        }
      });

      let cont = 0;
      formatedValues.forEach((item) => {
        const count = counters[cont];

        if (count > 0) {
          formatedValues[cont] = item / count;
        }

        cont += 1;
      });
    }

    return formatedValues;
  };

  // const styleNewChart2 = !newChart2 ? { display: 'none' } : {};
  // const styleNewChart3 = !newChart3 ? { display: 'none' } : {};

  const styleChartDescription1 = {
    color: 'white',
    'font-weight': 'bold',
  };

  // const styleChartDescription2 = {
  //   color: 'red',
  //   opacity: '0.7',
  //   display: newChart2 || newChart3 ? '' : 'none',
  //   'font-weight': 'bold',
  // };

  // const styleChartDescription3 = {
  //   color: 'yellow',
  //   opacity: '0.9',
  //   display: newChart2 && newChart3 ? '' : 'none',
  //   'font-weight': 'bold',
  // };

  const getData = (pSelectedSection, pSelectedValue) => {
    const dataValues = [];
    _.mapObject(water.data, (waterItem) => {
      if (waterItem[pSelectedSection] && waterItem[pSelectedSection][pSelectedValue]) {
        waterDataValues.push({
          date: waterItem.date,
          value: waterItem[pSelectedSection][pSelectedValue],
        });
      }
    });

    switch (selectedPeriod) {
      case 'Años':
        return getWaterValuesOrderedByYear(waterDataValues);
      case 'Trimestres':
        return getWaterValuesOrderedByTrimester(waterDataValues);
      case 'Meses':
        return getWaterValuesOrderedByMonth(waterDataValues);
      default:
        getWaterValuesOrderedByMonth(waterDataValues);
    }
  };

  // const handleButtonClick = () => {
  //   if (!newChart2) {
  //     updNewChart2(true);
  //   } else {
  //     updNewChart3(true);
  //   }
  // };

  // const convertData = () => {
  //   const data = getChartData();
  //   const { series, ...other } = data;

  //   const newSeries = {};
  //   series.map((item, key) => newSeries[`data${key}`] = item);

  //   return { ...newSeries, ...other };
  // };

  const getChartData = () => {
    const formatedData = { labels: [], data: [] };

    switch (selectedPeriod) {
      case 'Años':
        formatedData.labels = yearsLabels;
        break;
      case 'Trimestres':
        formatedData.labels = trimestersLabels;
        break;
      case 'Meses':
        formatedData.labels = monthsLabels;
        break;
      default:
        formatedData.labels = monthsLabels;
    }

    const series = [];
    series.push(getData(selectedSection, selectedValue));

    if (newChart2) {
      series.push(getData(selectedSection2, selectedValue2));
    }

    if (newChart3) {
      series.push(getData(selectedSection3, selectedValue3));
    }

    formatedData.series = series;

    return formatedData;
  };


  // const getChartTextDescription1 = () => {
  //   const tipo = typeChart === chartTypes.line ? 'Línea 1 - ' : 'Barra 1 - ';

  //   return `${tipo} Sección:  '${selectedSection}' y Valor:  '${selectedValue}'`;
  // };

  // const getChartTextDescription2 = () => {
  //   const tipo = typeChart === chartTypes.line ? 'Línea 2 - ' : 'Barra 2 - ';
  //   let section = '';
  //   let valor = '';

  //   if (newChart2) {
  //     section = selectedSection2;
  //     valor = selectedValue2;
  //   } else if (!newChart2 && newChart3) {
  //     section = selectedSection3;
  //     valor = selectedValue3;
  //   }

  //   return `${tipo} Sección:  '${section}' y Valor:  '${valor}'`;
  // };

  // const getChartTextDescription3 = () => {
  //   const tipo = typeChart === chartTypes.line ? 'Línea 3 - ' : 'Barra 3 - ';

  //   return `${tipo} Sección:  '${selectedSection3}' y Valor:  '${selectedValue3}'`;
  // };

  // const getDescriptionCharts = () => (
  //     <div>
  //       <p style={styleChartDescription1}>{getChartTextDescription1()}</p>
  //       <p style={styleChartDescription2}>{getChartTextDescription2()}</p>
  //       <p style={styleChartDescription3}>{getChartTextDescription3()}</p>
  //     </div>

  //   );

  const getChartComponent = () => {
    const typeChart = 'line';
    if (typeChart === chartTypes.line) {
      return (
        <ChartistGraph
          className="ct-chart"
          data={{}}
          type={chartTypes.line}
          listener={animation}
        />
      );
    }
    return (
      <div>
        <ChartistGraph
          className="ct-chart"
          data={{}}
          type={chartTypes.bar}
          listener={animation}
        />
      </div>
    );
  };

  return (
    !_.isEmpty(data)
      ? (
        <Card chart>
          <CardHeader color="success">
            <GridContainer>
              <GridItem md={12}>
                {getChartComponent()}
              </GridItem>
              <GridItem md={6}>
                {/* {getDescriptionCharts()} */}
              </GridItem>
              <GridItem md={4} />
            </GridContainer>
          </CardHeader>
          <CardBody />
        </Card>
      ) : null
  );
};

Chart.propTypes = {
  data: PropTypes.object.isRequired,
  removeFavourite: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Chart);
