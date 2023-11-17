import {DateTime} from "luxon";

const today = DateTime.now().setLocale('sv').toFormat('d LLL');

export const formatDate = (dateInput: string) => {
    const dateTime = DateTime.fromISO(dateInput, {zone: 'Europe/Stockholm'}).setLocale('sv');

    if (dateTime.toFormat('d LLL') === today) {
        return dateTime.toFormat('HH:mm');
    }
    return dateTime.toFormat('d LLL HH:mm');

}

export const formatTemperature = (temp: string) => {
    return temp.replace('.', ',') + '°C';
}
