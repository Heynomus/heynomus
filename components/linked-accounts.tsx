'use client';
import {Mail,Wallet,Globe,Check} from 'lucide-react';
import {useIdentity} from './auth-provider';

export default function LinkedAccounts(){
  const auth=useIdentity();
  if(!auth.authenticated)return null;
  const wallets=auth.walletAddresses||[];
  return <section className="linked-accounts" aria-labelledby="linked-accounts-title">
    <h2 id="linked-accounts-title">Your sign-in methods</h2>
    <p>Add another way to sign in to this workspace. Link it here while signed in to keep your saved projects, notes, and account access together.</p>
    <div className="linked-account-list">
      <div><Globe size={18}/><div><strong>Google</strong><span>{auth.googleEmail||'Connect your Google account'}</span></div><button type="button" className="btn small" disabled={!auth.ready||!!auth.googleEmail||!auth.linkGoogle} onClick={()=>auth.linkGoogle?.()}>{auth.googleEmail?<><Check size={13}/>Linked</>:'Link Google'}</button></div>
      <div><Mail size={18}/><div><strong>Email</strong><span>{auth.emailAddress||'Sign in with an email code'}</span></div><button type="button" className="btn small" disabled={!auth.ready||!!auth.emailAddress||!auth.linkEmail} onClick={()=>auth.linkEmail?.()}>{auth.emailAddress?<><Check size={13}/>Linked</>:'Link email'}</button></div>
      <div><Wallet size={18}/><div><strong>Wallet</strong>{wallets.length?wallets.map(address=><code key={address}>{address}</code>):<span>Connect an Ethereum-compatible wallet</span>}</div><button type="button" className="btn small" disabled={!auth.ready||!auth.linkWallet} onClick={()=>auth.linkWallet?.()}>{wallets.length?'Link another wallet':'Link wallet'}</button></div>
    </div>
  </section>;
}
