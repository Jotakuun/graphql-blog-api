import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	blogPostId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BlogPost'
	},
	message: {
		type: String
	},
	likes: {
		type: Number
	}
});

export default mongoose.model('Comment', commentSchema);