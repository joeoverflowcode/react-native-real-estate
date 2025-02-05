import { ID } from "react-native-appwrite";
import { databases, config } from "./appwrite";
import {
  agentImages,
  galleryImages,
  propertiesImages,
  reviewPeople,
  realAgents,
  reviewSentences
} from "./data";

const COLLECTIONS = {
  AGENT: config.agentsCollectionId,
  REVIEWS: config.reviewsCollectionId,
  GALLERY: config.galleriesCollectionId,
  PROPERTY: config.propertiesCollectionId,
};

const propertyTypes = [
  "House",
  "Townhomes",
  "Condos",
  "Duplexes",
  "Studios",
  // "Villa",
  "Apartments",
  "Others",
];

const facilities = [
  "Laundry",
  "Parking",
  "Gym",
  "Pool",
  "Pets",
];

const streetNames = [
  "Elm Street",
  "Mockingbird Lane",
  "Maple Avenue",
  "Cedar Road",
  "Oak Drive",
  "Willow Way",
  "Birch Boulevard",
  "Sycamore Street",
  "Aspen Lane",
  "Magnolia Court"
];

const city =[
  "Dallas",
  "Frisco",
  "Irving",
  "Carrollton",
  "Plano",
  "Richardson",
  "Prosper",
  "Denton",
  "Fort-Worth"
]

const minPrice = 400000;
const maxPrice = 900000;

const getValidPrice = () => {
  let price;
  do {
    price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
  } while (price % 100 !== 0 && price % 100 !== 90);
  return price;
};

function getRandomSubset<T>(
  array: T[],
  minItems: number,
  maxItems: number
): T[] {
  if (minItems > maxItems) {
    throw new Error("minItems cannot be greater than maxItems");
  }
  if (minItems < 0 || maxItems > array.length) {
    throw new Error(
      "minItems or maxItems are out of valid range for the array"
    );
  }

  // Generate a random size for the subset within the range [minItems, maxItems]
  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

  // Create a copy of the array to avoid modifying the original
  const arrayCopy = [...array];

  // Shuffle the array copy using Fisher-Yates algorithm
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }

  // Return the first `subsetSize` elements of the shuffled array
  return arrayCopy.slice(0, subsetSize);
}

// Shuffle Reviews Array
export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

async function seed() {
  try {
    // Clear existing data from all collections
    for (const key in COLLECTIONS) {
      const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
      const documents = await databases.listDocuments(
        config.databaseId!,
        collectionId!
      );
      for (const doc of documents.documents) {
        await databases.deleteDocument(
          config.databaseId!,
          collectionId!,
          doc.$id
        );
      }
    }

    console.log("Cleared all existing data.");

    // Seed Agents
    // const agents = [];
    // for (let i = 1; i <= 5; i++) {
    //   const agent = await databases.createDocument(
    //     config.databaseId!,
    //     COLLECTIONS.AGENT!,
    //     ID.unique(),
    //     {
    //       name: `Agent ${i}`,
    //       email: `agent${i}@example.com`,
    //       avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
    //     }
    //   );
    //   agents.push(agent);
    // }
    // console.log(`Seeded ${agents.length} agents.`);

        // Seed REAL Agents
const agents = []
for (const realAgent of realAgents) {
  const agent = await databases.createDocument(
    config.databaseId!,
    COLLECTIONS.AGENT!,
    ID.unique(),
    {
      name: realAgent.name,
      email: realAgent.email,
      avatar: realAgent.avatar,
    }
  )
  agents.push(agent)
}
console.log(`Seeded ${agents.length} agents.`);


    // Seed Reviews
    const reviews = [];
    for (let i = 1; i <= 16; i++) {
      const randomReview = reviewSentences[Math.floor(Math.random() * reviewSentences.length)]
      const randomPerson = reviewPeople[Math.floor(Math.random() * reviewPeople.length)]
      const review = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.REVIEWS!,
        ID.unique(),
        {
          name: randomPerson.name,
          avatar: randomPerson.avatar,
          review: randomReview,
          rating: Math.floor(Math.random() * 5) + 1, // Rating between 1 and 5
        }
      );
      reviews.push(review);
    }
    console.log(`Seeded ${reviews.length} reviews.`);

    // Seed Galleries
    const galleries = [];
    for (const image of galleryImages) {
      const gallery = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.GALLERY!,
        ID.unique(),
        { image }
      );
      galleries.push(gallery);
    }

    console.log(`Seeded ${galleries.length} galleries.`);

    // Seed Properties
    for (let i = 1; i <= 16; i++) {
      const assignedAgent = agents[Math.floor(Math.random() * agents.length)];

      const assignedReviews = getRandomSubset(reviews, 5, 7); // 5 to 7 reviews
      const assignedGalleries = getRandomSubset(galleries, 3, 8); // 3 to 8 galleries

      const selectedFacilities = facilities
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * facilities.length) + 1);

      const image =
        propertiesImages.length - 1 >= i
          ? propertiesImages[i]
          : propertiesImages[
              Math.floor(Math.random() * propertiesImages.length)
            ];
            const description = shuffleArray(reviewSentences)
            .slice(0, Math.floor(Math.random() * 4) + 2)
            .join(" ");

            const property = await databases.createDocument(
              
              config.databaseId!,
              COLLECTIONS.PROPERTY!,
              ID.unique(),
              {
                name: `Property ${i}`,
                type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
                description: description,
                address: `${Math.floor(Math.random() * 9999) + 1} ${
                  streetNames[Math.floor(Math.random() * streetNames.length)]
                }, ${city[Math.floor(Math.random() * city.length)]}, Texas`,
                geolocation: `192.168.1.${i}, 192.168.1.${i}`,
                // price: Math.floor((Math.random() * (maxPrice - minPrice + 1) + minPrice) / 10) * 10,
                price:getValidPrice(),
                area: Math.floor(Math.random() * 3000) + 500,
                bedrooms: Math.floor(Math.random() * 5) + 1,
                bathrooms: Math.floor(Math.random() * 5) + 1,
                rating: Math.floor((Math.random() * 15) + 35) / 10,
                facilities: selectedFacilities,
                image: image,
                agent: assignedAgent.$id,
                reviews: assignedReviews.map((review) => review.$id),
                gallery: assignedGalleries.map((gallery) => gallery.$id),
              }
            );

      console.log(`Seeded property: ${property.name}`);
    }

    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

export default seed;