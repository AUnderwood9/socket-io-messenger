let getExistingElement = (elementToFind, arrToSearch) => {

    console.log("--Array to check--", arrToSearch);

    // if(arrToSearch.length > 0)
    //     return arrToSearch[arrToSearch.indexOf(elementToFind)];
    // else
    //     return undefined;

    console.log("--searching--", arrToSearch == null ?  undefined : arrToSearch[arrToSearch.indexOf(elementToFind)]);

    return arrToSearch == null ? undefined : arrToSearch[arrToSearch.indexOf(elementToFind)];
  }

let isUndefined = (varToCheck) => {
    return varToCheck == undefined ? true : false;
  }

  module.exports = {
      getExistingElement,
      isUndefined
  };