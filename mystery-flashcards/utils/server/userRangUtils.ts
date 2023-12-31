import { UserRang, UserRanges } from "@/enums/UserRang";

export function findRangByPoints(points: number): UserRang {
    let highestRang = UserRanges[0];
    UserRanges.forEach(rang => {
        if (rang.pointsFrom <= points && highestRang.pointsFrom < rang.pointsFrom) {
            highestRang = rang;
        }
    })
    return highestRang;
}

export const getRang = (id: number): UserRang | undefined => UserRanges.find(rang => rang.id === id);

export function findNextRang(id: number): UserRang {
    const rang = getRang(id);
    const nextRangIndex = UserRanges.indexOf(rang!) + 1;
    return UserRanges[nextRangIndex];
}