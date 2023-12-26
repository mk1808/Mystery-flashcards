export const getPercentDisplay = (part: number, all: number): string => (part * 100.0 / all).toFixed(0);

export const formatDate = (date?: any): string => (date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());