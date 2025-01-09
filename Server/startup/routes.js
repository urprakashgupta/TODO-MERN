import express from 'express';

import signinRoute from '../routes/signinRoute.js';
import signupRoute from '../routes/signupRoute.js';
import todoRoute from '../routes/todoRoute.js';
import error from '../middlewares/error.js';

const routes = app => {
    app.use(express.json());
    app.use('/api/signup', signupRoute);
    app.use('/api/signin', signinRoute);
    app.use('/api/todos', todoRoute);
    app.use(error)
};

export default routes;