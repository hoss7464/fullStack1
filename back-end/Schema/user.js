import { Schema } from "mongoose";

export default new Schema({
    username : {
        type: String,
        required: true,
        unique : true,
    },
    email : {
        type: String,
        required: true,
        unique : true,
    },
    emailHash : {
        type: String,
        unique : true,
    },
    phone : {
        type: String,
        required: true,
        unique : true,
    },
    password : {
        type: String,
        required: true,
        
    },
    register_date_time : {
        type : Date,
    },

})