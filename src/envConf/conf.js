const conf = {
    APPWRITE_ID: String(import.meta.env.VITE_AW_PROJECT_ID),
    APPWRITE_URL: String(import.meta.env.VITE_AW_PROJECT_URL),
    APPWRITE_DB_ID: String(import.meta.env.VITE_AW_DB_ID),
    APPWRITE_COLLECTION_ID: String(import.meta.env.VITE_AW_COLLECTION_ID),
    APPWRITE_BUCKET_ID: String(import.meta.env.VITE_AW_BUCKET_ID)
};

export const {APPWRITE_BUCKET_ID, APPWRITE_COLLECTION_ID, APPWRITE_DB_ID, APPWRITE_ID, APPWRITE_URL} = conf