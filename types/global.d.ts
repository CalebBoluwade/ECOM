interface Window {
  adsbygoogle?: unknown[];
  dataLayer: unknown[];
}

interface Specification {
  key: string;
  value: string;
}

interface IBrand {
  name: string;
  slug: string;
  image: string;
}

interface IProduct {
  name: string;
  slug: string;
  price: number;
  currency: string;
  quantity: number;
  description: string;
  categories: string[];
  manufacturer: string;
  warranty: string;
  isFeatured: boolean;
  reviews: Review[];
  specifications: Specification[];
  discountPercentage: number;
  images: string[];
  cartQuantity: number;
}

interface ProductQuery {
  // manufacturerId: mongoose.Types.ObjectId;
  $or?: Array<{
    [key: string]: any;
  }>;
  category?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  inStock?: boolean;
}

interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

type Review = {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  reviews: string;
};

interface IOrder {
  cartItems: IProduct[];
  paymentMethod: string;
  paymentResult: {
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    email: string;
  };
  VATPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: Date;
  deliveredAt: Date;
}

// interface CartItem extends IProduct {
//   cartQuantity: number;
// }

type IAddToCart = { product: IProduct; cartQuantity: number };

interface CartState {
  items: IProduct[];
  orders: IOrder[];
  wishlist: IProduct[];
  totalPrice: number;
}

interface DispatchProps {
  addToCart: (product: IAddToCart) => void;

  removeFromCart: (product: IProduct) => void;

  deleteItemFromCart: (product: IProduct) => void;

  addToWishlist: (product: IProduct) => void;

  removeFromWishlist: (product: IProduct) => void;
}

interface IStore {
  // _id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
  distance?: number;
  slug: string;
}
