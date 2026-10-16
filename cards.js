
import { collection, getDocs, addDoc} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC0m5cKzqKH301ALyTKFFQtYC8ad98RzzY",
    authDomain: "star-cards-7fb1d.firebaseapp.com",
    projectId: "star-cards-7fb1d",
    storageBucket: "star-cards-7fb1d.firebasestorage.app",
    messagingSenderId: "333775542235",
    appId: "1:333775542235:web:b75d284a20b80cc25d39fe",
    measurementId: "G-FQV668H3PE",
};

const app = initializeApp(firebaseConfig);
let db = getFirestore(app);

async function getData(){
    const querySnapshot = await getDocs(collection(db, "leaside"));
      const items = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  console.log(items); 
}

async function addItem(data) {
  const docRef = await addDoc(collection(db, "leaside"), {
    ...data,
  });

  return docRef.id;
}

async function runner(){
    let names = [
        "Maia Pauline",
        "Adrian Surjo",
        "Tommy Babitz",
        "Rowan MacDonald",
        "Lewis MacDonald",
        "Hannah Verbeeten",
        "Jino Park",
        "Artemy Bakulev",
        "Hudson Vlaad",
        "Sara Rezaee",
        "Cal Johnston",
        "Noah Quayyum",
        "Elise Pharand",
        "Aidan Aggas",
        "Henry Timar-Hew",
        "Gabriel Bocci",
        "Audrey Ling",
        "Madelynn Schwartz",
        "Logan Sager",
        "Arina Bakuileva",
        "Nadia Bisesar",
        "Oliver Chang",
        "Sensei Sensei",
        "Nitika Das",
        "Rachel Pang",
        "Kieran Kaushal",
        "Arash Zakeri",
        "Arnold Tar",
        "Ethan Batson",
        "Sharav Yadav",
        "Reggie Finlayson",
        "Liam Jackson",
        "Ellie Maeve",
        "Matteo Virtucio",
        "Alessia Virtucio",
        "Alex Armenia",
        "Clemence Lefebvre"
    ];
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        let temp_item ={
            currentStars : 2,
            name,
            starCards:0
        }
        await addItem(temp_item);
        console.log("processed : ", name);
    }

}



runner().then(r => {
    console.log("loaded");
})
    