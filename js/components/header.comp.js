import React from 'react'
import bem from 'b_';

const b = bem.with('Header');

class Header extends React.Component {

    render () {
        return (
            <div className={b()}>
                <h1 className={b('title')}>STOCK MARKET RECOMMENDER</h1>
            </div>
        )
    }
}

export default Header;