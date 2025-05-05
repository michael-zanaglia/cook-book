export function convertDate(sendTime: Date){
    const currentTimestamps = new Date().getTime()
    const time = new Date(sendTime).getTime()
    const differenceInSec = (currentTimestamps - time) / 1000

    const sec = 1;
    const min = sec*60;
    const h = min*60; // hour
    const day = h*24; // day
    const month = day*30; // month
    const year = month*12 

    switch(true){
        case(differenceInSec < min) : return `${Math.floor(differenceInSec)} s`
        case(differenceInSec < h) : return `${Math.floor(differenceInSec/min)} min`
        case(differenceInSec < day) : return `${Math.floor(differenceInSec/h)} h`
        case(differenceInSec < month) : return `${Math.floor(differenceInSec/day)} jour(s)` 
        case(differenceInSec < year) : return `${Math.floor(differenceInSec/month)} mois` 
        default: return `${differenceInSec/year} an(s)` 
    }

}
