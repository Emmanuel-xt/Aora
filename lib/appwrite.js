import { Account, Client, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwi=rite.io.v1",
  platform: "com.emma.aora",
  projectId: "666f354600370d86e190",
  databaseId: "666f373e0006a14d9c19",
  userCollectionId: "666f3762003c5803f85f",
  videoCollectionId: "666f378c002b50dac245",
  storageId: "666f397300013f65a25a",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);

// Register User
export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
