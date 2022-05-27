import {
  Home,
  AddPhotoAlternate,
  AddShoppingCart,
  AutoAwesomeMotion,
  MenuBook,
  Dashboard,
  Android,
  Apple,
  LocalGroceryStore,
  BugReport,
  PersonAdd,
  Assessment,
  Add,
  PendingActions,
  PowerSettingsNew,
  RecentActors
} from '@mui/icons-material';

const registerIcons = {
  Dashboard: () => <Dashboard />,
  Home: () => <Home />,
  AddPhotoAlternate: () => <AddPhotoAlternate />,
  AddShoppingCart: () => <AddShoppingCart />,
  MenuBook: () => <MenuBook />,
  AutoAwesomeMotion: () => <AutoAwesomeMotion />,
  Android: () => <Android />,
  Apple: () => <Apple />,
  LocalGroceryStore: () => <LocalGroceryStore />,
  BugReport: () => <BugReport />,
  PersonAdd: () => <PersonAdd />,
  Assessment: () => <Assessment />,
  Add: () => <Add sx={{ width: 36, height: 36 }} />,
  PendingActions: () => <PendingActions sx={{ width: 36, height: 36 }} />,
  PowerSettingsNew: () => <PowerSettingsNew />,
  RecentActors: () => <RecentActors />
};

export default registerIcons;
