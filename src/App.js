import React from 'react';
import './App.css';
//import Loader from 'react-loader-spinner'
import LoadingOverlay from 'react-loading-overlay';
import Heading from "./Heading";
import AutoRefreshButton from "./AutoRefreshButton";
import RangeFilter from "./RangeFilter";
import GalleryImages from "./GalleryImages";
let refresh;
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            headline: "Top commented.",
            initialImageItems: [],
            imageItems: [],
            autoRefresh: false,
            rangeMin: "",
            rangeMax: "",
            rangeValue: ""

        }
    }
    ;

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
                let imageItems = this.state.rangeValue ? this.state.initialImageItems.filter(item =>
                    item.data.num_comments >= Number(this.state.rangeValue)) : data.data.children.sort(this.compare);

                this.setState({
                    initialImageItems: data.data.children.sort(this.compare),
                    imageItems,
                    isLoading: false,
                    rangeMin: data.data.children.sort(this.compare)[data.data.children.length - 1].data.num_comments,
                    rangeMax: data.data.children.sort(this.compare)[0].data.num_comments
                });
            });
    };

    autoRefresh = () => {

        if (!this.state.autoRefresh) {


            if (!this.state.rangeValue) {
                refresh = setInterval(() => this.getImages(), 3000);
                this.setState({
                    autoRefresh: true
                });
            } else {
                refresh = setInterval(() => this.getImages(), 3000);


                this.setState({
                    autoRefresh: true,

                });
            }

        } else {
            clearInterval(refresh);
            refresh = null;
            this.setState({
                autoRefresh: false
            });
        }
    };

    compare = (a, b) => {
        return b.data.num_comments - a.data.num_comments;
    };

    componentDidMount() {
        this.getImages();
    }

    onRangeMove = (event) => {
        this.setState({
            rangeValue: event.target.value
        });
        let result = this.state.initialImageItems.filter(item =>
            item.data.num_comments >= event.target.value
        );
        this.setState({
            imageItems: result,
        });
    };


    render() {

        const {imageItems, isLoading, rangeMin, rangeMax, headline, rangeValue} = this.state;
        console.log();
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
                        },
                        position: 'absolute',
                        left: '50%',
                        transform: ' translate(-50%)',
                        top: '50%'

                    }),
                    content: ({
                        color: '#000000',
                        width: '290px',
                        padding: "50px",
                        margin: "70px auto"
                    })
                }}
            >
                <div className="gallery__container">
                    <Heading headline={headline}/>
                    <RangeFilter rangeMin={rangeMin}
                                 rangeMax={rangeMax}
                                 rangeValue={rangeValue}
                                 onRangeMove={this.onRangeMove}
                    />
                    <span>{rangeValue}</span>
                    <AutoRefreshButton autoRefresh={this.autoRefresh}/>
                    <GalleryImages imageItems={imageItems}/>
                </div>
            </LoadingOverlay>
        );
    }
}


