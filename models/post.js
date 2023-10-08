const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  likes: [
    {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    {
      default: [],
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: [],
    }
  ]
});

PostSchema.virtual('date_formatted').get(function() {
  return this.date ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_SHORT) : null;
});

module.exports = mongoose.model('Post', PostSchema);