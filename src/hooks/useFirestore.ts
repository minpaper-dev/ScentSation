import { db } from '../Firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore/lite'

const useFirestore = () => {
  const getDataAll = async <T>(
    collectionName: string
  ): Promise<T | undefined> => {
    if (collectionName) {
      const ref = collection(db, collectionName)
      const snap = await getDocs(ref)
      const data = snap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }))

      return data as T
    } else return undefined
  }

  const getDataWithId = async <T>(
    collectionName: string,
    id: string | undefined
  ): Promise<T | undefined> => {
    if (id) {
      const ref = doc(db, collectionName, id)
      const snap = await getDoc(ref)
      return { id: snap.id, ...snap.data() } as T
    }
    return undefined
  }

  const getDataWithQuery = async <T>(
    collectionName: string,
    requirement1: string,
    requirement2: any,
    requirement3: string | undefined
  ): Promise<T | undefined> => {
    const q = query(
      collection(db, collectionName),
      where(requirement1, requirement2, requirement3)
    )

    const snap = await getDocs(q)

    const data = snap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))

    return data as T
  }

  const getDataOne = async (collectionName: string, id: string) => {
    const ref = doc(db, collectionName, id)
    const snap = await getDoc(ref)

    return snap
  }

  const addData = async (collectionName: string, id: string, data: object) => {
    if (id) {
      await setDoc(doc(db, collectionName, id), data)
    } else {
      await setDoc(doc(collection(db, collectionName)), data)
    }
  }

  const deleteData = async (collectionName: string, id: string | undefined) => {
    if (id) {
      await deleteDoc(doc(db, collectionName, id))
    }
  }

  const updateData = async (collectionName: string, id: string, data: any) => {
    const ref = doc(db, collectionName, id)

    await updateDoc(ref, data, { merge: true })
  }

  return {
    getDataAll,
    getDataWithQuery,
    getDataOne,
    addData,
    deleteData,
    updateData,
    getDataWithId,
  }
}

export default useFirestore
