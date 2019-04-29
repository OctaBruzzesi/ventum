import _ from 'underscore';

const getDynamicFields = (data) => {
  const filterFields = ['id', 'location', 'date', 'notes'];
  const newData = data.filter(item => _.isObject(item) && !_.contains(filterFields, item));
  console.log(newData);
};

export { getDynamicFields };
