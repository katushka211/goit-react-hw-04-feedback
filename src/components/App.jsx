import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Section } from './Section/Section';
import { FeedbackButtons } from './Feedback/Feedback';
import { StatisticsInfo } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbacks = { good, neutral, bad };
  const values = Object.keys(feedbacks);

  const handleIncrement = value => {
    if (value === 'good') {
      setGood(prevValue => prevValue + 1);
    }
    if (value === 'neutral') {
      setNeutral(prevValue => prevValue + 1);
    }
    if (value === 'bad') {
      setBad(prevValue => prevValue + 1);
    }
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbacks;
    return good + neutral + bad;
  };

  const totalFeedback = countTotalFeedback();

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedbacks;
    return Math.round((good / totalFeedback) * 100);
  };

  return (
    <>
      <GlobalStyle />
      <Section title="Please live feedback">
        <FeedbackButtons options={values} onLeaveFeedback={handleIncrement} />
      </Section>
      <Section title="Statistics">
        {totalFeedback !== 0 ? (
          <StatisticsInfo
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleIncrement = value => {
//     this.setState(prevState => {
//       return { [value]: prevState[value] + 1 };
//     });
//   };

//   countTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;
//     return good + neutral + bad;
//   };

//   countPositiveFeedbackPercentage = () => {
//     const { good } = this.state;
//     return Math.round((good / this.countTotalFeedback()) * 100);
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const values = Object.keys(this.state);
//     const totalFeedback = this.countTotalFeedback();
//     return (
//       <>
//         <GlobalStyle />
//         <Section title="Please live feedback">
//           <FeedbackButtons
//             options={values}
//             onLeaveFeedback={this.handleIncrement}
//           />
//         </Section>
//         <Section title="Statistics">
//           {totalFeedback !== 0 ? (
//             <StatisticsInfo
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={totalFeedback}
//               positivePercentage={this.countPositiveFeedbackPercentage()}
//             />
//           ) : (
//             <Notification message="There is no feedback" />
//           )}
//         </Section>
//       </>
//     );
//   }
// }
