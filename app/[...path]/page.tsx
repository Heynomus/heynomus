import ResearchApp from '@/components/research-app';
import {notFound} from 'next/navigation';
import {validSlug} from '@/lib/types';
import type {Metadata} from 'next';
const pages=['x-research','explore','builders','narratives','ships','updates','reports','watchlist','compare','terminal','submit','developers','methodology','about','status','terms','privacy','account'];
export async function generateMetadata({params}:{params:Promise<{path:string[]}>}):Promise<Metadata>{const {path}=await params;return {title:path[0]==='project'?path[1]?.replaceAll('-',' '):path[0]?.replace(/^./,c=>c.toUpperCase())};}
export default async function Page({params}:{params:Promise<{path:string[]}>}) {
 const {path}=await params;
 if(path.length===2&&path[0]==='project'&&validSlug(path[1]))return <ResearchApp page="project" slug={path[1]}/>;
 if(path.length===1&&pages.includes(path[0]))return <ResearchApp page={path[0]}/>;
 notFound();
}
