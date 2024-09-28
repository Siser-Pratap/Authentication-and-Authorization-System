// import { initializeApp } from "firebase/app";





// const firebaseConfig = {
//   apiKey: `${import.meta.env.VITE_OAUTH_API_KEY}`,
//   authDomain: "auther-9d3e9.firebaseapp.com",
//   projectId: "auther-9d3e9",
//   storageBucket: "auther-9d3e9.appspot.com",
//   messagingSenderId: "87429476322",
//   appId: "1:87429476322:web:81ccf04addbb27e3d213bb"
// };


// const app = initializeApp(firebaseConfig);

// export default app;



import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_OAUTH_API_KEY}`,
  authDomain: "auther-9d3e9.firebaseapp.com",
  projectId: "auther-9d3e9",
  storageBucket: "auther-9d3e9.appspot.com",
  messagingSenderId: "87429476322",
  appId: "1:87429476322:web:81ccf04addbb27e3d213bb"
};


const app = initializeApp(firebaseConfig);

export default app;