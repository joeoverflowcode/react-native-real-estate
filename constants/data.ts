import icons from "./icons";
import images from "./images";

export const cards = [
  {
    title: "Card 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.house,
  },
  {
    title: "Card 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    category: "house",
    image: images.interior,
  },
  {
    title: "Card 3",
    location: "Location 3",
    price: "$300",
    rating: 2,
    category: "flat",
    image: images.house,
  },
  {
    title: "Card 4",
    location: "Location 4",
    price: "$400",
    rating: 5,
    category: "villa",
    image: images.interior,
  },
];

export const featuredCards = [
  {
    title: "Featured 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    image: images.house,
    category: "house",
  },
  {
    title: "Featured 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    image: images.interior,
    category: "flat",
  },
];

export const categories = [
  { title: "All", category: "All" },
  { title: "Houses", category: "House" },
  { title: "Townhomes", category: "Townhomes" },
  { title: "Condos", category: "Condos" },
  { title: "Studios", category: "Studios" },
  { title: "Duplexes", category: "Duplexes" },
  // { title: "Villas", category: "Villa" },
  { title: "Apartments", category: "Apartments" },
  { title: "Others", category: "Others" },
];

export const settings = [
  {
    title: "My Bookings",
    icon: icons.calendar,
  },
  {
    title: "Payments",
    icon: icons.wallet,
  },
  {
    title: "Profile",
    icon: icons.person,
  },
  {
    title: "Notifications",
    icon: icons.bell,
  },
  {
    title: "Security",
    icon: icons.shield,
  },
  {
    title: "Language",
    icon: icons.language,
  },
  {
    title: "Help Center",
    icon: icons.info,
  },
  {
    title: "Invite Friends",
    icon: icons.people,
  },
];

export const facilities = [
  {
    title: "Laundry",
    icon: icons.laundry,
  },
  {
    title: "Parking",
    icon: icons.carPark,
  },
  // {
  //   title: "Sports Center",
  //   icon: icons.run,
  // },
  // {
  //   title: "Cutlery",
  //   icon: icons.cutlery,
  // },
  {
    title: "Gym",
    icon: icons.dumbell,
  },
  {
    title: "Pool",
    icon: icons.swim,
  },
  // {
  //   title: "Wifi",
  //   icon: icons.wifi,
  // },
  {
    title: "Pets",
    icon: icons.dog,
  },
];

export const gallery = [
  {
    id: 1,
    image: images.house,
  },
  {
    id: 2,
    image: images.interior,
  },
  {
    id: 3,
    image: images.house,
  },
  {
    id: 4,
    image: images.interior,
  },
  {
    id: 5,
    image: images.house,
  },
  {
    id: 6,
    image: images.interior,
  },
];
