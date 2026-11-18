'use client';
import {useEffect,useState} from 'react';
import {Check,Copy} from 'lucide-react';

type TokenConfig={symbol:'NOMUS';chainId:4663;contractAddress:string|null};
export default function TokenStrip(){
  const [address,setAddress]=useState<string|null>(null),[state,setState]=useState<'loading'|'ready'|'unavailable'>('loading'),[copied,setCopied]=useState(false),[copyFailed,setCopyFailed]=useState(false);
  useEffect(()=>{
    const controller=new AbortController();
    const refresh=()=>{
      if(document.visibilityState==='hidden')return;
      fetch('/api/token',{cache:'no-store',signal:controller.signal}).then(async response=>{
        if(!response.ok)throw Error('Token information unavailable');
        return response.json() as Promise<TokenConfig>;
      }).then(token=>{
        const valid=token.symbol==='NOMUS'&&token.chainId===4663&&typeof token.contractAddress==='string'&&/^0x[0-9a-fA-F]{40}$/.test(token.contractAddress)&&!/^0x0{40}$/i.test(token.contractAddress);
        setAddress(valid?token.contractAddress:null);
        setState('ready');
      }).catch(()=>{if(!controller.signal.aborted){setAddress(null);setState('unavailable');}});
    };
    refresh();const timer=setInterval(refresh,30000);
    document.addEventListener('visibilitychange',refresh);
    return()=>{controller.abort();clearInterval(timer);document.removeEventListener('visibilitychange',refresh);};
  },[]);
  useEffect(()=>{if(!copied)return;const timer=setTimeout(()=>setCopied(false),2500);return()=>clearTimeout(timer);},[copied]);
  useEffect(()=>{setCopied(false);setCopyFailed(false);},[address]);
  return <aside className="token-strip" aria-label="NOMUS token contract">
    <strong>$NOMUS</strong><span className="token-network">Robinhood Chain</span><span className="token-divider" aria-hidden="true"/>
    {address?<><span className="token-ca-label">CA</span><a className="token-address" href={'https://robinhoodchain.blockscout.com/token/'+address} target="_blank" rel="noopener noreferrer" title={address}>{address}</a><button className="token-copy" aria-label={copied?'Contract address copied':'Copy NOMUS contract address'} onClick={async()=>{try{await navigator.clipboard.writeText(address);setCopied(true);setCopyFailed(false);}catch{setCopyFailed(true);}}}>{copied?<Check size={14}/>:<Copy size={14}/>}</button><span className="token-feedback" role="status">{copied?'Copied':copyFailed?'Select the address to copy':''}</span></>:<span className="token-pending">{state==='loading'?'Reading contract…':state==='unavailable'?'Contract info unavailable':'Contract address not announced'}</span>}
  </aside>;
}
