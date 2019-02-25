import React, { Component } from "react";
import ReactEcharts from 'echarts-for-react'
import { host, orgId } from '../common/common'
class Diagnose extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectTwo: 1,
            data: {},
            gpcc: [],
            tzfg: {},
            time: [],
            fengge: '',
            guimo: '',
            tzfgrect: '大盘&成长',
            code204: '00',
            amountPer: '',
            newDate: ''
        }
    }

    componentDidMount() {
        let fundName = localStorage.getItem('fundName');
        let fundId = this.props.fundId;
        // document.title = fundName + " " + fundId;
        document.title = "基金详情"
        //this.fetchChart(1, fundId)
        this.fetchGpcc(fundId)
        this.fetchTzfg(fundId)
        //this.fetchJjlx(fundId)
    }
    fetchTzfg(fundId) {
        fetch(host + "F204", {
            method: 'POST',
            body: JSON.stringify({ "orgId": orgId, "tranCode": "F204", "version": 100, "reqChl": "03", "reqTime": "20180808080808000", "sign": "SHA256withRSA2048", "fundId": fundId }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            return result.json()
        }).then((res) => {
            console.log("F204")
            console.log(res)
            console.log(res.respCode)
            this.setState({
                code204: res.respCode
            })
            let a = res.investDtl.map
            this.setState({
                tzfg: res.investDtl.map,
                fengge: res.styleType,
                guimo: res.scaleType,
                tzfgrect: res.scaleType + "&" + res.styleType,

            })
        }).catch(err =>
            console.log(err)
        )
    }
    fetchGpcc(fundId) {
        fetch(host + "F205", {
            method: 'POST',
            body: JSON.stringify({ "orgId": orgId, "tranCode": "F205", "version": 100, "reqChl": "03", "reqTime": "20180808080808000", "sign": "SHA256withRSA2048", "fundId": fundId }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            return result.json()
        }).then((res) => {
            console.log("F205")
            console.log(res)
            let s = 0;
            for(var i = 0;i<res.stockList.length;i++){
                s += res.stockList[i].sholding7;
            }
            this.setState({
                gpcc: res.stockList,
                amountPer: s.toFixed(2),
                newDate:res.stockList[0].reportdate,
            })
        }).catch(err =>
            console.log(err)
        )
    }
    getBarChart() {
        // bond债券 货币 cash stock股票 other 其他
        let preDate = this.props.fundF206;
        let nameA = {
            bond: '债券',
            cash: '货币',
            stock: '股票',
            other: '其他'
        }
        let dataName = [], dataValue = [];
        for (let key in preDate) {
            for (let item in nameA) {
                if(key === item) {
                    if (key === 'other') {
                        if (!preDate['other'] || parseFloat(preDate['other']) <= 0) {   
                        } else {
                            dataName.push(nameA[item]);
                            dataValue.push(preDate[key].replace("%", ""));
                        }
                    } else {
                        if (!preDate[key]) {
                            preDate[key] = "0.0%";
                        }
                        dataName.push(nameA[item]);
                        dataValue.push(preDate[key].replace("%", ""));
                    }
                }
            }
        }
        let option = {
            // title: {
            //     text: res.fundType,
            //     textStyle: {
            //         fontSize: "16"
            //     },
            //     x:'center',
            //     y:'center'
            // },
            yAxis: {
                type: 'category',
                data: dataName,
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
                data: dataValue,
                // type: 'pie',
                // radius: ['45%', '60%'],
                // label: {
                //     formatter: function(data) {
                //         return data.name + '\n' + data.value + '%';
                //     }
                // },
                // legendHoverLink: false,
                // hoverAnimation: false,
                type: 'bar',
                barWidth: "15px",
                itemStyle: {
                    normal: {
                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params) {
                            var colorList = ['#0E7BE3', '#1BABFF', '#2FDAD3', '#FD8E89', '#EB6897'];
                            return colorList[params.dataIndex];
                        },
                        barBorderRadius: [0, 7, 7, 0]
                    },
                },
            }]
        };

        return option
    }
    onClick(number) {
        this.setState({
            selectTwo: number
        })
    }
    render() {
        let investmentS = "大盘&成长";
        return (
            <div className="diagnose">
                <div className="triLine">
                    <div className={this.state.selectTwo === 0 ? "trItem active" : "trItem"} onClick={() => this.onClick(0)}>
                        资产配置
                    </div>
                    <div className={this.state.selectTwo === 1 ? "trItem active" : "trItem"} onClick={() => this.onClick(1)}>
                        投资风格
                    </div>
                    <div className={this.state.selectTwo === 2 ? "trItem active" : "trItem"} onClick={() => this.onClick(2)}>
                        股票持仓
                    </div>
                </div>
                {
                    this.state.selectTwo === 0 && 
                    <div>
                        {
                            this.props.fundF206 ?
                            <div className="barChart">
                                {/* <div className="pgxjj">
                                    {this.props.fundF206.fundType}
                                </div> */}
                                <ReactEcharts
                                    option={this.getBarChart()}
                                    style={{ height: "216px", background: '#fff' }}
                                />
                            </div>
                            :
                            <div class="fundTypeEmpty">
                                暂无数据
                            </div>
                        }
                    </div>
                }
                {
                    this.state.code204 === "99" && this.state.selectTwo === 1 &&
                    <div className="reg_fundTabEmporty">
                        暂无数据
                    </div>
                    // <div className="rectanChart">
                    //     <div className="dpcz">
                    //         暂无数据
                    //     </div>
                    //     <div className="tzfg">
                    //         暂无数据
                    //     </div>
                    // </div>
                }
                {
                    this.state.code204 !== "99" && this.state.selectTwo === 1 &&
                    <div className="rectanChart">
                        <div className="dpcz">
                            {/*{investmentS}*/}
                            规模:{this.state.guimo}
                        </div>
                        <div className="fund_fontStyle">
                            投资风格:{this.state.fengge}
                        </div>
                        {
                            <div className="bigRect mgb12">
                                <div className="triRect">
                                    <div className="whiteRect">
                                        大盘
                                    </div>
                                    <div className={this.state.tzfgrect === '大盘&价值' ? 'rect rect3' : 'rect rect1'}>
                                        {/*{this.state.tzfg.bigValue}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect === '大盘&平衡' ? 'rect rect3' : 'rect rect1'}>
                                        {/*{this.state.tzfg.bigBalance}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect === '大盘&成长' ? 'rect rect3' : 'rect rect1'}>
                                        {/*{this.state.tzfg.bigGrow}%*/}
                                    </div>
                                </div>
                                <div className="triRect">
                                    <div className="whiteRect">
                                        中盘
                                    </div>
                                    <div className={this.state.tzfgrect === '中盘&价值' ? 'rect rect3' : 'rect rect1'}>
                                        {/*{this.state.tzfg.midValue}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect === '中盘&平衡' ? 'rect rect3' : 'rect rect1'}>
                                        {/*{this.state.tzfg.midBalance}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect === '中盘&成长' ? 'rect rect3' : 'rect rect1'}>
                                        {/*{this.state.tzfg.midGrow}%*/}
                                    </div>
                                </div>
                                <div className="triRect">
                                    <div className="whiteRect">
                                        小盘
                                    </div>
                                    <div className={this.state.tzfgrect === '小盘&价值' ? 'rect rect3' : 'rect rect1'}>
                                        {/*{this.state.tzfg.smallValue}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect === '小盘&平衡' ? 'rect rect3' : 'rect rect1'}>
                                        {/*{this.state.tzfg.smallBalance}%*/}
                                    </div>
                                    <div className={this.state.tzfgrect === '小盘&成长' ? 'rect rect3' : 'rect rect1'}>
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
                                    <div className={this.state.tzfg.bigValue * 100 < 1 ? "rect rect1" : this.state.tzfg.bigValue * 100 > 20 ? "rect rect3" : "rect rect2"}>
                                        {(this.state.tzfg.bigValue * 100).toFixed(2)}%
                                        </div>
                                    <div className={this.state.tzfg.bigBalance * 100 < 1 ? "rect rect1" : this.state.tzfg.bigBalance * 100 > 20 ? "rect rect3" : "rect rect2"}>
                                        {(this.state.tzfg.bigBalance * 100).toFixed(2)}%
                                        </div>
                                    <div className={this.state.tzfg.bigGrow * 100 < 1 ? "rect rect1" : this.state.tzfg.bigGrow * 100 > 20 ? "rect rect3" : "rect rect2"}>
                                        {(this.state.tzfg.bigGrow * 100).toFixed(2)}%
                                        </div>
                                </div>
                                <div className="triRect">
                                    <div className="whiteRect">
                                        中盘
                                        </div>
                                    <div className={this.state.tzfg.midValue * 100 < 1 ? "rect rect1" : (1 <= this.state.tzfg.midValue * 100 && this.state.tzfg.midValue * 100 <= 20) ? "rect rect2" : "rect rect3"}>
                                        {(this.state.tzfg.midValue * 100).toFixed(2)}%
                                        </div>
                                    <div className={this.state.tzfg.midBalance * 100 < 1 ? "rect rect1" : (1 <= this.state.tzfg.midBalance * 100 && this.state.tzfg.midBalance * 100 <= 20) ? "rect rect2" : "rect rect3"}>
                                        {(this.state.tzfg.midBalance * 100).toFixed(2)}%
                                        </div>
                                    <div className={this.state.tzfg.midGrow * 100 < 1 ? "rect rect1" : (1 <= this.state.tzfg.midGrow * 100 && this.state.tzfg.midGrow * 100 <= 20) ? "rect rect2" : "rect rect3"}>
                                        {(this.state.tzfg.midGrow * 100).toFixed(2)}%
                                        </div>
                                </div>
                                <div className="triRect">
                                    <div className="whiteRect">
                                        小盘
                                        </div>
                                    <div className={this.state.tzfg.smallValue * 100 < 1 ? "rect rect1" : (1 <= this.state.tzfg.smallValue * 100 && this.state.tzfg.smallValue * 100 <= 20) ? "rect rect2" : "rect rect3"}>
                                        {(this.state.tzfg.smallValue * 100).toFixed(2)}%
                                        </div>
                                    <div className={this.state.tzfg.smallBalance * 100 < 1 ? "rect rect1" : (1 <= this.state.tzfg.smallBalance * 100 && this.state.tzfg.smallBalance * 100 <= 20) ? "rect rect2" : "rect rect3"}>
                                        {(this.state.tzfg.smallBalance * 100).toFixed(2)}%
                                        </div>
                                    <div className={this.state.tzfg.smallGrow * 100 < 1 ? "rect rect1" : (1 <= this.state.tzfg.smallGrow * 100 && this.state.tzfg.smallGrow * 100 <= 20) ? "rect rect2" : "rect rect3"}>
                                        {(this.state.tzfg.smallGrow * 100).toFixed(2)}%
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
                    this.state.gpcc.length > 0 ?
                    this.state.selectTwo === 2 &&
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
                            this.state.gpcc.length > 0 &&
                            this.state.gpcc && this.state.gpcc.map((value, key) =>
                                <div className="chicangWhite" key={key}>
                                    <div className="chicangLeft">
                                        {value.sholding2 + "（" + value.esymbol + "）"}
                                    </div>
                                    <div className="chicangMiddle">
                                        {(value.sholding7).toFixed(2) + '%'}
                                    </div>
                                    <div className="chicangRight">
                                        {(value.sholding5 / 100000000).toFixed(2) === '0.00' ? (value.sholding5 / 10000).toFixed(2) + '万' : (value.sholding5 / 100000000).toFixed(2) + '亿'}
                                    </div>
                                </div>
                            )
                        }
                        <div className="holdRate">
                            <div className="big blue">
                                {this.state.amountPer ? this.state.amountPer : '--'}%
                            </div>
                            <p className="small">前十持仓占比总计</p>
                            <p className="small">(截止日期: {this.state.newDate ? this.state.newDate : '--'})</p>
                        </div>
                    </div>
                    :
                    this.state.selectTwo === 2 &&
                    <div className="reg_fundTabEmporty">
                        暂无数据
                    </div>
                }
            </div>
        )
    }
}
export default Diagnose
