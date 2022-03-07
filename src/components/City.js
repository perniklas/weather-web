import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Button } from 'react-bootstrap'
import { faChevronLeft, faCloudShowersHeavy, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { List } from 'semantic-ui-react';

export default function City(props) {
    const weather       = props.weatherData; // current hour
    const temperature   = `${ weather.currentHour.temperature} ºC`;
    const forecast      = weather.nextDays;
    const days = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }

    const formatDate = (pDate, displayHour = false) => {
        let date  = pDate.getDate() < 10 ? '0' + pDate.getDate() : pDate.getDate();
        let month = pDate.getMonth() < 9 ? '0' + (pDate.getMonth() + 1) : pDate.getMonth() + 1;
        let dateString = `${days[pDate.getDay()]} ${date}.${month}`;
        if (displayHour) {
            dateString += `, ${pDate.getHours()}:00`;
        }
        return dateString;
    };

    const getDateWithHoursAdded = (date, hours) => {
        date.setHours(date.getHours() + hours);
        return date;
    };

    /**
     * Forecasts for next 7 days
     * 
     * Collapsible list items not working as imagined
     */
    const weeklyForecast = forecast.map((item, index) => {
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
                                <span className="scootALittleToTheRight">{weather.nextHours.one.precipitation}mm</span>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Col>
        );
    });

    /**
     * Current weather with precipitation for the day, forecasts for the week appended at the end
     * Unfortunately:
     * - longer city names overflow out of container on smaller devices
     * - Forecast for the next 7 days should be its own component
     */
    return (
        <div className="currentCityContainer">
            <Button variant="light" id="toCityOverviewBtn" onClick={() => props.resetCity(null)}>
                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </Button>
            <Col className="mt-5 w-75 mx-auto">
                <Row className="currentCityWeather">
                    <Col>
                        <Row className="rightNow">
                            <span>Right now, in</span>
                        </Row>
                        <Row>
                            <h5 className="currentCityName">{props.name}</h5>
                        </Row>
                        <Row>
                            <h5>{formatDate(new Date(), true)}</h5>
                        </Row>
                        <Row className="mt-3">
                            <span className="currentCity-weather">
                                <FontAwesomeIcon icon={weather.currentHour.icon}/>
                                <span className="scootALittleToTheRight">{temperature}</span>
                            </span>
                        </Row>
                        <Row className="details mt-4">
                            <div className="col d-flex flex-row justify-content-center">
                                <FontAwesomeIcon icon={faTint} className="floatright mt-2"></FontAwesomeIcon>
                                <span className="scootALittleToTheRight">{weather.currentHour.humidity}%</span>
                            </div>
                            <div className="col d-flex flex-row justify-content-center">
                                <FontAwesomeIcon icon={faWind} className="floatright mt-2"></FontAwesomeIcon>
                                <span className="scootALittleToTheRight">{weather.currentHour.wind}m/s</span>
                            </div>
                        </Row>
                        <Row className="details mt-5">
                            <Col>
                                <span>{`${getDateWithHoursAdded(new Date(), 1).getHours()}:00:`}</span>
                            </Col>
                            <Col>
                                <div className="d-flex flex-row justify-content-end">
                                    <FontAwesomeIcon icon={faCloudShowersHeavy} className="mt-2"></FontAwesomeIcon>
                                    <span className="addspace">{weather.nextHours.one.precipitation}mm</span>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-row">
                                    <span>{weather.nextHours.one.temperature} ºC</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className="details">
                            <Col>
                                <span>{`${getDateWithHoursAdded(new Date(), 6).getHours()}:00:`}</span>
                            </Col>
                            <Col>
                                <div className="d-flex flex-row justify-content-end">
                                    <FontAwesomeIcon icon={faCloudShowersHeavy} className="mt-2"></FontAwesomeIcon>
                                    <span className="addspace">{weather.nextHours.six.precipitation}mm</span>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-row">
                                    <span>{weather.nextHours.six.temperature} ºC</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className="details">
                            <Col>
                                <span>{`${getDateWithHoursAdded(new Date(), 12).getHours()}:00:`}</span>
                            </Col>
                            <Col>
                                <div className="d-flex flex-row justify-content-end">
                                    <FontAwesomeIcon icon={faCloudShowersHeavy} className="mt-2"></FontAwesomeIcon>
                                    <span className="addspace">{weather.nextHours.twelve.precipitation}mm</span>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-row">
                                    <span>{weather.nextHours.twelve.temperature} ºC</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <List className="mt-3 currentCityForecast">{weeklyForecast}</List>
            </Col>
        </div>
    );
}