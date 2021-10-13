import Vampires from '../views/Ancients/Vampires';
import Monsters from '../views/Ancients/Monsters';

const resources = [
  {
    name: 'vampire_page',
    basePath: '/vampires',
    ...Vampires
  },
  {
    name: 'monster_page',
    basePath: '/monsters',
    ...Monsters
  },
];

export default resources;