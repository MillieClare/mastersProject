// requires Mongoose
const mongoose = require("mongoose");

// define a schema

const Schema = mongoose.Schema;

const EsgModelSchema = new Schema({
  companyTitle: String,
  companyCountry: String,
  companySector: String,
  reviewCompany: String,
  pdfLink: String,
  wordCount: Number,
});

// compile model from a schema

const EsgModel = mongoose.model("EsgModel", EsgModelSchema);

// - word count
// - company title
// - company country
// - review company
// - company sector
// - eventually TF-IDF ratings for particular words - should the words relate to the sector?
