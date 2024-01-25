

class CustomClass {
    constructor() {
        this.name = '';
        this.time = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" }).replace(" ", "");  
        this.date = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" });
        this.day = new Date().getDay().toString();
        this.var = this.time + " " + this.date + " " + this.day;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    gettime() {
        return this.time;
    }

    getVar() {
        return this.var;
    }

    getdate() {
        return this.date;
    }

    getDay() {
        return this.day;
    }

    

}

module.exports = {
    CustomClass: CustomClass
};