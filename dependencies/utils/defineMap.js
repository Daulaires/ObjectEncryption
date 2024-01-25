const { CustomClass } = require('../customclass.js');
const custClassInstance = new CustomClass();

module.exports = {    
    custClassInstance: new CustomClass(),
    defineMap:function(name){
        // if name doesn't == string then set to default
        if (typeof name !== 'string'){
            custClassInstance.setName("Default");
        } else {
            custClassInstance.setName(name);
        }
        const classMap = new Map();
        classMap.set(1, {
            getvar: custClassInstance.getVar(), date: custClassInstance.getdate(),
            day: custClassInstance.getDay(), time: custClassInstance.gettime(),
            name: custClassInstance.getName(), name: custClassInstance.getName()
        });
        return classMap;
    }
}