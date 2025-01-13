const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins'); // Assuming you have these plugins in your project

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    publishingYear: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 1900) {
          throw new Error('Publishing year must be after 1900');
        }
      },
    },
    image: {
      type: String,
      required: true,
    },    
  },
  {
    timestamps: true, 
  }
);
movieSchema.statics.isTitleTaken = async function (title) {
  const movie = await this.findOne({ title });
  return !!movie; 
};

// Add plugins to the schema (toJSON and paginate) 
movieSchema.plugin(toJSON);
movieSchema.plugin(paginate);

// Create the model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
