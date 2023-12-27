import { UserT } from "@/models/User"
import MyInput from "../common/form/MyInput"
import { useForm } from 'react-hook-form';
import { isFieldValid } from "@/utils/client/FormUtils";
import { updateUser } from "@/utils/client/ApiUtils";
import useLocaleStore from "@/stores/useLocaleStore";
import useAlert from "@/hooks/useAlert";

function UserEditForm({ user }: { user: UserT }) {
    const { dictionary } = useLocaleStore(state => state);
    const { addErrorAlert, addSuccessAlert } = useAlert()

    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState
    } = useForm<UserT & { confirmPassword: string }>({
        mode: 'onBlur',
        defaultValues: {
            name: user?.name,
            mail: user?.mail,
            avatar: user?.avatar
        }
    });

    const onSubmit = async (data: UserT, e: any) => {
        try {
            updateUser(data);
            addSuccessAlert(dictionary.common.userUpdated)
            setTimeout(() => {
                location.reload()
            }, 2000)
        } catch (errorResponse: any) {
            addErrorAlert(errorResponse.body.message)
        }
    };
    const onErrors = (errors: any) => { };
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    const validatePassword = (confirmPassword: string) => watch("password") === confirmPassword || dictionary.common.passwordDoNotMatch;

    return (
        <form className="mt-12" onSubmit={handleSubmit(onSubmit, onErrors)}>
            {renderInputs()}
            {renderButtons()}
        </form >
    )

    function renderInputs() {
        return (
            <div>
                <MyInput
                    label={dictionary.common.name}
                    placeholder={dictionary.common.fillName}
                    inputParams={{ ...register("name", { required: true, minLength: 3, disabled: true }) }}
                    isValid={isValid("name")} />
                <MyInput
                    label={dictionary.common.email}
                    placeholder={dictionary.common.fillEmail}
                    type="email"
                    inputParams={{ ...register("mail", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, disabled: true }) }}
                    isValid={isValid("mail")} />
                <MyInput
                    label={dictionary.common.avatar}
                    placeholder={dictionary.common.fillAvatar}
                    inputParams={{ ...register("avatar", { required: false }) }}
                    isValid={isValid("avatar")} />
                <MyInput
                    label={dictionary.common.password}
                    placeholder={dictionary.common.fillPassword}
                    type="password"
                    inputParams={{ ...register("password", { required: false, minLength: 8 }) }}
                    isValid={isValid("password")} />
                <MyInput
                    label={dictionary.common.confirmPassword}
                    placeholder={dictionary.common.fillConfirmPassword}
                    type="password"
                    inputParams={{ ...register("confirmPassword", { required: false, validate: validatePassword }) }}
                    isValid={isValid("confirmPassword")} />
            </div>
        )
    }

    function renderButtons() {
        return (
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button className="btn btn-active btn-primary" disabled={!formState.isValid}>{dictionary.common.save}</button>
            </div>
        )
    }
}

export default UserEditForm