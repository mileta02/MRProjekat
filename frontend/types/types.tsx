export type RootStackParamList = {
  cart: undefined;
  home: undefined;
  product: undefined;
  profile: undefined;
  login: undefined;
};

type ImageType = {
  url: string;
};

export type ProductType = {
  _id: string;
  images: ImageType[];
  name: string;
  price: number;
  description: string;
  stock: number;
};

export const productData: ProductType[] = [
  {
    price: 300,
    name: "MacBook M3",
    _id: "1",
    images: [
      {
        url: "https://picsum.photos/400/300",
      },
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    stock: 4,
  },
  {
    price: 500,
    name: "Rolex Daytona",
    _id: "2",
    images: [
      {
        url: "https://picsum.photos/401/300",
      },
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

    stock: 3,
  },
];
