import React from 'react';
import { connect } from 'react-redux';
import * as fetchHelper from '../common/fetchHelper';
import { FetchDesc } from '../common/fetchDesc';
import * as stockActions from '../actions/stockActions';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/header.comp';
import Filters from '../components/filters.comp';
import RecommendationList from '../components/recommendationList.comp';

import bem from 'b_';

const b = bem.with('Dashboard');

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch(filters) {
        if (!filters.symbol) {
            toast("Please enter a symbol!", {type: 'error'});
        } else {
            this.props.search(filters);
        }
    }

    render() {

        const { recommendations, recommendationsMeta } = this.props;

        return (
            <div className={b()}>
                <header>
                    <Header />
                </header>
                <section>
                    <Filters search={(filters) => this.handleSearch(filters)}/>
                </section>
                <main>
                    {recommendationsMeta.isFetched ?
                        <RecommendationList data={recommendations.data} />
                        : <h3 className={b('empty')}>Select your options and click search!</h3>}
                </main>
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const recommendations = fetchHelper.getFetchResult(state, FetchDesc.STOCKRECOMMENDATIONS);

    return {
        recommendations,
        recommendationsMeta: recommendations
            ? fetchHelper.getFetchMeta(recommendations) : {},
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (filters) => 
            dispatch(stockActions.getStockRecommendation(filters.symbol, filters.provider, filters.timeWindow))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
