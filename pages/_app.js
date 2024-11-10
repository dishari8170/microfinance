import '@/styles/globals.css'
import Script from "next/script";
import {useRouter} from "next/router";
import SideZ from "@/Comp/SideZ";

export default function App({ Component, pageProps }) {


    const router = useRouter()



  return <>

      <div
          className="vh-100 vw-100 align-items-center justify-content-center  d-none  position-fixed bg-black  z-n1 opacity-75"
          id="loadingx">


          <img src="/loading.gif" alt=""/>


      </div>

      {router.asPath.split("/").length>2?<SideZ><Component {...pageProps} /></SideZ>:<Component {...pageProps} />}


  </>
}
