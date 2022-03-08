import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Form, FormControl } from 'react-bootstrap'
import { List } from 'semantic-ui-react';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
// import { handleWeatherResponse } from '../helpers/Weather';

const CitiesOverview = (props) => {
    // props.allCities.forEach(async city => {
    //      await fetch(`${props.url}lat=${city.latitude}&lon=${city.longitude}`)
    //     .then(data => data.json())
    //     .then(result => {
    //         city.weather = handleWeatherResponse(result);
    //     });
    // });

    let cities = props.allCities.sort((a, b) => a.population > b.population).map((item, index) => {
        return (
            <Row key={item.name} className="forecast clickable" onClick={() => props.parentCallback(item.name)}>
                <span className="floatleft bold">{item.name}</span>
            </Row>
        )
    });
    
    return (
        <Col className="w-75">
            <Row className="pt-5">
                <h1><FontAwesomeIcon icon={faCloudSun}></FontAwesomeIcon>Weather Web</h1>
            </Row>
            <Row className="py-5">
                <Form>
                    <FormControl
                        id="searchbar"
                        type="search"
                        placeholder="Search cities..."
                        className="me-2"
                        aria-label="Search"
                        autoComplete="off"
                        onChange={(e) => props.searchFilter(e)}
                        />
                </Form>
            </Row>
            <Row>
                <List className="w-100">{cities}</List>
            </Row>
        </Col>
    )
};

export default CitiesOverview