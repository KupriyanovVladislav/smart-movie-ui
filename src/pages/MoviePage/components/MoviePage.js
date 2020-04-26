import React from "react";
import {Container, Spinner, Image, Table, Row, Col} from "react-bootstrap";
import {BASIC_URL} from "../../../constants";
import './MoviePage.css';

class MoviePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            movie: null,
        }
    }

    componentDidMount() {
        const movieId = this.props.movieId;
        const token = localStorage.getItem('token');
        let headers = {};
        if (token) {
            headers.Authorization = `JWT ${token}`;
        }
        fetch(BASIC_URL+`movies/${movieId}`, {
            method: 'GET',
            headers: headers,
        })
            .then(res => res.json())
            .then(res => this.setState({isFetching: true, movie: res}));
    }

    getNamesCountries = (countries) => {
        let result = [];
        countries.map(country => {result.push(country.name)});
        return result.join(', ')
    };

    spinner = (<Spinner animation="grow" variant="dark" />);

    movieInfo = (data) => {
        console.log(data);
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
                        <Image src={data.poster_path} thumbnail/>
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
            </Container>
        )
    };

    render() {
        return (
            <div>{this.state.isFetching? this.movieInfo(this.state.movie): this.spinner}</div>
        );
    }
}

export default MoviePage;