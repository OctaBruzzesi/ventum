import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import _ from 'underscore';
import ChartistGraph from 'react-chartist';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Select from 'components/Select/Select';
import Button from 'components/CustomButtons/Button';

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle';

import { getDynamicSections } from '../../utils/sections';
import { monthsLabels, animation, chartText } from '../../utils/charts';

// data: {
//   labels: ["M", "T", "W", "T", "F", "S", "S"],
//   series: [[12, 17, 7, 17, 23, 18, 38]]
// }

const WaterChart = ({ water, classes }) => {
  const [selectedValue, selectValue] = useState('nitrato');
  const [selectedSection, selectSection] = useState('artificalMinerals');

  const [selectedValue2, selectValue2] = useState('hidrogen');
  const [selectedSection2, selectSection2] = useState('artificalMinerals');

  const [selectedValue3, selectValue3] = useState('sulfurum');
  const [selectedSection3, selectSection3] = useState('artificalMinerals');

  const [newChart2, updNewChart2] = useState(false);
  const [newChart3, updNewChart3] = useState(false);

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

    values.forEach((item) => {
      const value = formatedValues[moment(item.date).month()];
      formatedValues[moment(item.date).month()] = value + Number(item.value);
    });

    return formatedValues;
  };

  const styleNewChart2 = !newChart2 ? { display: 'none' } : {};
  const styleNewChart3 = !newChart3 ? { display: 'none' } : {};

  const buttonStyle2 = {
    color: newChart2 ? chartText.redColor : chartText.greenColor,
    text: newChart2 ? chartText.deleteChart : chartText.newChart,
  };

  const buttonStyle3 = {
    color: newChart3 ? chartText.redColor : chartText.greenColor,
    text: newChart3 ? chartText.deleteChart : chartText.newChart,
  };

  const getData = (pSelectedSection, pSelectedValue) => {
    const waterDataValues = [];
    _.mapObject(water.data, (waterItem) => {
      if (waterItem[pSelectedSection] && waterItem[pSelectedSection][pSelectedValue]) {
        waterDataValues.push({
          date: waterItem.date,
          value: waterItem[pSelectedSection][pSelectedValue],
        });
      }
    });

    return getWaterValuesOrderedByMonth(waterDataValues);
  };

  const handleButtonClick = () => {
    if (!newChart2) {
      updNewChart2(true);
    } 
    else {
      updNewChart3(true);
    }
  };

  const getChartData = () => {
    const formatedData = { labels: monthsLabels, data: [] };

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

  return (
    !_.isEmpty(water) && !_.isEmpty(water.form)
      ? (
        <Card chart>
          <CardHeader color="success">
            <ChartistGraph
              className="ct-chart"
              data={getChartData()}
              type="Line"
              listener={animation}
            />
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem md={3}>
                <Select
                  items={Object.keys(water.form)}
                  label="Sección"
                  onChange={e => selectSection(e.target.value)}
                  value={selectedSection}
                />
              </GridItem>
              <GridItem md={3}>
                <Select
                  items={water.form[selectedSection].fields.map(item => item.key)}
                  label="Valor"
                  onChange={e => selectValue(e.target.value)}
                  value={selectedValue}
                />
              </GridItem>
              <GridItem md={3} />
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
                    items={Object.keys(water.form)}
                    label="Sección"
                    onChange={e => selectSection2(e.target.value)}
                    value={selectedSection2}
                  />
                </GridItem>
                <GridItem md={3}>
                  <Select
                    items={water.form[selectedSection2].fields.map(item => item.key)}
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
                    items={Object.keys(water.form)}
                    label="Sección"
                    onChange={e => selectSection3(e.target.value)}
                    value={selectedSection3}
                  />
                </GridItem>
                <GridItem md={3}>
                  <Select
                    items={water.form[selectedSection3].fields.map(item => item.key)}
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(WaterChart);
