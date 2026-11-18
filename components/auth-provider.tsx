'use client';
import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import dynamic from 'next/dynamic';
const PrivySession=dynamic(()=>import('./privy-session'),{ssr:false});
export type Identity={ready:boolean;authenticated:boolean;userId:string|null;configured:boolean;login:()=>void;logout:()=>Promise<void>;emailAddress?:string|null;googleEmail?:string|null;walletAddresses?:string[];linkEmail?:()=>void;linkGoogle?:()=>void;linkWallet?:()=>void};
export const IdentityContext=createContext<Identity>({ready:false,authenticated:false,userId:null,configured:false,login:()=>{},logout:async()=>{}});
export const useIdentity=()=>useContext(IdentityContext);
export default function AuthProvider({children}:{children:ReactNode}){
  const [config,setConfig]=useState<{privyAppId:string;privyClientId:string}|null>(null);
  useEffect(()=>{fetch('/api/config').then(r=>r.json() as Promise<{privyAppId:string;privyClientId:string}>).then(setConfig).catch(()=>setConfig({privyAppId:'',privyClientId:''}));},[]);
  if(config?.privyAppId)return <PrivySession appId={config.privyAppId} clientId={config.privyClientId}>{children}</PrivySession>;
  return <IdentityContext.Provider value={{ready:!!config,authenticated:false,userId:null,configured:false,login:()=>{},logout:async()=>{}}}>{children}</IdentityContext.Provider>;
}
export function AccountButton(){
  const auth=useIdentity();
  if(!auth.ready)return <button className="btn small account-button" disabled>Loading account…</button>;
  if(!auth.configured)return <a className="btn small account-button" href="/status">Account setup pending</a>;
  return auth.authenticated?<button className="btn small account-button" onClick={()=>void auth.logout()}>Sign out</button>:<button className="btn small dark account-button" onClick={auth.login}>Sign in</button>;
}
export function LoginRequired({children}:{children:ReactNode}){
  const auth=useIdentity();
  if(auth.authenticated)return <>{children}</>;
  return <div className="account-gate"><h3>Your research, connected.</h3><p>Sign in with Google, email, or a wallet to save projects, keep private notes, and continue your research across devices.</p><AccountButton/></div>;
}
