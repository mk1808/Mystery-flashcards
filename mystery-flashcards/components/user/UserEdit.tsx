
import { use } from "react";
import Image from 'next/image'
import Title from "../common/Title";

export default function UserEdit({ dictionary }: { dictionary: any }) {
    return (
        <div>
            <Title text={dictionary.common.userAccountEdit} />
            <div className="grid grid-cols-2 gap-4">
                {renderUserAvatar()}
                {renderUserEditForm()}
            </div>
        </div>
    )

    function renderUserAvatar() {
        return (
            <div className="grid justify-items-center items-center ">
                <Image
                    src="/images/defaultAvatar.jpg"
                    width={300}
                    height={200}
                    alt={dictionary.common.userAvatarAlt}
                />
            </div>
        );
    }

    function renderUserEditForm() {
        return (
            <form className="mt-12">
                <div>
                    {renderInput()}
                    {renderInput()}
                    {renderInput()}
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button className="btn btn-active btn-primary">Primary</button>
                </div>
            </form >
        )
    }

    function renderInput() {
        return (
            <div className="mt-6">
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">What is your name?</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                </label>
            </div>
        )
    }
}