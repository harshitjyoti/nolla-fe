import React, { Component } from "react";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Tweet } from "./Components/Tweet";
import { LabelAndTextArea } from "./Components/LabelAndTextArea";
import { CharacterCounter } from "./Components/CharacterCount";
import { SubmitAndResetButtons } from "./Components/CreateAndResetButtons";
import "./App.css";

const GET_TWEETS_URL = "http://localhost:8080/tweets/users";
const POST_TWEET_URL = "http://localhost:8080/tweets";

class App extends Component {
  state = {
    tweet: "",
    tweets: [],
    charCounter: 0,
    limit: 10,
    color: "#83F57F",
  };

  formatDate = dateString => {
    const date = new Date(dateString)
    return date.getDate()
  }

  getTweets = () => {
    fetch(GET_TWEETS_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({ tweets: res });
      })
      .catch(() => alert("There is an error"));
  };

  postTweet = () =>
    fetch(POST_TWEET_URL, {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({

        "user_id": 1,
        "twt_content": "Second tweet"
    })
    })
      .then((response) => {
        if(response.ok) {
          this.setState({ 
            tweets: [
              {twt_content : this.state.tweet}
,              ...this.state.tweets, 
            ]});
          this.handleReset()
        }
        else {
          alert("There is an error")
          this.handleReset()
        }
      })
      .catch(() => {
        this.handleReset()
        alert("There is an error")
      });

  handleOnChange = ({ target }) => {
    const { value } = target;
    let color = "#83F57F";
    if (this.state.charCounter > this.state.limit - 1) {
      this.setState({
        color: "red",
      });
      alert("Warning! Maximum characters avaliable exceeded!");
    } else if (this.state.charCounter > this.state.limit / 2 - 1) {
      this.setState({
        color: "yellow",
        tweet: value,
        charCounter: value.length,
      });
    } else
      this.setState({
        tweet: value,
        charCounter: value.length,
        color,
      });
  };

  handleOnClick = () => {
    this.postTweet()
  };

  handleReset = () => {
    this.setState({
      tweet: "",
    });
  };

  componentDidMount() {
    this.getTweets();
  }

  render() {
    return (
      <div className="Main-design-body">
        <Header name="NOLLA TWITTER" />
        <LabelAndTextArea
          onChange={this.handleOnChange}
          labelValue="Whats on your mind"
          textValue={this.state.tweet}
        />
        <br />
        <CharacterCounter
          counter={this.state.charCounter}
          limit={this.state.limit}
        />
        <SubmitAndResetButtons
          submitLabel="Submit"
          resetLabel="Reset"
          handleSubmit={this.handleOnClick}
          handleReset={this.handleReset}
          hideReset
        />
        {this.state.tweets.map((tweet, index) => (
          <Tweet key={index} tweet={tweet.content_tweet} date={formatDate(tweet.created_tweet)} />
        ))}

        <Footer copyright={"Copyrighted by "} company={"Mc Fluffn' Burgers."} />
      </div>
    );
  }
}
export default App;
