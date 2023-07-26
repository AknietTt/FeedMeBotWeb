export const restaurants = [
  {
    id: 1,
    name: "Okadzaki",
    image:
      "https://proprikol.ru/wp-content/uploads/2021/01/kartinki-sushi-20.jpg",
  },
  {
    id: 2,
    name: "ШашлыкOff",
    image:
      "https://babushkinadacha.ru/wp-content/uploads/2016/12/1280x847_myaso-shashlyik.jpg",
  },
  {
    id: 3,
    name: "KFC",
    image:
      "https://avatars.mds.yandex.net/i?id=afa175c113887cb0d1378cc05d8dc4716787d50e-9183040-images-thumbs&n=13",
  },
];

const categories = [
  {
    id: 1,
    restaurantId: 1,
    category: ['Закуски', 'Салаты', 'Супы']
  },
  {
    id: 2,
    restaurantId: 2,
    category: ['Основные блюда', 'Десерты']
  },
  {
    id: 3,
    restaurantId: 3,
    category: ['Напитки', 'Коктейли', 'Вина']
  },
];

export default categories;

