export type UserRang = {
    id: number,
    name: string,
    pointsFrom: number
};

export const UserRanges: UserRang[] = [
    { id: 1, name: "Przedszkolak", pointsFrom: 0 },
    { id: 2, name: "Uczeń", pointsFrom: 100 },
    { id: 3, name: "Gimnazista", pointsFrom: 1000 },
    { id: 4, name: "Licealista", pointsFrom: 5000 },
    { id: 5, name: "Student", pointsFrom: 20000 },
    { id: 6, name: "Inżynier", pointsFrom: 50000 },
    { id: 7, name: "Magister", pointsFrom: 100000 },
    { id: 8, name: "Doktorant", pointsFrom: 500000 },
    { id: 9, name: "Doktor", pointsFrom: 1000000 },
    { id: 10, name: "Docent", pointsFrom: 2000000 },
    { id: 11, name: "Profesor", pointsFrom: 5000000 },
    { id: 12, name: "Rektor", pointsFrom: 10000000 }
];