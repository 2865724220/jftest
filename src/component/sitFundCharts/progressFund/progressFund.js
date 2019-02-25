import React, { Component } from "react";
import utils from '../../../utils/utils'
import './progressFund.css'
class Diagnose extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
    }
    render() {
        let itemsList = this.props.datas;
        for (let item of itemsList) {
            if (item.newsTime) {
                item.newsTime = utils.formatTime(item.newsTime);
            }
        }
        return (
            <div className="progress">
                <div className='deleteModal' onClick={() => {this.props.onClickshow(false)}}>x</div>
                <ul className="progress_status">
                    {
                        itemsList.map((item, i) => {
                            return (
                                <li key={i}>
                                    <div className='progress_li'>
                                        <div className="progress_liLeft">
                                            <div className="left_round"></div>
                                            <div className={i === itemsList.length - 1 ? '' : 'left_line'}></div>
                                        </div>
                                        <div className="progress_right">
                                            <div className="progress_statusCon">{item.newsTime}</div>
                                            <div className="progress_statusTit">{item.newsContent}</div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default Diagnose
