import { getHashtags } from "@/utils/client/ApiUtils";
import { valueToOption } from "@/utils/client/EnumUtils";
import { useEffect, useState } from "react";

export default function useHashtags() {
    const [hashtags, setHashtags] = useState<Option[]>([]);

    useEffect(() => {
        getHashtags().then((hashTags) => setHashtags(hashTags.map(valueToOption)))
    }, []);

    return hashtags;
}