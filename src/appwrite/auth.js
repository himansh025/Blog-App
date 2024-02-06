import { Client, Account, ID} from "appwrite";
import { APPWRITE_ID, APPWRITE_URL } from "../envConf/conf";

class AppwriteAuthService{
    client = new Client
    account;
    constructor (){
        this.client
            .setEndpoint(APPWRITE_URL)
            .setProject(APPWRITE_ID)
        this.account = new Account(this.client)
    }

    // methods to account

    //checking logged account
    async checkLoggedAccount(){
        try{
            return await this.account.get()
        }
        catch(error){
            console.log("Error : While checking logged in user :: ", error)
            // throw error
        }
    }

    //creating account
    async createUser({email, password, name}){
        try{
            
            const account = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )

            if(account)
                {
                    await this.loginUser({email, password})
                    return account
                }
        }
        catch(error){
            console.log("Error : While Creating User :: ", error)
            throw error
        }
    }

    //login account
    async loginUser({email, password}){
        try{
            return await this.account.createEmailSession(
                email,
                password
            )
        }
        catch(error){
            console.log("Error : While Creating User :: ", error)
            throw error
        }
    }


    //logout account
    async logoutUser(){
        try{
            return await this.account.deleteSession('current')
        }
        catch(error){
            console.log("Error : While Creating User :: ", error)
        }
    }
}

const authService = new AppwriteAuthService()
export default authService;