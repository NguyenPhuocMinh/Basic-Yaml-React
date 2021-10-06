import {
  GridHelper,
  PaperHelper,
  ButtonHelper,
  TextFieldHelper,
  SubMenuHelper,
  MenuItemHelper
} from '../material-helpers';
import {
  Home,
  Order,
  Product
} from '../views';
// forms
import { DynamicMuiForm } from '../common';

const registerComponents = {
  // components
  grid: (props) => <GridHelper {...props} />,
  paper: (props) => <PaperHelper {...props} />,
  button: (props) => <ButtonHelper {...props} />,
  // views
  home: (props) => <Home {...props} />,
  order: (props) => <Order {...props} />,
  product: (props) => <Product {...props} />,
  // forms
  form: (props) => <DynamicMuiForm {...props} />,
  text: (props) => <TextFieldHelper {...props} />,
  // menu
  menu: (props) => <SubMenuHelper {...props} />,
  menuItem: (props) => <MenuItemHelper {...props} />
};

export default registerComponents;