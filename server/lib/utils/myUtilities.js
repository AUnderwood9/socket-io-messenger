"use strict";

var getExistingElement = function getExistingElement(elementToFind, arrToSearch) {

    console.log("--Array to check--", arrToSearch);

    // if(arrToSearch.length > 0)
    //     return arrToSearch[arrToSearch.indexOf(elementToFind)];
    // else
    //     return undefined;

    console.log("--searching--", arrToSearch == null ? undefined : arrToSearch[arrToSearch.indexOf(elementToFind)]);

    return arrToSearch == null ? undefined : arrToSearch[arrToSearch.indexOf(elementToFind)];
};

var isUndefined = function isUndefined(varToCheck) {
    return varToCheck == undefined ? true : false;
};

module.exports = {
    getExistingElement: getExistingElement,
    isUndefined: isUndefined
};