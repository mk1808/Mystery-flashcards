import { UserRanges } from "@/enums/UserRang"
import User from "@/models/User"
import { hashPassword } from "@/utils/server/encryptionUtils"

export function checkPasswordDoNotMatch(registerForm: RegisterForm) {
    return registerForm.password !== registerForm.confirmPassword
}

export async function checkIfUserExists(registerForm: RegisterForm) {
    return !!await User.findOne({ name: registerForm.name })
}

export async function createUser(registerForm: RegisterForm) {
    return {
        mail: registerForm.mail,
        name: registerForm.name,
        password: await hashPassword(registerForm.password),
        points: 0,
        avatar: "",
        rang: UserRanges[0].id
    }
}