import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props)
        this.state={
            hisData: []
        }
    }

    componentDidMount(){
        document.title = '基金透视';
        console.log(localStorage.getItem("historyData"))
        this.hisData()
    }

    onDelete(){
        localStorage.setItem("historyData","")
        this.setState({
            hisData:[]
        })
    }

    hisData(){
        let hisArrayD = localStorage.getItem("historyData")&&localStorage.getItem("historyData").split(",");
        let hisArray = Array.from(new Set(hisArrayD)).slice(-10);
        this.setState({
            hisData:hisArray
        })
    }

    goSearching(){
        this.props.history.push("/searching")
    }

    goDiag(num,name){
        localStorage.setItem('fundName',name)
        // this.props.history.push({pathname:`/diagnose/${num}`, state:{fundId:num}}) regroupDiagnose
        this.props.history.push({pathname:`/regroupFund/${num}`, state:{fundId:num}})
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
                            return <span className="hisSearch" key={key} onClick={()=>this.goDiag(value.substring(0,6),value.substring(6))}>
                                {value.substring(6)}
                            </span>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Search;