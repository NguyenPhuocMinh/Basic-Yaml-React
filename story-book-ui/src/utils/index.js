import yaml from 'yamljs';
// components
import homeComponentYaml from '../yaml-file/components/home/home-component.yaml';
import orderComponentYaml from '../yaml-file/components/order/order-component.yaml';
import productComponentYaml from '../yaml-file/components/product/product-component.yaml';
// tabs
import dataModelYaml from '../yaml-file/datamodel/datamodel.yaml';
import orderCanceledYaml from '../yaml-file/docs/order/doc-canceled.yaml';
// docs order
import orderDeliveredYaml from '../yaml-file/docs/order/doc-delivered.yaml';
import orderOrderedYaml from '../yaml-file/docs/order/doc-ordered.yaml';
// docs product
import productCarYaml from '../yaml-file/docs/product/doc-car.yaml';
import productFoodYaml from '../yaml-file/docs/product/doc-food.yaml';
// datamodel
import routersYaml from '../yaml-file/routers/sys-routers.yaml';
import orderTabsYaml from '../yaml-file/tabs/order/order-tabs.yaml';
import productTabsYaml from '../yaml-file/tabs/product/product-tabs.yaml';

const parseYamlToJson = (yamlFile) => {
  const doc = yaml.load(yamlFile);
  return doc;
};

const getSysRouterYaml = () => parseYamlToJson(routersYaml);

const getComponentYaml = (path) => {
  switch (path) {
    case '/component/home':
      return parseYamlToJson(homeComponentYaml);
    case '/component/order':
      return parseYamlToJson(orderComponentYaml);
    case '/component/product':
      return parseYamlToJson(productComponentYaml);
    default:
      return {};
  }
};

const getTabsYaml = (appName) => {
  switch (appName) {
    case 'order_tabs':
      return parseYamlToJson(orderTabsYaml);
    case 'product_tabs':
      return parseYamlToJson(productTabsYaml);
    default:
      return {};
  }
};

const getDocsYaml = (path) => {
  switch (path) {
    // orders
    case '/tabs/ordered':
      return parseYamlToJson(orderOrderedYaml);
    case '/tabs/delivered':
      return parseYamlToJson(orderDeliveredYaml);
    case '/tabs/canceled':
      return parseYamlToJson(orderCanceledYaml);
    // products
    case '/tabs/car':
      return parseYamlToJson(productCarYaml);
    case '/tabs/food':
      return parseYamlToJson(productFoodYaml);
    default:
      return {};
  }
};

const getDataModelYaml = () => yaml.load(dataModelYaml);

export {
  parseYamlToJson,
  getSysRouterYaml,
  getComponentYaml,
  getTabsYaml,
  getDocsYaml,
  getDataModelYaml
};
