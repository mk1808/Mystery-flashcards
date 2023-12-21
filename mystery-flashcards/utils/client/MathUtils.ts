export const getPercentDisplay = (part: number, all: number) => {
    return (part * 100.0 / all).toFixed(2)
}

export const formatDate = (date?: any) => {
    var datestring = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    return datestring;
}