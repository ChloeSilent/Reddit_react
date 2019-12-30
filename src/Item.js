import React, {Component} from 'react';

class Item extends Component {

    render() {
        const {data} = this.props;
        return (
            <div
                 className="gallery__image-container">
                {data.thumbnail!== "self" && <img src={data.thumbnail} alt=""/>}
                <h2>{data.title}</h2>
                <p>Number of comments: {data.num_comments}</p>
                <a href={`https://www.reddit.com/${data.permalink}`}
                   target="_blank"
                   rel="noopener noreferrer">Link</a>
            </div>
        );
    }
}

export default Item;