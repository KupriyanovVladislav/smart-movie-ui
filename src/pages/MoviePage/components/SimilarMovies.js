import React from "react";
import {BASIC_URL} from "../../../constants";
import {Col, Image, Row, Spinner} from "react-bootstrap";

class SimilarMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetched: false,
            movies: null,
        }
    }

    componentDidMount() {
        const title = this.props.title;
        const amount = 4;
        const url = BASIC_URL + `movies/similar?title=${title}&top=${amount}`;
        fetch(url)
            .then(res => res.json())
            .then(res => this.setState({isFetched: true, movies: res}));
    }

    similarMovies = (movies) => {
        const result = movies.map((movie, index) => {
            return (
                <Col key={index}>
                    <a href={`/movies/${movie.movie_id}`}>
                        <Image src={movie.backdrop_path} rounded style={{width: '100%'}}/>
                    </a>
                    <h5>{movie.title}</h5>
                </Col>
            )
        });
        return (
            <Row>
                {result}
            </Row>
        )
    };

    spinner = <Spinner animation="border" />;

    render() {
        console.log(this.state.movies);
        return (
            <div>
                <h2>If you liked this movie</h2>
                {this.state.isFetched? this.similarMovies(this.state.movies): this.spinner}
            </div>
        );
    }
}

export default SimilarMovies;