import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://165.227.147.154:8081/'
})
export default instance


// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://165.227.147.154:8081/',
//   httpsAgent: {
//     rejectUnauthorized: false
//   }
// });

// export default instance;

