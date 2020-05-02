import React from "react";
import {BASIC_URL} from "../../../constants";
import {Spinner, Card, Container, Row} from "react-bootstrap";
import "./SearchByNamePage.css"

class SearchByNamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            movies: null,
        }
    }

    componentDidMount() {
        const search = this.props.search;
        fetch(BASIC_URL+`movies/searchByName?search=${search}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => this.setState({isFetching: true, movies: res}));
    };

    spinner = (<Spinner animation="grow" variant="dark" />);

    films = (data) => {
        if (data.length === 0){
            return (
                <h2>Your search did not match</h2>
            )
        }
        const items = data.map((movie, index) => {
            let img = '';
            if (movie.backdrop_path) {
                img = (
                    <Row>
                        <a href={`/movies/${movie.movie_id}`}>
                            <Card.Img variant='bottom' src={movie.backdrop_path}/>
                        </a>
                    </Row>
                );
            }
            return (
                    <Row >
                        <Card border="dark" bg='light' key={index} style={{ width: '60%' }}>
                            <Card.Header><Card.Title>{movie.title}</Card.Title></Card.Header>
                            <Card.Body>
                                {img}
                                <Card.Text>
                                    <b>{movie.genres.join(', ')}</b>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
            )
        });
        return (
            <Container fluid='xl'>
                <h2>Found by your request:</h2>
                {items}
            </Container>
        );
    };

    render() {
        console.log(this.state.movies);
        return(
            <div>
                {this.state.isFetching? this.films(this.state.movies): this.spinner}
            </div>
        )
    }
};

export default SearchByNamePage;