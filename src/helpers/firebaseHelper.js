const getArrayFromCollection = (collection) => {
  const collectionList = [];
  collection.forEach(document => collectionList.push(document.data()));
  return collectionList;
};

const getObjectFromCollection = (data) => {
  const formatedData = {};
  data.forEach((document) => {
    formatedData[document.id] = document.data();
  });
  return formatedData;
};

export { getArrayFromCollection, getObjectFromCollection };
