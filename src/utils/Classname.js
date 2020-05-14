"use strict";
exports.__esModule = true;
exports.buildClassname = function (classname, args) {
    var classNameArray = [];
    classNameArray.push(classname);
    // @ts-ignore
    args.forEach(function (value, key) {
        switch (key) {
            case "valid":
                value
                    ? classNameArray.push("is-valid")
                    : classNameArray.push("is-invalid");
            case "disabled":
                value && classNameArray.push("disable");
            default:
                break;
        }
    });
    return classNameArray.reduce(function (previousValue, currentValue) { return previousValue + " " + currentValue; });
};
