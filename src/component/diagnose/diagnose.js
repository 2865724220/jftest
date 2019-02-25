import React, {Component} from "react";
import ReactEcharts from 'echarts-for-react'
import {host, orgId} from '../common/common'
class Diagnose extends Component {
    constructor(props){
        super(props)
        this.state={
            selectOne:0,
            selectTwo:1,
            radar:{
                "tranCode":"F201",
                "respTime":"20180524150130123",
                "respCode":"00",
                "respMsg":"success",
                "sign":"8fc47b4180aeca6fbeea72c167e9213c079e3d43ac1f1c23919bed4e81bea264",
                "baseScore":"95.53",
                "mngScore":"58.11",
                "rankScore":"40",
                "rateScore":"43.64",
                "riskScore":"50.44"
            },
            data:{},
            gpcc:[],
            tzfg:{},
            jjlx:'',
            topData:{},
            allList:[],
            fundList:[],
            hushenList:[],
            time:[],
            fundScore:"",
            jjlxArray:[],
            radar:[],
            fengge:'',
            guimo:'',
            tzfgrect:'大盘&成长',
            code204:'00',
            percent:'',
            gjjdata:'',
            hsdata:'',
            firstTime:'',
            lastTime:'',
        }
    }

    componentDidMount(){
        let fundName = localStorage.getItem('fundName')
        let fundId = this.props.match.params.fundId
        // document.title = fundName+" "+fundId;
        document.title = "基金诊断"
        this.fetchData(fundId)
        this.fetchChart(1,fundId)
        this.fetchGpcc(fundId)
        this.fetchTzfg(fundId)
        this.fetchJjlx(fundId)
        this.fetchManager(fundId)
        this.fetch207(fundId)
    }
    onPush(data){
        localStorage.setItem('fundId',data)
        this.props.history.push({pathname: "/manager"})
    }
    fetch207(fundId){
        let body = {
            "typeCode":"1",
            "orderCondition":"",
            "orgId":orgId,
            "tranCode":"F207",
            "version":100,
            "reqChl":"03",
            "fundId":fundId,
            "reqTime":"20180808080808000",
            "sign":"SHA256withRSA2048",
        }
        fetch(host+"F207",{
            method:'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result)=>{
            return result.json()
        }).then((res)=>{
            console.log(res.fundRankList[0].rank)
            if(res.respCode==='00'){
                this.setState({
                    percent:(100-res.fundRankList[0].rank*100/res.fundRankList[0].rankCount).toFixed(0)
                })
                // document.title = res.fundRankList[0].fundName+"（"+res.fundRankList[0].fundId+"）"
            }
        }).catch(err=>{

        })
    }
    fetchChart(num,fundId){
        let body = {
            "fundId":fundId,
            "period":num,
            "orgId":orgId,
            "tranCode":"F203",
            "version":100,
            "reqChl":"03",
            "reqTime":"20180808080808000",
            "sign":"SHA256withRSA2048",
        }
        fetch(host+"F203",{
            method:'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result)=>{
            return result.json()
        }).then((res)=>{
            console.log(res.fundPerfList[res.fundPerfList.length-1])
            let time = [];
            let fund = [];
            let hushen = []

            this.setState({
                gjjdata:res.fundPerfList[res.fundPerfList.length-1].value,
                hsdata:res.index300PerfList[res.index300PerfList.length-1].value
            })

            res.fundPerfList.map((value,key)=>
                time.push(value.valuationDate.substring(0))
            )
            res.fundPerfList.map((value,key)=>
                fund.push(value.value.replace("%",""))
            )
            res.index300PerfList.map((value,key)=>
                hushen.push(value.value.replace("%",""))
            )

            this.setState({
                fundList:fund,
                hushenList:hushen,
                time:time,
                firstTime:time[0],
                lastTime:time[time.length-1]
            })
            console.log(this.state.fundList)
            console.log(this.state.hushenList)
        }).catch(err=>
            console.log(err)
        )
    }
    fetchManager(fundId){
        let body = {
            "fundId":fundId,
            "orgId":orgId,
            "tranCode":"F202",
            "version":100,
            "reqChl":"03",
            "reqTime":"20180808080808000",
            "sign":"SHA256withRSA2048",
        }
        fetch(host+"F202",{
            method:'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result)=>{
            return result.json()
        }).then((res)=>{
            console.log(res)
            this.setState({
                allList:res.allList
            })
        }).catch(err=>
            console.log(err)
        )
    }
    fetchData(fundId){
        fetch(host+"F201",{
            method:'POST',
            body: JSON.stringify({
                "orgId":orgId,
                "tranCode":"F201",
                "version":100,
                "reqChl":"03",
                "reqTime":"20180808080808000",
                "sign":"SHA256withRSA2048",
                "fundId":fundId
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result)=>{
            return result.json()
        }).then((res)=>{
            console.log("F201")
            console.log(res)
            this.setState({
                topData:res,
                radar:[res.baseScore,res.rankScore,res.riskScore,res.rateScore,res.mngScore]
            })
        }).catch(err=>
            console.log(err)
        )
    }
    fetchTzfg(fundId){
        fetch(host+"F204",{
            method:'POST',
            body: JSON.stringify({"orgId":orgId,"tranCode":"F204","version":100,"reqChl":"03","reqTime":"20180808080808000","sign":"SHA256withRSA2048","fundId":fundId}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result)=>{
            return result.json()
        }).then((res)=>{
            console.log("F204")
            console.log(res)
            console.log(res.respCode)
            this.setState({
                code204:res.respCode
            })
            let a = res.investDtl.map
            this.setState({
                tzfg:res.investDtl.map,
                fengge:res.styleType,
                guimo:res.scaleType,
                tzfgrect:res.scaleType+"&"+res.styleType,

            })
        }).catch(err=>
            console.log(err)
        )
    }
    fetchGpcc(fundId){
        fetch(host+"F205",{
            method:'POST',
            body: JSON.stringify({"orgId":orgId,"tranCode":"F205","version":100,"reqChl":"03","reqTime":"20180808080808000","sign":"SHA256withRSA2048","fundId":fundId}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result)=>{
            return result.json()
        }).then((res)=>{
            console.log("F205")
            console.log(res)
            this.setState({
                gpcc:res.stockList
            })
        }).catch(err=>
            console.log(err)
        )
    }
    fetchJjlx(fundId){
        fetch(host+"F206",{
            method:'POST',
            body: JSON.stringify({"orgId":orgId,"tranCode":"F206","version":100,"reqChl":"03","reqTime":"20180808080808000","sign":"SHA256withRSA2048","fundId":fundId}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result)=>{
            return result.json()
        }).then((res)=>{
            console.log("F206")
            // if(res.selectDtl!==null){
                console.log(res)
                console.log(res.selectDtl.fundType)
                this.setState({
                    jjlxArray:[res.selectDtl.other.replace("%",""),res.selectDtl.cash.replace("%",""),res.selectDtl.bond.replace("%",""),res.selectDtl.stock.replace("%","")],
                    jjlx:res.selectDtl.fundType
                })
            // }
            return res
        }).then((resu)=>{

        }).catch(err=>
            console.log(err)
        )
    }

    getRadarOption(){
        let option = {
            radar: {
                name: {
                    textStyle: {
                        color: '#6b7d97',
                        fontSize: "0.75rem",
                    }
                },
                indicator: [
                   { name: '基金因子', max: 5},
                   { name: '评级因子', max: 5},
                   { name: '风险因子', max: 5},
                   { name: '收益因子', max: 5},
                   { name: '管理因子', max: 5}
                ],
                splitArea:{
                    areaStyle:{
                        // color:["#071834"],
                        opacity:0
                    }
                },
                splitLine:{}
            },
            series: [{
                type: 'radar',
                data : [
                    {
                        value : this.state.radar,
                        label: {
                            normal: {
                                show: true,
                                formatter:function(params) {
                                    return params.value;
                                }
                            }
                        },
                        lineStyle:{
                            color: "#2389ec"
                        },
                        areaStyle:{
                            opacity:0.5,
                            color: "#2388ff"
                        },
                    },
                ]
            }]
        };
        return option
    }
    getLineOption(){
        let option={
            backgroundColor: "#fff",
            // legend: {
            //     data:['该基金','沪深']
            // },
            tooltip: {
                trigger: 'axis',

            },
            grid: {
                top:'15%',
                left: '1%',
                right: '2%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.time,
                show: false,
                splitLine: {
                    show: false
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    textStyle:{
                        color:'#6B7D97',
                        fontSize:'10'
                    },
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value} %',
                    textStyle:{
                        color:'#6B7D97',
                        fontSize:'10'
                    },
                },

                splitLine: {
                    show: false
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false
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
                        color:'#F6F8FB'
                    }
                }
            },
            series: [
                {
                    name:'该基金',
                    type:'line',
                    data:this.state.fundList,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color: '#079ef6'
                        }
                    },
                },
                {
                    name:'沪深',
                    type:'line',
                    data:this.state.hushenList,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color: '#eb6897'
                        }
                    },
                },
            ]
        };
        return option
    }
    getBarChart(){
        let array = this.state.jjlxArray
        let option = {
            yAxis: {
                type: 'category',
                data: ["其他",'货币','债券','股票'],
                splitLine: {
                    show: false
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false
                }
            },
            xAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false
                }
            },
            series: [{
                data: array,
                type: 'bar',
                barWidth: "15px",
                itemStyle: {   
                    normal:{  
    　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params){
                            var colorList = ['#E2E9F0','#bfcedc','#86A2BC'];
                            return colorList[params.dataIndex];
                        },
                        barBorderRadius: [0, 7, 7, 0]
                    },
                },
            }]
        };
        
        return option
    }
    onPress(number){
        this.setState({
            selectOne:number
        })
        this.fetchChart(number+1,this.props.match.params.fundId)
    }
    onClick(number){
        this.setState({
            selectTwo:number
        })
    }
    render(){
        let investmentS ="大盘&成长"
        return(
            <div className="diagnose">
                <div className="diagTop">
                    <div className="diagTopLeft">
                        <div className="">
                            <span className="diagScore">{this.state.topData.fundScore!==null?this.state.topData.fundScore:"--"}</span>
                            <span className="diagWord">分</span>
                        </div>
                        {
                            this.state.percent!==""&&
                            <div className="smallWord">
                                超过同类型{this.state.percent}%的基金
                            </div>
                        }
                    </div>
                    <div className="diagTopRight">
                        <div className="diagWord">{this.state.topData.profitRate!==null?this.state.topData.profitRate:"--"}</div>
                        <div className="smallWord">盈利能力</div>
                    </div>
                    <div className="diagTopRight">
                        <div className="diagWord">{this.state.topData.riskRate!==null?this.state.topData.riskRate:"--"}</div>
                        <div className="smallWord">抗风险能力</div>
                    </div>
                    <div className="diagTopRight">
                        <div className="diagWord">{this.state.topData.mgmtRate!==null?this.state.topData.mgmtRate:"--"}</div>
                        <div className="smallWord">投资管理能力</div>
                    </div>
                </div>
                <div>
                    <ReactEcharts
                        option={this.getRadarOption()}
                        style={{height:"330px",background:"#071834"}}
                    />
                </div>
                <div className="oneLine" onClick={()=>this.onPush(this.props.match.params.fundId)}>
                    <span className="lineLeft">
                        基金经理
                    </span>
                    {
                        this.state.allList&&this.state.allList.length!=0&&this.state.allList.map((value,key)=>
                            <span className="curMngName" key={key}>
                                {value.curentMng}
                            </span>
                        )
                    }

                </div>
                <div className="lineChart">
                    <div className="lineTitle">
                        基金收益
                    </div>
                    <div className='lineChartTitle'>
                        <img className='gjjhs' src={require('../../image/gaijijin@2x.png')} alt=''/>
                        <div>
                            该基金
                        </div>
                        <div className='gjjfont'>
                            {this.state.gjjdata}
                        </div>
                        <img className='gjjhs' src={require('../../image/hushen@2x.png')} alt=''/>
                        <div>
                            沪深
                        </div>
                        <div className='hsfont'>
                            {this.state.hsdata}
                        </div>
                    </div>
                    <ReactEcharts
                        option={this.getLineOption()}
                        style={{height:"205px"}}
                    />
                    <div className="digTime">
                        <div className='fTime'>
                            {this.state.firstTime}
                        </div>
                        <div className='lTime'>
                            {this.state.lastTime}
                        </div>
                    </div>
                    <div className="timeLine">
                        <div className={this.state.selectOne===0?"timeItemAct":"timeItem"} onClick={()=>this.onPress(0)}>
                            近1月
                        </div>
                        <div className={this.state.selectOne===1?"timeItemAct":"timeItem"} onClick={()=>this.onPress(1)}>
                            近3月
                        </div>
                        <div className={this.state.selectOne===2?"timeItemAct":"timeItem"} onClick={()=>this.onPress(2)}>
                            近6月
                        </div>
                        <div className={this.state.selectOne===3?"timeItemAct":"timeItem"} onClick={()=>this.onPress(3)}>
                            近1年
                        </div>
                        <div className={this.state.selectOne===4?"timeItemAct":"timeItem"} onClick={()=>this.onPress(4)}>
                            近3年
                        </div>
                    </div>
                </div>
                <div className="triLine">
                    <div className={this.state.selectTwo===0?"trItem active":"trItem"} onClick={()=>this.onClick(0)}>
                        基金类型
                    </div>
                    <div className={this.state.selectTwo===1?"trItem active":"trItem"} onClick={()=>this.onClick(1)}>
                        投资风格
                    </div>
                    <div className={this.state.selectTwo===2?"trItem active":"trItem"} onClick={()=>this.onClick(2)}>
                        股票持仓
                    </div>
                </div>
                {
                    this.state.selectTwo===0 &&
                    <div className="barChart">

                        <div className="pgxjj">
                            {this.state.jjlx}
                        </div>

                        <ReactEcharts
                            option={this.getBarChart()}
                            style={{height:"216px",background:'#fff'}}
                        />
                    </div>
                }
                {
                    this.state.code204==="99" && this.state.selectTwo===1 &&
                    <div className="rectanChart">
                        <div className="dpcz">
                            暂无数据
                        </div>
                        <div className="tzfg">
                            暂无数据
                        </div>
                    </div>
                }
                {
                    this.state.code204!=="99" && this.state.selectTwo===1 &&
                    <div className="rectanChart">
                        <div className="dpcz">
                            {/*{investmentS}*/}
                            规模:{this.state.guimo}
                        </div>
                        <div className="tzfg">
                            投资风格:{this.state.fengge}
                        </div>
                        {
                            <div className="bigRect mgb12">
                                <div className="triRect">
                                    <div className="whiteRect">
                                        大盘
                                    </div>
                                    <div className={this.state.tzfgrect==='大盘&价格'?'rect rect3':'rect rect1'}>
                                        {/*{this.state.tzfg.bigValue}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect==='大盘&平衡'?'rect rect3':'rect rect1'}>
                                        {/*{this.state.tzfg.bigBalance}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect==='大盘&成长'?'rect rect3':'rect rect1'}>
                                        {/*{this.state.tzfg.bigGrow}%*/}
                                    </div>
                                </div>
                                <div className="triRect">
                                    <div className="whiteRect">
                                        中盘
                                    </div>
                                    <div className={this.state.tzfgrect==='中盘&价格'?'rect rect3':'rect rect1'}>
                                        {/*{this.state.tzfg.midValue}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect==='中盘&平衡'?'rect rect3':'rect rect1'}>
                                        {/*{this.state.tzfg.midBalance}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect==='中盘&成长'?'rect rect3':'rect rect1'}>
                                        {/*{this.state.tzfg.midGrow}%*/}
                                    </div>
                                </div>
                                <div className="triRect">
                                    <div className="whiteRect">
                                        小盘
                                    </div>
                                    <div className={this.state.tzfgrect==='小盘&价格'?'rect rect3':'rect rect1'}>
                                        {/*{this.state.tzfg.smallValue}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect==='小盘&平衡'?'rect rect3':'rect rect1'}>
                                        {/*{this.state.tzfg.smallBalance}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect==='小盘&成长'?'rect rect3':'rect rect1'}>
                                        {/*{this.state.tzfg.smallGrow}%*/}
                                    </div>
                                </div>
                                <div className="triRect">
                                    <div className="whiteRect">

                                    </div>
                                    <div className="whiteRect">
                                        价值
                                    </div>
                                    <div className="whiteRect">
                                        平衡
                                    </div>
                                    <div className="whiteRect">
                                        成长
                                    </div>
                                </div>
                            </div>
                        }
                        {
                                <div className="bigRect">
                                    <div className="triRect">
                                        <div className="whiteRect">
                                            大盘
                                        </div>
                                        <div className={this.state.tzfg.bigValue*100<1?"rect rect1":this.state.tzfg.bigValue*100>20?"rect rect3":"rect rect2"}>
                                            {(this.state.tzfg.bigValue*100).toFixed(2)}%
                                        </div>
                                        <div className={this.state.tzfg.bigBalance*100<1?"rect rect1":this.state.tzfg.bigBalance*100>20?"rect rect3":"rect rect2"}>
                                            {(this.state.tzfg.bigBalance*100).toFixed(2)}%
                                        </div>
                                        <div className={this.state.tzfg.bigGrow*100<1?"rect rect1":this.state.tzfg.bigGrow*100>20?"rect rect3":"rect rect2"}>
                                            {(this.state.tzfg.bigGrow*100).toFixed(2)}%
                                        </div>
                                    </div>
                                    <div className="triRect">
                                        <div className="whiteRect">
                                            中盘
                                        </div>
                                        <div className={this.state.tzfg.midValue*100<1?"rect rect1":(1<=this.state.tzfg.midValue*100 && this.state.tzfg.midValue*100<=20)?"rect rect2":"rect rect3"}>
                                            {(this.state.tzfg.midValue*100).toFixed(2)}%
                                        </div>
                                        <div className={this.state.tzfg.midBalance*100<1?"rect rect1":(1<=this.state.tzfg.midBalance*100 && this.state.tzfg.midBalance*100<=20)?"rect rect2":"rect rect3"}>
                                            {(this.state.tzfg.midBalance*100).toFixed(2)}%
                                        </div>
                                        <div className={this.state.tzfg.midGrow*100<1?"rect rect1":(1<=this.state.tzfg.midGrow*100 && this.state.tzfg.midGrow*100<=20)?"rect rect2":"rect rect3"}>
                                            {(this.state.tzfg.midGrow*100).toFixed(2)}%
                                        </div>
                                    </div>
                                    <div className="triRect">
                                        <div className="whiteRect">
                                            小盘
                                        </div>
                                        <div className={this.state.tzfg.smallValue*100<1?"rect rect1":(1<=this.state.tzfg.smallValue*100 && this.state.tzfg.smallValue*100<=20)?"rect rect2":"rect rect3"}>
                                            {(this.state.tzfg.smallValue*100).toFixed(2)}%
                                        </div>
                                        <div className={this.state.tzfg.smallBalance*100<1?"rect rect1":(1<=this.state.tzfg.smallBalance*100 && this.state.tzfg.smallBalance*100<=20)?"rect rect2":"rect rect3"}>
                                            {(this.state.tzfg.smallBalance*100).toFixed(2)}%
                                        </div>
                                        <div className={this.state.tzfg.smallGrow*100<1?"rect rect1":(1<=this.state.tzfg.smallGrow*100 && this.state.tzfg.smallGrow*100<=20)?"rect rect2":"rect rect3"}>
                                            {(this.state.tzfg.smallGrow*100).toFixed(2)}%
                                        </div>
                                    </div>
                                    <div className="triRect">
                                        <div className="whiteRect">

                                        </div>
                                        <div className="whiteRect">
                                            价值
                                        </div>
                                        <div className="whiteRect">
                                            平衡
                                        </div>
                                        <div className="whiteRect">
                                            成长
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                }
                {
                    this.state.selectTwo===2 &&
                    <div className="chicang">
                        <div className="chicangGrey">
                            <div className="chicangLeft">
                                股票持仓（前十）
                            </div>
                            <div className="chicangMiddle">
                                占比
                            </div>
                            <div className="chicangRight">
                                市值
                            </div>
                        </div>
                        {
                            this.state.gpcc&&this.state.gpcc.map((value,key)=>
                                <div className="chicangWhite" key={key}>
                                    <div className="chicangLeft">
                                        {value.sholding2+"（"+value.esymbol+"）"}
                                    </div>
                                    <div className="chicangMiddle">
                                        {value.sholding7}%
                                    </div>
                                    <div className="chicangRight">
                                        {(value.sholding5/100000000).toFixed(2)}亿
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        )
    }
}
export default Diagnose
