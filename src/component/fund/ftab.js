import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import ReactInfinitScroller from '../../react-vertical-infinite-scrolling'
import {host, orgId} from '../common/common'
console.log(orgId)
class FTab extends Component {

    constructor(props){
        super(props)
        this.state={
            fund_score:false,
            max_1yrvk:false,
            sharp_1yrate:false,
            w4navg:false,
            w13navg:false,
            w26navg:false,
            w52navg:false,
            stock:[],
            triS:'',
            scrollLeft:0,
            f207:false,
            note:false,
            sorting:false,
            pageNo:0,
            pageText:'点击加载更多',
            sortText:'',
            orderType:'desc',
            orderCondition:'',
            hasMoreItems: false
        }
    }

    componentDidMount(){
        this.dataC01()
        // if(!window.name){
        //     window.name ='name'
        //     this.setState({
        //         note:true
        //     })
        // }
    }
    componentDidUpdate(){
    }

    dataC01(){
        this.setState({
            f207:true,
            stock:[],
            orderCondition:'',
        })
        let body = {
            "typeCode":this.props.typecode,
            "orderCondition":"",
            "orgId":orgId,
            "tranCode":"F207",
            "version":100,
            "reqChl":"03",
            "reqTime":"20180808080808000",
            "sign":"SHA256withRSA2048",
            "pageNo":this.state.pageNo,
            // "orderType":this.state.orderType,
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
            if(res.respCode==='00'&&res.fundRankList!==null){
                this.setState({
                    stock:this.state.stock.concat(res.fundRankList),
                    f207:false,
                })
                if(res.fundRankList.length === 20){
                    this.setState({
                        pageNo:++this.state.pageNo,
                        hasMoreItems:true
                    })
                }else{
                    this.setState({
                        pageText:'没有更多数据了'
                    })
                }
            }else{
                this.setState({
                    f207:false,
                    stock:[],
                    pageText:''
                })
                setTimeout(()=>{
                    alert(res.respMsg)
                },100)
            }
        }).catch(err=>{
            this.setState({
                stock:[],
                pageText:'',
                f207:false,
            })
            console.log(err)
        })
    }
    moreList(){
        this.setState({
            pageText:'加载中...',
            hasMoreItems: false
        })
        let body = {
            "typeCode":this.props.typecode,
            "orderCondition":this.state.orderCondition,
            "orgId":"310003",
            "tranCode":"F207",
            "version":100,
            "reqChl":"03",
            "reqTime":"20180808080808000",
            "sign":"SHA256withRSA2048",
            "pageNo":this.state.pageNo,
            "orderType":this.state.orderCondition.length>0?this.state.orderType:'',
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
            if(res.respCode==='00'&&res.fundRankList!==null){
                this.setState({
                    stock:this.state.stock.concat(res.fundRankList),
                })
                if(res.fundRankList.length === 20){
                    this.setState({
                        pageNo:++this.state.pageNo,
                        pageText:'点击加载更多',
                        hasMoreItems: true
                    })
                }else{
                    this.setState({
                        pageText:'没有更多了'
                    })
                }
            }else{
                this.setState({
                    stock:this.state.stock,
                })
                if(this.state.stock.length === 20){
                    this.setState({
                        pageText:'点击加载更多'
                    })
                }else{
                    this.setState({
                        pageText:'没有更多数据了'
                    })
                }
                setTimeout(()=>{
                    alert(res.respMsg)
                },10)
            }
        }).catch(err=>{
            this.setState({
                stock:this.state.stock,
                pageText:''
            })
            console.log(err)
        })
    }

    sortBy(params,flag){
        //flag==false升序，flag =true 降序
        return function (a,b) {
            a = a[params];
            b= b[params];
            if(!flag){
                return a - b;
            }else{
                return b - a;
            }
        }
    }
    sort(params){
        this.setState({
            sortText:'排序中...',
            pageNo:0,
        })
        let orderType = ''
        if(params==='fund_score'){
            this.setState({
                params:!this.state.params,
                fund_score:!this.state.fund_score,
                orderType:!this.state.fund_score?'asc':'desc'
            })
            orderType = !this.state.fund_score?'asc':'desc'
        }
        if(params === 'max_1yrvk'){
            this.setState({
                params:!this.state.params,
                max_1yrvk:!this.state.max_1yrvk,
                orderType:!this.state.max_1yrvk?'asc':'desc'
            })
            orderType = !this.state.max_1yrvk?'asc':'desc'
        }
        if(params === 'sharp_1yrate'){
            this.setState({
                params:!this.state.params,
                sharp_1yrate:!this.state.sharp_1yrate,
                orderType:!this.state.sharp_1yrate?'asc':'desc'
            })
            orderType = !this.state.sharp_1yrate?'asc':'desc'
        }
        if(params === 'w4navg'){
            this.setState({
                params:!this.state.params,
                w4navg:!this.state.w4navg,
                orderType:!this.state.w4navg?'asc':'desc',
            })
            orderType = !this.state.w4navg?'asc':'desc'
        }
        if(params === 'w13navg'){
            this.setState({
                params:!this.state.params,
                w13navg:!this.state.w13navg,
                orderType:!this.state.w13navg?'asc':'desc',
            })
            orderType = !this.state.w13navg?'asc':'desc'
        }
        if(params === 'w26navg'){
            this.setState({
                params:!this.state.params,
                w26navg:!this.state.w26navg,
                orderType:!this.state.w26navg?'asc':'desc',
            })
            orderType = !this.state.w26navg?'asc':'desc'
        }
        if(params === 'w52navg'){
            this.setState({
                params:!this.state.params,
                w52navg:!this.state.w52navg,
                orderType:!this.state.w52navg?'asc':'desc',
            })
            orderType = !this.state.w52navg?'asc':'desc'
        }
        // setTimeout(()=>{
        //     if(this.state.params){
        //         //数组sort（）方法可以接受数组中指定向作为排序的参数
        //         this.state.stock.sort(this.sortBy(params,true))
        //     }else{
        //         this.state.stock.sort(this.sortBy(params,false))
        //     }
        // })

        let body = {
            "typeCode":this.props.typecode,
            "orderCondition":params,
            "orgId":"310003",
            "tranCode":"F207",
            "version":100,
            "reqChl":"03",
            "reqTime":"20180808080808000",
            "sign":"SHA256withRSA2048",
            "pageNo":0,
            "orderType":orderType,
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
            if(res.respCode==='00'&&res.fundRankList!==null){
                this.setState({
                    stock:res.fundRankList,
                    sortText:'',
                    orderCondition:params
                })
                if(res.fundRankList.length === 20){
                    this.setState({
                        pageNo:++this.state.pageNo,
                        pageText:'点击加载更多'
                    })
                }else{
                    this.setState({
                        pageText:'没有更多数据了'
                    })
                }
            }else{
                this.setState({
                    sortText:'',
                    fund_score:false,
                    max_1yrvk:false,
                    sharp_1yrate:false,
                    w4navg:false,
                    w13navg:false,
                    w26navg:false,
                    w52navg:false,
                    orderCondition:'',
                })
                setTimeout(()=>{
                    alert(res.respMsg)
                },10)
            }
        }).catch(err=>{
            this.setState({
                stock:[],
                pageText:'',
                fund_score:false,
                max_1yrvk:false,
                sharp_1yrate:false,
                w4navg:false,
                w13navg:false,
                w26navg:false,
                w52navg:false,
                orderCondition:'',
            })
            console.log(err)
        })
    }

    // isNote(){
    //     this.setState({
    //         note:!this.state.note
    //     })
    // }


    render() {
        const params = {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            spaceBetween: 30
        }
        return (
            <ReactInfinitScroller
                pageStart={0}
                loadMore={(e) => this.moreList(e)}
                hasMore={this.state.hasMoreItems}
                threshold={250}
                className="mfw">
                {
                    this.state.stock.length>0&&<div className="fixedWrap clearfix">
                        <div className="fLeft">
                            <div className="fixHead clearfix">
                                <span className="wh01" >基金名称
                                    {/*<img src={require("../../image/annotation@2x.png")} className="iii" onClick={()=>this.isNote()} alt="" />*/}
                                </span>
                                {/*<span className="wh02 sortWrap" onClick={()=>this.sort('fund_score')}>得分*/}
                                <span className="wh02 sortWrap wh02New">排名
                                    {/*<div><i className={this.state.fund_score?"tup":"tup activeT"}></i> <i className={this.state.fund_score?"tdown activeT":"tdown"}></i></div>*/}
                        </span>
                            </div>
                            {
                                this.state.stock.length>0&&this.state.stock.map((value,index)=>{
                                    return <div ref={'conNode'} className="fixCon clerfix" key={index} onClick={()=>this.props.gyz(value.fundId)}>
                                        <div className="fCon wh01">
                                            <div className="fCT">
                                                <div className="numBorder">{index+1}</div>
                                                <div className="fCTT">
                                                    <span>{value.fundName}</span>
                                                    <span>{value.fundId}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className="fCon wh02 color08142C wh02New">{value.tDate.substring(4,6)}-{value.tDate.substring(6,8)}</div>*/}
                                        {this.state.stock[index].rank === '1' &&<div className="fCon wh02 color08142C wh02New frank1">
                                            <em>{value.rank}</em>
                                        </div>}
                                        {this.state.stock[index].rank === '2' &&<div className="fCon wh02 color08142C wh02New frank2">
                                            <em>{value.rank}</em>
                                        </div>}
                                        {this.state.stock[index].rank === '3' &&<div className="fCon wh02 color08142C wh02New frank3">
                                            <em>{value.rank}</em>
                                        </div>}
                                        {parseFloat(this.state.stock[index].rank) > 3&&<div className="fCon wh02 color08142C wh02New">
                                            <em>{value.rank}</em>
                                        </div>}
                                    </div>
                                })
                            }
                        </div>
                        <div className="aRight" id = "aRight">
                            <div className="fixHead width600">
                        <span className="wh03 sortWrap rightTri" onClick={()=>this.sort('w4navg')}>
                            近一月
                            <div><i className={this.state.w4navg?"tup":"tup activeT"}></i> <i className={this.state.w4navg?"tdown activeT":"tdown"}></i></div>
                        </span>
                                <span className="wh03 sortWrap rightTri" onClick={()=>this.sort('w13navg')}>
                            近三月
                                    <div><i className={this.state.w13navg?"tup":"tup activeT"}></i> <i className={this.state.w13navg?"tdown activeT":"tdown"}></i></div>
                        </span>
                                <span className="wh03 sortWrap rightTri" onClick={()=>this.sort('w26navg')}>
                            近六月
                                    <div><i className={this.state.w26navg?"tup":"tup activeT"}></i> <i className={this.state.w26navg?"tdown activeT":"tdown"}></i></div>
                        </span>
                                <span className="wh03 sortWrap rightTri" onClick={()=>this.sort('w52navg')}>
                            近一年
                                    <div><i className={this.state.w52navg?"tup":"tup activeT"}></i> <i className={this.state.w52navg?"tdown activeT":"tdown"}></i></div>
                        </span>
                                <span className="wh03 sortWrap rightTri" onClick={()=>this.sort('max_1yrvk')}>
                            最大回撤
                                    <div><i className={this.state.max_1yrvk?"tup":"tup activeT"}></i> <i className={this.state.max_1yrvk?"tdown activeT":"tdown"}></i></div>
                        </span>
                                <span className="wh04 sortWrap rightTri" onClick={()=>this.sort('sharp_1yrate')}>
                            夏普比率

                                    <div><i className={this.state.sharp_1yrate?"tup":"tup activeT"}></i> <i className={this.state.sharp_1yrate?"tdown activeT":"tdown"}></i></div>
                        </span>
                            </div>
                            {
                                this.state.stock.map((value,index)=>{
                                    return <div className="fixCon width600 clearfix" key={index} onClick={()=>this.props.gyz(value.fundId)}>
                                        {
                                            value.pchgM1!=="--"&&
                                            <div className="fCon wh03 ">
                                                {parseFloat((value.pchgM1)*100).toFixed(2)}%
                                            </div>
                                        }
                                        {
                                            value.pchgM1==="--"&&
                                            <div className="fCon wh03 ">
                                                {value.pchgM1}
                                            </div>
                                        }
                                        {
                                            value.pchgM3!=="--"&&<div className="fCon wh03">
                                                {parseFloat((value.pchgM3)*100).toFixed(2)}%
                                            </div>
                                        }
                                        {
                                            value.pchgM3==="--"&&<div className="fCon wh03">
                                                {value.pchgM3}
                                            </div>
                                        }
                                        {
                                            value.pchgM6!=="--"&&<div className="fCon wh03">
                                                {parseFloat((value.pchgM6)*100).toFixed(2)}%
                                            </div>
                                        }
                                        {
                                            value.pchgM6==="--"&&<div className="fCon wh03">
                                                {value.pchgM6}
                                            </div>
                                        }
                                        {
                                            value.pchgY1!=="--"&&<div className="fCon wh03">
                                                {parseFloat((value.pchgY1)*100).toFixed(2)}%
                                            </div>
                                        }
                                        {
                                            value.pchgY1==="--"&&<div className="fCon wh03">
                                                {value.pchgY1}
                                            </div>
                                        }
                                        {
                                            value.maxRVK!=="--"&&<div className="fCon wh03">
                                                {parseFloat((value.maxRVK)*100).toFixed(2)}%
                                            </div>
                                        }
                                        {
                                            value.maxRVK==="--"&&<div className="fCon wh03">
                                                {value.maxRVK}
                                            </div>
                                        }
                                        <div className="fCon wh03">
                                            {value.sharpRate}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    this.state.f207&&<div className="load">数据加载中...</div>
                }
                {
                    this.state.stock.length>0&&this.state.pageText==='点击加载更多'&&<div className="moreData" onClick={()=>this.moreList()}>{this.state.pageText}</div>
                }
                {
                    this.state.stock.length>0&&this.state.pageText!=='点击加载更多'&&<div className="moreData">{this.state.pageText}</div>
                }
                {
                    this.state.sortText.length>0&&<div className="sorting">排序中...</div>
                }
                {/*{*/}
                    {/*this.state.note && <div className="maskWrap">*/}
                        {/*/!*<div className="sliderMask" onClick={()=>this.isNote()}>*!/*/}
                        {/*/!*</div>*!/*/}
                        {/*<div className="sliderWrap" >*/}
                            {/*<Swiper {...params}>*/}
                                {/*<div className="sliderT">*/}
                                    {/*<span className="sliderTB">最大回撤</span>*/}
                                    {/*<p className="sliderTP">投资者可能面临的最大亏损幅度。</p>*/}
                                {/*</div>*/}
                                {/*<div className="sliderT">*/}
                                    {/*<span className="sliderTB">夏普比率</span>*/}
                                    {/*<p className="sliderTP">每承受一单位总风险所产生的超额收益。</p>*/}
                                {/*</div>*/}
                            {/*</Swiper>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*}*/}
            </ReactInfinitScroller>
        );
    }
}

export default FTab;