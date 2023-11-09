import { object, string } from 'zod';

export const createStateSchema = object({
    body: object({
        name: string({
            required_error: "State name is required."
        }),
        code: string({}).length(3, "The expected length for state code is 3 characters.")
    })
});