import React, { Component } from "react";
import ReactEcharts from 'echarts-for-react'
import { host, orgId } from '../common/common'
class Diagnose extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectOne: 0,
            selectTwo: 1,
            data: {},
            fundList: [],
            hushenList: [],
            time: [],
            gjjdata: '',
            hsdata: '',
            firstTime: '',
            lastTime: '',
        }
    }

    componentDidMount() {
        let fundName = localStorage.getItem('fundName');
        let fundId = this.props.fundId;
        // document.title = fundName + " " + fundId;
        document.title = "基金详情";
        this.fetchChart(1, fundId)
    }
    
    fetchChart(num, fundId) {
        let body = {
            "fundId": fundId,
            "period": num,
            "orgId": orgId,
            "tranCode": "F203",
            "version": 100,
            "reqChl": "03",
            "reqTime": "20180808080808000",
            "sign": "SHA256withRSA2048",
        }
        fetch(host + "F203", {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            return result.json()
        }).then((res) => {
            console.log(res.fundPerfList[res.fundPerfList.length - 1])
            let time = [];
            let fund = [];
            let hushen = []

            this.setState({
                gjjdata: res.fundPerfList[res.fundPerfList.length - 1].value,
                hsdata: res.index300PerfList[res.index300PerfList.length - 1].value
            })

            res.fundPerfList.map((value, key) =>
                time.push(value.valuationDate.substring(0))
            )
            res.fundPerfList.map((value, key) =>
                fund.push(value.value.replace("%", ""))
            )
            res.index300PerfList.map((value, key) =>
                hushen.push(value.value.replace("%", ""))
            )

            this.setState({
                fundList: fund,
                hushenList: hushen,
                time: time,
                firstTime: time[0],
                lastTime: time[time.length - 1]
            })
            console.log(this.state.fundList)
            console.log(this.state.hushenList)
        }).catch(err =>
            console.log(err)
        )
    }
    getLineOption() {
        let option = {
            backgroundColor: "#fff",
            // legend: {
            //     data:['该基金','沪深']
            // },
            tooltip: {
                trigger: 'axis',
                formatter: "{b}<br/>{a}: {c}%<br/>{a1}: {c1}%"
            },
            grid: {
                top: '15%',
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
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    textStyle: {
                        color: '#6B7D97',
                        fontSize: '10'
                    },
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value} %',
                    textStyle: {
                        color: '#6B7D97',
                        fontSize: '10'
                    },
                },

                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
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
            series: [
                {
                    name: '该基金',
                    type: 'line',
                    data: this.state.fundList,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#079ef6'
                        }
                    },
                },
                {
                    name: '沪深',
                    type: 'line',
                    data: this.state.hushenList,
                    symbol: 'none',
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
    onPress(number) {
        this.setState({
            selectOne: number
        })
        this.fetchChart(number + 1, this.props.fundId)
    }
    onClick(number) {
        this.setState({
            selectTwo: number
        })
    }
    render() {
        return (
            <div className="diagnose">
                <div className="lineChart marginNone">
                    <div className="lineTitle">
                        基金收益
                    </div>
                    <div className='lineChartTitle'>
                        <img className='gjjhs' src={require('../../image/gaijijin@2x.png')} alt='' />
                        <div>
                            该基金
                        </div>
                        <div className='gjjfont'>
                            {this.state.gjjdata}
                        </div>
                        <img className='gjjhs' src={require('../../image/hushen@2x.png')} alt='' />
                        <div>
                            沪深
                        </div>
                        <div className='hsfont'>
                            {this.state.hsdata}
                        </div>
                    </div>
                    <ReactEcharts
                        option={this.getLineOption()}
                        style={{ height: "205px" }}
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
                        <div className={this.state.selectOne === 0 ? "timeItemAct" : "timeItem"} onClick={() => this.onPress(0)}>
                            近1月
                        </div>
                        <div className={this.state.selectOne === 1 ? "timeItemAct" : "timeItem"} onClick={() => this.onPress(1)}>
                            近3月
                        </div>
                        <div className={this.state.selectOne === 2 ? "timeItemAct" : "timeItem"} onClick={() => this.onPress(2)}>
                            近6月
                        </div>
                        <div className={this.state.selectOne === 3 ? "timeItemAct" : "timeItem"} onClick={() => this.onPress(3)}>
                            近1年
                        </div>
                        <div className={this.state.selectOne === 4 ? "timeItemAct" : "timeItem"} onClick={() => this.onPress(4)}>
                            近3年
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Diagnose
