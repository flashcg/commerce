import { IContentDocument } from "@nuxt/content/types/content";
export {
  State,
  Release,
  ReleaseFetch,
  HandleSetting,
  ContentDoc,
  SectionConfig,
  PaddleTransactionsItem,SubscriptionPlans,Product,
  PaddleTransactionsResponse
};

interface State {
  locale: string;
  localData: {
    productData: object[];
    defaultData: {
      handleSetting: HandleSetting[];
      [key: string]: string | object | [];
    };
  };
  tutorialList: object[];
  tutorialNum: number;
  youtubeData: object[];
  ownedInfo: object[];
  paddleData: {
    products: Product[]|undefined;
    subscriptionPlans: SubscriptionPlans[]|undefined;
  };
  products:ProductHandled[]
}
interface HandleSetting {
  handleName: string;
  model: string;
  slug: string;
}
interface Release {
  version: string;
  date: string;
  model?: string;
  list: string[];
}
interface SectionConfig {
  name: string;
  title: string;
  paddingY: number;
  bar: boolean;
  additionClass: string;
  sectionClass: string;
  items?: object[];
  icon?: object[];
}
interface PaddleTransactionsItem {
  order_id: string;
  checkout_id: string;
  amount: string;
  currency: string;
  status: string;
  created_at: string;
  passthrough: null;
  product_id: number;
  is_subscription: boolean;
  is_one_off: boolean;
  subscription: {
    subscription_id: number;
    status: string;
  };
  user: {
    user_id: number;
    email: string;
    marketing_consent: boolean;
  };
  receipt_url: string;
}
interface PaddleTransactionsResponse {
  success: boolean;
  response: PaddleTransactionsItem[] | [];
}
interface ReleaseFetch extends IContentDocument {
  model: string;
  release: Release[];
}
interface ContentDoc extends IContentDocument {
  head: { title: string; meta: any };
  [key: string]: any;
}

interface SubscriptionPlans {
  id: number;
  name: string;
  billing_type: string;
  billing_period: number;
  initial_price: {
    USD: string;
  };
  recurring_price: {
    USD: string;
  };
  trial_days: number;
}
interface Product {
  id: number;
  name: string;
  description: string;
  base_price: number;
  sale_price: number | null;
  currency: string;
  screenshots: any[];
  icon: string;
}
interface ProductHandled extends Product{
  subscriptions:SubscriptionPlans[]
}