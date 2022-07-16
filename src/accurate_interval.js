    let accurateInterval = function(fn, time) {
      var cancel, nextAt, timeout, wrapper;
      nextAt = new Date().getTime() + time;
      timeout = null;
      wrapper = function() {
        nextAt += time;
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        return fn();
      };
      cancel = function() {
        return clearTimeout(timeout);
      };
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return {
        cancel: cancel
      };
    };

    //     breakDec = () => {
    //     const { paused, breakLen, session } = this.state
    //     if (paused){
    //         if (breakLen !== 1){
    //             this.setState({
    //                 breakLen: breakLen - 1
    //             })
    //             if (!session){
    //                 this.setState({
    //                     time: breakLen * 60 - 60
    //                 })
    //             }
    //         }
    //     }
    // }
    // breakInc = () => {
    //     console.log('breakInc')
    //     const { paused, breakLen, session } = this.state
    //     if (paused){
    //         if (breakLen !== 60){
    //             this.setState({
    //                 breakLen: breakLen + 1
    //             })
    //             if (!session){
    //                 this.setState(prevState => {
    //                     return {
    //                         time: prevState.breakLen * 60 + 60
    //                     }
    //                 })
    //             }
    //         }
    //     }
    // }
    // seshDec = () => {
    //     console.log('seshDec')
    //     const { paused, seshLen, session } = this.state
    //     if (paused){
    //         if (seshLen !== 1){
    //             this.setState({
    //                 seshLen: seshLen - 1
    //             })
    //             if (session){
    //                 this.setState({
    //                     time: seshLen * 60 - 60
    //                 })
    //             }
    //         }
    //     }
    // }
    // seshInc = () => {
    //     console.log('seshInc')
    //     const { paused, seshLen, session } = this.state
    //     if (paused){
    //         if (seshLen !== 60){
    //             this.setState(prevState => {
    //                 return {
    //                     seshLen: prevState.seshLen + 1
    //                 }
    //             })
    //             if (session){
    //                 this.setState(prevState => {
    //                     return {
    //                         time: prevState.seshLen * 60
    //                     }
    //                 })
    //             }
    //         }
    //     }
    // }

        // handleSesh = (e) => {
    //     let val = e.currentTarget.value
    //     this.setLength(val, "seshLen", true)
    // }
    // handleBreak = (e) => {
    //     let val = e.currentTarget.value
    //         this.setLength(val, "breakLen", false)
    // }
    // setLength = (val, timerString, current ) => {
    //     const { paused, session } = this.state
    //     console.log(val,timerString, current, paused)
    //     if (!paused){
    //         return
    //     } else {
    //         if (session === current){
    //             if (val === '+'){
    //                 this.setState(prevState => {
    //                     if (prevState[timerString] === 60){
    //                         return
    //                     } else {
    //                         return {
    //                             [timerString]: prevState[timerString] + 1,
    //                             time: prevState[timerString] * 60 + 60
    //                         }
    //                     }
    //                 })
    //             }
    //             else if (val === '-'){
    //                 this.setState(prevState => {
    //                     if (prevState[timerString] === 1){
    //                         return
    //                     } else {
    //                         return {
    //                             [timerString]: prevState[timerString] - 1,
    //                             time: prevState[timerString] * 60 - 60
    //                         }
    //                     }
    //                 })
    //             }
    //         }
    //         else {
    //             if (val === '+'){
    //                 this.setState(prevState => {
    //                     if (prevState[timerString] === 60){
    //                         return
    //                     } else {
    //                         return {
    //                             [timerString]: prevState[timerString] + 1,
    //                         }
    //                     }
    //                 })
    //             }
    //             else if (val === '-'){
    //                 this.setState(prevState => {
    //                     if (prevState[timerString] === 1){
    //                         return
    //                     } else {
    //                         return {
    //                             [timerString]: prevState[timerString] - 1,
    //                         }
    //                     }
    //                 })
    //             }
    //         }
    //     }
    // }

  export default accurateInterval