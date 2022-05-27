import { Fragment, useEffect } from 'react';
import { NotificationBootStrap } from 'story-bootstrap';
import Welcome from './Welcome';
import Report from './Report';
import Chart from './Chart';
import QuickReport from './QuickReport';
import News from './News';
import { httpClientRestProvider } from '../../services';

const DashBoard = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await httpClientRestProvider.get('/boards');
      console.log("🚀 ~ file: Dashboard.js ~ line 16 ~ fetchData ~ res", res)
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Welcome />
      <Report />
      <Chart />
      <QuickReport />
      <News />
      <NotificationBootStrap />
    </Fragment>
  );
};

export default DashBoard;
