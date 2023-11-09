import jwt from 'jsonwebtoken';
const assert = require('assert').strict;
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;

assert.ok(privateKey, 'The "PRIVATE_KEY" environment variable is required')
assert.ok(publicKey, 'The "PUBLIC_KEY" environment variable is required')

export const signInJwt = (object: Object, options?: jwt.SignOptions | undefined ) => {
    // return jwt.sign(object, privateKey, {
    //     ...(options && options),
    //     algorithm: 'RS256'
    // });

    return jwt.sign(
        object,
        privateKey,
        { expiresIn: process.env.EXPIRES }
    );
};

export const verifyJwt = (token: string) => {
    try{
        const decoded = jwt.verify(token, privateKey);

        return {
            valid: true,
            expired: false,
            decoded
        };
    } catch (e: any){
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        };
    }
}