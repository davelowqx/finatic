import { auth } from ".";

export default function GoogleAuth() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const idToken = result.credential.idToken;
      const accessToken = result.credential.accessToken;
      console.log(name, email);
      console.log(accessToken);
      console.log(idToken);
      console.log(result);

      //router.push("/explore");
    })
    .catch((error) => {
      vars.errorMessage = error.message;
      console.log(error);
    });
}
