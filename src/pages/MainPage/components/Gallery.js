import React from "react";
import {Container, Carousel, Spinner} from "react-bootstrap";
import {BASIC_URL} from "../../../constants";
import "./Page.css"

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            movies: null,
        }
    }

    componentDidMount() {
        fetch(BASIC_URL+'movies/top/?amount=5', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => this.setState({isFetching: true, movies: res}));
    }

    spinner = (<Spinner animation="grow" variant="dark" />);

    carousel = () => {
        const items = this.state.movies.map((movie, index) => {
            console.log(movie.backdrop_path);
            if (movie.backdrop_path) {
                return (
                    <Carousel.Item key={index}>
                        <a href={`/movies/${movie.movie_id}`}>
                            <img
                            className="d-block w-100"
                            src={movie.backdrop_path}
                            />
                        </a>
                        <Carousel.Caption>
                            <h3>{movie.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            }
        });
        return (
        <Carousel>
            {items}
        </Carousel>
    )};


    render() {
        return (
            <Container>
                {this.state.isFetching? this.carousel(): this.spinner}
            </Container>
        )
    }
}

export default Gallery;