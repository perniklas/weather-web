import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudShowersHeavy, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from "../helpers/utils";
import { Row, Col } from 'react-bootstrap';
import { List } from 'semantic-ui-react';

export default function Forecast(props) {
    const forecast = props.forecastData;
    
    /**
     * Forecasts for next 7 days
     */
     const weeklyForecast = forecast.nextDays.map((item, index) => {
        return (
            <Col key={index} className="forecast">
                <Row>
                    <Col>
                        <span className="floatleft bold">{formatDate(item.date)}</span>
                    </Col>
                    <Col xs={5}>
                        <span className="currentCity-forecast floatright">
                            <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon> {item.temperature.max.toFixed(1)} ºC
                        </span>
                    </Col>
                </Row>
                <Row className="details d-flex flex-row justify-content-around mt-2">
                    <Col>
                        <Row className="mt-2">
                            <div className="col d-flex flex-row justify-content-center">
                                <FontAwesomeIcon icon={faTint} className="floatright mt-1"></FontAwesomeIcon>
                                <span className="scootALittleToTheRight">{item.humidity}%</span>
                            </div>
                            <div className="col d-flex flex-row justify-content-center">
                                <FontAwesomeIcon icon={faWind} className="floatright mt-1"></FontAwesomeIcon>
                                <span className="scootALittleToTheRight">{item.wind}m/s</span>
                            </div>
                        </Row>
                        <Row className="details mt-2">
                            <div className="col d-flex flex-row justify-content-center">
                                <FontAwesomeIcon icon={faCloudShowersHeavy} className="floatright mt-1"></FontAwesomeIcon>
                                <span className="scootALittleToTheRight">{item.precipitation}mm</span>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Col>
        );
    });

    return (
        <List className="mt-3 currentCityForecast">{weeklyForecast}</List>
    );
}