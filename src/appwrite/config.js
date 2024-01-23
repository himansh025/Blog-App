import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../../conf/conf";

let {appwriteDatabaseID, appwriteUrl, appwriteID, appwriteCollectionID, appwriteBucketID} = conf

export class Service{
    client = new Client
    database ;
    bucket ;

    constructor(){
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteID)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost(data){
       try {
        return await this.database.createDocument(appwriteDatabaseID, appwriteCollectionID,ID.unique(), data)
       } catch (error) {
        throw error
       }
    }

    
    async updatePost(slug, data){
        try {
            this.database.updateDocument(appwriteDatabaseID, appwriteCollectionID, slug, data)
        } catch (error) {
            console.log("error in updating post ", error )
        }
    }
    
    async getPost(postId){
        try {
            let res =  await this.database.getDocument(appwriteDatabaseID, appwriteCollectionID, postId)
            let post = await res
            return post
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status",'active')]){
        try {
            return await this.database.listDocuments(appwriteDatabaseID, appwriteCollectionID, queries)           
        } catch (error) {
            console.log("error while getting post ", error)
        }
    }

    async deletePost(postId){
        try {
            return await this.database.deleteDocument(appwriteDatabaseID, appwriteCollectionID, postId
                )
        } catch (error) {
            throw error
        }
    }

    async uploadFile(file){
        try {
            return this.bucket.updateFile(appwriteBucketID, ID.unique(), file)
        } catch (error) {
            console.log("error while uploading file ", error)
            return false
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(appwriteBucketID, fileID)
        } catch (error) {
            console.log('error while deleting file ', error)
            return false
        }
    }

    async previewFile(fileID){
        try {
            await this.bucket.getFilePreview(appwriteBucketID, fileID)
        } catch (error) {
            console.log("error while previewing file ", error)
        }
    }
}

const service = new Service()
export default service