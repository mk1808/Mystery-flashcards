"use client"

import { useState, useEffect } from "react";
import Title from "../common/Title";
import { UserT } from "@/models/User";
import UserEditForm from "./UserEditForm";
import { getWhoAmi } from "@/utils/client/ApiUtils";
import UserAvatar from "../common/UserAvatar";
import useLocaleStore from "@/stores/useLocaleStore";

function UserEdit() {
    const { dictionary } = useLocaleStore(state => state);
    const [currentUser, setCurrentUser] = useState<UserT>();

    useEffect(() => {
        getWhoAmi().then(user => setCurrentUser(user));
    }, [])

    return (
        <div>
            <div className="divider" />
            <Title text={dictionary.common.userAccountEdit} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderUserAvatar()}
                {renderUserEditForm()}
            </div>
        </div>
    )

    function renderUserAvatar() {
        return (
            <UserAvatar alt={dictionary.common.userAvatarAlt} currentUser={currentUser!} />
        )
    }

    function renderUserEditForm() {
        if (currentUser) {
            return <UserEditForm user={currentUser} />
        }
        return <span className="loading loading-ball loading-lx" />
    }
}

export default UserEdit