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

import { getDynamicSections, sections, getSectionName } from '../../utils/sections';
import {
  monthsLabels, trimestersLabels, yearsLabels, animation, chartText, chartTypes, averageTypes,
} from '../../utils/charts';

const WaterChart = ({
  water, environment, biodiversity, user, addFavourites, classes,
}) => {
  const [selectedValue, selectValue] = useState('nitrato');
  const [selectedGroup, selectGroup] = useState('artificalMinerals');
  const [selectedSection, selectSection] = useState('water');

  const [selectedValue2, selectValue2] = useState('hidrogen');
  const [selectedGroup2, selectGroup2] = useState('artificalMinerals');
  const [selectedSection2, selectSection2] = useState('water');

  const [selectedValue3, selectValue3] = useState('sulfurum');
  const [selectedGroup3, selectGroup3] = useState('artificalMinerals');
  const [selectedSection3, selectSection3] = useState('water');

  const [newChart2, updNewChart2] = useState(false);
  const [newChart3, updNewChart3] = useState(false);

  const [selectedPeriod, selectPeriod] = useState('Meses');
  const [selectedYear, selectYear] = useState('2019');

  const [calculationForm, setCalculationForm] = useState('Promedio');

  const [typeChart, setTypeChart] = useState(chartTypes.line);

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

    if (calculationForm === averageTypes.sumatoria) {
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

  const styleNewChart2 = !newChart2 ? { display: 'none' } : {};
  const styleNewChart3 = !newChart3 ? { display: 'none' } : {};

  const styleChartDescription1 = {
    color: 'white',
    fontWeight: 'bold',
  };

  const styleChartDescription2 = {
    color: 'red',
    opacity: '0.7',
    display: newChart2 || newChart3 ? '' : 'none',
    fontWeight: 'bold',
  };

  const styleChartDescription3 = {
    color: 'yellow',
    opacity: '0.9',
    display: newChart2 && newChart3 ? '' : 'none',
    fontWeight: 'bold',
  };

  const getData = (pSelectedGroup, pSelectedSection, pSelectedValue) => {
    const waterDataValues = [];
    _.mapObject(getSection(pSelectedSection).data, (waterItem) => {
      if (waterItem[pSelectedGroup] && waterItem[pSelectedGroup][pSelectedValue]) {
        waterDataValues.push({
          date: waterItem.date,
          value: waterItem[pSelectedGroup][pSelectedValue],
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

  const handleButtonClick = () => {
    if (!newChart2) {
      updNewChart2(true);
    } else {
      updNewChart3(true);
    }
  };

  const convertData = () => {
    const data = getChartData();
    const { series, ...other } = data;

    const newSeries = {};
    series.map((item, key) => newSeries[`data${key}`] = item);

    return { ...newSeries, ...other };
  };

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
    series.push(getData(selectedGroup, selectedSection, selectedValue));

    if (newChart2) {
      series.push(getData(selectedGroup2, selectedSection2, selectedValue2));
    }

    if (newChart3) {
      series.push(getData(selectedGroup3, selectedSection3, selectedValue3));
    }

    formatedData.series = series;

    return formatedData;
  };


  const getChartTextDescription1 = () => {
    const tipo = typeChart === chartTypes.line ? 'Línea 1 - ' : 'Barra 1 - ';

    return `${tipo} Sección:  '${selectedSection}', Grupo: '${selectedGroup}' Valor:  '${selectedValue}'`;
  };

  const getChartTextDescription2 = () => {
    const tipo = typeChart === chartTypes.line ? 'Línea 2 - ' : 'Barra 2 - ';
    let section = '';
    let group = '';
    let valor = '';

    if (newChart2) {
      section = selectedSection2;
      group = selectedGroup2;
      valor = selectedValue2;
    } else if (!newChart2 && newChart3) {
      section = selectedSection3;
      group = selectedGroup3;
      valor = selectedValue3;
    }

    return `${tipo} Sección:  '${section}', Grupo: '${group}' y Valor:  '${valor}'`;
  };

  const getChartTextDescription3 = () => {
    const tipo = typeChart === chartTypes.line ? 'Línea 3 - ' : 'Barra 3 - ';

    return `${tipo} Sección:  '${selectedSection3}', '${selectedGroup}' y Valor:  '${selectedValue3}'`;
  };

  const getDescriptionCharts = () => (
    <div>
      <p style={styleChartDescription1}>{getChartTextDescription1()}</p>
      <p style={styleChartDescription2}>{getChartTextDescription2()}</p>
      <p style={styleChartDescription3}>{getChartTextDescription3()}</p>
    </div>
  );

  const handleAddFavourites = () => {
    const values = [];

    values.push({ section: selectedSection, selectedSection: selectedGroup, value: selectedValue });

    if (newChart2) {
      values.push({ section: selectedSection2, selectedSection: selectedGroup2, value: selectedValue2 });
    }

    if (newChart3) {
      values.push({ section: selectedSection3, selectedSection: selectedGroup3, value: selectedValue3 });
    }

    addFavourites({
      typeChart,
      period: selectedPeriod,
      user: user.email,
      values,
      year: selectedPeriod === 'Meses' ? selectedYear : '',
    });
  };

  const getChartComponent = () => {
    if (typeChart === chartTypes.line) {
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
          data={getChartData()}
          type={chartTypes.bar}
          listener={animation}
        />
      </div>
    );
  };

  const getSection = (e) => {
    switch (e) {
      case 'water':
        return water;
      case 'environment':
        return environment;
      case 'biodiveristy':
        return biodiversity;
      default:
        return water;
    }
  };

  return (
    !_.isEmpty(water) && !_.isEmpty(water.form)
      ? (
        <Card chart>
          <CardHeader color="success">
            <GridContainer>
              <GridItem md={4}>
                <Select
                  items={[chartTypes.line, chartTypes.bar]}
                  onChange={e => setTypeChart(e.target.value)}
                  label="Tipo Gráfica"
                  color="white"
                  value={typeChart}
                />
              </GridItem>
              <GridItem md={7} />
              <GridItem md={1}>
                <Star
                  onClick={() => handleAddFavourites()}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem md={10}>
                {getChartComponent()}
              </GridItem>
              <GridItem md={2}>
                <Select
                  items={['Años', 'Trimestres', 'Meses']}
                  onChange={e => selectPeriod(e.target.value)}
                  label="Periodo"
                  color="white"
                  value={selectedPeriod}
                />
                {
                  selectedPeriod === 'Meses'
                  && (
                    <Select
                      items={yearsLabels}
                      onChange={e => selectYear(e.target.value)}
                      label="Año"
                      color="white"
                      value={selectedYear}
                    />
                  )
                }
              </GridItem>
              <GridItem md={6}>
                {getDescriptionCharts()}
              </GridItem>
              <GridItem md={4} />
              <GridItem md={2}>
                <Select
                  items={[averageTypes.promedio, averageTypes.sumatoria]}
                  onChange={e => setCalculationForm(e.target.value)}
                  label="Cálculo"
                  color="white"
                  value={calculationForm}
                />
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem md={3}>
                <Select
                  items={sections.map(section => section.key)}
                  label="Sección"
                  disabled
                  onChange={e => selectSection(e.target.value)}
                  value={selectedSection}
                />
              </GridItem>
              <GridItem md={3}>
                <Select
                  items={Object.keys(getSection(selectedSection).form)}
                  label="Grupo"
                  onChange={e => selectGroup(e.target.value)}
                  value={selectedGroup}
                />
              </GridItem>
              <GridItem md={3}>
                <Select
                  items={getSection(selectedSection).form[selectedGroup].fields.map(item => item.key)}
                  label="Valor"
                  onChange={e => selectValue(e.target.value)}
                  value={selectedValue}
                />
              </GridItem>
              <GridItem md={3}>
                <Button
                  color={chartText.greenColor}
                  disabled={newChart2 && newChart3}
                  onClick={handleButtonClick}
                >
                  { chartText.newChart }
                </Button>
              </GridItem>
            </GridContainer>

            <div style={styleNewChart2}>
              <GridContainer>
                <GridItem md={3}>
                  <Select
                    items={sections.map(section => section.key)}
                    label="Sección"
                    onChange={(e) => {
                      selectSection2(e.target.value);
                      const keys = Object.keys(getSection(e.target.value).form);
                      selectGroup2(getSection(e.target.value).form[keys[0]]);
                    }}
                    value={selectedSection2}
                  />
                </GridItem>
                <GridItem md={3}>
                  <Select
                    items={Object.keys(getSection(selectedSection2).form)}
                    label="Grupo"
                    onChange={e => selectGroup2(e.target.value)}
                    value={selectedGroup2}
                  />
                </GridItem>
                <GridItem md={3}>
                  <Select
                    items={
                      getSection(selectedSection2).form[selectedGroup2]
                        ? getSection(selectedSection2).form[selectedGroup2].fields.map(item => item.key)
                        : []
                    }
                    label="Valor"
                    onChange={e => selectValue2(e.target.value)}
                    value={selectedValue2}
                  />
                </GridItem>
                <GridItem md={3}>
                  <Button
                    color={chartText.redColor}
                    onClick={() => updNewChart2(false)}
                  >
                    { chartText.deleteChart }
                  </Button>
                </GridItem>
              </GridContainer>
            </div>

            <div style={styleNewChart3}>
              <GridContainer>
                <GridItem md={3}>
                  <Select
                    items={sections.map(section => section.key)}
                    label="Sección"
                    onChange={(e) => {
                      selectSection3(e.target.value);
                      const keys = Object.keys(getSection(e.target.value).form);
                      selectGroup3(getSection(e.target.value).form[keys[0]]);
                    }}
                    value={selectedSection3}
                  />
                </GridItem>
                <GridItem md={3}>
                  <Select
                    items={Object.keys(getSection(selectedSection3).form)}
                    label="Sección"
                    onChange={e => selectGroup3(e.target.value)}
                    value={selectedGroup3}
                  />
                </GridItem>
                <GridItem md={3}>
                  <Select
                    items={
                      getSection(selectedSection3).form[selectedGroup3]
                        ? getSection(selectedSection3).form[selectedGroup3].fields.map(item => item.key)
                        : []
                    }
                    label="Valor"
                    onChange={e => selectValue3(e.target.value)}
                    value={selectedValue3}
                  />
                </GridItem>
                <GridItem md={3}>
                  <Button
                    color={chartText.redColor}
                    onClick={() => updNewChart3(false)}
                  >
                    { chartText.deleteChart }
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          </CardBody>
        </Card>
      ) : null
  );
};

WaterChart.propTypes = {
  water: PropTypes.object.isRequired,
  addFavourites: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(WaterChart);
