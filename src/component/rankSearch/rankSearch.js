import React, { Component } from 'react';

class RankSearch extends Component {
    constructor(props){
        super(props)
        this.state={
            hisData: []
        }
    }

    componentDidMount(){
        console.log(localStorage.getItem("historyData3"))
        this.hisData()
        document.title="基金透视"
    }

    onDelete(){
        localStorage.setItem("historyData3","")
        this.setState({
            hisData:[]
        })
    }

    hisData(){
        let hisArrayD = localStorage.getItem("historyData3")&&localStorage.getItem("historyData3").split(",")
        let hisArray = Array.from(new Set(hisArrayD)).slice(-10);

        this.setState({
            hisData:hisArray
        })
        console.log(hisArray)
    }

    goSearching(){
        this.props.history.push("/ranksearching")
    }

    goDiag(num){
        // this.props.history.push({pathname:"/result", state:{fundId:num}})
        this.props.history.push(`/result/${num}`);
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
                            return <span className="hisSearch" key={key} onClick={()=>this.goDiag(value.substring(0,6))}>
                                {value.substring(6)}
                            </span>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default RankSearch;