import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { host, orgId } from '../common/common';
import FundEarnings from './fundEarnings';
import FundTab from './fundTab';
import ProgroupFund from '../sitFundCharts/progressFund/progressFund'
import './regroupFund.css';
let enterImg = require('../../image/enter@2x.png')

let year = new Date().getFullYear()
let month = (new Date().getMonth() + 1) > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)
let day = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate()
let YMD = '' + year + '' + month + '' + day

let lDate = new Date()
lDate.setTime(lDate.getTime() - 24 * 60 * 60 * 1000);
let lYear = lDate.getFullYear()
let lMonth = (lDate.getMonth() + 1) > 9 ? lDate.getMonth() + 1 : '0' + (lDate.getMonth() + 1)
let lDay = lDate.getDate() > 9 ? lDate.getDate() : '0' + (lDate.getDate())
let LYMD = '' + lYear + '' + lMonth + '' + lDay
let timer
let hours = lDate.getHours()
let minutes = lDate.getMinutes()
if (hours < 9 || (hours == 9 && minutes < 30)) {
    YMD = LYMD
}
class Valuation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fundName: '',
            fundEval: {},
            fundE: [],
            vaTime: '',
            rtChg: '',
            realTime: '',
            f208: false,
            dataXT: [],
            priceL: [],
            switch: true,
            newP: '',
            loading: true,
            YDay: '',
            // dataX:["0930", "0931", "0932", "0933", "0934", "0935", "0936", "0937", "0938", "0939", "0940", "0941", "0942", "0943", "0944", "0945", "0946", "0947", "0948", "0949", "0950", "0951", "0952", "0953", "0954", "0955", "0956", "0957", "0958", "0959", "1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009", "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020", "1021", "1022", "1023", "1024", "1025", "1026", "1027", "1028", "1029", "1030", "1031", "1032", "1033", "1034", "1035", "1036", "1037", "1038", "1039", "1040", "1041", "1042", "1043", "1044", "1045", "1046", "1047", "1048", "1049", "1050", "1051", "1052", "1053", "1054", "1055", "1056", "1057", "1058", "1059", "1100", "1101", "1102", "1103", "1104", "1105", "1106", "1107", "1108", "1109","1110", "1111", "1112", "1113", "1114", "1115", "1116", "1117", "1118", "1119", "1120", "1121", "1122", "1123", "1124", "1125", "1126", "1127", "1128", "1129", "1130", "1300", "1301", "1302", "1303", "1304", "1305", "1306", "1307", "1308", "1309", "1310", "1311", "1312", "1313", "1314", "1315", "1316", "1317", "1318", "1319", "1320","1321", "1322", "1323", "1324", "1325", "1326", "1327", "1328", "1329", "1330", "1331", "1332", "1333", "1334", "1335", "1336", "1337", "1338", "1339", "1340", "1341", "1342", "1343", "1344", "1345", "1346", "1347", "1348", "1349", "1350", "1351", "1352", "1353", "1354", "1355", "1356", "1357", "1358", "1359", "1400", "1401", "1402", "1403", "1404", "1405", "1406", "1407", "1408", "1409", "1410", "1411", "1412", "1413", "1414", "1415", "1416", "1417", "1418", "1419", "1420", "1421", "1422", "1423", "1424", "1425", "1426", "1427", "1428", "1429", "1430", "1431", "1432", "1433", "1434", "1435", "1436", "1437", "1438", "1439", "1440", "1441", "1442", "1443", "1444", "1445", "1446", "1447", "1448", "1449", "1450", "1451", "1452", "1453", "1454", "1455", "1456", "1457", "1458", "1459", "1500"],
            dataX: ["0930", "0931", "0932", "0933", "0934", "0935", "0936", "0937", "0938", "0939", "0940", "0941", "0942", "0943", "0944", "0945", "0946", "0947", "0948", "0949", "0950", "0951", "0952", "0953", "0954", "0955", "0956", "0957", "0958", "0959", "1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009", "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020", "1021", "1022", "1023", "1024", "1025", "1026", "1027", "1028", "1029", "1030", "1031", "1032", "1033", "1034", "1035", "1036", "1037", "1038", "1039", "1040", "1041", "1042", "1043", "1044", "1045", "1046", "1047", "1048", "1049", "1050", "1051", "1052", "1053", "1054", "1055", "1056", "1057", "1058", "1059", "1100", "1101", "1102", "1103", "1104", "1105", "1106", "1107", "1108", "1109", "1110", "1111", "1112", "1113", "1114", "1115", "1116", "1117", "1118", "1119", "1120", "1121", "1122", "1123", "1124", "1125", "1126", "1127", "1128", "1129", "1130", "1300", "1301", "1302", "1303", "1304", "1305", "1306", "1307", "1308", "1309", "1310", "1311", "1312", "1313", "1314", "1315", "1316", "1317", "1318", "1319", "1320", "1321", "1322", "1323", "1324", "1325", "1326", "1327", "1328", "1329", "1330", "1331", "1332", "1333", "1334", "1335", "1336", "1337", "1338", "1339", "1340", "1341", "1342", "1343", "1344", "1345", "1346", "1347", "1348", "1349", "1350", "1351", "1352", "1353", "1354", "1355", "1356", "1357", "1358", "1359", "1400", "1401", "1402", "1403", "1404", "1405", "1406", "1407", "1408", "1409", "1410", "1411", "1412", "1413", "1414", "1415", "1416", "1417", "1418", "1419", "1420", "1421", "1422", "1423", "1424", "1425", "1426", "1427", "1428", "1429", "1430", "1431", "1432", "1433", "1434", "1435", "1436", "1437", "1438", "1439", "1440", "1441", "1442", "1443", "1444", "1445", "1446", "1447", "1448", "1449", "1450", "1451", "1452", "1453", "1454", "1455", "1456", "1457", "1458", "1459", "1500"],
            dataXX: [],
            //修改
            reg_tabIndex: 1,
            allList: [],
            fundF206: {},
            fundF206Type: false,// 判断206接口是否结束
            roundData: [],
            detailArray: [],
            isShowModal: false,
            meanValue: '', //测试默认让图标出现新闻
        }
        this.reg_fundId;
        timer = setInterval(() => {
            let fundId = this.props.match.params.fundId;
            this.fetch208(fundId);
        }, 60000)

    }

    componentDidMount() {
        console.log(this.props)
        document.title = "基金详情";
        let fundId = this.props.match.params.fundId;
        this.reg_fundId = fundId;
        this.fetchJjlx(fundId);
        this.fetch208(fundId);
        this.fetchManager(fundId);
        this.fetch112(fundId);
    }
    componentDidUpdate() {
        // setTimeout(()=>{
        //     let fundId = this.props.match.params.fundId;
        //     this.fetch208(fundId);
        // },10000)
    }
    componentWillUnmount() {
        clearInterval(timer)
    }
    fetch112(fundId) {
        let data = {
            "fundId": fundId,
            // "newsDate": YMD,
            "newsDate": '20181225',
            // "lang": null,
            "orgId": orgId,
            "reqChl": "03",
            "reqTime": "20180725155411123",
            "serNum": "1234567890",
            "sign": "SHA256withRSA2048",
            "token": "D688D2555ED94C7285D26BDF4B13D08F",
            "tranCode": "F112",
            "version": "100"
        }
        fetch(host + "F112", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((result) => {
            return result.json()
        }).then((res) => {
            if (res && res.newsList && res.newsList.length > 0) {
                let newResDatas = res.newsList;
                let newXindex = []
                for (const item of newResDatas) {
                    let itemNewsTime = item.newsTime.slice(-4);
                    let dataindex;
                    if (itemNewsTime < "0930") {
                        dataindex = this.state.dataX.indexOf("0930")
                    }
                    if (itemNewsTime > "1500") {
                        dataindex = this.state.dataX.indexOf("1500")
                    }
                    if (itemNewsTime > "1130" && itemNewsTime < "1330") {
                        dataindex = this.state.dataX.indexOf("1130")
                    }
                    newXindex.push(dataindex);
                }
                this.setState({
                    detailArray: res.newsList,
                    roundData: newXindex
                })
            }
        })
    }
    fetch208(fundId) {
        let data = {
            "valuationDate": YMD,
            // "valuationDate":'20190130',
            "endTime": "",
            "fundId": fundId,
            // "lang": null,
            "dateType": "T",
            "orgId": orgId,
            "reqChl": "03",
            "reqTime": "20180725155411123",
            "serNum": "1234567890",
            "sign": "SHA256withRSA2048",
            "startTime": "093000",
            "decimalDigits": "4",
            "token": "D688D2555ED94C7285D26BDF4B13D08F",
            "tranCode": "F208",
            "version": "100"
        }
        fetch(host + "F208", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            return result.json()
        }).then((res) => {
            if (res.respCode === '00') {
                var vae = [];
                var dataT = [];
                var pLimit = [];
                //昨收数据
                // vae.push(parseFloat(res.preValuation).toFixed(4))
                let dataXX = []
                let startValuation = (res.startValuation === null || parseFloat(res.startValuation) === 0) ? res.preValuation : res.startValuation
                for (var i = 0; i < this.state.dataX.length; i++) {
                    dataXX.push(parseFloat(startValuation))
                }
                this.setState({
                    dataXX: dataXX
                })
                let newRealTime = '',newNewP = '';
                if (res.fundEvalList && res.fundEvalList.length > 0) {
                    res.fundEvalList.map((value, key) => {
                        vae.push((value.valuation * 1).toFixed(4));
                        dataT.push(value.valuationTime);
                        pLimit.push((value.valuation * 1 - startValuation * 1) / startValuation * 100).toFixed(2);
                    })
                    var fLength = res.fundEvalList.length;
                    newRealTime = res.fundEvalList[fLength - 1].valuationTime;
                    newNewP = res.fundEvalList[res.fundEvalList.length - 1].valuation;
                }
                this.setState({
                    fundEval: res,
                    fundE: vae,
                    realTime: newRealTime,
                    f208: true,
                    dataXT: dataT,
                    priceL: pLimit,
                    loading: false,
                    newP: newNewP,
                    YDay: res.tDate,
                    meanValue: startValuation
                })
            } else {
                this.setState({
                    f208: false,
                    loading: false
                })
                // setTimeout(() => {
                //     alert("该基金暂无估值数据！")
                // }, 100)
                // setTimeout(() => {
                //     this.props.history.push(`/searching`);
                // }, 200)
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                f208: false,
                loading: false
            })

        })
    }
    getOption = () => {
        let ras = Math.min.apply(null, this.state.priceL).toFixed(2)
        let rab = Math.max.apply(null, this.state.priceL).toFixed(2)
        let raa
        if (Math.abs(ras) >= Math.abs(rab)) {
            raa = Math.abs(ras)
        } else {
            raa = Math.abs(rab)
        }
        if (raa < 0.025) {
            raa = 0.025
        }
        // if(rab < 0) {
        //     rab = Math.abs(ras)
        // }
        // if(ras > 0) {
        //     ras = -Math.abs(rab)
        // }
        // console.log(ras)
        // console.log(rab)
        raa = raa + raa * 0.15;
        let rad = (raa * 0.01).toFixed(4);
        let min = Math.min.apply(null, this.state.fundE)
        let max = Math.max.apply(null, this.state.fundE)
        let realStartVa = (this.state.fundEval.startValuation === null || parseFloat(this.state.fundEval.startValuation) === 0) ? this.state.fundEval.preValuation : this.state.fundEval.startValuation;
        console.log(realStartVa)
        let minV = (realStartVa * 1 - realStartVa * rad).toFixed(4);
        let maxV = (realStartVa * 1 + realStartVa * rad).toFixed(4);
        return {
            // backgroundColor:'#F6F8FB',
            title: {
                text: '',
                show: false
            },
            tooltip: {
                show: false,
                trigger: 'axis'
            },
            legend: {
                show: false,
                data: []
            },
            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                top: '4%',
                left: '1%',
                right: '1%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    silent: true,
                    triggerEvent: true,
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: '#08142C',
                            fontSize: '12'
                        }
                    },
                    data: this.state.dataX
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    position: 'left',
                    min: minV,
                    max: maxV,
                    // splitNumber:10,
                    interval: realStartVa * rad * 0.5,
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#6B7D97',
                            fontSize: '10'
                        },
                        formatter: function (value, index) {
                            return value.toFixed(4)
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff',
                            width: 1
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: '#F6F8FB'
                        }
                    }
                },
                {
                    type: 'value',
                    position: 'right',
                    min: -raa,
                    max: raa,
                    yAxisIndex: 0,
                    splitNumber: 8,
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#6B7D97',
                            fontSize: '10'
                        },
                        formatter: function (value, index) {
                            return value.toFixed(2) + '%'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff',
                            width: 1
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: '#F6F8FB'
                        }
                    }
                },
            ],
            series: [
                {
                    name: '实时股价',
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    showSymbol: false,
                    hoverAnimation: false,
                    lineStyle: {
                        normal: {
                            color: '#079EF6',
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
                    // ...修改.log...
                    markPoint: {
                        symbol: 'circle',
                        symbolSize: 8,
                        itemStyle: {
                            color: '#CC00CC'
                        },
                        data: []
                    },
                    // markLine: {
                    //     symbol:"none",
                    //     silent: true,
                    //     lineStyle:{
                    //         type:'dotted',
                    //         color:'#EB6897'
                    //     },
                    //     data: [
                    //         {
                    //             yAxis: (this.state.fundEval.preValuation*1).toFixed(4),
                    //             type:'average',
                    //             name:''
                    //         },
                    //         {
                    //             yAxis: 0,
                    //             type:'average',
                    //             name:''
                    //         }
                    //     ]
                    // },
                    data: this.state.fundE
                },
                {
                    name: '股价基线',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: '#EB6897',
                                width: 1
                            },
                            color: 'rgb(255, 255, 255)'
                        }
                    },
                    // markLine: {
                    //     symbol:"none",
                    //     silent: true,
                    //     lineStyle:{
                    //         type:'dotted',
                    //         color:'#EB6897'
                    //     },
                    //     itemStyle:{
                    //         normal:{
                    //             show:true,
                    //         }
                    //     },
                    //     data: [
                    //         {
                    //             yAxis: 0,
                    //             type:'average',
                    //             name:'',
                    //         }
                    //     ]
                    // },
                    data: this.state.dataXX
                },

            ]
        };
    };
    openS() {
        this.setState({
            switch: !this.state.switch
        })
    }
    // 修改
    regroup_tab(index) {
        this.setState({
            reg_tabIndex: index
        })
    }

    toDiagnoseEnder() {
        localStorage.setItem('fundId', this.reg_fundId)
        this.props.history.push( `/regroupDiagnose/${this.reg_fundId}` )
    }

    renderToptoDia() {
        let propsInit = this.props.match.params;
        let fundNameCode = {
            name: propsInit.fundName,
            code: propsInit.fundId
        }
        let {fundType, riskLevel, fundName} = this.state.fundF206;
        if (!fundType && !riskLevel) {
            return false;
        }
        return (
            <div className='toDiagnose' onClick={this.toDiagnoseEnder.bind(this)}>
                <div className="toDiagnose_left">
                    <p className="toDiagnose_leftName">{fundName ? fundName : '--'}</p>
                    <div className="left_detail">
                        <p>{fundNameCode.code ? fundNameCode.code : '--'}</p>
                        <p className="left_detailType">{ fundType ? fundType : '--' }</p>
                        {
                            riskLevel &&
                            <p className="left_detailType detailTypeActive">{ riskLevel }</p>
                        }
                    </div>
                </div>
                <div className="toDiagnose_right">
                    <p>基金诊断</p>
                    <img src={enterImg}></img>
                </div>
            </div>
        )
    }
    //基金经理
    fetchManager(fundId) {
        let body = {
            "fundId": fundId,
            "orgId": orgId,
            "tranCode": "F202",
            "version": 100,
            "reqChl": "03",
            "reqTime": "20180808080808000",
            "sign": "SHA256withRSA2048",
        }
        fetch(host + "F202", {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            return result.json()
        }).then((res) => {
            if (res && res.allList) {
                this.setState({
                    allList: res.allList
                })
            }
        }).catch(err =>
            console.log(err)
        )
    }
    onPush() {
        localStorage.setItem('fundId', this.reg_fundId)
        this.props.history.push({ pathname: "/manager" })
    }
    renderFundMenager() {
        if (this.state.allList.length < 1) {
            return false;
        }
        return (
            <div className="oneLine" onClick={() => this.onPush()}>
                <span className="lineLeft">
                    基金经理
                </span>
                {
                    this.state.allList && this.state.allList.length != 0 && this.state.allList.map((value, key) =>
                        <span className="curMngName" key={key}>
                            {value.curentMng}
                        </span>
                    )
                }
            </div>
        )
    }
    fetchJjlx(fundId) {
        fetch(host + "F206", {
            method: 'POST',
            body: JSON.stringify({ "orgId": orgId, "tranCode": "F206", "version": 100, "reqChl": "03", "reqTime": "20180808080808000", "sign": "SHA256withRSA2048", "fundId": fundId }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            return result.json()
        }).then((res) => {
            this.setState({
                fundF206Type: true
            })
            if(res.respCode === '00') {
                this.setState({
                    fundF206: res.selectDtl
                })
            }
            return res
        }).then((resu) => {

        }).catch(err =>{
                console.log(err)
                this.setState({
                    fundF206Type: true
                })
            }
        )
    }
    showmodal(value) {
        this.setState({
            isShowModal: value
        })
    }
    renderDetail() {
        const datas = this.state.detailArray; // 数据
        if (datas.length === 0) {
            return false
        }
        return (
            <div>
                <ProgroupFund datas={datas} onClickshow={this.showmodal.bind(this)}></ProgroupFund>
            </div>
        )
    }
    clickShow(data) {
        if (data) {
            this.setState({
                isShowModal: true
            })
        }
    }
    render() {
        if(!this.state.fundF206Type) {
            return false;
        }
        // 给图标加事件
        let onEvents = {
            'click': this.clickShow.bind(this)
        }
        let optionObj = this.getOption();
        // 测试有新闻
        // optionObj.series[0].markPoint.data = [{
        //     name: '某一个坐标',
        //     coord: [1, this.state.fundE[1]]
        // }]
        // 给实时估值图形上加新闻标注
        if (this.state.roundData && this.state.roundData.length > 0) {
            let datasArray = this.state.roundData;
            let oldDatas = [];
            for (let i = 0; i < datasArray.length; i++) {
                let newobj = {};
                // 先让出现新闻---后面删除
                let datasY = this.state.fundE[datasArray[i]] ? this.state.fundE[datasArray[i]] : this.state.meanValue;
                newobj.name = '某个坐标';
                // newobj.coord = [datasArray[i], this.state.fundE[datasArray[i]]]; 先注视---以后放开下面的删掉
                newobj.coord = [datasArray[i], datasY]
                oldDatas.push(newobj);
            }
            optionObj.series[0].markPoint.data = oldDatas;
        }
        // 遮罩层出现的时候里面不可滚动
        let clientHidth = document.body.clientHeight || document.documentElement.clientHeight;
        let appStyles = {
            height: clientHidth + 'px',
            overflow: 'hidden'
        }
        return (
            this.state.loading ? 
            <div className="load">数据加载中...</div>
            :
            <div className="valuation" style={this.state.isShowModal && this.state.detailArray.length > 0 ? appStyles : null}>
                {   this.state.isShowModal && this.state.detailArray.length > 0 ?
                    <div className='msgDetail'>
                        {this.renderDetail()}
                    </div>
                    :
                    null
                }
                {this.renderToptoDia()}
                {!this.state.f208&&
                    (
                        <div className="regroup_headEmporty">
                            暂无数据
                        </div>
                    )
                }
                {
                    this.state.f208 && <div className="blueHead backWhite">
                        {   this.state.fundF206.fundType && this.state.fundF206.fundType.indexOf("QDII") < 0 &&
                            <div>
                                <div className="firstT">
                                    {
                                        this.state.newP && this.state.fundEval.rtChg.substring(0, 1) === '-' && <span className="big green">{(this.state.newP * 1).toFixed(4)}</span>
                                    }
                                    {
                                        this.state.newP && this.state.fundEval.rtChg.substring(0, 1) != '-' && <span className="big red">{(this.state.newP * 1).toFixed(4)}</span>
                                    }

                                    {
                                        this.state.fundEval.rtChg && Boolean(parseFloat(this.state.fundEval.rtChg)) && this.state.fundEval.rtChg.substring(0, 1) === '-' && <img className="rateImg" src={require('../../image/down@2x.png')} alt="" />
                                    }
                                    {
                                        this.state.fundEval.rtChg && Boolean(parseFloat(this.state.fundEval.rtChg)) && this.state.fundEval.rtChg.substring(0, 1) === '-' && <span className="small green">{(this.state.fundEval.rtChg * 100).toFixed(2)}%</span>
                                    }
                                    {
                                        this.state.fundEval.rtChg && Boolean(parseFloat(this.state.fundEval.rtChg)) && this.state.fundEval.rtChg.substring(0, 1) != '-' && <img className="rateImg" src={require('../../imgs/up@2x.png')} alt="" />
                                    }
                                    {
                                        this.state.fundEval.rtChg && Boolean(parseFloat(this.state.fundEval.rtChg)) && this.state.fundEval.rtChg.substring(0, 1) != '-' && <span className="small red">{(this.state.fundEval.rtChg * 100).toFixed(2)}%</span>
                                    }
                                </div>
                                <p className="subT">
                                    估算净值
                                </p>
                                <p className="subT">
                                    {/*{year}.{month}.{day}*/}
                                    {this.state.realTime.substring(0, 4)}.
                                    {this.state.realTime.substring(4, 6)}.
                                    {this.state.realTime.substring(6, 8)}
                                </p>
                            </div>
                        }
                        <div className="threeLine">
                            {
                                this.state.fundEval.preValuation && this.state.fundEval.preChg !== null && this.state.fundEval.preChg.substring(0, 1) === '-' && <div className="green">
                                    <span className="big">
                                        {(this.state.fundEval.preValuation * 1).toFixed(4)}
                                    </span>
                                    <span className="small">
                                        单位净值({this.state.YDay.substring(0, 4)}.{this.state.YDay.substring(4, 6)}.{this.state.YDay.substring(6, 8)})
                                    </span>
                                </div>
                            }
                            {
                                this.state.fundEval.preValuation && this.state.fundEval.preChg !== null && this.state.fundEval.preChg.substring(0, 1) != '-' && <div className="red">
                                    <span className="big">
                                        {(this.state.fundEval.preValuation * 1).toFixed(4)}
                                    </span>
                                    <span className="small">
                                        单位净值({this.state.YDay.substring(0, 4)}.{this.state.YDay.substring(4, 6)}.{this.state.YDay.substring(6, 8)})
                                    </span>
                                </div>
                            }
                            {
                                this.state.fundEval.preValuation === null && <div className="white">
                                    <span className="big">
                                        --
                                    </span>
                                    <span className="small">
                                        单位净值({this.state.YDay.substring(0, 4)}.{this.state.YDay.substring(4, 6)}.{this.state.YDay.substring(6, 8)})
                                    </span>
                                </div>
                            }
                            {
                                this.state.fundEval.preValuation != null && this.state.fundEval.preChg === null && <div className="white">
                                    <span className="big">
                                        {(this.state.fundEval.preValuation * 1).toFixed(4)}
                                    </span>
                                    <span className="small">
                                        单位净值({this.state.YDay.substring(0, 4)}.{this.state.YDay.substring(4, 6)}.{this.state.YDay.substring(6, 8)})
                                    </span>
                                </div>
                            }
                            {
                                this.state.fundEval.preValuation && this.state.fundEval.preChg !== null && this.state.fundEval.preChg.substring(0, 1) === '-' && <div className="green openS" onClick={() => this.openS()}>
                                    <span className="big">
                                        {parseFloat(this.state.fundEval.preChg * 100).toFixed(2)}%
                                        {/* {this.state.switch && <i className="triangle"></i>}
                                        {!this.state.switch && <i className="triangle tRote"></i>} */}
                                    </span>
                                    <span className="small">
                                        日涨跌幅
                                    </span>
                                </div>
                            }
                            {
                                this.state.fundEval.preValuation && this.state.fundEval.preChg !== null && this.state.fundEval.preChg.substring(0, 1) != '-' && <div className="red openS" onClick={() => this.openS()}>
                                    <span className="big">
                                        {parseFloat(this.state.fundEval.preChg * 100).toFixed(2)}%
                                        {/* {this.state.switch && <i className="triangle"></i>}
                                        {!this.state.switch && <i className="triangle tRote"></i>} */}
                                    </span>
                                    <span className="small">
                                        日涨跌幅
                                    </span>
                                </div>
                            }
                            {
                                this.state.fundEval.preChg === null && <div className="white openS" onClick={() => this.openS()}>
                                    <span className="big">
                                        --
                                    </span>
                                    <span className="small">
                                        日涨跌幅
                                    </span>
                                </div>
                            }

                            {
                                this.state.fundEval.preValuation2 && this.state.fundEval.preChg !== null && this.state.fundEval.preChg.substring(0, 1) === '-' && <div className="green">
                                    <span className="big">
                                        {(this.state.fundEval.preValuation2 * 1).toFixed(4)}
                                    </span>
                                    {/*<i className="triangle"></i>*/}
                                    <span className="small">
                                        累计净值({this.state.YDay.substring(0, 4)}.{this.state.YDay.substring(4, 6)}.{this.state.YDay.substring(6, 8)})
                                    </span>
                                </div>
                            }
                            {
                                this.state.fundEval.preValuation2 && this.state.fundEval.preChg !== null && this.state.fundEval.preChg.substring(0, 1) != '-' && <div className="red">
                                    <span className="big">
                                        {(this.state.fundEval.preValuation2 * 1).toFixed(4)}
                                    </span>
                                    {/*<i className="triangle"></i>*/}
                                    <span className="small">
                                        累计净值({this.state.YDay.substring(0, 4)}.{this.state.YDay.substring(4, 6)}.{this.state.YDay.substring(6, 8)})
                                    </span>
                                </div>
                            }
                            {
                                this.state.fundEval.preValuation2 === null && <div className="white">
                                    <span className="big">
                                        --
                                    </span>
                                    {/*<i className="triangle"></i>*/}
                                    <span className="small">
                                        累计净值({this.state.YDay.substring(0, 4)}.{this.state.YDay.substring(4, 6)}.{this.state.YDay.substring(6, 8)})
                                    </span>
                                </div>
                            }
                            {
                                this.state.fundEval.preValuation2 != null && this.state.fundEval.preChg === null && <div className="white">
                                    <span className="big">
                                        {(this.state.fundEval.preValuation2 * 1).toFixed(4)}
                                    </span>
                                    {/*<i className="triangle"></i>*/}
                                    <span className="small">
                                        累计净值({this.state.YDay.substring(0, 4)}.{this.state.YDay.substring(4, 6)}.{this.state.YDay.substring(6, 8)})
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                }
                {/* {
                    this.state.f208 && this.state.switch && <div className="fourBg backWhite">
                        {
                            this.state.fundEval.pchgM1 && parseFloat(this.state.fundEval.pchgM1) < 0 && <div className="green">
                                <span className="big">
                                    {parseFloat(this.state.fundEval.pchgM1 * 100).toFixed(2)}%
                        </span>
                                <span className="small">
                                    近1月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM1 && this.state.fundEval.pchgM1 === '--' && <div className="green">
                                <span className="big">
                                    {this.state.fundEval.pchgM1}
                                </span>
                                <span className="small">
                                    近1月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM1 && parseFloat(this.state.fundEval.pchgM1) > 0 && <div className="red">
                                <span className="big">
                                    {parseFloat(this.state.fundEval.pchgM1 * 100).toFixed(2)}%
                        </span>
                                <span className="small">
                                    近1月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM1 === null && <div className="white">
                                <span className="big">
                                    --
                        </span>
                                <span className="small">
                                    近1月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM3 && parseFloat(this.state.fundEval.pchgM3) < 0 && <div className="green">
                                <span className="big">
                                    {parseFloat(this.state.fundEval.pchgM3 * 100).toFixed(2)}%
                        </span>
                                <span className="small">
                                    近3月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM3 && this.state.fundEval.pchgM3 === '--' && <div className="green">
                                <span className="big">
                                    {this.state.fundEval.pchgM3}
                                </span>
                                <span className="small">
                                    近3月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM3 && parseFloat(this.state.fundEval.pchgM3) > 0 && <div className="red">
                                <span className="big">
                                    {parseFloat(this.state.fundEval.pchgM3 * 100).toFixed(2)}%
                        </span>
                                <span className="small">
                                    近3月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM3 === null && <div className="white">
                                <span className="big">
                                    --
                        </span>
                                <span className="small">
                                    近3月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM6 && parseFloat(this.state.fundEval.pchgM6) < 0 && <div className="green">
                                <span className="big">
                                    {parseFloat(this.state.fundEval.pchgM6 * 100).toFixed(2)}%
                        </span>
                                <span className="small">
                                    近6月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM6 && this.state.fundEval.pchgM6 === '--' && <div className="green">
                                <span className="big">
                                    {this.state.fundEval.pchgM6}
                                </span>
                                <span className="small">
                                    近6月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM6 && parseFloat(this.state.fundEval.pchgM6) > 0 && <div className="red">
                                <span className="big">
                                    {parseFloat(this.state.fundEval.pchgM6 * 100).toFixed(2)}%
                        </span>
                                <span className="small">
                                    近6月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgM6 === null && <div className="white">
                                <span className="big">
                                    --
                        </span>
                                <span className="small">
                                    近6月
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgY1 && parseFloat(this.state.fundEval.pchgY1) < 0 && <div className="green">
                                <span className="big">
                                    {parseFloat(this.state.fundEval.pchgY1 * 100).toFixed(2)}%
                        </span>
                                <span className="small">
                                    近1年
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgY1 && this.state.fundEval.pchgY1 === '--' && <div className="green">
                                <span className="big">
                                    {this.state.fundEval.pchgY1}
                                </span>
                                <span className="small">
                                    近1年
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgY1 && parseFloat(this.state.fundEval.pchgY1) > 0 && <div className="red">
                                <span className="big">
                                    {parseFloat(this.state.fundEval.pchgY1 * 100).toFixed(2)}%
                        </span>
                                <span className="small">
                                    近1年
                        </span>
                            </div>
                        }
                        {
                            this.state.fundEval.pchgY1 === null && <div className="red">
                                <span className="big">
                                    --
                        </span>
                                <span className="small">
                                    近1年
                        </span>
                            </div>
                        }
                    </div>
                } */}
                {
                    (this.state.fundF206.fundType && this.state.fundF206.fundType.indexOf("QDII") > -1)  ?
                    <div>
                        <FundEarnings fundId={this.reg_fundId}></FundEarnings>
                        {this.renderFundMenager()}
                    </div>
                    :
                    (
                        <div>
                            {
                                // 修改
                                <div className="regroup_earnings">
                                    <div className={this.state.reg_tabIndex === 1 ? "appraisement active activeFont" : "appraisement"} onClick={()=>this.regroup_tab(1)}>实时估值</div>
                                    <div className={this.state.reg_tabIndex === 2 ? "earnings active activeFont" : "earnings"} onClick={this.regroup_tab.bind(this, 2)}>基金收益</div>
                                </div>
                            }
                            {   //修改
                                this.state.reg_tabIndex === 2 &&
                                <div>
                                    <FundEarnings fundId={this.reg_fundId}></FundEarnings>
                                </div>
                            }
                            {
                                (this.state.f208 && this.state.fundEval.fundEvalList.length > 0 ) ?
                                this.state.reg_tabIndex === 1 &&
                                <div className="realWrap bgfff">
                                    <div className="eTitle">实时估值</div>
                                    <div className="eSubwrap">
                                        <span>
                                            {this.state.realTime.substring(0, 4)}.
                                            {this.state.realTime.substring(4, 6)}.
                                            {this.state.realTime.substring(6, 8)}&nbsp;
                                            {this.state.realTime.substring(8, 10)}:
                                            {this.state.realTime.substring(10, 12)}
                                        </span>
                                        <span>估算净值 {(this.state.newP * 1).toFixed(4)}</span>
                                        {
                                            this.state.fundEval.rtChg && this.state.fundEval.rtChg.substring(0, 1) === '-' && <span>估算涨幅 <em className="green">{parseFloat(this.state.fundEval.rtChg * 100).toFixed(2)}%</em> </span>
                                        }
                                        {
                                            this.state.fundEval.rtChg && this.state.fundEval.rtChg.substring(0, 1) != '-' && <span>估算涨幅 <em className="red">{parseFloat(this.state.fundEval.rtChg * 100).toFixed(2)}%</em> </span>
                                        }
                                    </div>
                                    <div className="rateText clearfix">
                                        <span className="fl">净值</span>
                                        <span className="fr">涨跌幅</span>
                                    </div>
                                    <div id="realRate">
                                        <ReactEcharts
                                            option={optionObj}
                                            onEvents={onEvents}
                                            style={{ height: '180px', width: '100%' }}
                                        />
                                        <div className="vaX">
                                            <span>09:30</span>
                                            <span>11:30/13:30</span>
                                            <span>15:00</span>
                                        </div>
                                    </div>
                                    <p className="sCenter">
                                        按照基金持仓和指数走势估算，不代表真实净值，仅供参考
                                    </p>
                                </div>
                                :
                                this.state.reg_tabIndex === 1 &&
                                <div className="regroup_emporty">
                                    暂无实时估值数据
                                </div>
                            }
                            {this.renderFundMenager()}
                            {   this.reg_fundId &&
                                // <FundTab fundId={this.reg_fundId} getDataF206={this.getDataF206.bind(this)}></FundTab>
                                <FundTab fundId={this.reg_fundId} fundF206={this.state.fundF206}></FundTab>
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Valuation;