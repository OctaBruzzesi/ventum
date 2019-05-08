import _ from 'underscore';

const filterFields = ['id', 'location', 'date', 'notes'];

const getDynamicFields = (data) => {
  const newData = data.filter(item => _.isObject(item) && !_.contains(filterFields, item));
  console.log(newData);
};

const getDynamicSections = (data) => {
  const sections = [];

  data.forEach((item, index) => {
    if (!_.contains(filterFields, index)) {
      sections.push(index);
    }
  });

  return sections;
};

const getSectionName = (name) => {
  const e = name.replace(/([A-Z])/g, ' $1');
  return e.charAt(0).toUpperCase() + e.slice(1);
};

export { getDynamicFields, getSectionName, getDynamicSections };
