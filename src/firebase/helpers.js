import { database } from './firebase';

const getItem = (section, id) => database.collection(section).doc(id).get()
  .then((document) => {
    return document.data();
  });

export { getItem };
