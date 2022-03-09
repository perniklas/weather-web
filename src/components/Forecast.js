import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUmbrella, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { getFormattedDate } from "../helpers/utils";
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
                    <span className="floatleft bold">{getFormattedDate(item.date)}</span>
                </Row>
                <Row className="my-2">
                    <Col className="details mt-2">
                        <Row className="forecastweather">
                            <span>{item.description}</span>
                        </Row>
                        <Row className="forecastweather">
                            <span>
                                <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>
                                <span className="addspace">{` ${item.temperature.max.toFixed(1)}`} ºC</span>
                            </span>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <span className="floatright">Precipitation:</span>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={4}>
                                        <FontAwesomeIcon icon={faUmbrella} className="precipitation mt-1"></FontAwesomeIcon>
                                    </Col>
                                    <Col>
                                        <span className="floatleft">{item.precipitation}mm</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <span className="floatright">Humidity:</span>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={4}>
                                        <FontAwesomeIcon icon={faTint} className="humidity mt-1"></FontAwesomeIcon>
                                    </Col>
                                    <Col>
                                        <span className="floatleft">{item.humidity}%</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <span className="floatright">Wind:</span>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={4}>
                                        <FontAwesomeIcon icon={faWind} className="mt-1"></FontAwesomeIcon>
                                    </Col>
                                    <Col>
                                        <span className="floatleft">{item.wind}m/s</span>
                                    </Col>
                                </Row>
                            </Col>
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