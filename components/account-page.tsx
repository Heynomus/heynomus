'use client';
import {useState} from 'react';
import {Download,Trash2} from 'lucide-react';
import {apiFetch} from '@/lib/client-api';
import {useIdentity,LoginRequired} from './auth-provider';
import {type Data} from '@/lib/types';
import LinkedAccounts from './linked-accounts';
export default function AccountPage(){
  const auth=useIdentity(),[confirm,setConfirm]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
  async function exportData(){setBusy(true);setMessage('');try{const r=await apiFetch('/api/account/export');const d=await r.json() as Data;if(!r.ok)throw Error(d.error);const url=URL.createObjectURL(new Blob([JSON.stringify(d,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='heynomus-workspace.json';a.click();URL.revokeObjectURL(url);}catch(e){setMessage((e as Error).message);}finally{setBusy(false);}}
  async function erase(){setBusy(true);setMessage('');try{const r=await apiFetch('/api/account/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({confirm})});const d=await r.json() as Data;if(!r.ok)throw Error(d.error);setMessage(d.message);setConfirm('');}catch(e){setMessage((e as Error).message);}finally{setBusy(false);}}
  return <div className="page information"><div className="page-heading"><div><div className="eyebrow">YOUR ACCOUNT</div><h1>Your workspace, under your control.</h1><p>Manage your connected research account and private records.</p></div></div><LoginRequired><article className="prose"><h2>Account identity</h2><p>Google, email, or wallet sign-in through Privy. Your user ID:</p><code className="account-id">{auth.userId}</code><LinkedAccounts/><h2>Export your research</h2><p>Download watchlists, notes, submissions, domain challenges, and AI conversation history as JSON.</p><button className="btn" disabled={busy} onClick={()=>void exportData()}><Download size={14}/>Export workspace</button><h2>Delete private workspace data</h2><p>This permanently removes the private records listed above. Public research, operator audit history and your Privy identity remain separate. Backups can retain data for their retention window.</p><label className="delete-confirm">Type DELETE MY WORKSPACE<input value={confirm} onChange={e=>setConfirm(e.target.value)} autoComplete="off"/></label><button className="btn" disabled={busy||confirm!=='DELETE MY WORKSPACE'} onClick={()=>void erase()}><Trash2 size={14}/>Delete workspace data</button>{message&&<div className="notice" role="status">{message}</div>}</article></LoginRequired></div>;
}
