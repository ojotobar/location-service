import { object, string } from 'zod';

export const createCountySchema = object({
    body: object({
        name: string({
            required_error: "County/local government name is required."
        }),
        code: string({}).length(3, "The expected length for county/local government code is 3 characters.")
    })
});