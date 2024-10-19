import '@/styles/globals.css'
import Script from "next/script";

export default function App({ Component, pageProps }) {




  return <>

      <div
          className="vh-100 vw-100 align-items-center justify-content-center  d-none  position-fixed bg-black  z-n1 opacity-75"
          id="loadingx">


          <img src="/loading.gif" alt=""/>


      </div>
      <Script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.js"/>
      <Component {...pageProps} />

  </>
}
