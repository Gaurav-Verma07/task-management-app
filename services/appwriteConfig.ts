import { Account, Client, Databases, Storage } from 'appwrite';
import { config } from './config';

const client = new Client();

const appwriteAccount = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

console.log(config.NEXT_PUBLIC_APPWRITE_ENDPOINT, config.NEXT_PUBLIC_APPWRITE_PROJECT_KEY);
client.setEndpoint(config.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(config.NEXT_PUBLIC_APPWRITE_PROJECT_KEY);

export { appwriteAccount as account, databases as db, storage, client };
