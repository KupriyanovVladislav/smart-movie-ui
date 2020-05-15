import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {BASIC_URL} from "../../../constants";
import getHeaders from "../../../utils";

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rated: false,
            rating: 0
        }
    }

    componentDidMount() {
        let rated = false;
        if (this.props.rating) {
            rated = true;
        }
        this.setState({...this.state, rated: rated, rating: this.props.rating})
    }

    changeRating = (value) => {
        if (!(this.state.rated)) {
            this.setState({...this.state, rating: value});
        }
    };

    addRating = (e) => {
        if (!(this.props.user.email)) {
            this.props.modalHandler();
            return
        }
        const movieId = this.props.movieId;
        let headers = getHeaders();
        headers['Content-Type'] = 'application/json';
        const body = {
            movie_id: movieId,
            rating: this.state.rating,
        };
        fetch(BASIC_URL+'ratings/', {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => this.setState({...this.state, rated: true}));
    };

    onMouseLeaveHandler = (e) => {
        if (!(this.state.rated)) {
            this.setState({...this.state, rating: 0})
        }
    };

    onClickHandler = (e) => {
        if (!(this.state.rated)) {
            this.addRating()
        }
    };

    render() {
        const keys = [1, 2, 3, 4, 5];
        const stars = keys.map((el) => {
            return (
                <FontAwesomeIcon
                    onMouseEnter={() => this.changeRating(el)}
                    onMouseLeave={this.onMouseLeaveHandler}
                    onClick={this.onClickHandler}
                    className={el <= this.state.rating?'checkedStar': 'uncheckedStar'}
                    size='3x' icon={faStar} key={el}/>
                    )
        });
        return stars
    }
}

export default Rating