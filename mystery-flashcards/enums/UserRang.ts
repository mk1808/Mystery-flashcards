export type UserRang = {
    id: number,
    name: string,
    pointsFrom: number
};

export const UserRanges: UserRang[] = [
    { id: 1, name: "userRanges.preschooler", pointsFrom: 0 },
    { id: 2, name: "userRanges.student", pointsFrom: 100 },
    { id: 3, name: "userRanges.juniorHighSchoolStudent", pointsFrom: 1000 },
    { id: 4, name: "userRanges.highSchoolStudent", pointsFrom: 5000 },
    { id: 5, name: "userRanges.undergraduate", pointsFrom: 20000 },
    { id: 6, name: "userRanges.engineer", pointsFrom: 50000 },
    { id: 7, name: "userRanges.master", pointsFrom: 100000 },
    { id: 8, name: "userRanges.phdStudent", pointsFrom: 500000 },
    { id: 9, name: "userRanges.phdHolder", pointsFrom: 1000000 },
    { id: 10, name: "userRanges.associateProfessor", pointsFrom: 2000000 },
    { id: 11, name: "userRanges.professor", pointsFrom: 5000000 },
    { id: 12, name: "userRanges.rector", pointsFrom: 10000000 }
];