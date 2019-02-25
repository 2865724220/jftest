export const host = 'https://test-paladin.pingan.com.cn:10094/app/'
// export const host = 'https://paladin.pingan.com.cn/app/'

let wSearch = window.location.href
let params ={}
let pattern = /(\w+)=([^&#]*)*/g
let arr = wSearch.match(pattern)
if(arr){
    for(var i=0;i<arr.length;i++){
        var kv = arr[i].split('=')
        params[kv[0]] = kv[1]
    }
}
let appId = params.appId
let orgId01 =''
let source = { APP:'500001', PAHD:'500002', PAGJ:'500003', XYD:'500004', EQY:'500005', HCZ:'500006', ZN:'500007', PAYL:'500008', PAHF:'500009', AELC:'500010', KDYHX:'500011', CFS:'500012', YQB:'500013', LJS:'500014', WIFI:'500015', YZT:'500016', CFB:'500017', JKGJ:'500018', SDK:'500019',}

if(appId){
    let aS = appId.split('_')
    aS = aS[aS.length-1]
    orgId01 = source[aS]
}else{
    orgId01 = '599999'//默认值
}
export const orgId = orgId01