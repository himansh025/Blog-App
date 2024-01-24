// this file includes all environment variables

const config = {
    appwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteProjectURL : String(import.meta.env.VITE_APPWRITE_PROJECT_URL),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export const {appwriteBucketID, appwriteCollectionID, appwriteDatabaseID, appwriteProjectID, appwriteProjectURL} = config