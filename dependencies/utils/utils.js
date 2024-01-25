
class Utils {
    constructor() {
        this.name = 'Utils';
    }

    GetValuesFromMap(value, key) {
        const map = new Map(value).get(key);
        return map;
    }

    IsNumber(value) {
        return !isNaN(value);
    }

    IsString(value) {
        return typeof value === 'string' || value instanceof String;
    }

}

const utilsClass = new Utils();


module.exports = {
    Utils: Utils,
    IsNumber: utilsClass.IsNumber,
    IsString: utilsClass.IsString,
    GetValuesFromMap: utilsClass.GetValuesFromMap
}