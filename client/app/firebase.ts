import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_DB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_DB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_DB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_DB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_DB_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface BoardMember {
  name: string;
  id: string;
}

async function fetchBoardMembers(): Promise<BoardMember[]> {
  const querySnapshot = await getDocs(collection(db, "BoardMembers"));
  const boardMembers: BoardMember[] = [];

  querySnapshot.forEach((doc) => {
    boardMembers.push({
      name: doc.data().Name,
      id: doc.id, // Set id directly from doc.id
    });
  });

  console.log(boardMembers)
  return boardMembers;
}

async function addBoardMember({ name }: {name : string}) {
  try {
    const docRef = await addDoc(collection(db, "BoardMembers"), {
      "Name": name,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef; // Return the document reference with the generated id
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

const removeBoardMember = async (name : string) =>{
  try {
    const memberRef = collection(db, "BoardMembers");

    // query to find board member
    const q = query(memberRef, where("Name", "==", name));

    // returns all the docs that were found in that query
    const docSnap = await getDocs(q)


    if (docSnap) {
      // for all occurences it will delete them
      docSnap.forEach(async (docs) => {
        // takes the id from that doc found
        const docRef = doc(db, "BoardMembers", docs.id);

        // deletes it
        await deleteDoc(docRef)
    });
    }

  } catch (e) {
    console.error("Error deleting document", name);
  }

  // const updatePantry = async () => {
  //   const snapshot = collection(db, "pantry");
  //   const docs = await getDocs(snapshot);
  //   const pantryList = [];
  //   docs.forEach((doc) => {
  //     pantryList.push({ name: doc.id, ...doc.data() });
  //   });
  //   setPantry(pantryList);
  // };
}

const updateBoard = async () => {
  const snapshot = collection(db, "BoardMembers")
  const docs = await getDocs(snapshot);
  const BoardMembers: BoardMember[] = [];
  docs.forEach((doc) => {
    BoardMembers.push({ 
      name: doc.data().Name,
      id: doc.id
    })
  })
  console.log(BoardMembers);
  return BoardMembers;
}

export { app, db, fetchBoardMembers, addBoardMember, removeBoardMember, updateBoard };