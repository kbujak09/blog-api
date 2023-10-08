const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, maxLength: 200, required: true },
  date: { type: Date , required: true } 
});

CommentSchema.virtual('date_formatted').get(function() {
  return this.date ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_SHORT) : null;
});

module.exports = mongoose.model('Comment', CommentSchema);