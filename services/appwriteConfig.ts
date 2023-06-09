import { Account, Client, Databases, Storage } from 'appwrite';

const client = new Client();

const appwriteAccount = new Account(client);
const databases = new Databases(client);
const storage= new Storage(client);

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6481b08a28146339947d');

export { appwriteAccount as account, databases as db, storage };
