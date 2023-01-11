import Layout from '../components/Layout';
import '../styles/globals.css';
import store from '../redux/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <div className="mt-[100px]">
          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  );
}
