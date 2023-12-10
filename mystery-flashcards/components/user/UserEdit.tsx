"use client"

import { useState, useEffect } from "react";
import Image from 'next/image'
import Title from "../common/Title";
import useRest from "@/hooks/useRest";
import { UserT } from "@/models/User";
import UserEditForm from "./UserEditForm";

export default function UserEdit({ dictionary }: { dictionary: any }) {
    const [currentUser, setCurrentUser] = useState<UserT>();
    const getWhoAmi = useRest().getWhoAmi;
    const [imageSrcError, setImageSrcError] = useState(false);

    useEffect(() => {
        getWhoAmi().then(user => setCurrentUser(user));
    }, [])

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
        const defaultAvatar = "/images/defaultAvatar.jpg"
        const avatarSrc = imageSrcError ? defaultAvatar : currentUser?.avatar || defaultAvatar;
        return (
            <div className="grid justify-items-center items-center ">
                <img
                    src={avatarSrc}
                    width={300}
                    height={200}
                    onError={() => setImageSrcError(true)}
                    alt={dictionary.common.userAvatarAlt}
                />
            </div>
        );
    }

    function renderUserEditForm() {
        if (currentUser) {
            return <UserEditForm dictionary={dictionary} user={currentUser} />
        }
        return <span className="loading loading-ball loading-lx"></span>
    }
}