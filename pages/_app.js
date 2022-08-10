
import { useEffect,useState } from "react"
function MyApp({ Component, pageProps }) {

  const [deferredPrompt,setDeferredPrompt] = useState(null)
  useEffect(() => {

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();

  setDeferredPrompt(event)
  return false;
});

    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }
  , [])
  

  return <Component {...pageProps} deferredPrompt={deferredPrompt} setDeferredPrompt={setDeferredPrompt} />
}

export default MyApp
