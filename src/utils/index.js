export const navOptions = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "listing",
    label: "Store",
    path: "/product/listing/all-products",
  },
  {
    id: "category",
    label: "Category",
    subItems: [
      {
        id: "listingT-Shirts",
        label: "T-Shirts",
        path: "/product/listing/t-shirts",
      },
      {
        id: "listingShirts",
        label: "Shirts",
        path: "/product/listing/shirts",
      },
      {
        id: "listingJeans",
        label: "Jeans",
        path: "/product/listing/jeans",
      },
      {
        id: "listingPants",
        label: "Pants",
        path: "/product/listing/pants",
      },
      {
        id: "listingSales",
        label: "Sales",
        path: "/product/listing/sales",
      },
    ],
  },
];


export const adminNavOptions = [
  {
    id: "adminListing",
    label: "ManageProducts",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "AddProduct",
    path: "/admin-view/add-product",
  },
  {
    id: "adminAllOrders",
    label: "AllOrders",
    path: "/admin-view",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "Admin",
      },
      {
        id: "customer",
        label: "Customer",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "textarea",
    placeholder: "Enter description",
    label: "Description",
    componentType: "textarea",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "T-Shirts",
        label: "T-Shirts",
      },
      {
        id: "Shirts",
        label: "Shirts",
      },
      {
        id: "Jeans",
        label: "Jeans",
      },
      {
        id: "Pants",
        label: "Pants",
      },
    ],
  },
  {
    id: "deliveryInfo",
    type: "number",
    placeholder: "Enter deliveryInfo",
    label: "Quantity available",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Price Drop",
    componentType: "input",
  },
];

export const AvailableSizes = [
  {
    id: "m",
    label: "M",
  },
  {
    id: "l",
    label: "L",
  },
  {
    id: "xl",
    label: "XL",
  },
];

export const AvailableColors = [
  {
    id: "black",
    label: "Black",
  },
  {
    id: "white",
    label: "White",
  },
  {
    id: "gray",
    label: "Gray",
  },
  {
    id: "blue",
    label: "Blue",
  },
];

export const firebaseConfig = {
  apiKey: "AIzaSyCdU8Z9dCqXr1CBQjYBmI4U-f5v0HPZXik",
  authDomain: "se347-ecommerce.firebaseapp.com",
  projectId: "se347-ecommerce",
  storageBucket: "se347-ecommerce.appspot.com",
  messagingSenderId: "766658911862",
  appId: "1:766658911862:web:3a7e6515c66da7b7150957",
  measurementId: "G-WDXZYPM6QR"
};

export const firebaseStroageURL =
  "gs://se347-ecommerce.appspot.com";

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Enter your full name",
    label: "Full Name",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Enter your full address",
    label: "Address",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter your city",
    label: "City",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter your country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter your phone number",
    label: "Phone",
    componentType: "input",
  },
];
