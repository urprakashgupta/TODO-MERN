import express from 'express';

import authorization from '../middlewares/authorization.js';
import validateObject from '../middlewares/validateObjectId.js';
import {
    createTodo,
    deleteTodoById,
    getAllTodos,
    getTodoById,
    updateTodoById,
} from '../controllers/todoController.js';
import validateObjectId from '../middlewares/validateObjectId.js';

const router = express.Router();

router
    .route('/')
    .get(authorization, getAllTodos)
    .post(authorization, createTodo);


router
    .route('/:id')
    .get(validateObjectId, authorization, getTodoById)
    .put(validateObjectId, authorization, updateTodoById)
    .delete(validateObjectId, authorization, deleteTodoById);

export default router;
