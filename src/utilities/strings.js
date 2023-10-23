const isNullOrUndefined = prop => prop === null
  || prop === undefined;
const isEmptyString = prop => isNullOrUndefined(prop)
  || prop === '';
const capitalize = word =>
  word.charAt(0).toUpperCase() +
  word.slice(1).toLowerCase();

function titleFromName(name) {
  if (isEmptyString(name)) {
    return '';
  }

  return name.split(/(?=[A-Z])|\s/).map(s => capitalize(s)).join(' ')
}

function categoryOptionGenerate(categories) {
  let options = [];
  categories.map(category => {
    let newCategoryObject = {
      value: category._id,
      label: category.kategori_adi,
    }
    options.push(newCategoryObject);
  })
  return options;
}

const backendUri = process.env.REACT_APP_BACKEND_URI;

export {
  isNullOrUndefined,
  isEmptyString,
  capitalize,
  titleFromName,
  categoryOptionGenerate,
  backendUri
}