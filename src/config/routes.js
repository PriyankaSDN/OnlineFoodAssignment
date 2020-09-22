// @ts-nocheck
/* eslint-disable module-resolver/use-alias */
import withRedux from '@hoc/withRedux';
import { lazy } from 'react';
import { Navigation } from 'react-native-navigation';
import Loader from '@components/common/screenLoader';

const SignIn = lazy(() => import('@containers/auth/signIn'));
const SignUp = lazy(() => import('@containers/auth/signUp'));
const Dashboard = lazy(() => import('@containers/dashboard'));
const Merchant = lazy(() => import('@containers/dashboard/merchant'));
const SubCategory = lazy(() => import('@containers/dashboard/subCategory'));
const CategoryDetails = lazy(() => import('@containers/dashboard/categoryDetails'));
const ViewCart = lazy(() => import('@containers/dashboard/viewCart'));

const Cart = lazy(() => import('@containers/dashboard/cart'));

export const registerScreens = (store, Provider) => {
  const withReduxStore = withRedux(store);
  Navigation.registerComponentWithRedux(
    'Loader',
    () => Loader,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux('SignIn', withReduxStore(SignIn));
  Navigation.registerComponentWithRedux('SignUp', withReduxStore(SignUp));
  Navigation.registerComponentWithRedux('Dashboard', withReduxStore(Dashboard));
  Navigation.registerComponentWithRedux('Merchant', withReduxStore(Merchant));
  Navigation.registerComponentWithRedux('SubCategory', withReduxStore(SubCategory));
  Navigation.registerComponentWithRedux('CategoryDetails', withReduxStore(CategoryDetails));
  Navigation.registerComponentWithRedux('ViewCart', withReduxStore(ViewCart));

  Navigation.registerComponentWithRedux('Cart', withReduxStore(Cart));
};
