let conf = {
    appwriteID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_PROJECT_URL),
    appwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf