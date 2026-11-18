'use client';
import {PrivyProvider,usePrivy,useLinkAccount} from '@privy-io/react-auth';
import {useLayoutEffect,type ReactNode} from 'react';
import {IdentityContext} from './auth-provider';
import {setTokenGetter} from '@/lib/client-api';
function Bridge({children}:{children:ReactNode}){
  const auth=usePrivy();
  const linking=useLinkAccount();
  const walletAddresses=auth.user?.linkedAccounts.flatMap(account=>account.type==='wallet'&&account.chainType==='ethereum'&&account.walletClientType!=='privy'?[account.address]:[])||[];
  useLayoutEffect(()=>{setTokenGetter(auth.authenticated?auth.getAccessToken:null);return()=>setTokenGetter(null);},[auth.authenticated,auth.getAccessToken]);
  return <IdentityContext.Provider value={{ready:auth.ready,authenticated:auth.authenticated,userId:auth.user?.id||null,configured:true,login:()=>auth.login(),logout:auth.logout,emailAddress:auth.user?.email?.address||null,googleEmail:auth.user?.google?.email||null,walletAddresses,linkEmail:linking.linkEmail,linkGoogle:linking.linkGoogle,linkWallet:()=>linking.linkWallet({walletChainType:'ethereum-only'})}}>{children}</IdentityContext.Provider>;
}
export default function PrivySession({appId,clientId,children}:{appId:string;clientId?:string;children:ReactNode}){
  return <PrivyProvider appId={appId} clientId={clientId||undefined} config={{loginMethods:['google','email','wallet'],appearance:{walletChainType:'ethereum-only',theme:'light',accentColor:'#171717',logo:'https://heynomus.xyz/brand/heynomus-symbol.png'},embeddedWallets:{ethereum:{createOnLogin:'off'},solana:{createOnLogin:'off'}}}}><Bridge>{children}</Bridge></PrivyProvider>;
}
