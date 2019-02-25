import React, { Component } from 'react';
import { host,orgId } from '../common/common'
class Result extends Component {
    constructor(props){
        super(props)
        this.state={
            fundRankList:{},
            f207:false,
            code207:'00'
        }
    }
    componentWillMount(){

    }

    componentDidMount(){
        this.fetchResult()
    }

    fetchResult(){
        let fundId = this.props.match.params.fundId
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
            console.log(res)
            if(res.respCode==='00'){
                this.setState({
                    fundRankList:res.fundRankList[0],
                    f207:true,
                })
                document.title = res.fundRankList[0].fundName+"（"+res.fundRankList[0].fundId+"）"
            }else{
                document.title = "基金透视";
                this.setState({
                    f207:true,
                    code207:res.respCode
                })
                setTimeout(()=>{
                    // alert(res.respMsg)
                })
            }
        }).catch(err=>{
            console.log(err)
            this.setState({
                f207:true,
            })
            setTimeout(()=>{
                // alert(err)
            })
        })
    }

    render() {
        return(
            <div>
                { !this.state.f207&&<div className="load">数据加载中...</div>}
                {
                  this.state.f207&&
                  <div>
                      {
                          this.state.code207==="99" &&
                          <div className="resultTop1 resultTopnull">
                              暂无数据
                          </div>
                      }
                      {
                          this.state.code207!=="99" &&
                          <div className="resultTop">
                              <div className="result3">
                                  <div className="resultLeft">
                                      <div className="rank1">{this.state.fundRankList.rank}</div>
                                      <div className="rank2">/{this.state.fundRankList.rankCount}</div>
                                  </div>
                                  <div className="tong">
                                      同类排名
                                  </div>
                              </div>

                              {/*<div className="resultMiddle">*/}
                              {/*</div>*/}

                              <div className="resultRight">
                                  {/*<div className="resultRight1">*/}
                                      {/*<div className="resultScore">*/}
                                          {/*{this.state.fundRankList.score}*/}
                                      {/*</div>*/}
                                      {/*<div className="tong">*/}
                                          {/*得分*/}
                                      {/*</div>*/}
                                  {/*</div>*/}
                                  <div className="resultRight2">
                                      <div className="resultScore">
                                          {this.state.fundRankList.fundType}
                                      </div>
                                      <div className="tong">
                                          基金类型
                                      </div>
                                  </div>
                              </div>
                          </div>
                      }
                      {
                          this.state.code207==="99"&&
                          <div>
                              <div className="result1">
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
                          this.state.code207!=="99"&&
                          <div>
                              <div className="result1">
                                  <div className="line">
                                      <div className="lineLeft1">
                                          近3月收益率
                                      </div>
                                      {
                                          this.state.fundRankList.pchgM3!=='--'&&
                                          <div className={this.state.fundRankList.pchgM3>0?"lineRight1":"lineRight2"}>
                                              {this.state.fundRankList.pchgM3>0&&"+"}{(this.state.fundRankList.pchgM3 * 100).toFixed(2)}%
                                          </div>
                                      }
                                      {
                                          this.state.fundRankList.pchgM3==='--'&&
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
                                          this.state.fundRankList.pchgM6!=='--'&&
                                          <div className={this.state.fundRankList.pchgM6>0?"lineRight1":"lineRight2"}>
                                              {this.state.fundRankList.pchgM6>0&&"+"}{(this.state.fundRankList.pchgM6 * 100).toFixed(2)}%
                                          </div>
                                      }
                                      {
                                          this.state.fundRankList.pchgM6==='--'&&
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
                                          this.state.fundRankList.pchgY1!=='--'&&
                                          <div className={this.state.fundRankList.pchgY1>0?"lineRight1":"lineRight2"}>
                                              {this.state.fundRankList.pchgY1>0&&"+"}{(this.state.fundRankList.pchgY1 * 100).toFixed(2)}%
                                          </div>
                                      }
                                      {
                                          this.state.fundRankList.pchgY1==='--'&&
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

export default Result;