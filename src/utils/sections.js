import _ from 'underscore';
import { unwatchFile } from 'fs';

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

const getLabelFromJson = (json) => {
  const keys = Object.keys(json);
  let label = '';

  if(keys.includes('label')) {
    label = json.label;
  } else {
    label = json.fields[0].label;
  }
  
  console.log('label ', label);
  return label;
}

const getSectionName = (name) => {
  let nameValue = '';
  const typeName = typeof(name);

  if(typeName === 'string') {
    nameValue = name;
  } else {
    const label = getLabelFromJson(name);
    nameValue = label.toString();
  }

  const e = nameValue.replace(/([A-Z])/g, ' $1');
  return e.charAt(0).toUpperCase() + e.slice(1);
};

const translateSections = (section) => {
  let returnValue = section;
  
  sections.forEach(item => {
    if(section === item.key) {
      returnValue = item.label;
    }
  });

  return returnValue;
}

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
  getDynamicFields, getSectionName, sections, getDynamicSections, translateSections
};
