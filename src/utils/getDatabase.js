import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore/lite"
 
export const getData = async(collectionName) => {
    const products = collection(db, collectionName)
    const userSnap = await getDocs(products);
        const data = userSnap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));

    return data
}
