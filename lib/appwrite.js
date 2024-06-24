import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
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
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, username, password) => {
  try {
    console.log("submitting");
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    throw new Error();
  }
};

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getALlPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc(`$createdAt`, Query.limit(2))]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search(`tiitle`, query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserPost = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal(`creator`, userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}
export async function uploadFile(file, type) {
  if (!file) return;
  console.log('upload function fired')
  console.log('file' , file) 
  

  // const { mimeType, ...rest } = file;
  const asset = {
    name:file.fileName,
    type: file.type,
    size: file.filesize,
    uri:file.uri
  };

  try {
    console.log('Assets =' ,asset)
    
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    console.log('Uploaded file' )
    console.log('Uploaded file' , uploadedFile)

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    console.log('fileUrl =' , fileUrl)
    return fileUrl;
  } catch (error) {
    console.log('ERorror with upload catch' , error)
    throw new Error(error);
  }
}




export const createVideo = async (form) => {
  console.log('form' , form.thumnail.uri)
  console.log('form' , form.video.uri)
  const { thumnailUri, videoUri } = form
  console.log(thumnailUri , videoUri)
  try {
    const { thumnailUrl, videoUrl } = await Promise.all([
      uploadFile(form.thumnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumnail: thumnailUrl,
        video: videoUrl,
        prompt : form.prompt,
        creator : form.userId
      }
    );
    console.log('new post =>' , newPost)
    return newPost
  } catch (error) {
    throw new Error(error);
  }
};
