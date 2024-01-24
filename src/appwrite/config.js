import { Client, Storage, Databases, Query, ID} from "appwrite";
import { appwriteBucketID,appwriteCollectionID,appwriteDatabaseID,appwriteProjectID,appwriteProjectURL} from "../conf/conf";

class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(appwriteProjectURL).setProject(appwriteProjectID);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // to create post

  async createPost({ content, name, featuredImage, slug, status, userID }) {
    try {
      return await this.database.createDocument(
        appwriteDatabaseID,
        appwriteCollectionID,
        slug,
        {
          name,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.error("error while creating post : ", error);
      throw error;
    }
  }


  // to update post

  async updatePost(slug, { content, name, featuredImage, status}) {
    try {
      await this.database.updateDocument(
        appwriteDatabaseID,
        appwriteCollectionID,
        slug,
        {
          content,
          name,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("error while updating post : ", error);
      throw error;
    }
  }


  // to get post

  async getPost(slug){
    try {
        return await this.database.getDocument(
            appwriteDatabaseID,
            appwriteCollectionID,
            slug
        )
    } catch (error) {
        console.error('error while getting post : ', error)
        throw error
    }
  }


  // to get multiple posts

  async getPosts(queries = Query.equal('status', true)){
    try {
        return await this.database.listDocuments(
            appwriteDatabaseID,
            appwriteCollectionID,
            queries
        )
    } catch (error) {
        console.error('error while getting posts : ', error)
    }
  }


  // to delete post

  async deletePost(slug){
    try {
        return this.database.deleteDocument(
            appwriteDatabaseID,
            appwriteCollectionID,
            slug
        )
    } catch (error) {
        console.error("error while deleting post : ", error)
        throw error
    }
  }


  // to upload file

  async uploadFile(file){
    try {
        return await this.bucket.createFile(
            appwriteBucketID,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log('error while uploading file : ', error)
        throw error
    }
  }


  // to get file

  async getFile(fileID){
    try {
        return await this.bucket.getFile(
            appwriteBucketID,
            fileID
        )
    } catch (error) {
        console.log('error while getting file : ', error)
        throw error
    }
  }


  // to get preview file

  async getPreviewFile(fileID){
    try {
        return await this.bucket.getFilePreview(
            appwriteBucketID,
            fileID
        )
    } catch (error) {
        console.log('error while getting preview file : ', error)
        throw error
    }
  }

  // to delete file

  async deleteFile(fileID){
    try {
        return await this.bucket.deleteFile(
            appwriteBucketID,
            fileID
        )
    } catch (error) {
        console.log('error while deleting file : ', error)
        throw error
    }
  }
}


    



const service = new Service();
export default service;
