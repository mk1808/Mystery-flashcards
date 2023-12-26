"use client"
import React, { useState } from 'react'

function UserAvatar({ alt, currentUser, className, imgClassName, width = 300, height = 200 }: {
    currentUser: any, alt: string, className?: any, width?: number, height?: number,
    imgClassName?: string
}) {
    const [imageSrcError, setImageSrcError] = useState(false);
    const defaultAvatar = "/images/defaultAvatar.jpg"
    const avatarSrc = imageSrcError ? defaultAvatar : currentUser?.avatar || defaultAvatar;
    return (
        <div className={`grid justify-items-center items-center ${className}`}>
            <img
                src={avatarSrc}
                width={width}
                height={height}
                onError={() => setImageSrcError(true)}
                alt={alt}
                className={imgClassName}
            />
        </div>
    );
}

export default UserAvatar