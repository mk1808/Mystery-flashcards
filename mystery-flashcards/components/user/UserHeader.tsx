"use client"

import { useState, useEffect } from "react";
import Title from "../common/Title";
import UserRangesModal from "./UserRangesModal";
import { UserT } from "@/models/User";
import { getRang } from "@/utils/server/userRangUtils";
import { getWhoAmi } from "@/utils/client/ApiUtils";
import { getNestedFieldByPath } from "@/utils/server/objectUtils";
import useLocaleStore from "@/stores/useLocaleStore";

export default function UserHeader() {
    const { dictionary } = useLocaleStore(state => state);
    const [currentUser, setCurrentUser] = useState<UserT>();

    useEffect(() => {
        getWhoAmi().then(user => setCurrentUser(user));
    }, [])

    if (currentUser) {
        return (
            <div className="text-center ">
                {renderTitle()}
                {renderLevel()}
                {renderRange()}
            </div>
        )
    }
    return (
        <div className="text-center ">
            <span className="loading loading-ball loading-xl"></span>
        </div>
    )

    function renderTitle() {
        return <Title text={`${dictionary.common.helloUser}, ${currentUser?.name}!`} />
    }

    function renderLevel() {
        return (
            <div className="text-2xl flex items-center place-content-center ">
                <span className="font-bold me-2">{`${dictionary.common.userLevel}: `}</span>
                <span>{currentUser?.rang}</span>
                <UserRangesModal />
            </div>

        );
    }

    function renderRange() {
        const rang = getNestedFieldByPath(dictionary, getRang(currentUser!.rang!)?.name!)
        return (
            <div className="text-2xl flex items-center place-content-center ">
                <span className="font-bold me-2">{`${dictionary.common.userRange}: `}</span>
                <span>{rang}</span>
            </div>
        )
    }
}