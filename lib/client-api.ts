let getToken:(()=>Promise<string|null>)|null=null;
export function setTokenGetter(getter:(()=>Promise<string|null>)|null){getToken=getter;}
export async function apiFetch(url:string,options:RequestInit={}){
  const headers=new Headers(options.headers);
  if(getToken){const token=await getToken();if(token)headers.set('Authorization','Bearer '+token);}
  return fetch(url,{...options,headers,credentials:'same-origin'});
}
