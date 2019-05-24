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
import { getSectionName } from '../../utils/sections';
import {
  monthsLabels, trimestersLabels, yearsLabels, animation, chartText, chartTypes, averageTypes,
} from '../../utils/charts';

const Chart = ({
  data, sections, removeFavourites, classes,
}) => {
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
    values.forEach((item) => {
      const index = moment(item.date).year() - 2016;
      const value = formatedValues[index]; // sorry
      formatedValues[index] = value + Number(item.value);
    });
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
    if (true) {
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
    if (true) {
      values.forEach((item) => {
        const value = formatedValues[moment(item.date).month()];
        if (moment(item.date).year() === Number(data.year)) {
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
        if (moment(item.date).year() === Number(data.selectedYear)) {
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
  const getData = (section, selectedSection, value) => {
    const dataValues = [];
    _.mapObject(sections.water.data, (waterItem) => {
      if (waterItem[selectedSection] && waterItem[selectedSection][value]) {
        dataValues.push({
          date: waterItem.date,
          value: waterItem[selectedSection][value],
        });
      }
    });
    switch (data.period) {
      case 'Años':
        return getWaterValuesOrderedByYear(dataValues);
      case 'Trimestres':
        return getWaterValuesOrderedByTrimester(dataValues);
      case 'Meses':
        return getWaterValuesOrderedByMonth(dataValues);
      default:
        return getWaterValuesOrderedByMonth(dataValues);
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
    switch (data.period) {
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
    data.values.map(item => series.push(getData(item.section, item.selectedSection, item.value)));
    formatedData.series = series;
    return formatedData;
  };

  // const getChartDescription = () => data.values.map(item => `
  //   ${getSectionName(item.section)}
  //   ${getSectionName(item.selectedSection)}
  //   ${getSectionName(item.value)}
  // `);
  const colorsCharts = [
    'white',
    'red',
    'yellow'
  ];
  
  const getPrimarySection = () => {
    const styleChart = {
      'color': 'white',
      'font-weight': 'bold',
    } 

    return(
      <p style={styleChart}>
        Sección Primaria: {getSectionName(data.values[0].section)}
      </p>);
  };

  const getChartDescription = () => {
    let cont = 0;

    return (
      <div>        
        {data.values.map(item => {
          const style = {
            'color': `${colorsCharts[cont]}`,
            'font-weight': 'bold',
            'opacity': '0.9',
          }
          cont++;
          return (
            <p style={style}>
              Sección: {getSectionName(item.selectedSection)} 
              {' --- '}  
              Valor: {getSectionName(item.value)}
            </p>
          );
        })}
      </div>
    )};

  const getChartComponent = () => {
    const typeChart = 'line';
    if (typeChart === 'line') {
      return (
        <ChartistGraph
          className="ct-chart"
          data={getChartData()}
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
                {getPrimarySection()}
              </GridItem>
              <GridItem md={12}>
                {getChartComponent()}
              </GridItem>
              <GridItem md={6}>
              {getChartDescription()}
              </GridItem>
              <GridItem md={4} />
            </GridContainer>
          </CardHeader>          
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
