import React from 'react';
import bem from 'b_';

const b = bem.with('RecommendationList');

class RecommendationList extends React.Component {

    constructor(props) {
        super(props);
    }

    rows() {
        const rows = this.props.data.map(row =>
            <tr key={row.id}>
                <td>{row.date.format('YYYY MMM D')}</td>
                <td>{`$${row.price}`}</td>
                <td>{row.socialCount}</td>
                <td>
                    <span
                        className={b('recommendation', { recommendation: row.recommendation })}>
                        {row.recommendation}
                    </span>
                </td>
            </tr>
        );

        return rows;
    }

    render() {
        return (
            <div className={b()}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Media count</th>
                            <th>Recommendation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RecommendationList;
