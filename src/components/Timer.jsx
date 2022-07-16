import React from "react";
import { Card, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faCirclePlay, faCirclePause, faArrowRotateBackward } from '@fortawesome/free-solid-svg-icons'
import accurateInterval from "../accurate_interval";


class Timer extends React.Component {
    state = {
        breakLen: 5,
        seshLen: 25,
        paused: true,
        time: 1500,
        session: 'Session',
        clock: ''
    }

    clearClock = () => {
            if (this.state.clock){
                this.state.clock.cancel()
                this.setState(() =>{
                    return {
                        clock: ''
                    }
                })
            }
    }
    tick = () => {
        const { paused, time } = this.state
        if (paused || time < 0){
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
        console.log('playPause', paused)
        if (paused){
            this.setState( prevState => {
                return {
                    paused: !prevState.paused,
                    clock: accurateInterval(() => {this.tick(); this.switchTimer()}, 1000)
                }
            })
        } else {
            if (this.state.clock){
                this.state.clock.cancel()
            }
            this.setState( prevState => {
                return {
                    paused: !prevState.paused,
                    clock: ''
                }
            })
        }
    }

switchTimer = () => {
    const { time, seshLen, breakLen, session } = this.state
    if (time === 0) {
        this.alarm()
        this.clearClock()
        if (session === 'Session'){
            this.setState(() => {
                return {
                    time: breakLen * 60,
                    session: 'Break',
                    clock: accurateInterval(() => {this.tick(); this.switchTimer()}, 1000)
                }
            })
        } else {
            this.setState(() => {
                return {
                    time: seshLen * 60,
                    session: 'Session',
                    clock: accurateInterval(() => {this.tick(); this.switchTimer()}, 1000)
                }
            })
        }
    }
}

    toClock = () => {
        let mins = Math.floor(this.state.time / 60)
        let secs = this.state.time - mins * 60
        mins = mins < 10 ? '0' + mins : mins
        secs = secs < 10 ? '0' + secs: secs
        return mins + ':' + secs
    }

    breakDec = () => {
        console.log('breakDec')
        const { paused, breakLen, session } = this.state
        if(false){
            return
        } else {
            if (breakLen !== 1){
                this.setState(prevState => {
                    if (prevState.breakLen === 1){
                        return
                    } else {
                        return {
                            breakLen: prevState.breakLen - 1
                        }
                    }
                })
                if (session === 'Break'){
                    this.setState(prevState => {
                        return {
                            time: prevState.breakLen * 60
                        }
                    })
                }
            }
        }
    }
    breakInc = () => {
        console.log('breakInc')
        const { paused, session } = this.state
        if (false){
            return 
        } else {
            this.setState(prevState => {
                if (prevState.breakLen === 60){
                    return
                } else {
                    return {
                        breakLen: prevState.breakLen + 1
                    }
                }
            })
            if (session === 'Break'){
                this.setState(prevState => {
                    return {
                        time: prevState.breakLen * 60 + 60
                    }
                })
            }
        }
    }
    seshDec = () => {
        console.log('seshDec')
        const { paused, session } = this.state
        if (false){
            return 
        } else {
                this.setState(prevState => {
                    if (prevState.seshLen === 1){
                        return
                    } else {
                        return {
                            seshLen: prevState.seshLen - 1
                        }
                    }
                })
                if (session === 'Session'){
                    this.setState(prevState => {
                        return {
                            time: prevState.seshLen * 60
                        }
                    })
                }
            }
    }
    seshInc = () => {
        console.log('seshInc')
        const { paused, session } = this.state
        if (false){
            return 
        } else {
            this.setState(prevState => {
                if (prevState.seshLen === 60){
                    return 
                } else {
                    return {
                        seshLen: prevState.seshLen + 1
                    }
                }
            })
            if (session === 'Session'){
                this.setState(prevState => {
                    return {
                        time: prevState.seshLen * 60
                    }
                })
            }
        }
    }

    reset = () => {
        console.log('reset')
        this.clearClock()
        this.setState(() => {
            return {
                breakLen: 5,
                seshLen: 25,
                paused: true,
                time: 1500,
                session: 'Session',
            }
        })
        this.alarmPlay.pause();
        this.alarmPlay.currentTime = 0;
    }
    logState = () => {
        console.log(this.state)
    }

    loop = () => {
        for (let i = 0; i < 36; i++){
            this.seshInc()
        }
    }

    loop2 = () => {
        for (let i = 0; i < 60; i++){
            this.seshDec()
        }
    }
    loop3 = () => {
        for (let i = 0; i < 60; i++){
            this.breakDec()
        }
    }
    loop4 = () => {
        for (let i = 0; i < 60; i++){
            this.breakInc()
        }
    }
    loop5 = () => {
        for(let i = 0; i<9;i++){
            this.reset()
        }
        for(let i = 0; i<35;i++){
            this.seshInc()
        }
        for(let i = 0; i<3;i++){
            this.reset()
        }
        for(let i = 0; i<60;i++){
            this.seshDec()
        }
        for(let i = 0; i<60;i++){
            this.breakDec()
        }
        this.startPause()
        this.reset()
        this.reset()
        for(let i = 0; i<4;i++){
            this.breakDec()
        }
        for(let i = 0; i<2;i++){
            this.reset()
        }
        for(let i = 0; i<60;i++){
            this.seshDec()
        }
    }

    render () {
        return (
            <div>
                <Card>
                    <Row>
                        <Col>
                        <h4 id="break-label">Break Length</h4>
                        </Col>
                        <Col>
                        <h4 id="session-label">Session Length</h4>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                        <Button id="break-decrement" value={'-'} onClick={this.breakDec}><FontAwesomeIcon icon={faArrowDown} /></Button>
                        </Col>
                        <Col>
                        <h4 id="break-length">{this.state.breakLen}</h4>
                        </Col>
                        <Col>
                        <Button id="break-increment" value={'+'} onClick={this.breakInc}><FontAwesomeIcon icon={faArrowUp} /></Button>
                        </Col>
                        <Col>
                        <Button id="session-decrement"value={'-'} onClick={this.seshDec}><FontAwesomeIcon icon={faArrowDown} /></Button>
                        </Col>
                        <Col>
                        <h4 id="session-length">{this.state.seshLen}</h4>
                        </Col>
                        <Col>
                        <Button id="session-increment" value={'+'}onClick={this.seshInc}><FontAwesomeIcon icon={faArrowUp} /></Button>
                        </Col>
                    </Row>
                <p id="timer-label">{this.state.session}</p>
                <h1 id="time-left">{this.toClock()}</h1>
                <Row>
                    <Col>
                    <Button id="start_stop" onClick={this.startPause}>{this.state.paused ? <FontAwesomeIcon icon={faCirclePlay} /> : <FontAwesomeIcon icon={faCirclePause} />}</Button>
                    </Col>
                    <Col>
                    <Button id="reset" onClick={this.reset}><FontAwesomeIcon icon={faArrowRotateBackward} /></Button>
                    </Col>
                </Row>
                <Button onClick={this.logState}>state</Button>
                <Button onClick={this.loop}>loop</Button>
                <Button onClick={this.loop2}>loop2</Button>
                <Button onClick={this.loop3}>loop3</Button>
                <Button onClick={this.loop4}>loop4</Button>
                <Button onClick={this.loop5}>loop5</Button>

                </Card>
                <audio id="beep" preload="auto" ref={(audio) => {this.alarmPlay = audio; }}src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
            </div>
        );
    }
}

export default Timer
