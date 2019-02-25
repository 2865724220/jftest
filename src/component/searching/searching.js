import React, { Component } from 'react';
import { host,orgId } from '../common/common'

let timer = null
class Searching extends Component {
    constructor(props){
        super(props)
        this.state={
            show:1,
            fundList:[],
            inputValue:"",
            time:0
        }
    }

    componentDidMount(){
        document.title = '基金透视';
        this.setState({
            time:(new Date()).getTime()
        })
    }

    fetchData(data){
        let time = (new Date()).getTime()
        let body = {
            "fundcode":data,
            "orgId":orgId,
            "tranCode":"F209",
            "version":100,
            "reqChl":"03",
            "reqTime":"20180808080808000",
            "sign":"SHA256withRSA2048",
        }
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fetch(host+"F209",{
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
                if(time>this.state.time){
                    this.setState({
                        time:time,
                        fundList:res.fundList
                    })
                    if(res.fundList===null){
                        this.setState({
                            show:0
                        })
                    }else{
                        this.setState({
                            show:1
                        })
                    }
                }

            }).catch(err=>
                console.log(err)
            )
        },300)
    }

    onPress(data,name){
        let history = localStorage.historyData?localStorage.getItem("historyData"):'';
        console.log(history)
        let item = data + name;
        let hisData = localStorage.historyData?history +','+item:item
        localStorage.setItem('historyData',hisData)
        localStorage.setItem('fundId1',data)
        localStorage.setItem('fundName',name)
        // this.props.history.push({pathname: `/diagnose/${data}`})
        this.props.history.push({pathname:`/regroupFund/${data}`})
    }

    handleChange(event){
        this.setState({
            inputValue:event.target.value
        })
        this.fetchData(event.target.value)
    }

    button(){
        this.setState({
            inputValue:"",
            fundList:[]
        })
    }

    back(){
        this.props.history.goBack()
    }

    render(){
        return (
            <div className="searching">
                <div className="home">
                    <img src={require("../../image/search@2x.png")} className="magnify"/>
                    <img src={require("../../image/closed@2x.png")} className="inputClose" onClick={()=>this.button()}/>
                    <input autoFocus="autoFocus" onChange={(event)=>this.handleChange(event)} value={this.state.inputValue} className="input1" placeholder="输入基金代码或基金名称" type="text" style={{"fontSize":"15px"}} />
                    <div className="cancel" onClick={()=>this.back()}>
                        取消
                    </div>
                </div>
                {
                    this.state.show===0&&
                    <div>
                        <div>
                            <img src={require("../../image/none@2x.png")} className="nullFund" />
                        </div>
                        <div className="nullFundWord">
                            没有搜到相关基金
                        </div>
                    </div>
                }
                {
                    this.state.show===1&&
                    <div className="searchAll">
                        {
                            this.state.fundList && this.state.fundList.map((value,key)=>{
                                return <div className="searchRes" key={key} onClick={()=>this.onPress(value.symbol,value.sname)}>
                                    <div className="resLeft">
                                        <div className="searchResTitle">
                                            {value.sname}
                                        </div>
                                        <div className="searchResNum">
                                            {value.symbol}
                                        </div>
                                    </div>
                                    <div className="arrow">
                                        <img src={require("../../image/enter@2x.png")} className="arrowRight"/>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Searching;