import moment from "moment"
//We import momentTimeZone  but we don't use it because wen we use tz it goes to momentTimeZone library and shows us time zone 
import momentTimeZone from "moment-timezone"
import momentJalaali from "moment-jalaali"
import {getEnv} from "./utils.js"

class DateTime {
    #timeZone = null
    constructor() {
        this.#timeZone = getEnv("TIME_ZONE")
        
    }
    //Function to get time :
    getTimeStamp() {
        try{
            //momnet.tz ----> shows the time zone 
            //.unix ----> shows the format of time 
            return moment.tz(this.#timeZone).unix()
        }catch(e) {
            return 0 
        }
    }
    //Function to make "YYYY-MM-DD HH:mm:ss"    :
    toString(format = "YYYY-MM-DD HH:mm:ss") {
        try{
            return moment.tz(this.#timeZone).format(format)
        }catch(e){
            return ""
        }
    }
    //Function to give us date and time object we use this to add or subtract or ... days, months and years
    toDateTime(dateTime = "") {
        try{
            return (dateTime === "") ? moment.tz(this.#timeZone) : moment.tz(dateTime ,this.#timeZone)
        }catch(e){
            return null
        }
    }
    //Function to get English date time and give persian date and time :
    //for persian date and time we must set the foramt exactly like this ---> jYYYY-jMM-jDD
    toJalaali(str, format="jYYYY-jMM-jDD") {
        try{
            return momentJalaali(str).format(format)
        }catch(e){
            return ""
        }
    }

    //Function to get Persian date and time and give English date and time :
    toGregorian(str, format="YYYY-MM-DD") {
        try{
            return momentJalaali(str, "jYYYY-jMM-jDD").format(format)
        }catch(e){
            return ""
        }
    }
}

export default new DateTime()
