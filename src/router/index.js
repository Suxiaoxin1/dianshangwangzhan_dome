import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index.vue';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import CheckPhone from '@/components/signUp/CheckPhone.vue';
import InputInfo from '@/components/signUp/InputInfo.vue';
import SignUpDone from '@/components/signUp/SignUpDone.vue';
import GoodsList from '@/components/GoodsList.vue';
import GoodsDetail from '@/components/GoodsDetail.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import Order from '@/components/Order.vue';
import Pay from '@/components/Pay.vue';
import PayDone from '@/components/PayDone.vue';
import Freeback from '@/components/Freeback.vue';
import Home from '@/components/Home.vue';
import MyAddress from '@/components/home/MyAddress.vue';
import AddAddress from '@/components/home/AddAddress.vue';
import MyOrder from '@/components/home/MyOrder.vue';
import MyShoppingCart from '@/components/home/MyShoppingCart.vue';
import Merchant from '@/components/Merchant.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/Login', name: 'Login', component: Login },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp,
      children: [
        { path: '/', name: 'index', component: CheckPhone },
        { path: 'checkPhone', name: 'CheckPhone', component: CheckPhone },
        { path: 'inputInfo', name: 'InputInfo', component: InputInfo },
        { path: 'signUpDone', name: 'SignUpDone', component: SignUpDone }
      ]
    },
    { path: '/goodsList', name: 'GoodsList', component: GoodsList },
    { path: '/goodsDetail', name: 'GoodsDetail', component: GoodsDetail },
    { path: '/shoppingCart', name: 'ShoppingCart', component: ShoppingCart },
    { path: '/order', name: 'Order', component: Order },
    { path: '/pay', name: 'Pay', component: Pay },
    { path: '/payDone', name: 'PayDone', component: PayDone },
    { path: '/freeback', name: 'Freeback', component: Freeback },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        { path: '/', name: 'HomeIndex', component: MyOrder },
        { path: 'myAddress', name: 'MyAddress', component: MyAddress },
        { path: 'addAddress', name: 'AddAddress', component: AddAddress },
        { path: 'myOrder', name: 'MyOrder', component: MyOrder },
        { path: 'myShoppingCart', name: 'MyShoppingCart', component: MyShoppingCart }
      ]
    },
    { path: '/merchant', name: 'Merchant', component: Merchant }
  ]
});
