import * as argon2 from "argon2";

export type PasswordObj = {
    hash: string;
    passwd: string;
};

export async function hashPassword(password: string): Promise<string | void> {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        throw err;
    }
}

export async function verifyPassword(
    passwdObj: PasswordObj
): Promise<boolean | void> {
    try {
        const { hash, passwd } = passwdObj;
        const isMatch = await argon2.verify(hash, passwd);
        return isMatch;
    } catch (err) {
        throw err;
    }
}
