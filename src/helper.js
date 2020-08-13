import {showNotify} from './swController';

export function checkTime(dateStart, dateEnd, name) {
    const currentUTCDateStart = convertTimeToCurrent(dateStart);
    const currentUTCDateEnd = convertTimeToCurrent(dateEnd);
    const dateNow = new Date();
    if (dateNow < currentUTCDateStart) {
        notificationInterval(currentUTCDateStart, name);
        return 'default';
    }
    return dateNow < currentUTCDateEnd ? 'online' : 'past';
}

function notificationInterval(dateStart, name) {
    let timerId = setTimeout(function tick() {
        const currentDateTime = new Date().getTime();
        const dateStartTime = dateStart.getTime();
        if (currentDateTime > dateStartTime - 60000) {
            showNotify(name, 'Событие скоро начнется!');
        } else {
            timerId = setTimeout(tick, 60000);
        }
    }, 0);
}

function convertTimeToCurrent(date) {
    const UTCDate = new Date(Date.parse(`${date}Z`));
    const hours = UTCDate.getHours();
    const minutes = UTCDate.getMinutes();
    const dateNow = new Date();
    return new Date(dateNow.getFullYear(), dateNow.getMonth(), hours ? dateNow.getDate() : dateNow.getDate() + 1, hours, minutes);
}

export function getFormatTime(date) {
    const UTCDate = new Date(Date.parse(`${date}Z`));
    const hours = UTCDate.getHours();
    const minutes = UTCDate.getMinutes();
    const formattedTime = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0')
    ].join(':');
    return formattedTime;
}