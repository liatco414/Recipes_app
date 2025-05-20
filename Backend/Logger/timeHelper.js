const addZero = (number) => {
    return number < 9 ? "0" + number : number;
};

const time = new Date();

let timeResult = () => {
    let date = {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        day: time.getDate(),
        hr: time.getHours(),
        min: time.getMinutes(),
        sec: time.getSeconds(),
    };

    for (const key in date) {
        date[key] = addZero(date[key]);
    }
    return date;
};

module.exports = timeResult;
