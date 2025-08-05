import { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const StatisticLine = (props) => {
  return (
    <div>
      {props.name} {props.score}
    </div>
  );
};

const Statistics = (props) => {
  if (props.ratings.scores[3] === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tr>
        <td>
          <StatisticLine
            name={props.ratings.names[0]}
            score={props.ratings.scores[0]}
          />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine
            name={props.ratings.names[1]}
            score={props.ratings.scores[1]}
          />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine
            name={props.ratings.names[2]}
            score={props.ratings.scores[2]}
          />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine
            name={props.ratings.names[3]}
            score={props.ratings.scores[3]}
          />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine
            name={props.ratings.names[4]}
            score={props.ratings.scores[4]}
          />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine
            name={props.ratings.names[5]}
            score={props.ratings.scores[5]}
          />
        </td>
      </tr>
    </table>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const headers = ["Give Feedback", "Statistics"];
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const positiveRatings = `${(good / all) * 100} %`;

  const ratings = {
    names: [
      "good: ",
      "neutral: ",
      "bad: ",
      "total: ",
      "average: ",
      "positive: ",
    ],
    scores: [good, neutral, bad, all, average, positiveRatings],
  };

  const handleGood = () => {
    const newGood = good + 1;
    const newAll = all + 1;
    setGood(newGood);
    setAll(newAll);
    setAverage((newGood - bad) / newAll);
  };

  const handleNeutral = () => {
    const newAll = all + 1;
    setAll(newAll);
    setNeutral(neutral + 1);
    setAverage((good - bad) / newAll);
  };

  const handleBad = () => {
    const newBad = bad + 1;
    const newAll = all + 1;
    setAll(newAll);
    setBad(newBad);
    setAverage((good - newBad) / newAll);
  };

  return (
    <div>
      <Header text={headers[0]} />
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Header text={headers[1]} />
      <Statistics ratings={ratings} />
    </div>
  );
};

export default App;
