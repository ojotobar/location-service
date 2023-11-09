import {TypeOf, object, string} from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(8, 'Password too short - must be at least 8 characters long'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Please enter a valid email address.')
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password and confirm password do not match",
        path: ['passwordConfirmation']
    })
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;