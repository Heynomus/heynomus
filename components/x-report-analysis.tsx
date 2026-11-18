import {type Data} from '@/lib/types';

export function EvidenceCitations({ids,reportId}:{ids:number[];reportId:string}){
  return <span className="x-citations">{ids.map(id=><a key={id} href={'#'+reportId+'-evidence-'+id} aria-label={'Read evidence '+id}>[{id}]</a>)}</span>;
}
export default function XReportAnalysis({report}:{report:Data}){
  const analysis=report.analysis;
  if(!analysis?.sections?.length)return null;
  return <section className="x-analysis" aria-label="Detailed project analysis">
    <div className="x-analysis-heading"><h3>Research findings</h3><span className="chip">{analysis.status==='ai'?'Deep research':'Evidence record'}</span></div>
    {analysis.status!=='ai'&&<p className="x-analysis-note">A full AI synthesis was unavailable for this run. The collected source observations and unanswered questions remain available.</p>}
    <div className="x-analysis-sections">{analysis.sections.map((section:Data)=><section key={section.key} className="x-analysis-section"><h4>{section.title}</h4>{section.findings?.length?<ul>{section.findings.map((finding:Data,i:number)=><li key={i}><p>{finding.text}</p><EvidenceCitations ids={finding.citations||[]} reportId={report.id}/></li>)}</ul>:<p className="x-section-unknown">The inspected sources did not provide enough evidence for a finding in this area.</p>}</section>)}</div>
  </section>;
}
