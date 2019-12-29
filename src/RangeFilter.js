import React, {PureComponent} from 'react';

class RangeFilter extends PureComponent {

    render() {
        const {rangeMin, rangeMax, rangeValue, onRangeMove} = this.props;
        return (
            <>
                <input type="range"
                       id="comments"
                       name="comments"
                       min={rangeMin}
                       max={rangeMax + 100}
                       value={rangeValue}
                       step="10"
                       onChange={onRangeMove}/>
                <label htmlFor="comments">Current filter: </label>
            </>
        );
    }
}

export default RangeFilter;