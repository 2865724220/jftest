import React, { Component } from "react";
import ReactEcharts from 'echarts-for-react'
import { host, orgId } from '../common/common'
import DiagnoseResult from './diagnoseResult';
import './regroupDiagnose.css';
class Diagnose extends Component {
    constructor(props) {
        super(props)
        this.resultFundId;
        this.state = {
            selectTwo: 1,
            radar: {
                "tranCode": "F201",
                "respTime": "20180524150130123",
                "respCode": "00",
                "respMsg": "success",
                "sign": "8fc47b4180aeca6fbeea72c167e9213c079e3d43ac1f1c23919bed4e81bea264",
                "baseScore": "95.53",
                "mngScore": "58.11",
                "rankScore": "40",
                "rateScore": "43.64",
                "riskScore": "50.44"
            },
            data: {},
            topData: {},
            //allList: [],
            fundList: [],
            hushenList: [],
            time: [],
            fundScore: "",
            radar: [],
            percent: '',
            gjjdata: '',
            hsdata: '',
            firstTime: '',
            lastTime: '',
            resultObj: {
                fundRankList: {},
                f207: false,
                code207: ''
            }
        }
    }

    componentDidMount() {
        document.title = "基金诊断"
        let fundName = localStorage.getItem('fundName')
        let fundId = this.props.match.params.fundId
        this.resultFundId = fundId;

        this.fetchData(fundId)
        this.fetch207(fundId)
        this.fetchResult(fundId)
    }
    //--修改
    fetchResult(fundId) {
        let body = {
            "typeCode": "1",
            "orderCondition": "",
            "orgId": orgId,
            "tranCode": "F207",
            "version": 100,
            "reqChl": "03",
            "fundId": fundId,
            "reqTime": "20180808080808000",
            "sign": "SHA256withRSA2048",
        }
        fetch(host + "F207", {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            return result.json()
        }).then((res) => {
            console.log(res)
            if (res.respCode === '00') {
                this.setState({
                    resultObj: {
                        fundRankList: res.fundRankList[0],
                        f207: true,
                        code207: '00'
                    }
                })
            } else {
                this.setState({
                    resultObj: {
                        f207: true,
                        code207: res.respCode
                    }
                })
                setTimeout(() => {
                    // alert(res.respMsg)
                })
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                resultObj: {
                    f207: true,
                }
            })
            setTimeout(() => {
                // alert(err)
            })
        })
    }
    fetch207(fundId) {
        let body = {
            "typeCode": "1",
            "orderCondition": "",
            "orgId": orgId,
            "tranCode": "F207",
            "version": 100,
            "reqChl": "03",
            "fundId": fundId,
            "reqTime": "20180808080808000",
            "sign": "SHA256withRSA2048",
        }
        fetch(host + "F207", {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            return result.json()
        }).then((res) => {
            console.log(res.fundRankList[0].rank)
            if (res.respCode === '00') {
                this.setState({
                    percent: (100 - res.fundRankList[0].rank * 100 / res.fundRankList[0].rankCount).toFixed(0)
                })

            }
        }).catch(err => {

        })
    }
    fetchData(fundId) {
        fetch(host + "F201", {
            method: 'POST',
            body: JSON.stringify({
                "orgId": orgId,
                "tranCode": "F201",
                "version": 100,
                "reqChl": "03",
                "reqTime": "20180808080808000",
                "sign": "SHA256withRSA2048",
                "fundId": fundId
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            return result.json()
        }).then((res) => {
            console.log("F201")
            console.log(res)
            this.setState({
                topData: res,
                radar: [res.baseScore, res.rankScore, res.riskScore, res.rateScore, res.mngScore]
            })
        }).catch(err =>
            console.log(err)
        )
    }

    getRadarOption() {
        let radarArray = this.state.radar;
        let i = -1;
        let option = {
            radar: {
                center: ['50%', '55%'],
                radius: "70%",
                name: {
                    textStyle: {
                        color: '#6b7d97',
                        fontSize: "0.75rem",
                    }
                },
                indicator: [
                    { name: '基金因子', max: 5 },
                    { name: '评级因子', max: 5 },
                    { name: '风险因子', max: 5 },
                    { name: '收益因子', max: 5 },
                    { name: '管理因子', max: 5 }
                ],
                splitArea: {
                    areaStyle: {
                        // color:["#071834"],
                        opacity: 0
                    }
                },
                name: {
                    padding: [5, -15, -10, -10],
                    rich: {
                        a: {},
                        b: {
                            color: 'red',
                            align: 'center',
                            padding: [0,0,3,0]
                        }
                    },
                    formatter: (a,b)=>{
                        i++
                        let Bname = radarArray[i] ? radarArray[i] : '';
                        // let Aname = a ? a : '--';
                        // let Bvalue = radarArray[i] ? radarArray[i] : '--'
                        // return `${Aname} \n ${Bvalue}`
                        return `{a|${a}} \n {b|${Bname}}`
                    }
                },
                splitLine: {}
            },
            series: [{
                type: 'radar',
                data: [
                    {
                        value: radarArray,
                        // label: {
                        //     normal: {
                        //         show: true,
                        //         formatter: function (params) {
                        //             return params.value;
                        //         }
                        //     }
                        // },
                        lineStyle: {
                            color: "#2389ec"
                        },
                        areaStyle: {
                            opacity: 0.5,
                            color: "#2388ff"
                        },
                    },
                ]
            }]
        };
        return option
    }
    renderResult() {
        let obj = this.state.resultObj;
        if (!obj.code207) {
            return;
        }
        return (
            <div className="diagnoseResult">
                <DiagnoseResult resultObj={obj}></DiagnoseResult>
            </div>
        )
    }
    render() {
        let resultObj = this.state.resultObj;
        return (
            <div className="diagnose">
                {
                    resultObj.code207 === "99" &&
                    <div className="resultTop1 resultTopnull">
                        暂无数据
                    </div>
                }
                {
                    resultObj.code207 !== "99" &&
                    <div className="resultTop regroupResultTop">
                        <div className="result3 detail_leftWidth">
                            <div className="resultLeft">
                                <div className="rank1">{resultObj.fundRankList.rank}</div>
                                <div className="rank2">/{resultObj.fundRankList.rankCount}</div>
                            </div>
                            <div className="tong">
                                同类排名
                            </div>
                        </div>

                        <div className="resultRight detail_rightWidth">
                            <div className="diagTopLeft">
                                <div className="">
                                    <span className="diagScore">{this.state.topData.fundScore !== null ? this.state.topData.fundScore : "--"}</span>
                                    <span className="diagWord">分</span>
                                </div>
                                {
                                    this.state.percent !== "" &&
                                    <div className="smallWord">
                                        超过同类型{this.state.percent}%的基金
                                    </div>
                                }
                            </div>
                            <div className="resultRight2">
                                <div className="resultScore">
                                    {resultObj.fundRankList.fundType}
                                </div>
                                <div className="tong">
                                    基金类型
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div>
                    <ReactEcharts
                        option={this.getRadarOption()}
                        style={{ height: "330px", background: "#fff" }}
                    />
                </div>
                <div className="diagTop regroupdiagTop">
                    <div className="diagTopRight">
                        <div className="diagWord">{this.state.topData.profitRate !== null ? this.state.topData.profitRate : "--"}</div>
                        <div className="smallWord">盈利能力</div>
                    </div>
                    <div className="diagTopRight">
                        <div className="diagWord">{this.state.topData.riskRate !== null ? this.state.topData.riskRate : "--"}</div>
                        <div className="smallWord">抗风险能力</div>
                    </div>
                    <div className="diagTopRight">
                        <div className="diagWord">{this.state.topData.mgmtRate !== null ? this.state.topData.mgmtRate : "--"}</div>
                        <div className="smallWord">投资管理能力</div>
                    </div>
                </div>
                {this.renderResult()}
            </div>
        )
    }
}
export default Diagnose
