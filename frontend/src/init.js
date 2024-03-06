import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';
import App from './components/App';
import resources from './locales/index.js';
import store from './store/store.js';
import { getUserLocalStore } from './utils/localStore.js';
import FilterProfanityProvider from './hoc/FilterProfanityProvider.js';

const init = async () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: process.env.REACT_APP_ENVIRONMENT,
  };
  const rollbar = new Rollbar(rollbarConfig);
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const userData = getUserLocalStore();
  if (process.env.REACT_APP_ROLLBAR_TOKEN) {
    return (
      <RollbarProvider instance={rollbar}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <ReduxProvider store={store}>
              <FilterProfanityProvider>
                <App userData={userData} />
              </FilterProfanityProvider>
            </ReduxProvider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    );
  }
  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <ReduxProvider store={store}>
          <FilterProfanityProvider>
            <App userData={userData} />
          </FilterProfanityProvider>
        </ReduxProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
};

export default init;
