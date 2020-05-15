import React from "react";
import {Container, Spinner, Image, Table, Row, Col, Button} from "react-bootstrap";
import {BASIC_URL} from "../../../constants";
import './MoviePage.css';
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthPageContainer from "../../AuthPage/containers/AuthPageContainer";
import SimilarMovies from "./SimilarMovies";
import Rating from "./Rating";
import getHeaders from "../../../utils";

class MoviePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            movie: null,
            isFavorite: false,
            isModalOpen: false,
            rating: 0,
        }
    }

    componentDidMount() {
        const movieId = this.props.movieId;
        const headers = getHeaders();
        fetch(BASIC_URL+`movies/${movieId}`, {
            method: 'GET',
            headers: headers,
        })
            .then(res => res.json())
            .then(res => {
                const fetchedRating = res.rating;
                let rating = 0;
                if (fetchedRating) {
                    rating = fetchedRating;
                }
                this.setState({...this.state, isFetching: true, movie: res,
                rating: rating, isFavorite: res.is_bookmark});
            });
    }

    handleButtonClick = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    };

    getNamesCountries = (countries) => {
        let result = [];
        countries.map(country => result.push(country.name));
        return result.join(', ')
    };

    addMovieToFavorites = (e) => {
        if (!(this.props.user.email)) {
            this.setState({...this.state, isModalOpen: true});
            return
        }
        const movieId = this.props.movieId;
        const headers = getHeaders();
        const body = {
            movie_id: movieId
        };
        fetch(BASIC_URL+'bookmarks/', {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => this.setState({...this.state, isFavorite: true}));
    };

    spinner = (<Spinner animation="grow" variant="dark" />);

    movieInfo = (data) => {
        console.log(data);
        let favElement = (
            <Button style={{ width: '80%'}} variant="outline-warning" onClick={this.addMovieToFavorites}>
                Add to favourites <FontAwesomeIcon  icon={faBookmark}/>
            </Button>
        );

        if (this.state.isFavorite) {
            favElement = (<p>This movie is in your favorites</p>)
        }
        return(
            <Container fluid='xl'>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                        <h2>{data.title}</h2>
                    </Col>
                    <Col lg={6}></Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Image src={data.poster_path} style={{ width: '80%'}} thumbnail/>
                        {favElement}
                    </Col>
                    <Col lg={8}>
                        <Table hover>
                            <tbody>
                            <tr>
                                <td>Year</td>
                                <td>{data.year}</td>
                            </tr>
                            <tr>
                                <td>Budget</td>
                                <td>{data.budget + ' $'}</td>
                            </tr>
                            <tr>
                                <td>Genres</td>
                                <td>{data.genres.join(', ')}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{this.getNamesCountries(data.production_countries)}</td>
                            </tr>
                            <tr>
                                <td>TMDB rating</td>
                                <td>{data.vote_average}</td>
                            </tr>
                            <tr>
                                <td>Release date</td>
                                <td>{data.release_date}</td>
                            </tr>
                            <tr>
                                <td>Runtime</td>
                                <td>{data.runtime + ' min'}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Rating rating={this.state.rating} modalHandler={this.handleButtonClick}
                                user={this.props.user} movieId={this.props.movieId}/>
                    </Col>
                    <Col lg={8}>
                        {data.overview}
                    </Col>
                </Row>
                <Row>
                    <SimilarMovies title={data.title}/>
                </Row>
            </Container>
        )
    };

    render() {
        return (
            <div>
                {this.state.isFetching? this.movieInfo(this.state.movie): this.spinner}
                {this.state.isModalOpen && <AuthPageContainer changeIsOpen={this.handleButtonClick}/>}
            </div>
        );
    }
}

export default MoviePage;