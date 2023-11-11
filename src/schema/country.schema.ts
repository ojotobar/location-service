import { TypeOf, object, string } from 'zod';

const payload = {
    body: object({
        name: string({
            required_error: "Country name is required."
        }),
        code: string({
            required_error: "Country code is required."
        }),
        currencyCode: string({}).max(3, "The maximum length of the currency code is 3 characters."),
        currencySymbol: string({}).length(1, "The expected length of currency symbol is 1 character."),
        dialingCode: string({}),
        flagIcon: string({})
    })
};

const params = {
    params: object({
        countryId: string({
            required_error: "countryId is required."
        })
    })
};

export const createCountrySchema = object({
    ...payload
});

export const updateCountrySchema = object({
    ...payload,
    ...params
});

export const deleteCountrySchema = object({
    ...params
});

export const findCountrySchema = object({
    ...params
});

export type CreateCountryInput = TypeOf<typeof createCountrySchema>;
export type UpdateCountryInput = TypeOf<typeof updateCountrySchema>;
export type DeleteCountryInput = TypeOf<typeof deleteCountrySchema>;
export type FindCountryInput = TypeOf<typeof findCountrySchema>;