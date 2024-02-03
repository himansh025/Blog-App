import { Client, Databases, ID, Storage} from "appwrite";
import { APPWRITE_BUCKET_ID, APPWRITE_COLLECTION_ID, APPWRITE_DB_ID, APPWRITE_ID, APPWRITE_URL } from "../envConf/conf";

class AppwriteService{
    client = new Client;
    database;
    bucket;

    constructor (){
        this.client
            .setProject(APPWRITE_ID)
            .setEndpoint(APPWRITE_URL)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // methods for appwrite service

    //createPost
    async createPost({slug, title, content, isPublic, imageFile, userID, userName}){
        try {
            const postImageData = await this.uploadImage(imageFile)
            try {
                if(postImageData){
                    const postImage = postImageData.$id
                    return await this.database.createDocument(
                        APPWRITE_DB_ID,
                        APPWRITE_COLLECTION_ID,
                        slug,
                        {
                            title, 
                            content, 
                            isPublic, 
                            postImage, 
                            userID, 
                            userName
                        }
                )
                }
            } catch (error) {
                console.log("Error : Errow while creating post :: ", error)
            }
        } catch (error) {
            console.log("Error : Error while creating account :: ", error)
        }
    }

    //updatePost
    async updatePost(slug, imageFile=null, {title, content, isPublic, postImage, userID, userName}){

        if(imageFile){
            await this.deleteImage(postImage)
            postImageData = await this.uploadImage(imageFile)
        }

        if(postImageData){
            try {
                const postImage = postImageData.$id
                return await this.database.updateDocument(
                    APPWRITE_DB_ID,
                    APPWRITE_COLLECTION_ID,
                    slug,
                    {
                        title, 
                        content, 
                        isPublic, 
                        postImage, 
                        userID, 
                        userName
                    }
                )
            } catch (error) {
                console.log("Error : Error while creating account :: ", error)
            }
        }

        else return console.log("Error: Error while uploading file.")
        
    }

    //get posts

    async getPosts(){
        try {
            return await this.database.listDocuments(APPWRITE_DB_ID,
                APPWRITE_COLLECTION_ID
            )
        } catch (error) {
            console.log("Error : Error while deleting post :: ", error)
        }
    }


    //upload image
    async uploadImage(file){
        try {
            return await this.bucket.createFile(
                APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error : Error while uploading file :: ", error)
        }
    }

    //delete image
    async deleteImage(fileID){
        try {
            return await this.bucket.deleteFile(
                APPWRITE_BUCKET_ID,
                fileID
            )
        } catch (error) {
            console.log("Error : Error while deleting file :: ", error)
        }
    }

    //get image
    getImage(fileID){
        try {
            return this.bucket.getFileView(
                APPWRITE_BUCKET_ID,
                fileID
            )
        } catch (error) {
            console.log("Error : Error while getting file :: ", error)
        }
    }

    //get preview image
    getImage(fileID){
        try {
            return this.bucket.getFilePreview(
                APPWRITE_BUCKET_ID,
                fileID
            )
        } catch (error) {
            console.log("Error : Error while getting preview file :: ", error)
        }
    }
}

const appwriteService = new AppwriteService()

export default appwriteService;