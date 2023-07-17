import mongoose  from "mongoose";

const photoSchema = mongoose.Schema({
    title: String,
    description: String,
    photo: {
      data: Buffer,
      contentType: String,
    },
}
)

const Photo = mongoose.model('myphoto',photoSchema)

export default Photo

