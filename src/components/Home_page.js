import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const clientId =
  "18324293035-koervog93amh10lo8lapjli26mttapo4.apps.googleusercontent.com";
const apiKey = "AIzaSyA8_hu6iq8AxlVPbGR5JFvdZ3P2vZSZHgg";
const scope = "https://www.googleapis.com/auth/youtube.readonly";

const Home_page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
        ],
        scope: scope,
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const checkSubscription = async () => {
    try {
      const response = await gapi.client.youtube.subscriptions.list({
        part: "snippet",
        mine: true,
      });
      const subscriptions = response.result.items;
      const isSubscribed = subscriptions.some(
        (item) =>
          item.snippet.resourceId.channelId === "UCgIzTPYitha6idOdrr7M8sQ"
      );
      return isSubscribed;
    } catch (error) {
      console.error("Error checking subscription:", error);
      return false;
    }
  };

  const handlelogin = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance
      .signIn()
      .then(async () => {
        const isSubscribed = await checkSubscription();
        if (isSubscribed) {
          console.log("User is subscribed");
          navigate("/private");
        } else {
          console.log("User is not subscribed");
          navigate("/unauthorized");
        }
      })
      .catch((error) => {
        console.error("Login failed: ", error);
      });
  };

  return (
    <div>
      <h1>Welcome to the home page!</h1>
      <p>Click on the button below to login with Google and verify your subscription.</p>
      <button onClick={handlelogin}>Login with Google</button> 
      <p>
        Here are the test ids-
        test.user909098@gmail.com (subscribed)
        test.user890909@gmail.com (unsubscribed)
        password for both is - lol@123321
      </p>
    </div>
  
  );
};

export default Home_page;
