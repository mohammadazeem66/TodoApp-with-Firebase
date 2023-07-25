 //Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
 import { getFirestore,collection,updateDoc,getDocs,addDoc,deleteDoc,doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAdM_NpMPfxugkYEaWQZakxx2tzXlp4yf8",
    authDomain: "practice-ff692.firebaseapp.com",
    projectId: "practice-ff692",
    storageBucket: "practice-ff692.appspot.com",
    messagingSenderId: "622327775239",
    appId: "1:622327775239:web:52e9c716618df1d052aaa2",
    measurementId: "G-JPLCFYCDK8"
 };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app); 


 
 let btn = document.getElementById("btn");



 let post = document.getElementById('post');
 const querySnapshot = await getDocs(collection(db, "todo"));
 querySnapshot.forEach((doc) => {
     post.innerHTML += `<h1>${(doc.data().txt)}</h1><button class="editbtn" onclick="edit('${doc.id}')">Edit</button><button class="delbtn" onclick="del('${doc.id}')">Delete</button>`
     
     console.log(doc.data(),"data");
     console.log(doc.id , "id");
     console.log(doc , "doc");
     
     
    });
    
    
    
    btn.addEventListener('click',async()=>{
        let input = document.getElementById("inpt").value;
        try {
            const docRef = await addDoc(collection(db, "todo"), {
                txt:input,
            });
            
            
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        window.location.reload()
    
    
})



const edit = async(id) => {
    console.log(id);
    const editList = doc(db, "todo", id);
    var editText = prompt('Enter Your edit Text');
    
    // Set the "capital" field of the city 'DC'
    await updateDoc(editList, {
        
        txt: editText,
        
    }).then(() => {
        
        window.location.reload();
    });
}

const del = async(id) =>{
     await deleteDoc(doc(db, "todo", id))
     
     .then(() => {
      window.location.reload();
  });

}
window.del=del;
window.edit=edit;
