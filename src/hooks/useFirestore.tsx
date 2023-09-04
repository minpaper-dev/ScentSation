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
  const getDataAll = async (collectionName: string) => {
    const ref = collection(db, collectionName)
    const snap = await getDocs(ref)
    const data = snap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))

    return data
  }

  const getDataWithQuery = async (
    collectionName: string,
    requirement1: string,
    requirement2: any,
    requirement3: string | undefined
  ) => {
    const q = query(
      collection(db, collectionName),
      where(requirement1, requirement2, requirement3)
    )

    const snap = await getDocs(q)

    const data = snap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))

    return data
  }

  const getDataOne = async (collectionName: string, id: string) => {
    const ref = doc(db, collectionName, id)
    const snap = await getDoc(ref)

    return snap
  }

  const getDataWithId = async (
    collectionName: string,
    id: string | undefined
  ) => {
    if (id) {
      const ref = doc(db, collectionName, id)
      const snap = await getDoc(ref)
      return { id: snap.id, ...snap.data() }
    }
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
