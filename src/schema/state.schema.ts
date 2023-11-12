import { TypeOf, object, string } from 'zod';

const payload = {
    body: object({
        name: string({
            required_error: "State name is required."
        }),
        code: string({}).max(3, "The expected length for state code is 3 characters.")
    })
};

const params = {
    params: object({
        countryId: string({
            required_error: "countryId is required."
        })
    })
};

const stateParams = {
    params: object({
        id: string({
            required_error: "Id is required."
        })
    })
};

const queries = {
    query: object({
        countryId: string({
            required_error: "countryId id required."
        })
    })
}

export const createStateSchema = object({
    ...payload,
    ...params
});

export const updateStateSchema = object({
    ...payload,
    ...stateParams
});

export const deleteStateSchema = object({
    ...stateParams
});

export const findStateSchema = object({
    ...stateParams
});

export const findByCountrySchema = object({
    ...queries
})

export type CreateStateInput = TypeOf<typeof createStateSchema>;
export type UpdateStateInput = TypeOf<typeof updateStateSchema>;
export type DeleteStateInput = TypeOf<typeof deleteStateSchema>;
export type FindStateInput = TypeOf<typeof findStateSchema>;
export type FindByCountryInput = TypeOf<typeof findByCountrySchema>;