import React from "react";
import {Card, Container, Row, Spinner} from "react-bootstrap";
import {BASIC_URL} from "../../../constants";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FavoriteMoviesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetched: false,
            movies: null,
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        let headers = {'Content-Type': 'application/json'};
        if (token) {
            headers.Authorization = `JWT ${token}`;
        }
        fetch(BASIC_URL+'bookmarks/', {
            method: 'GET',
            headers: headers
        })
            .then(res => res.json())
            .then(res => this.setState({...this.state, isFetched: true, movies: res}));
    };

    spinner = (<Spinner animation="grow" variant="dark" />);

    deleteMovieFromFavorites = (movieId, index) => {
        const token = localStorage.getItem('token');
        let headers = {'Content-Type': 'application/json'};
        if (token) {
            headers.Authorization = `JWT ${token}`;
        }
        fetch(BASIC_URL+`bookmarks/${movieId}`, {
            headers: headers,
            method: 'DELETE',
        })
            .then(res => {
                const movies = this.state.movies;
                movies.splice(index, 1);
                this.setState({...this.state, movies: movies});
            });
    };

    favorites = (data) => {
        if (data.length === 0){
            return (
                <h2>Your haven't favorites</h2>
            )
        }
        const items = data.map((movie, index) => {
            let img = '';
            if (movie.movie.backdrop_path) {
                img = (
                    <Row>
                        <a href={`/movies/${movie.movie.movie_id}`}>
                            <Card.Img variant='bottom' src={movie.movie.backdrop_path}/>
                        </a>
                    </Row>
                );
            }
            return (
                <Row >
                    <Card border="dark" bg='light' key={index} style={{ width: '50%' }}>
                        <Card.Header>
                            <Card.Title>
                                {movie.movie.title} <FontAwesomeIcon onClick={() => this.deleteMovieFromFavorites(movie.id, index)} icon={faWindowClose}/>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {img}
                            <Card.Text>
                                <b>{movie.movie.genres.join(', ')}</b>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            )
        });
        return (
            <Container fluid='xl'>
                <Row>
                    <h2>Your favorites:</h2>
                </Row>
                {items}
            </Container>
        );
    };

    render() {
        return (
            <div>
                {this.state.isFetched? this.favorites(this.state.movies): this.spinner}
            </div>
        );
    }
}

export default FavoriteMoviesPage;