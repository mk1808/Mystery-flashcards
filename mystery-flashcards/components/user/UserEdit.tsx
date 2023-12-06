
import { getDictionary } from "@/dictionaries/dictionaries";
import { use } from "react";
import Image from 'next/image'
import Title from "../common/Title";

export default function UserEdit({ locale }: { locale: string }) {
    const dictionary = use(getDictionary(locale));
    return (
        <div>
            <Title text={"Edycja konta"} />
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
                    alt="User avatar"
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
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
            </form >
        )
    }

    function renderInput() {
        return (
            <div className="mt-6">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                <div className="mt-2">
                    <input type="text" name="street-address" id="street-address" autoComplete="street-address"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
        )
    }
}