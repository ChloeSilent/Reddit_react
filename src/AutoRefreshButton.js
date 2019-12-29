import React, {PureComponent} from 'react';

class AutoRefreshButton extends PureComponent {
    render() {
        return (
            <input className="gallery__refresh-btn"
                   type="button"
                   value="Start auto-refresh"
                   onClick={this.props.autoRefresh}/>
        );
    }
}

export default AutoRefreshButton;