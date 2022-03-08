import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col } from 'react-bootstrap'
import { faUmbrella, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import { getFormattedHours, getFormattedDate, getDateWithHoursAdded } from '../helpers/utils';

export default function Weather(props) {
    const weather       = props.weatherData;
    const temperature   = `${ props.weatherData.currentHour.temperature} ºC`;
    
    let nextHours = [];
    weather.nextHours.forEach((hour, i) => {
        nextHours.push(
            <div key={i}>
                <Row className="details">
                    <Col>
                        <span>{`${getFormattedHours(getDateWithHoursAdded(new Date(), hour.hoursUntil))}`}</span>
                    </Col>
                    <Col>
                        <div className="d-flex flex-row justify-content-end">
                            <FontAwesomeIcon icon={faUmbrella} className="mt-2"></FontAwesomeIcon>
                            <span className="addspace">{hour.precipitation}mm</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex flex-row">
                            <span>{hour.temperature} ºC</span>
                        </div>
                    </Col>
                </Row>
                {i < weather.nextHours.length - 1 ? <hr></hr> : null}
            </div>
        );
    }); 

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
                <Row className="details mt-4 pb-3">
                    <div className="col d-flex flex-row justify-content-center">
                        <FontAwesomeIcon icon={faTint} className="floatright mt-2"></FontAwesomeIcon>
                        <span className="scootALittleToTheRight">{weather.currentHour.humidity}%</span>
                    </div>
                    <div className="col d-flex flex-row justify-content-center">
                        <FontAwesomeIcon icon={faWind} className="floatright mt-2"></FontAwesomeIcon>
                        <span className="scootALittleToTheRight">{weather.currentHour.wind}m/s</span>
                    </div>
                </Row>
                {nextHours.map(h => h)}
            </Col>
        </Row>
    );
}