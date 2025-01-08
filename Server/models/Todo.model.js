import mongoose from 'mongoose';

//define schema 

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        minglength: 3,
        maxlength: 255,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        minglength: 3,
        maxlength: 1024,
        required: true,
        trim: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

//create model 
const Todo = mongoose.model("Todo", todoSchema);
export { Todo }; // export default Todo 