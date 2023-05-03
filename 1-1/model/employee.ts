import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

// Document interface
interface Employee {
  firstName: string
  lastName: string
  gender: string
  birth: Date,
  phoneNumber:string
  city:string
  position:string
  company:string
}

// Schema
const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        match: /^[a-zA-Z ,']+$/i
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        match: /^[a-zA-Z ,']+$/i,
    },
    gender : {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    birth: {
        type:Date,
        required:true
    },
    phoneNumber:{
        type:String,
        unique:true,
        // validate: [
        //     {
        //         validator: arr => {
        //             return arr.every((num) => typeof num === "string");
        //         },
        //             message: "array items must be type of String"
        //         },
        //         {
        //             validator: arr => {
        //                 return Array.isArray(arr);
        //             },
        //             message: "phoneNumber must be type of array of strings"
        //         },
        //         {
        //             validator: arr => {
        //                 return arr.length > 0;
        //             },
        //             message: "at least 1 phone number required"
        //         },
        //         {
        //             validator: arr => {
        //                 return arr.every(item => /^(\+98)9\d{9}$/.test(item));
        //             },
        //             message: "phone number must be format of : +98-9-???-??-??"
        //         },
        //         {
        //             validator: function(arr) {
        //                 return arr.length === new Set(arr).size;
        //             },
        //             message: 'Names array must contain unique elements'
        //         }
        //     ]
    },
    city: {
        type: String,
        minLength: 3,
        maxLength: 30,
        trim: true,
        defualt:"not-set",
        match: /^[a-zA-Z ,']+$/i
    },
    position: {
        type: String,
        enum: ["manager", "employee"],
        defualt: "employee"
    },
    company: {
        type: String,
        required: true
    }

},{
    timestamps: true
});

export const employeeModel = mongoose.model("Employee",EmployeeSchema)