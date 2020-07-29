// fetch(
//   `https://us-south.appid.cloud.ibm.com/oauth/v4/5854ad0e-054a-43f2-87e1-4453db0d6cb9/userinfo`,
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${tokenLocalStorage}`,
//     },
//     body: JSON.stringify({ token: tokenLocalStorage }),
//   }
// )
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
