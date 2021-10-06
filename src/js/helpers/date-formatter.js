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
    return {
        date,
        formattedDate,
        webLanguage,
        formattedTime,
        formattedDateTime
    };
};

export const todayDateTime = () => {
    const dateTime = new Date();
    const date = dateTime.toISOString().split('T')[0];
    const time = dateTime.toLocaleString().slice(dateTime.toLocaleString().indexOf(' ') + 1, -3);
    return `${date}T${time}`
};