import PropTypes from 'prop-types';
import React from 'react';
import HabitWeekCard from '../components/HabitWeekCard';

class HabitsIndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { habits } = this.props;

    let inner = 'No habits. Go ahead and create one.';

    if (habits.length > 1) {
      inner = habits.map(habit => {
        <HabitWeekCard habit={habit} />
      });
    }

    return (
        <div className="d-flex flex-column align-items-center">
          {inner}
        </div>
    );
  }
}

HabitsIndexPage.defaultProps = {
  habits: []
};

export default HabitsIndexPage;
