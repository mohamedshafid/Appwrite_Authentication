
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint(`${import.meta.env.VITE_APPWRITE_ENDPOINT}`)
    .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);                

const account = new Account(client);

export async function RegisterUser(data){
   const user=await account.create(
        ID.unique(),
        data.email,
        data.password,
    );
    return user;
};

export async function LoginUser(data){
   return await account.createEmailPasswordSession(
    data.email,
    data.password
   );
};

export async function LogoutUser(){
   await account.deleteSession("current");
};

export async function getUser(){
   const user=await account.get();  
   console.log("get user  function",user);
   return user;
};


