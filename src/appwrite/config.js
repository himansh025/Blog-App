import { Client, Databases, ID } from "appwrite";
import conf from "../../conf/conf";

let {appwriteDatabaseID, appwriteUrl, appwriteID, appwriteCollectionID} = conf

export class Service{
    client = new Client
    database ;

    constructor(){
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteID)
        this.database = new Databases(this.client)
    }

    async createPost(data){
        console.log("hello")
       try {
        return await this.database.createDocument(appwriteDatabaseID, appwriteCollectionID,ID.unique(), data)
       } catch (error) {
        throw error
       }

    }
}

const service = new Service()
export default service