
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDcXcAHWkWtUA0t06xDV-pkUZkHoWhuLNo',
  authDomain: 'nkrikardbencic-117a7.firebaseapp.com',
  databaseURL: 'https://nkrikardbencic-117a7.firebaseio.com',
  projectId: 'nkrikardbencic-117a7',
  storageBucket: 'nkrikardbencic-117a7.appspot.com',
  messagingSenderId: '882870117734',
  appId: '1:882870117734:web:44e807bf38356e364114a7',
  measurementId: 'G-04CSQT4Y3G'
}

firebase.initializeApp(firebaseConfig)

export default ({ Vue }) => {
  Vue.prototype.$auth = firebase.auth()
  Vue.prototype.$db = firebase.firestore()
  Vue.prototype.$storage = firebase.storage()
}
