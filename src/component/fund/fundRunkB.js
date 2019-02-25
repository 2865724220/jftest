import React, { Component } from 'react';

import FTab from './ftab';

let isMounted = false
class FundRank extends Component {

    constructor(props){
        super(props)
        this.state={
            activeIndex:-1,
            note:false,
        }
    }
    componentWillMount(){
        // isMounted = true;
    }
    componentDidMount(){
        document.title = "基金排名";
        isMounted = true;
        this.setState({
            activeIndex:1
        })
    }
    componentWillUnmount(){
        isMounted = false
    }

    tab(index){
        this.setState({
            activeIndex:index
        })
    }


    rankSearch(){
        this.props.history.push({pathname: "/rankSearch", state: {}})
    }

    render() {

        return (
            <div className="fundRank">
                <div className="tabHead">
                    <div className={this.state.activeIndex === 1 ? "tabT active":"tabT"} onClick={()=>this.tab(1)}>
                        股票型
                    </div>
                    <div className={this.state.activeIndex === 2 ? "tabT active":"tabT"} onClick={()=>this.tab(2)}>
                        混合型
                    </div>
                    <div className={this.state.activeIndex === 3 ? "tabT active":"tabT"} onClick={()=>this.tab(3)}>
                        债券型
                    </div>
                    <div className={this.state.activeIndex === 4 ? "tabT active":"tabT"} onClick={()=>this.tab(4)}>
                        QDII型
                    </div>
                    <div className="tabT">
                        <img src={require("../../image/search@2x.png")} className="searchHead" onClick={()=>this.rankSearch()}/>
                    </div>
                </div>
                <div className="tabCon">
                    {
                        isMounted&&this.state.activeIndex === 1 && <div className="tabC01">
                            <FTab tabCon={'tabCon01'} typecode={'0'}/>
                        </div>
                    }
                    {
                        this.state.activeIndex === 2 && <div className="tabC02">
                            <FTab tabCon={'tabCon02'} typecode={'1'}/>
                        </div>
                    }
                    {
                        this.state.activeIndex === 3 && <div className="tabC03">
                            <FTab tabCon={'tabCon03'} typecode={'2'}/>
                        </div>
                    }
                    {
                        this.state.activeIndex === 4 && <div className="tabC04">
                            <FTab tabCon={'tabCon04'} typecode={'3'}/>
                        </div>
                    }

                </div>

            </div>
        );
    }
}

export default FundRank;