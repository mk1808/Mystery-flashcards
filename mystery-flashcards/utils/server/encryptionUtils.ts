import bcrypt from 'bcrypt';

const NUMBER_OF_SALT_ROUNDS = 10;

export async function checkPasswordMatch(passedPassword: string, savedPassword: string) {
    return await bcrypt.compare(passedPassword, savedPassword);
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS);
}