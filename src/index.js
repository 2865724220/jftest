import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, HashRouter, Route } from 'react-router-dom';

import './swiper.css';
import './index.css';
import './App.css';
import './main.css';
import Manager from "./component/manager/manager"
import Searching from './component/searching/searching';
import Search from './component/search/search';
import Diagnose from './component/diagnose/diagnose';
import Rank from "./component/rank/rank";
import Result from "./component/result/result"
import Valuation from './component//fund/valuation'
import FundRank from './component/fund/fundRank'
import ValueSearching from "./component/valueSearching/valueSearching";
import ValueSearch from "./component/valueSearch/valueSearch"
import RankSearch from "./component/rankSearch/rankSearch"
import RankSearching from "./component/rankSearching/rankSearching"
import Main from './component/main/main'
import RegroupFund from './component/regroupFund/regroupFund';
import RegroupDiagnose from './component/regroupDiagnose/regroupDiagnose';
//测试实时基金charts
import sitFundCharts from './component/sitFundCharts/regroupFund'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div className="App">
        <HashRouter>
            <Switch>
                <Route exact path="/main" component={Main}/>
                <Route exact path="/search" component={Search}/>    //跳到diagnose
                <Route exact path="/manager" component={Manager}/>
                <Route exact path='/searching' component={Searching}/>
                <Route exact path="/valuesearch" component={ValueSearch}/>  //跳到valuation
                <Route exact path="/valuesearching" component={ValueSearching}/>
                <Route exact path="/rankSearch" component={RankSearch}/>    //跳到result
                <Route exact path="/rankSearching" component={RankSearching}/>
                <Route exact path='/valuation/:fundId/:fundName' component={Valuation}/>
                <Route exact path='/fundRank' component={FundRank}/>    //跳到result
                <Route exact path="/diagnose/:fundId" component={Diagnose}/>
                <Route exact path="/rank" component={Rank}/>
                <Route exact path="/result/:fundId" component={Result}/>
                <Route exact path="/regroupFund/:fundId" component={RegroupFund}/>
                <Route exact path="/regroupDiagnose/:fundId" component={RegroupDiagnose}/>
                <Route exact path="/sitFundCharts/:fundId" component={sitFundCharts}/> // 测试
            </Switch>
        </HashRouter>
    </div>,
    document.getElementById('root')
);
registerServiceWorker();
