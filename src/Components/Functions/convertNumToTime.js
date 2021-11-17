const convertNumToTime =(number) =>{
    var sign = (number >= 0) ? 1 : -1;

    number = number * sign;
    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;

    decpart = min * Math.round(decpart / min);

    var minute = Math.floor(decpart * 60) + '';


    if (minute.length < 2) {
    minute = '0' + minute; 
    }


    sign = sign == 1 ? '' : '-';


    var time = sign + hour + ' hr ' + minute + ' min';

    return time;
}

export default convertNumToTime