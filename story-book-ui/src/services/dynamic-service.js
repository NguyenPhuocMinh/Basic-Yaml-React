import { get, isEmpty } from 'lodash';
import {
  getSysRouterYaml,
  getComponentYaml,
  getTabsYaml,
  getDocsYaml,
  getDataModelYaml
} from '../utils';

const dynamicServices = {
  getSysRouters: () => {
    const sysRouter = getSysRouterYaml();
    const includes = get(sysRouter, 'includes', []);
    const routers = get(sysRouter, 'routers', []);
    // inject tabs to component
    const components = !isEmpty(includes) && includes.map((item) => {
      const data = dynamicServices.getComponent(item.path);
      const tabs = dynamicServices.getTabs(data.app);
      data.app = tabs;
      return data;
    });
    // mapper router with component
    const mapperRouters = mapperFactory(routers, components, 'component');

    sysRouter.routers = mapperRouters;
    return sysRouter;
  },
  getComponent: (path) => {
    return getComponentYaml(path);
  },
  getTabs: (appName) => {
    const apps = getTabsYaml(appName);
    const includes = get(apps, 'includes', []);
    const tabs = get(apps, 'tabs', []);
    // get docs
    const docs = !isEmpty(includes) && includes.map(value => {
      return dynamicServices.getDocuments(value.path);
    });
    // mapper name component with name in tabs
    const mapperTabs = mapperFactory(tabs, docs, 'doc');

    apps.tabs = mapperTabs;
    return apps;
  },
  getDocuments: (path) => {
    // call api server node
    return getDocsYaml(path);
  },
  getDataModel: () => {
    return getDataModelYaml();
  }
};

const mapperFactory = (dataMapper = [], dataInject = [], key = '') => {
  const mappers = !isEmpty(dataMapper) && dataMapper.map((value, index) => {
    value[key] = dataInject[index];
    return value;
  });
  return mappers;
};

export default dynamicServices;