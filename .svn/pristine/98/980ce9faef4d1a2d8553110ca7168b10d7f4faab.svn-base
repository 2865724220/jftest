import React, { Component } from 'react';
import { host, orgId } from '../common/common'

class Manager extends Component {
    constructor(props){
        super(props)
        this.state={
            score:true,
            withdraw:true,
            sharpeRatio:true,
            stock:[],
            triS:'',
            scrollLeft:0,
            isOpenIntro:false,
            isOpenJob:false,
            allList:[],
        }
    }
    componentDidMount(){
        let fundName = localStorage.getItem('fundName')
        let fundId = localStorage.getItem('fundId')
        // document.title = fundName+" "+fundId;
        document.title = "基金经理";
        this.fetchData()
    }
    fetchData(){
        let fundId = localStorage.getItem('fundId')
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
    isOpenIntroClick(){
        this.setState({
            isOpenIntro:!this.state.isOpenIntro
        })
    }
    isOpenJobClick(){
        this.setState({
            isOpenJob:!this.state.isOpenJob
        })
    }

    render(){
        return(
            <div>
                {
                    this.state.allList!==null && this.state.allList.length!==0&&this.state.allList.map((value,key)=>
                    <div key={key}>
                        <div className="managerTop">
                            <div className="managerTop1">
                                <div className='mh'>
                                    <img src={require("../../managerImage/DefaultFace@2x.png")} className="managerHead"/>
                                </div>

                                {/*<div className="managerInfo">*/}
                                    {/*当前所在公司：{"华夏基金"}<br/>*/}
                                    {/*擅长基金类型：{"混合型"}<br/>*/}
                                    {/*累计任职时间：{"5年又123天"}*/}
                                {/*</div>*/}

                                <div className="managerInfoHead">
                                    <div className="managerName">
                                        {value.curentMng}
                                    </div>
                                </div>
                            </div>
                            {/*<div>*/}
                                {/*<div className="managerInfo2">*/}
                                    {/*<div className="managerInfo3">*/}
                                        {/*<div className='mi4'>*/}
                                            {/*{"华夏基金"}*/}
                                        {/*</div>*/}
                                        {/*<div className='mi5'>*/}
                                            {/*当前所在公司*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="managerInfo3">*/}
                                        {/*<div className='mi4'>*/}
                                            {/*{"混合型"}*/}
                                        {/*</div>*/}
                                        {/*<div className='mi5'>*/}
                                            {/*擅长基金类型*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="managerInfo3">*/}
                                        {/*<div className='mi4'>*/}
                                            {/*{"5年又123天"}*/}
                                        {/*</div>*/}
                                        {/*<div className='mi5'>*/}
                                            {/*累计任职时间*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="managerJianjie">
                            <div className="managerTitle">
                                简介
                            </div>
                            {
                                this.state.isOpenIntro===false&&
                                <div className="managerBos">
                                    {value.summary}
                                </div>
                            }
                            {
                                this.state.isOpenIntro===true&&
                                <div className="managerBos1">
                                    {value.summary}
                                </div>
                            }

                        </div>

                        {
                            this.state.isOpenIntro===false&&
                            <div onClick={()=>this.isOpenIntroClick()} className="lineDown1">
                                <img src={require("../../managerImage/unfold.png")} className="unfold"/>
                            </div>
                        }
                        {
                            this.state.isOpenIntro===true&&
                            <div onClick={()=>this.isOpenIntroClick()} className="lineDown1">
                                <img src={require("../../managerImage/fold.png")} className="unfold"/>
                            </div>
                        }

                        <div className={this.state.isOpenJob===true?"ljrz1":value.mngList.length>2?"ljrz":value.mngList.length===1?"ljrzOne":"ljrzTwo"}>
                            <div className="managerTitle managerLjrz">
                                累计任职
                            </div>
                            {
                                this.state.isOpenJob===false&&
                                <div className={value.mngList.length>2?"fixedWrapAuto clearfix":value.mngList.length===1?"fixedWrapAutoOne clearfix":"fixedWrapAutoTwo clearfix"}>
                                    <div className={this.state.scrollLeft >0 ? 'fLeftManager fBoxS':'fLeftManager'}>
                                        <div className="fixHead2 clearfix">
                                            <span className="jjmcTitle jjmcTitle1">基金名称</span>
                                            <span className="wh02 sortWrap">基金类型</span>
                                        </div>
                                        {
                                            value.mngList.map((shuju,index)=>
                                                <div className="fixCon clerfix" key={index}>
                                                    <div className="fCon jjmcTitle">
                                                        <div className="fCT fCT1">
                                                            <div className="fCTT fCTT1">
                                                                <span>{shuju.fundName}</span>
                                                                <span>{shuju.symbol}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="managerJjlx wh02 color08142C fCon fCon1">{shuju.fundType}</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="aRightManager" id = "aRight">
                                        <div className="fixHead1 width360">
                                    <span className="wh04 sortWrap rightTri centerTitle">
                                        任职回报
                                    </span>
                                            <span className="wh05 sortWrap rightTri centerTitle">
                                        任职天数
                                    </span>
                                            <span className="wh06 sortWrap rightTri centerTitle">
                                        任职时间
                                    </span>
                                        </div>
                                        {
                                            value.mngList.map((shuju,index)=>{
                                                return <div className="fixCon width360 clearfix" key={index}>
                                                    <div className="fCon wh04 centerContext">
                                                        {shuju.reward}
                                                    </div>
                                                    <div className="fCon wh05 centerContext">
                                                        {shuju.days}
                                                    </div>
                                                    <div className="fCon wh06 centerContext">
                                                        {shuju.startDate} ~ {shuju.endDate}
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            {
                                this.state.isOpenJob===true&&
                                <div className="fixedWrapAuto1 clearfix">
                                    <div className={this.state.scrollLeft >0 ? 'fLeftManager fBoxS':'fLeftManager'}>
                                        <div className="fixHead2 clearfix">
                                            <span className="jjmcTitle jjmcTitle1">基金名称</span>
                                            <span className="wh02 sortWrap">基金类型</span>
                                        </div>
                                        {
                                            value.mngList.map((shuju,index)=>
                                                <div className="fixCon clerfix" key={index}>
                                                    <div className="fCon jjmcTitle">
                                                        <div className="fCT fCT1">
                                                            <div className="fCTT fCTT1">
                                                                <span>{shuju.fundName}</span>
                                                                <span>{shuju.symbol}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="managerJjlx wh02 color08142C fCon fCon1">{shuju.fundType}</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="aRightManager" id = "aRight">
                                        <div className="fixHead1 width360">
                                    <span className="wh04 sortWrap rightTri centerTitle">
                                        任职回报
                                    </span>
                                            <span className="wh05 sortWrap rightTri centerTitle">
                                        任职天数
                                    </span>
                                            <span className="wh06 sortWrap rightTri centerTitle">
                                        任职时间
                                    </span>
                                        </div>
                                        {
                                            value.mngList.map((shuju,index)=>{
                                                return <div className="fixCon width360 clearfix" key={index}>
                                                    <div className="fCon wh04 centerContext">
                                                        {shuju.reward}
                                                    </div>
                                                    <div className="fCon wh05 centerContext">
                                                        {shuju.days}
                                                    </div>
                                                    <div className="fCon wh06 centerContext">
                                                        {shuju.startDate} ~ {shuju.endDate}
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            {
                                this.state.isOpenJob===false&&
                                <div className="lineDown" onClick={()=>this.isOpenJobClick()}>
                                    <img src={require("../../managerImage/unfold.png")} className="unfold1"/>
                                </div>
                            }
                            {
                                this.state.isOpenJob===true&&
                                <div className="lineDown" onClick={()=>this.isOpenJobClick()}>
                                    <img src={require("../../managerImage/fold.png")} className="unfold1"/>
                                </div>
                            }
                        </div>
                    </div>
                    )
                }

            </div>
        )
    }
}
export default Manager