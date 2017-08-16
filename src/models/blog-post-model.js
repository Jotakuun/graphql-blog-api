import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: { 
        type: String,
        enum: ['default', 'article', 'interview', 'review'],
        default: 'default'
    },
    category: { 
        type: String
    },
    content: { 
        type: String
    }
});

export default mongoose.model('BlogPost', blogPostSchema);