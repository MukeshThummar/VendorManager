
const getformatedDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    const fday = date.getDate().toString().padStart(2, '0');
    const fmonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const fyear = date.getFullYear();
    return `${fday}/${fmonth}/${fyear}`;
};

const getformatedDatefromDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const getDate = (date: string) => {
    return new Date(date.split('/').reverse().join('-'));
};

export {
    getDate,
    getformatedDate,
    getformatedDatefromDate
};