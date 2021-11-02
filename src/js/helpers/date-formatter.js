export const dateTimeFormater = (APIDate) => {
    const timeOptions = {
        hour: 'numeric', minute: 'numeric',
        hour12: true
    };
    const date = new Date(APIDate);
    const webLanguage = navigator.language;
    const formattedDate = new Intl.DateTimeFormat(webLanguage).format(date);
    const formattedTime = new Intl.DateTimeFormat(webLanguage, timeOptions).format(date);
    const formattedDateTime = formattedTime;
    const dateToString = date.toString();
    const fromUTCToLocal = `${date.getFullYear()}-${date.getMonth() <= 8 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}T${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
    return {
        date,
        formattedDate,
        webLanguage,
        formattedTime,
        formattedDateTime,
        fromUTCToLocal
    };
};

export const todayDateTime = () => {
    const dateTime = new Date();
    const date = dateTime.toISOString().split('T')[0];
    const time = dateTime.toLocaleString().slice(dateTime.toLocaleString().indexOf(' ') + 1, -3);
    const timeFormat = time.length < 5 ? `0${time}` : time;
    return `${date}T${timeFormat}`
};