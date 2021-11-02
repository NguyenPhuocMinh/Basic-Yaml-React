import { useTranslation } from 'react-i18next';

const useTranslate = () => {
  const { t: translate } = useTranslation();

  return translate;
};

export default useTranslate;