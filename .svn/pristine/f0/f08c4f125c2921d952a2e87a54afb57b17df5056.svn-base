function formatTime(dataTime) {
    if (!dataTime) {
        return '--';
    }
    if (dataTime.indexOf('-') > -1) {
        return dataTime;
    }
    let newDateTime;
    let y = dataTime.substring(0,4);
    let M = dataTime.substring(4,6);
    let d = dataTime.substring(6,8);
    let h = dataTime.substring(8,10);
    let m = dataTime.substring(10,12);
    newDateTime = y + '-' + M + '-' + d + ' ' + h + ':' + m;
    return newDateTime;
}
export default {
    formatTime
}
