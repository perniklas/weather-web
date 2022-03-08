import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Button } from 'react-bootstrap'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Weather from './Weather';
import Forecast from './Forecast'

export default function City(props) {
    /**
     * Current weather with precipitation for the day, forecasts for the week appended at the end
     */
    return (
        <div className="currentCityContainer">
            <Button variant="light" id="toCityOverviewBtn" onClick={() => props.resetCity(null)}>
                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </Button>
            <Col className="mt-5 w-75 mx-auto">
                <Weather weatherData={props.weatherData} cityName={props.name}></Weather>
                <Forecast forecastData={props.weatherData}></Forecast>
            </Col>
        </div>
    );
}