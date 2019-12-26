import React from 'react';
import './App.css';
//import Loader from 'react-loader-spinner'
import LoadingOverlay from 'react-loading-overlay';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            headline: "Top commented.",
            imageItems: []
        }
    }

    getImages = () => {

        const link = "https://www.reddit.com/r/reactjs.json?limit=100";
        this.setState({
            isLoading: true
        });

        fetch(link)
            .then(response => {

                return response.json();
            })
            .then(data => {
                //console.log(data.data.children);
                this.setState({
                    imageItems: data.data.children,
                    isLoading: false
                });
                //
                // this.props.onChangeTotalPages(data.total_pages);
            });
    };

    compare = (a, b) => {
        return b.data.num_comments - a.data.num_comments;
    };

    componentDidMount() {
        this.getImages();
    }


    render() {

        const {imageItems, isLoading} = this.state;
        return (
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Loading your content...'
                styles={{
                    spinner: (base) => ({
                        ...base,
                        width: '50px',
                        '& svg circle': {
                            stroke: '#000000'
                        }
                    }),
                    content : ({
                        color: '#000000',
                        width: '290px',
                    })
                }}
            >
            <div className="gallery__container">
                <h1>{this.state.headline}</h1>
                <div className="gallery__gallery">
                            {
                                imageItems.sort(this.compare).map(item => {
                                    return (
                                        <div key= {item.data.id}
                                             className="gallery__image-container">
                                            <img src={item.data.thumbnail} alt=""/>
                                            <h2>{item.data.title}</h2>
                                            <p>Number of comments: {item.data.num_comments}</p>
                                            <a href={item.data.permalink}>Link</a>
                                        </div>
                                    );
                                })
                            }
                </div>
            </div>
            </LoadingOverlay>
        );
    }
}


