import React from 'react'
import classnames from 'classnames';
import bem from 'b_';

const b = bem.with('Filters');

class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            provider: 'twitter',
            symbol: '',
            timeWindow: 10
        }
    }

    filterChanged(e, field) {
        this.setState({
            [field]: e.target.value
        });
    }

    handleSubmit(e) {
        this.props.search(this.state);
        e.preventDefault();
    }

    render () {
        return (
            <div className={b()}>
                <form className='form' onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='row'>
                        <div className={classnames('col', 'col-offset-25')}>
                            <label htmlFor="symbol">Symbol</label>
                            <input id='symbol' className={classnames(b('symbol'), 'input-text')} placeholder={'Symbol'}
                                value={this.state.symbol} onChange={(e) => this.filterChanged(e, 'symbol')}></input>
                        </div>
                        <div className={'col'}>
                            <label htmlFor="provider">Provider</label>
                            <select id='provider' className={classnames(b('provider'), 'select')}
                                onChange={(e) => this.filterChanged(e, 'provider')} value={this.state.provider}>
                                <option value='twitter'>Twitter</option>
                                <option value='facebook'>Facebook</option>
                                <option value='reddit'>Reddit</option>
                                <option value='instagram'>Instagram</option>
                            </select>
                        </div>
                        <div className={'col'}>
                            <label htmlFor="time">Timewindow</label>
                            <input id='time' type='number' placeholder='Time window' min={1}
                                value={this.state.timeWindow} className={classnames(b('timewindow'), 'input-text')}
                                onChange={(e) => this.filterChanged(e, 'timeWindow')}></input>
                            <span>days</span>
                        </div>
                        <div className={'col'}>
                            <button type='submit' className={classnames(b('search-button'), 'primary-button')}>Search</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filters;