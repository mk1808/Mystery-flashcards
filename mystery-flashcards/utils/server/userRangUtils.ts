import { UserRang, UserRangs } from "@/enums/UserRang";

export function findRangByPoints(points: number): UserRang {
    let highestRang = UserRangs[0];
    UserRangs.forEach(rang => {
        if (rang.pointsFrom <= points && highestRang.pointsFrom < rang.pointsFrom) {
            highestRang = rang;
        }
    })
    return highestRang;
}

export function getRang(id: number) {
    return UserRangs.find(rang => rang.id === id);
}

export function findNextRang(id: number) {
    const rang = getRang(id);
    const nextRangIndex = UserRangs.indexOf(rang!) + 1;
    return UserRangs[nextRangIndex];
}