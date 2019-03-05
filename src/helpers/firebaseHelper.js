const getArrayFromCollection = (collection) => {
  const collectionList = [];
  collection.forEach(document => collectionList.push(document.data()));
  return collectionList;
};

export { getArrayFromCollection };
