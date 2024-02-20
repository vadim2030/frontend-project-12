import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import App from './components/App';
import resources from './locales/index.js';
import store from './store/store.js';
import { getUserLocalStore } from './utils/localStore.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const userData = getUserLocalStore();

  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider store={store}>
        <App userData={userData} />
      </ReduxProvider>
    </I18nextProvider>
  );
};

export default init;
