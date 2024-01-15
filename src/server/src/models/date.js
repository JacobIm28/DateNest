import mongoose from 'mongoose';
import validator from 'validator';

// Schema for a date
const exDateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
  },
  phoneNumber: {
    type: String,
    // validate(value) {
    //   if(!validator.isMobilePhone(value)){
    //     throw new Error('Enter a valid phone number')
    //   }
    // }
  },
  numberOfDates: {
    type: Number,
  },
  lastDate: {
    type: String,
    // validate(value) {
    //   if(!validator.isDate(value)){
    //     throw new Error("Enter a valid date")
    //   }
    // }
  },
  image: {
    type: String
  },
  notes: {
    type: String
  }
})

// Adding schema to a model
const ExDate = mongoose.model('ExDate', exDateSchema)

export default ExDate