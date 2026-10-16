
//import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

let {addDoc, getDocs, collection } = require("firebase/firestore");
let initializeApp = require("firebase/app").initializeApp;
let getFirestore = require("firebase/firestore").getFirestore;
//import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";


let fs = require("fs");

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


function readDatafromFile(file){
    let data = fs.readFileSync(file, 'utf8');
        
        let names = data.split("\n");
        .forEach(async (line) => {
            const [firstName, lastName, age,belt, date] = line.split(",");
            const item = {
                currentStars:0,
                name: firstName.trim() +' '+ lastName.trim(),
                starCards: 0,
            };
            const id = await addItem(item);
            console.log(`Added item with ID: ${id}`);
        });
    });
}
readDatafromFile("LeasideNames.csv");
//getData();

async function addItem(data) {
    try {
        const docRef = await addDoc(firestore.collection(db, "leaside"), data);

        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
  
}