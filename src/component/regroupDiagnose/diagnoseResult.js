import React, { Component } from 'react';
// import { host, orgId } from '../common/common'
class Result extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.resultObj;
    }
    componentWillMount() {
    }

    componentDidMount() {
        document.title = "基金诊断"
    }

    render() {
        return (
            <div>
                {!this.state.f207 && <div className="load">数据加载中...</div>}
                {
                    this.state.f207 &&
                    <div>
                        {
                            this.state.code207 === "99" &&
                            <div>
                                <div className="result1">
                                    <div className="line">
                                        <div className="lineLeft1">
                                            近1月收益率
                                        </div>
                                        <div>
                                            -
                                        </div>
                                    </div>
                                    <div className="line">
                                        <div className="lineLeft1">
                                            近3月收益率
                                        </div>
                                        <div>
                                            -
                                        </div>
                                    </div>
                                    <div className="line">
                                        <div className="lineLeft1">
                                            近6月收益率
                                        </div>
                                        <div>
                                            -
                                        </div>
                                    </div>
                                    <div className="line">
                                        <div className="lineLeft1">
                                            近1年收益率
                                        </div>
                                        <div>
                                            -
                                        </div>
                                    </div>
                                </div>
                                <div className="result2">
                                    <div>
                                        <div className="line">
                                            <div className="lineLeft1">
                                                最大回撤
                                            </div>
                                            <div>
                                                -
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="line">
                                            <div className="lineLeft1">
                                                夏普比例
                                            </div>
                                            <div>
                                                -
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            this.state.code207 !== "99" &&
                            <div>
                                <div className="result1">
                                    <div className="line">
                                        <div className="lineLeft1">
                                            近1月收益率
                                        </div>
                                        {
                                            this.state.fundRankList.pchgM1 !== '--' &&
                                            <div className={this.state.fundRankList.pchgM1 > 0 ? "lineRight1" : "lineRight2"}>
                                                {this.state.fundRankList.pchgM1 > 0 && "+"}{(this.state.fundRankList.pchgM1 * 100).toFixed(2)}%
                                            </div>
                                        }
                                        {
                                            this.state.fundRankList.pchgM1 === '--' &&
                                            <div className='lineLeft3'>
                                                暂无数据
                                            </div>

                                        }
                                    </div>
                                    <div className="line">
                                        <div className="lineLeft1">
                                            近3月收益率
                                        </div>
                                        {
                                            this.state.fundRankList.pchgM3 !== '--' &&
                                            <div className={this.state.fundRankList.pchgM3 > 0 ? "lineRight1" : "lineRight2"}>
                                                {this.state.fundRankList.pchgM3 > 0 && "+"}{(this.state.fundRankList.pchgM3 * 100).toFixed(2)}%
                                            </div>
                                        }
                                        {
                                            this.state.fundRankList.pchgM3 === '--' &&
                                            <div className='lineLeft3'>
                                                暂无数据
                                            </div>

                                        }
                                    </div>
                                    <div className="line">
                                        <div className="lineLeft1">
                                            近6月收益率
                                        </div>
                                        {
                                            this.state.fundRankList.pchgM6 !== '--' &&
                                            <div className={this.state.fundRankList.pchgM6 > 0 ? "lineRight1" : "lineRight2"}>
                                                {this.state.fundRankList.pchgM6 > 0 && "+"}{(this.state.fundRankList.pchgM6 * 100).toFixed(2)}%
                                            </div>
                                        }
                                        {
                                            this.state.fundRankList.pchgM6 === '--' &&
                                            <div className='lineLeft3'>
                                                暂无数据
                                            </div>

                                        }
                                    </div>
                                    <div className="line">
                                        <div className="lineLeft1">
                                            近1年收益率
                                        </div>
                                        {
                                            this.state.fundRankList.pchgY1 !== '--' &&
                                            <div className={this.state.fundRankList.pchgY1 > 0 ? "lineRight1" : "lineRight2"}>
                                                {this.state.fundRankList.pchgY1 > 0 && "+"}{(this.state.fundRankList.pchgY1 * 100).toFixed(2)}%
                                            </div>
                                        }
                                        {
                                            this.state.fundRankList.pchgY1 === '--' &&
                                            <div className='lineLeft3'>
                                                暂无数据
                                            </div>

                                        }
                                    </div>
                                </div>
                                <div className="result2">
                                    <div>
                                        <div className="line">
                                            <div className="lineLeft1">
                                                最大回撤
                                            </div>
                                            <div className='lineRight3'>
                                                {(this.state.fundRankList.maxRVK * 100).toFixed(2)}%
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="line">
                                            <div className="lineLeft1">
                                                夏普比例
                                            </div>
                                            <div className='lineRight3'>
                                                {(this.state.fundRankList.sharpRate * 1).toFixed(4)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}
// Result.defaultProps = {
//     resultObj: {
//         fundRankList: {},
//         f207: true,
//         code207: '99'
//     }
// }
export default Result;