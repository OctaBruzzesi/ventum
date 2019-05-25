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

const sections = [
  {
    key: 'water',
    label: 'Agua',
  },
  {
    key: 'environment',
    label: 'Impacto Ambiental',
  },
  {
    key: 'soil',
    label: 'Tierra y Suelo',
  },
  {
    key: 'biodiversity',
    label: 'Biodiversidad',
  },
  {
    key: 'climate',
    label: 'Clima',
  },
  {
    key: 'production',
    label: 'Produccion y Consumo Sustentable',
  },
];

export {
  getDynamicFields, getSectionName, sections, getDynamicSections,
};
