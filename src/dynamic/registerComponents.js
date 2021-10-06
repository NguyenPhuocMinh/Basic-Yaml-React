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
  Product,
} from '../views';
import Monsters from '../views/Ancients/Monsters';
import Vampires from '../views/Ancients/Vampires';

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
  vampires: (props) => {
    const { hasList, hasCreate } = props;
    switch (true) {
      case hasList:
        // eslint-disable-next-line react/jsx-pascal-case
        return <Vampires.list {...props} />
      case hasCreate:
        // eslint-disable-next-line react/jsx-pascal-case
        return <Vampires.create {...props} />
      default:
        return <> </>
    }
  },
  // forms
  form: (props) => <DynamicMuiForm {...props} />,
  text: (props) => <TextFieldHelper {...props} />,
  // menu
  menu: (props) => <SubMenuHelper {...props} />,
  menuItem: (props) => <MenuItemHelper {...props} />
};

export default registerComponents;