import bcrypt from 'bcrypt';

export async function checkPasswordMatch(passedPassword: string, savedPassword: string) {
    return await bcrypt.compare(passedPassword, savedPassword);
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, process.env.NUMBER_OF_SALT_ROUNDS!);
}