import mongoose from 'mongoose';


const castingEnrollmentSchema = new mongoose.Schema(
  {
    casting: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Casting',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    movieName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    userImage: {
			type: Object,
			default: {},
			required: true
		},
    phoneNumber: {
			type: Number,
			required: true
		},
		isEdited: { type: Boolean, default: false },

  },
  { timestamps: true }
);

const CastingEnrollment = mongoose.model('CastingEnrollment', castingEnrollmentSchema);

export default CastingEnrollment;
