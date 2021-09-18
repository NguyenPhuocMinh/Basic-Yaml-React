import {
  GridCustom,
  PaperCustom,
  ButtonCustom
} from '../material-ui-custom';
import {
  Home,
  Order,
  Product
} from '../views';

const registerComponents = {
  // components
  grid: (props) => <GridCustom {...props} />,
  paper: (props) => <PaperCustom {...props} />,
  button: (props) => <ButtonCustom {...props} />,
  // views
  home: (props) => <Home {...props} />,
  order: (props) => <Order {...props} />,
  product: (props) => <Product {...props} />
};

export default registerComponents;