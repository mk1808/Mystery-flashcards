"use client"

import { useState, useEffect } from "react";
import Image from 'next/image'
import Title from "../common/Title";
import { UserT } from "@/models/User";
import UserEditForm from "./UserEditForm";
import { getWhoAmi } from "@/utils/client/ApiUtils";
import UserAvatar from "../common/UserAvatar";

export default function UserEdit({ dictionary }: { dictionary: any }) {
    const [currentUser, setCurrentUser] = useState<UserT>();
    const [imageSrcError, setImageSrcError] = useState(false);

    useEffect(() => {
        getWhoAmi().then(user => setCurrentUser(user));
    }, [])

    return (
        <div>
            <div className="divider"></div>
            <Title text={dictionary.common.userAccountEdit} />
            <div className="grid grid-cols-2 gap-4">
                {renderUserAvatar()}

                {renderUserEditForm()}
            </div>
        </div>
    )

    function renderUserAvatar() {
        return <UserAvatar alt={dictionary.common.userAvatarAlt} currentUser={currentUser} />
    }

    function renderUserEditForm() {
        if (currentUser) {
            return <UserEditForm dictionary={dictionary} user={currentUser} />
        }
        return <span className="loading loading-ball loading-lx"></span>
    }
}