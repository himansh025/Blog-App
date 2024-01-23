import { Client, Account, ID} from "appwrite";
import conf from '../../conf/conf'

let {appwriteID, appwriteUrl} = conf

export class AuthService{
    client = new Client();
    account;

    constructor () {
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteID)
        this.account = new Account(this.client)
    }

    async createAccount ({email, password, name, login=false}) {
        try{
            let user = await this.account.create(ID.unique(), email, password, name)
                login && user && this.loginAccount({email, password})
                console.log(await user)
                return true
        }
        catch(error){
            throw error
        }
    }

    async getAccount () {
        try{
            let user = await this.account.get()
            let userData = await user
            console.log(userData)
            return true
        }
        catch(error){
            throw error
        }
    }

    async loginAccount ({email, password}){
        try{
            return await this.account.createEmailSession(email, password)
        }
        catch(error){
            throw error
        }
        return null
    }

    async logoutAccount (accountID) {
        try{
            let user = await this.account.deleteSession('current')
            let userData = await user
            console.log(userData)
            return true
        }
        catch(error){
            throw error
        }
    }
    
}

let authService = new AuthService()

export default authService