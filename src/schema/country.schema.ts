import { object, string } from 'zod';

export const createSessionSchema = object({
    body: object({
        name: string({
            required_error: "Country name is required."
        }),
        code: string({
            required_error: "Country code is required."
        }),
        currencyCode: string({}).length(3, "The expected length of the currency code is 3 characters."),
        currencySymbol: string({}).length(1, "The expected length of currency symbol is 1 character."),
        dialingCode: string({}),
        flagIcon: string({})
    })
});