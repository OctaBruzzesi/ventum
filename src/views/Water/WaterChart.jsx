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

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle';

import { getDynamicSections } from '../../utils/sections';
import { monthsLabels, animation } from '../../utils/charts';

// data: {
//   labels: ["M", "T", "W", "T", "F", "S", "S"],
//   series: [[12, 17, 7, 17, 23, 18, 38]]
// }

const WaterChart = ({ water, classes }) => {
  const [selectedValue, selectValue] = useState('nitrato');
  const [selectedSection, selectSection] = useState('artificalMinerals');

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

  const getChartData = () => {
    const formatedData = { labels: monthsLabels, data: [] };
    const waterDataValues = [];
    _.mapObject(water.data, (waterItem) => {
      if (waterItem[selectedSection] && waterItem[selectedSection][selectedValue]) {
        waterDataValues.push({
          date: waterItem.date,
          value: waterItem[selectedSection][selectedValue],
        });
      }
    });

    formatedData.series = [getWaterValuesOrderedByMonth(waterDataValues)];
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
            </GridContainer>
          </CardBody>
        </Card>
      )
      : null
  );
};

WaterChart.propTypes = {
  water: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(WaterChart);
