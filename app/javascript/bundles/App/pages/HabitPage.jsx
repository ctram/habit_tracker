import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';

class Habit extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  delete() {

  }

  render() {
    const { habit: { title } } = this.props;

    return <div>
      <h1>
        {title}
      </h1>

      <div className="my-5 p-5">
        <button submit="button" className="btn btn-danger" onClick={this.delete}>
          Delete
        </button>

        <div className="card my-5">
          <div className="card-body">
            <h5 className="card-title">Calendar Here</h5>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(Habit);
