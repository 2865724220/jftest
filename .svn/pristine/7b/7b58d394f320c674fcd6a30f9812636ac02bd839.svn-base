import React, { Component } from 'react';

class ValueSearch extends Component {
    constructor(props){
        super(props)
        this.state={
            hisData: []
        }
    }

    componentDidMount(){
        document.title = '基金估值';
        console.log(localStorage.getItem("historyData2"))
        this.hisData()
    }

    onDelete(){
        localStorage.setItem("historyData2","")
        this.setState({
            hisData:[]
        })
    }

    hisData(){
        let hisArrayD = localStorage.getItem("historyData2")&&localStorage.getItem("historyData2").split(",")
        let hisArray = Array.from(new Set(hisArrayD)).slice(-10);

        this.setState({
            hisData:hisArray
        })
        console.log(hisArray)
    }

    goSearching(){
        this.props.history.push("/valuesearching")
    }

    goDiag(fundId,fundName){
        // this.props.history.push({pathname:"/valuation", state:{fundId:num}})
        this.props.history.push(`/regroupFund/${fundId}`);
    }
    render() {
        return(
            <div className="search">
                <div className="home">
                    <div className='searchOut' onClick={()=>this.goSearching()}>
                        搜索你关注的
                    </div>
                </div>

                <div className="lsssLine">
                    <div className="searchTitle2">历史搜索</div>
                    <img src={require("../../image/recycle@2x.png")} className="recycle" onClick={()=>this.onDelete()}/>
                </div>
                <div className="his">
                    {
                        this.state.hisData && this.state.hisData.length!==0&&
                        this.state.hisData.map((value,key)=>{
                            return <span className="hisSearch" key={key} onClick={()=>this.goDiag(value.substring(0,6),value.substring(6,value.length))}>
                                {value.substring(6)}
                            </span>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ValueSearch;