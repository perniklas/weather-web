import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col } from 'react-bootstrap'
import { faUmbrella, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { getFormattedHours, getFormattedDate, getDateWithHoursAdded } from '../helpers/utils';

export default function Weather(props) {
    const weather       = props.weatherData;
    const temperature   = `${ props.weatherData.currentHour.temperature} ºC`;

    return (
        <Row className="currentCityWeather">
            <Col>
                <Row className="rightNow">
                    <span>Right now, in</span>
                </Row>
                <Row>
                    <h5 className="currentCityName">{props.cityName}</h5>
                </Row>
                <Row>
                    <h5>{getFormattedDate(new Date(), true)}</h5>
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
                        <span>{`${getFormattedHours(getDateWithHoursAdded(new Date(), 1))}`}</span>
                    </Col>
                    <Col>
                        <div className="d-flex flex-row justify-content-end">
                            <FontAwesomeIcon icon={faUmbrella} className="mt-2"></FontAwesomeIcon>
                            <span className="addspace">{weather.nextHours.one.precipitation}mm</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex flex-row">
                            <span>{weather.nextHours.one.temperature} ºC</span>
                        </div>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="details">
                    <Col>
                        <span>{`${getFormattedHours(getDateWithHoursAdded(new Date(), 6))}`}</span>
                    </Col>
                    <Col>
                        <div className="d-flex flex-row justify-content-end">
                            <FontAwesomeIcon icon={faUmbrella} className="mt-2"></FontAwesomeIcon>
                            <span className="addspace">{weather.nextHours.six.precipitation}mm</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex flex-row">
                            <span>{weather.nextHours.six.temperature} ºC</span>
                        </div>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="details">
                    <Col>
                        <span>{`${getFormattedHours(getDateWithHoursAdded(new Date(), 12))}`}</span>
                    </Col>
                    <Col>
                        <div className="d-flex flex-row justify-content-end">
                            <FontAwesomeIcon icon={faUmbrella} className="mt-2"></FontAwesomeIcon>
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
    );
}