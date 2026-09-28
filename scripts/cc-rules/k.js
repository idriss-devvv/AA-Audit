// Usage: node k.js <idcc> list [filter] | node k.js <idcc> text <KALITEXT id|substring> | node k.js <idcc> grep <regex> [maxChars]
const fs=require("fs"),path=require("path");
const D=path.join(__dirname,"package/data");
const idx=require(D+"/index.json");
const [,,num,cmd,arg,arg2]=process.argv;
const c=idx.find(x=>Number(x.num)===Number(num));
const doc=require(D+"/"+c.id+".json");
const strip=h=>(h||"").replace(/<br\s*\/?>/gi,"\n").replace(/<\/(p|tr|li|div|h\d)>/gi,"\n").replace(/<\/t[dh]>/gi," | ").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/[ \t]+/g," ").replace(/\n\s*\n+/g,"\n").trim();
function walk(n,f,trail=[]){f(n,trail);for(const ch of n.children||[])walk(ch,f,[...trail,n]);}
const texts=[];
walk(doc,(n,t)=>{if(n.type==="section"&&n.data&&n.data.id&&/^KALITEXT/.test(n.data.id))texts.push({n,group:(t[1]&&t[1].data&&t[1].data.title)||""});});
if(cmd==="list"){for(const {n,group} of texts){const d=n.data;const s=`${d.id} ${d.etat} ${d.modifDate||""} [${group}] ${d.title}`;if(!arg||new RegExp(arg,"i").test(s))console.log(s);}}
if(cmd==="text"){const t=texts.find(({n})=>n.data.id===arg)||texts.find(({n})=>n.data.title.includes(arg));const out=[];walk(t.n,(n)=>{if(n.type==="article"){out.push(`--- Art. ${n.data.num||""} [${n.data.id}] ${n.data.etat||""}\n`+strip(n.data.content));}else if(n.type==="section"&&n!==t.n)out.push(`## ${n.data.title}`);});const s=`# ${t.n.data.title} (${t.n.data.id}, ${t.n.data.etat}, ${t.n.data.modifDate||""})\n`+out.join("\n");console.log(arg2?s.slice(0,Number(arg2)):s);}
if(cmd==="grep"){const re=new RegExp(arg,"i");const max=Number(arg2||600);const only=process.env.ONLY;for(const {n:tn} of texts){if(only&&!tn.data.id.match(new RegExp(only))&&!tn.data.title.match(new RegExp(only,"i")))continue;walk(tn,(n)=>{if(n.type==="article"&&!/ABROGE|PERIME|MODIFIE|REMPLACE/.test(n.data.etat||"")){const txt=strip(n.data.content);const m=txt.search(re);if(m>=0)console.log(`== ${tn.data.id} ${tn.data.etat} | ${tn.data.title.slice(0,90)} | Art. ${n.data.num} [${n.data.id}] ${n.data.etat}\n`+txt.slice(Math.max(0,m-150),m+max)+"\n");}});}}
