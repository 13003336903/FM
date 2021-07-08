export default function dealTime(times){
    const time1=times.slice(-8)
    const hour=time1.slice(0,2);
    const minute=time1.slice(3,5)
    const second=time1.slice(6,8)
    const totals=parseInt(hour)*3600+parseInt(minute)*60+parseInt(second)
   return totals
}