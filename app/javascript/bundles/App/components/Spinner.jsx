import React from 'react';

export default class Spinner extends React.Component {
  render() {
    return <div className="h-100 w-100 position-fixed z-level-1">
      <div className="h-100 w-100 semi-transparent-backdrop z-level-1 position-absolute" />
      <div className="d-flex justify-content-center align-items-center h-100 w-100 z-level-2 position-absolute">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  }
}
