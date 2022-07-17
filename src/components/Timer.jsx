import React from "react";
import { Card, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faCirclePlay, faCirclePause, faArrowRotateBackward, faSeedling } from '@fortawesome/free-solid-svg-icons'
import accurateInterval from "../accurate_interval";


class Timer extends React.Component {
    state = {
        breakLen: 5, 
        seshLen: 25,
        paused: true,
        time: 1500,
        session: true,
        clock: ''
    }

    clearClock = () => {
        const { clock } = this.state
            if (clock){
                this.state.clock.cancel()
                this.setState({
                        clock: ''
                })
            }
    }
    tick = () => {
        const { paused, time } = this.state
        if (time === 0){
            this.switchTimer()
        }
        if (paused || time === 0){
            return
        } else {
            this.setState(prevState => {
                return {
                    time: prevState.time - 1
                }
            })
        }
    }

    alarm = () => {
            this.alarmPlay.play()
    }

    startPause = () => {
        const { paused } = this.state
        if (paused){
            this.setState({
                    paused: false,
                    clock: accurateInterval(this.tick, 1000)
            })
        } else {
            this.clearClock()
            this.setState({
                    paused: true,
            })
        }
    }

switchTimer = () => {
    const { seshLen, breakLen, session } = this.state
        this.alarm()
        this.clearClock()
        if (session){
            this.setState({
                    time: breakLen * 60,
                    session: false,
                    clock: accurateInterval(this.tick, 1000)
            })
        } else {
            this.setState({
                    time: seshLen * 60,
                    session: true,
                    clock: accurateInterval(this.tick, 1000)
            })
        }
}

    toClock = () => {
        let mins = Math.floor(this.state.time / 60)
        let secs = this.state.time - mins * 60
        mins = mins < 10 ? '0' + mins : mins
        secs = secs < 10 ? '0' + secs: secs
        return mins + ':' + secs
    }

    handleBreak = (e) => {
        let val = e.currentTarget.value
        this.changeLength(val, 'breakLen')
    }
    handleSesh = (e) => {
        let val = e.currentTarget.value
        this.changeLength(val, 'seshLen')
    }
    changeLength = (val, timer) => {
        const { paused, session } = this.state
        if (!paused){
            return
        } else {
            if (val === '-'){
                this.setState(prevState => {
                    if (prevState[timer] === 1){
                        return
                    } else 
                    return {
                        [timer]: prevState[timer] - 1,
                    }
                })
            } 
            if (val === '+'){
                this.setState(prevState => {
                    if (prevState[timer] === 60){
                        return
                    } else
                    return {
                        [timer]: prevState[timer] + 1
                    }
                })
            }
            if (session && timer === 'seshLen'){
                this.setState(prevState => {
                    return {
                        time: prevState[timer] * 60
                    }
                })
            }
            if (!session && timer === 'breakLen'){
                this.setState(prevState => {
                    return {
                        time: prevState[timer] * 60
                    }
                })
            }
        }
    }
    reset = () => {
        this.clearClock()
        this.setState({
                breakLen: 5,
                seshLen: 25,
                paused: true,
                time: 1500,
                session: true,
        })
        this.alarmPlay.pause();
        this.alarmPlay.currentTime = 0;
    }

    render () {
        return (
            <div>
                <FontAwesomeIcon icon={faSeedling} size="5x" className="stem"/>
                <Card className="card">
                    <Card.Header>
                    <h3 id="timer-label">{this.state.session ? "Session" : "Break"}</h3>
                    </Card.Header>
                    <Card.Body className="display">
                    <h1 id="time-left">{this.toClock()}</h1>
                    </Card.Body>
                <Row className="mt-4">
                    <Col>
                    <Button id="start_stop" variant={this.state.paused ? "success" : "secondary"} onClick={this.startPause}>{this.state.paused ? <FontAwesomeIcon icon={faCirclePlay} /> : <FontAwesomeIcon icon={faCirclePause} />}</Button>
                    </Col>
                    <Col>
                    <Button id="reset" variant="warning" onClick={this.reset}><FontAwesomeIcon icon={faArrowRotateBackward} /></Button>
                    </Col>
                </Row>
                    <Row className="mt-4">
                        <Col>
                        <h4 id="break-label">Break</h4>
                        </Col>
                        <Col>
                        <h4 id="session-label">Session</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <h4 id="break-length">{this.state.breakLen}</h4>
                        </Col>
                        <Col>
                        <h4 id="session-length">{this.state.seshLen}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                        <span className="pad">
                        <Button id="break-decrement" variant="dark" value={'-'} onClick={this.handleBreak}><FontAwesomeIcon icon={faArrowDown} /></Button>
                        </span>
                        <span className="pad">
                        <Button id="break-increment" variant="dark" value={'+'} onClick={this.handleBreak}><FontAwesomeIcon icon={faArrowUp} /></Button>
                        </span>
                        </Col>
                        <Col>
                        <span className="pad">
                        <Button id="session-decrement" variant="dark" value={'-'} onClick={this.handleSesh}><FontAwesomeIcon icon={faArrowDown} /></Button>
                        </span>
                        <span className="pad">
                        <Button id="session-increment" variant="dark" value={'+'} onClick={this.handleSesh}><FontAwesomeIcon icon={faArrowUp} /></Button>
                        </span>

                        </Col>
                    </Row>
                    <br/>
                </Card>
                <br/>
                <h5 className="footer">Pomodoro Clock</h5>
                <h5 className="footer">by gerardoh13</h5>
                <audio id="beep" preload="auto" ref={(audio) => {this.alarmPlay = audio; }}src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
            </div>
        );
    }
}

export default Timer
