import React, { Component } from "react";
import Img1 from "./logo.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        fullName: "Youssef Hadi",
        bio: "I'm a web developer to be",
        imgSrc: Img1,
        profession: "Inside Sales Associate",
      },
      shows: true,
      interval: 0,
    };
    this.startTime = Date.now();
    this.intervalId = null;
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.interval !== prevState.interval) {
      // Perform actions when 'interval' state has changed
      // For example, you can do something here when the interval updates
      // console.log("Interval updated:", this.state.interval);
    }
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
      this.setState({ interval: elapsedTime });
    }, 1000);
  }

  stopInterval() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  handleClick() {
    this.setState((prevState) => ({
      shows: !prevState.shows,
      interval: 0,
    }));

    if (this.state.shows) {
      this.startTime = Date.now(); // Reset the startTime when showing the component
      this.startInterval();
    } else {
      this.stopInterval();
    }
  }

  render() {
    const { fullName, bio, imgSrc, profession } = this.state.person;
    const { shows } = this.state;

    return (
      <div>
        {shows ? (
          <>
            <h1>{fullName}</h1>
            <img src={imgSrc} alt="Profile" />
            <p>{bio}</p>
            <p>Profession: {profession}</p>
            <p>Interval since mount: {this.state.interval} seconds</p>
          </>
        ) : (
          <p>Currently not showing</p>
        )}
        <button onClick={() => this.handleClick()}>Toggle Show</button>
      </div>
    );
  }
}

export default App;
