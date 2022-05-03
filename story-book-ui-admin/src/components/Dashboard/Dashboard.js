import { Fragment } from 'react';
import { NotificationBootStrap } from 'story-bootstrap';
import Welcome from './Welcome';
import Report from './Report';
import Chart from './Chart';
import QuickReport from './QuickReport';

const DashBoard = () => {
  return (
    <Fragment>
      <Welcome />
      <Report />
      <Chart />
      <QuickReport />
      <NotificationBootStrap />
    </Fragment>
  );
};

export default DashBoard;
