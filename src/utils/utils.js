// 转换时间的函数 仅仅年月日
export function getnewtime(date) {
    var newtime = new Date(date)
    var year = newtime.getFullYear();
    var mon = newtime.getMonth() + 1;
    var day = newtime.getDate();
    return add(year) + '/' + add(mon) + '/' + add(day)
}

// 转换时间完整版 年/月/日 时:分:秒
export function getTime(date) {
    let newdate = (typeof date  == 'string' ? new Date(date) : date)
    var newtime = new Date(newdate)
    var year = newtime.getFullYear();
    var mon = newtime.getMonth()+1;
    var day = newtime.getDate();
    var hour = newtime.getHours();
    var min = newtime.getMinutes();
    var sec = newtime.getSeconds();
    return add(year) + '-' + add(mon) + '-' + add(day) +' '+ add(hour) + ':' + add(min) + ':' + add(sec)
}

// 转换时间 时分秒
export function getdaytime(date){
    var newtime = new Date(date)
    var hour = newtime.getHours();
    var min = newtime.getMinutes();
    var sec = newtime.getSeconds();
    return add(hour)+':'+add(min)+':'+add(sec)
}



// 时间转换补0函数
export function add(num) {
    return num = num < 10 ? '0' + num : num
}