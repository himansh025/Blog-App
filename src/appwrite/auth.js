import {Account, Client, ID} from 'appwrite'
import {appwriteProjectID, appwriteProjectURL} from '../conf/conf.js'

class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client
            .setProject(appwriteProjectID)
            .setEndpoint(appwriteProjectURL)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
             let user = await this.account.create(ID.unique(), email, password, name)
             if(user)
                return this.loginUser({
                    email, password, name
            })
        } catch (error) {
            console.error('error while creating account : ', error)
        }
        return null
    }

    async isLoggedIn(){
        try {
            return await this.account.get()
        } catch (error) {
            console.error('error while getting user : ', error)
        }
        return null
    }

    async loginUser({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.error("error while login : ", error)
        }
        return null
    }

    async logoutUser(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.error('error while logout : ', error)
        }
    }
}

const authService = new AuthService;
export default authService