import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {host, orgId} from "../common/common";

// import { host } from '../common/common'

let year = new Date().getFullYear()
let month = (new Date().getMonth() + 1) >9?new Date().getMonth() + 1:'0'+(new Date().getMonth() + 1)
let day = new Date().getDate() >9? new Date().getDate():'0'+new Date().getDate()
let YMD = ''+year+''+month+''+day

let lDate = new Date()
lDate.setTime(lDate.getTime()-24*60*60*1000);
let lYear = lDate.getFullYear()
let lMonth = (lDate.getMonth() + 1) >9?lDate.getMonth() + 1:'0'+(lDate.getMonth() + 1)
let lDay = lDate.getDate() >9?lDate.getDate():'0'+(lDate.getDate())
let LYMD = ''+lYear +''+ lMonth +''+lDay
let timer
let hours = lDate.getHours()
let minutes = lDate.getMinutes()
if(hours<9 ||(hours==9&&minutes<30)){
    YMD = LYMD
}

class FundFirst extends Component {
    constructor(props){
        super(props)
        this.state={
            fundEval:'',
            fundE:'',
            realTime:'',
            f208:false,
            dataXT:'',
            priceL:'',
            loading:true,
            newP:'',
            YDay:'',
            dataX:["0930","0931", "0932", "0933", "0934", "0935", "0936", "0937", "0938", "0939", "0940", "0941", "0942", "0943", "0944", "0945", "0946", "0947", "0948", "0949", "0950", "0951", "0952", "0953", "0954", "0955", "0956", "0957", "0958", "0959", "1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009", "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020", "1021", "1022", "1023", "1024", "1025", "1026", "1027", "1028", "1029", "1030", "1031", "1032", "1033", "1034", "1035", "1036", "1037", "1038", "1039", "1040", "1041", "1042", "1043", "1044", "1045", "1046", "1047", "1048", "1049", "1050", "1051", "1052", "1053", "1054", "1055", "1056", "1057", "1058", "1059", "1100", "1101", "1102", "1103", "1104", "1105", "1106", "1107", "1108", "1109","1110", "1111", "1112", "1113", "1114", "1115", "1116", "1117", "1118", "1119", "1120", "1121", "1122", "1123", "1124", "1125", "1126", "1127", "1128", "1129", "1130", "1300", "1301", "1302", "1303", "1304", "1305", "1306", "1307", "1308", "1309", "1310", "1311", "1312", "1313", "1314", "1315", "1316", "1317", "1318", "1319", "1320","1321", "1322", "1323", "1324", "1325", "1326", "1327", "1328", "1329", "1330", "1331", "1332", "1333", "1334", "1335", "1336", "1337", "1338", "1339", "1340", "1341", "1342", "1343", "1344", "1345", "1346", "1347", "1348", "1349", "1350", "1351", "1352", "1353", "1354", "1355", "1356", "1357", "1358", "1359", "1400", "1401", "1402", "1403", "1404", "1405", "1406", "1407", "1408", "1409", "1410", "1411", "1412", "1413", "1414", "1415", "1416", "1417", "1418", "1419", "1420", "1421", "1422", "1423", "1424", "1425", "1426", "1427", "1428", "1429", "1430", "1431", "1432", "1433", "1434", "1435", "1436", "1437", "1438", "1439", "1440", "1441", "1442", "1443", "1444", "1445", "1446", "1447", "1448", "1449", "1450", "1451", "1452", "1453", "1454", "1455", "1456", "1457", "1458", "1459", "1500"],
            dataXX:'',
            fundId:this.props.fundId,
            colorDG:'rgba(255,79,41,1)',
            colorDGR:'rgba(255,79,41,0.14)',
        }
    }
    componentWillMount(){
        this.fetch208()
    }

    componentDidMount(){
        // this.fetchResult()

        // console.log(this.props)
    }

    fetchResult(){

    }
    fetch208(){
        let data = {
            "valuationDate":YMD,
            // "valuationDate":'20181213',
            "endTime":"",
            "fundId":this.props.fundId,
            // "lang":null,
            "dateType":"T",
            "orgId":orgId,
            "reqChl":"03",
            "reqTime":"20180725155411123",
            "serNum":"1234567890",
            "sign":"SHA256withRSA2048",
            "startTime":"093000",
            "decimalDigits":"4",
            "token":"D688D2555ED94C7285D26BDF4B13D08F",
            "tranCode":"F208",
            "version":"100"
        }
        fetch(host+"F208",{
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result)=>{
            return result.json()
        }).then((res)=>{
            if(res.respCode === '00' &&res.fundEvalList != null){
                var vae =[];
                var dataT=[];
                var pLimit =[];
                //昨收数据
                // vae.push(parseFloat(res.preValuation).toFixed(4))
                let dataXX =[]
                let startValuation = (res.startValuation === null||parseFloat(res.startValuation)===0) ? res.preValuation:res.startValuation
                for(var i =0;i<this.state.dataX.length;i++){
                    dataXX.push(parseFloat(startValuation))
                }
                this.setState({
                    dataXX:dataXX
                })
                res.fundEvalList.map((value,key)=>{
                    vae.push((value.valuation*1).toFixed(4));
                    dataT.push(value.valuationTime);
                    pLimit.push((value.valuation*1-startValuation*1)/startValuation*100).toFixed(2);
                })
                console.log(pLimit)
                var fLength = res.fundEvalList.length
                this.setState({
                    fundEval:res,
                    fundE:vae,
                    realTime:res.fundEvalList[fLength-1].valuationTime,
                    f208:true,
                    dataXT:dataT,
                    priceL:pLimit,
                    loading:false,
                    newP:res.fundEvalList[res.fundEvalList.length-1].valuation,
                    YDay:res.tDate
                })
                if(res.rtChg!='--'&&parseFloat(res.rtChg)>0){
                    this.setState({
                        colorDG:'rgba(255,79,41,1)',
                        colorDGR:'rgba(255,79,41,0.14)',
                    })
                }else if(res.rtChg!='--'&&parseFloat(res.rtChg)<0){
                    this.setState({
                        colorDG:'rgba(41,198,154,1)',
                        colorDGR:'rgba(41,198,154,0.14)',
                    })
                }
            }else{
                this.setState({
                    f208:false,
                    loading:false
                })
                setTimeout(()=>{
                    // alert("该基金暂无估值数据！")
                },100)


            }
        }).catch(err=>{
            console.log(err)
            this.setState({
                f208:false,
                loading:false
            })

        })
    }
    getOption = () => {
        let ras = Math.min.apply(null,this.state.priceL).toFixed(2)
        let rab = Math.max.apply(null,this.state.priceL).toFixed(2)
        let raa
        if(Math.abs(ras)>= Math.abs(rab)){
            raa = Math.abs(ras)
        }else{
            raa = Math.abs(rab)
        }

        // if(rab < 0) {
        //     rab = Math.abs(ras)
        // }
        // if(ras > 0) {
        //     ras = -Math.abs(rab)
        // }
        // console.log(ras)
        // console.log(rab)
        console.log(raa)
        raa = raa + raa*0.15
        let rad = (raa*0.01).toFixed(4)
        let min = Math.min.apply(null,this.state.fundE)
        let max = Math.max.apply(null,this.state.fundE)
        // console.log(rad)
        let realStartVa = (this.state.fundEval.startValuation === null|| parseFloat(this.state.fundEval.startValuation) === 0)?this.state.fundEval.preValuation:this.state.fundEval.startValuation

        console.log(realStartVa)


        let minV = (realStartVa*1 - realStartVa*rad).toFixed(4)
        let maxV = (realStartVa*1 + realStartVa*rad).toFixed(4)

        return {
            // backgroundColor:'#F6F8FB',
            title: {
                text: '',
                show:false
            },
            tooltip : {
                show:false,
                trigger: 'axis'
            },
            legend: {
                show:false,
                data:[]
            },
            toolbox: {
                show:false,
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                top:'0%',
                left: '0%',
                right: '0%',
                bottom: '0%',
                // containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    show:false,
                    boundaryGap : false,
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    },
                    splitLine:{
                        show:false
                    },
                    axisLabel:{
                        show:false,
                        textStyle:{
                            color:'#08142C',
                            fontSize:'12'
                        }
                    },
                    data : this.state.dataX
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show:false,
                    position:'left',
                    min:minV,
                    max:maxV,
                    // splitNumber:10,
                    interval:realStartVa*rad*0.5,
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    },
                    axisLabel:{
                        show:true,
                        textStyle:{
                            color:'#6B7D97',
                            fontSize:'10'
                        },
                        formatter:function (value,index) {
                            return value.toFixed(4)
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#fff',
                            width:1
                        }
                    },
                    splitArea:{
                        show:true,
                        areaStyle:{
                            // color:'#F6F8FB'
                            color:'#fff'
                        }
                    }
                },
                {
                    type : 'value',
                    position:'right',
                    min:-raa,
                    max:raa,
                    yAxisIndex:0,
                    splitNumber:8,
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    },
                    axisLabel:{
                        show:true,
                        textStyle:{
                            color:'#6B7D97',
                            fontSize:'10'
                        },
                        formatter:function (value,index) {
                            return value.toFixed(2)+'%'
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#fff',
                            width:1
                        }
                    },
                    splitArea:{
                        show:true,
                        areaStyle:{
                            // color:'#F6F8FB'
                            color:'#fff'
                        }
                    }
                },
            ],
            series : [
                {
                    name:'实时股价',
                    type:'line',
                    symbol:'none',
                    smooth: true,
                    showSymbol: false,
                    hoverAnimation: false,
                    lineStyle: {
                        normal: {
                            color: this.state.colorDG,
                            // color: '#079EF6',
                            width: 1,
                            type: 'solid',
                            opacity: 1,
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(7,158,246,0)',
                        },

                    },
                    areaStyle:{
                        color:this.state.colorDGR,
                    },
                    data:this.state.fundE
                },
                // {
                //     name:'股价基线',
                //     type:'line',
                //     smooth:true,
                //     symbol:'none',
                //     sampling:'average',
                //     itemStyle: {
                //         normal: {
                //             lineStyle:{
                //                 color:'#EB6897',
                //                 width:1
                //             },
                //             color: 'rgb(255, 255, 255)'
                //         }
                //     },
                //     data:this.state.dataXX
                // },

            ]
        };
    }

    render() {
        return(
            <div className="mainFF">

                    <div className="mainChart">
                        {/*{<FundFirst fundId ={this.state.fundId01}/>}*/}
                        {this.state.f208 && <ReactEcharts
                            option={this.getOption()}
                            style={{height: '60px', width: '100%'}}
                        />}
                    </div>
                    {
                        this.state.f208&&this.state.fundEval.rtChg&&this.state.fundEval.rtChg.substring(0,1)==='-'&&<div className="mR mDown">
                            <span>{(this.state.newP*1).toFixed(4)}</span>
                            <em className="">{parseFloat(this.state.fundEval.rtChg*100).toFixed(2)}%</em>
                            <i></i>
                        </div>
                    }
                    {
                        this.state.f208&&this.state.fundEval.rtChg&&this.state.fundEval.rtChg.substring(0,1)!='-'&&<div className="mR mUp">
                            <span>{(this.state.newP*1).toFixed(4)}</span>
                            <em className="">{parseFloat(this.state.fundEval.rtChg*100).toFixed(2)}%</em>
                            <i></i>
                        </div>
                    }
                    {!this.state.f208&&<div className="fundNoD">暂无实时估值数据</div>}
                    <p className="mRText">实时估值</p>

                {/*</div>*/}
            </div>
        )
    }
}

export default FundFirst;