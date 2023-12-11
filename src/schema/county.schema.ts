import { TypeOf, object, string } from 'zod';

const payload = {
    body: object({
        name: string({
            required_error: "County/local government name is required."
        }),
        code: string({}).max(3, "The expected maximum length for county/local government code is 3 characters.")
    })
};

const params = {
    params: object({
        stateId: string({
            required_error: "stateId is required."
        })
    })
};

const countyParams = {
    params: object({
        id: string({
            required_error: "Id is required."
        })
    })
};

const queries = {
    query: object({
        stateId: string({
            required_error: "stateId id required."
        })
    })
}

export const createCountySchema = object({
    ...payload,
    ...params
});

export const updateCountySchema = object({
    ...payload,
    ...countyParams
});

export const deleteCountySchema = object({
    ...countyParams
});

export const findCountySchema = object({
    ...countyParams
});

export const findByStateSchema = object({
    ...queries
})

export type CreateCountyInput = TypeOf<typeof createCountySchema>;
export type UpdateCountyInput = TypeOf<typeof updateCountySchema>;
export type DeleteCountyInput = TypeOf<typeof deleteCountySchema>;
export type FindCountyInput = TypeOf<typeof findCountySchema>;
export type FindByStateInput = TypeOf<typeof findByStateSchema>;