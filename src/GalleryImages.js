import React, {Component} from 'react';

class GalleryImages extends Component {
    render() {
        const {imageItems} = this.props;
        return (
            <div className="gallery__gallery">
                {
                    imageItems.length > 0 ?
                        imageItems.map(item => {
                            return (
                                <div key={item.data.id}
                                     className="gallery__image-container">
                                    <img src={item.data.thumbnail} alt=""/>
                                    <h2>{item.data.title}</h2>
                                    <p>Number of comments: {item.data.num_comments}</p>
                                    <a href={item.data.permalink}>Link</a>
                                </div>
                            );
                        }) : <p className="notMatchWarn">No results found matching your criteria</p>
                }
            </div>
        );
    }
}

export default GalleryImages;