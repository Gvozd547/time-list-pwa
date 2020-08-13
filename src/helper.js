import {showNotify} from './swController';

const TIME_PUSH = 5 * 60 * 1000;
const VALUE_STATUS = [
  'past',
  'online'
];

export function checkTime(dateStart, dateEnd) {
    const currentUTCDateStart = convertTimeToCurrent(dateStart);
    const currentUTCDateEnd = convertTimeToCurrent(dateEnd);
    const dateNow = new Date();
    return dateNow < currentUTCDateStart ? 'default' : dateNow < currentUTCDateEnd ? 'online' : 'past';
}

function inDateScope(dateStart) {
    const timeStamp = convertTimeToCurrent(dateStart).getTime() - Date.now();
    return timeStamp > 0 && timeStamp < TIME_PUSH;
}

export function notificationInterval(data) {
    setTimeout(tick, 0, data);
}

function tick(itemData) {
    const arrFiltred = itemData.filter(({timeStart, timeEnd, pushed}) => {
        const isStatus = VALUE_STATUS.includes(checkTime(timeStart, timeEnd));
        return !pushed && !isStatus;
    });
    const arrNotifyText = [];
    arrFiltred.forEach((item) => {
        if (inDateScope(item.timeStart)) {
            arrNotifyText.push(`Событие ${item.info.title} скоро начнется`);
            item.pushed = true;
        }
    });
    if (arrNotifyText.length) {
       showNotify('', arrNotifyText.join('\n'));
    }
    if (arrFiltred.length) {
        setTimeout(tick, TIME_PUSH, arrFiltred);
    }
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