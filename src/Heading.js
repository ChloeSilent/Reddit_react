import React, {PureComponent} from 'react';


class Heading extends PureComponent {
    render() {
        return (
            <h1>{this.props.headline}</h1>
        );
    }
}



export default Heading;
