// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function createLogoutButton() {
  var node = document.createElement("button");
  var textNode = document.createTextNode("LOGOUT");
  node.appendChild(textNode);

  node.addEventListener("click", function (evt) {
    evt.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(function () {
        document.getElementById("email").innerText = "";
        var node = document.getElementsByClassName("btn-container")[0];
        while (node.firstChild) {
          node.firstChild.remove();
        }
      });
  });

  document.getElementsByClassName("btn-container")[0].appendChild(node);
}

function createLoginButton() {
  var node = document.createElement("button");
  var textNode = document.createTextNode("LOGIN");
  node.appendChild(textNode);

  node.addEventListener("click", function (evt) {
    evt.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log('xxxxxxxxxx');
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  });

  document.getElementsByClassName("btn-container")[0].appendChild(node);
}

function initApp() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      document.getElementById("email").innerText = email;

      console.log({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        photoURL: photoURL,
        isAnonymous: isAnonymous,
        uid: uid,
        providerData: providerData,
      });
      createLogoutButton();
    } else {
      createLoginButton();
    }
  });
}

window.onload = function () {
  initApp();
};
