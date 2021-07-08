export default function init(){
	let date=new Date();
	//年
    let year=date.getFullYear();
    //月
    let month=date.getMonth()+1;
    //日
    let day=date.getDate();
   
    let rq=year+"年"+month+"月"+day+"日"
    return rq
}