import z from 'zod';

//validation using zod for todo

const validateTodoCreation = todo => {
    const schema = z.object({
        title: z.string({
            required_error: 'Title is required',
            invalid_type_error: "Title must be string",
        })
            .trim()
            .min(3, { message: "Must be 3 or more character long" })
            .max(255, { message: "Must be 255 or fewer character long" }),

        description: z.string({
            required_error: 'description is required',
            invalid_type_error: "description must be string",
        })
            .trim()
            .min(3, { message: "description must be 3 character long" })
            .max(1024, { message: "description must 1024 or fewer charactere long" }),

        userId: z.string({
            required_error: "userid is required",
            invalid_type_error: "userid must be a string"
        })
            .refine(val => val.length === 24, { message: "Invalid user id" }),
    });
    return schema.safeParse(todo)
};



//validation login for todo update 
const validateTodoUpdate = todo => {
    const schema = z.object({
        title: z.string({
            invalid_type_error: "Title must be string",
        })
            .trim()
            .min(3, { message: "must be 3 char or more long" })
            .max(255, { message: "must be 255 or fewer character long" })
            .optional(),

        description: z.string({
            invalid_type_error: "description must be a string"
        })
            .trim()
            .min(3, { message: 'Must be 3 or more characters long' })
            .max(1024, { message: 'Must be 1024 or fewer characters long' })
            .optional(),

        isComplete: z.boolean().optional(),
    });


    //check if at least one field is present for updating 
    if (!todo.title && !todo.description && todo.isComplete === undefined) {
        return {
            success: false,
            error: "At least one filed is required for updating",
        };
    }
    return schema.safeParse(todo)
};



//validation logic for user signuup 

const validateUserSignup = user => {
    const schema = z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "name must be a string",
        })
            .trim()
            .min(3, { message: "must be 3 character or more long" })
            .max(255, { message: "must be 255 or fewer character long" }),

        email: z.string({
            required_error: "email is required"
        })
            .email('please enter valid email address'),

        password: z.string({
            required_error: "password is required"
        })
            .min(6, "password must be 6 or more character long")
            .refine(password => {
                //atleast one uppercase , lowecase,onedigit adn one special character
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
                return passwordRegex.test(password);
            }, 'Password must have at least 6 characters , one uppercase , one lowercase, one digit, one special character'),

        confirmPassword: z.string({
            required_error: "confirm password is required",
        }),
    })
        .strict()
        .refine(data => data.password === data.confirmPassword, {
            message: "Passowrd do not match",
            path: ['confirmPassword'],
        });
    return schema.safeParse(user);
};



//validation logic for user signin 
const validateUserSignin = user => {
    const schema = z.object({
        email: z.string({ required_error: 'Email is required' })
            .email('Please enter valid email address'),

        password: z
            .string({ required_error: 'Password is required' })
            .min(1, 'Password is required'),
    })
        .strict();

    return schema.safeParse(user);

}

export {
    validateTodoCreation as validateCreation,
    validateTodoUpdate as validateUpdate,
    validateUserSignup as validateRegister,
    validateUserSignin as validateLogin,
};