import { useState , useEffect } from "react";
import axios from "axios";

export default function App() {
const [projects,setProjects]=useState([]);
const [projectId,setProjectId] = useState("");
const [prompt,setPrompt]=useState("");
const [code,setCode]=useState("");
const [loading,setLoading]=useState(false);
const [copied, setCopied] = useState(false);
const [status, setStatus] = useState("");
const [statusColor, setStatusColor] = useState("#22c55e");
const generate = async()=>{
    if(!prompt.trim()){

alert("Please enter a prompt.");

return;

}

try{

setLoading(true);

setStatus("⏳ Generating website...");
setStatusColor("#f59e0b");

const res = await axios.post(

"http://localhost:5000/api/ai/generate",

{
prompt
}

);

setCode(res.data.code);

console.log("AI Generated");

let id = projectId;

if(!id){

console.log("Creating project...");

id = await createProject();

console.log("Created ID:",id);

}

console.log("Saving project...");

const saved = await saveProject(

id,

res.data.code

);

if(saved){

console.log("Saved Successfully");

setStatus("✅ Project saved successfully!");
setStatusColor("#22c55e");

fetchProjects();

}else{

console.log("Save Failed");

setStatus("❌ Failed to save project.");
setStatusColor("#ef4444");

}

}
catch(error){

console.log("GENERATE ERROR");

console.log(error.response?.data);

console.log(error);

}

finally{

setLoading(false);

}

};
const createProject = async()=>{

try{

const res = await axios.post(

"http://localhost:5000/api/projects",

{

title:prompt

},

{

headers:{

Authorization:`Bearer ${localStorage.getItem("token")}`

}

}

);
console.log(res.data);
setProjectId(

res.data.data._id

);

return res.data.data._id;

}

catch(error){

console.log("CREATE ERROR");

console.log(error.response?.data);

console.log(error);

}

};
const saveProject = async(id,generated)=>{


try{


const res = await axios.put(

"http://localhost:5000/api/projects/save",

{

projectId:id,
prompt,
generatedCode:generated

}

);

console.log(res.data);

return true;

}


catch(error){

console.log("SAVE ERROR");
console.log(error.response?.data);
console.log(error);

return false;

}

};
const downloadHTML = ()=>{

const blob = new Blob(

[code],

{

type:"text/html"

}

);

const url = URL.createObjectURL(blob);

const a = document.createElement("a");

a.href = url;

a.download = "nxtbuild.html";

a.click();

URL.revokeObjectURL(url);

};
const copyCode = async () => {

try{

await navigator.clipboard.writeText(code);

setCopied(true);

setTimeout(()=>{

setCopied(false);

},2000);

}

catch(err){

console.log(err);

}

};
const fetchProjects = async()=>{

try{

console.log("FETCHING PROJECTS");

const res = await axios.get(

"http://localhost:5000/api/projects"

);

console.log("RESPONSE");

console.log(res.data);

setProjects(

res.data.data

);

console.log(

"Projects loaded:",

res.data.data.length

);

}

catch(error){

console.log("FETCH ERROR");

console.log(error);

}


};
useEffect(()=>{

console.log("APP LOADED");

fetchProjects();

},[]);

return (

<div style={styles.container}>


<div style={styles.left}>


<div style={styles.logoContainer}>

<span style={styles.logoIcon}>
⚡
</span>

<h1 style={styles.logo}>
NxtBuild AI
</h1>

</div>



<p style={styles.subtitle}>

Build beautiful websites using AI in seconds.

</p>
<div style={styles.projects}>


<h3 style={{color:"white",marginBottom:"10px"}}>

📁 My Projects ({projects.length})

</h3>
<button

style={styles.newProject}

onClick={()=>{

console.log("NEW PROJECT CLICKED");

setPrompt("");

setCode("");

setProjectId("");

}}

>

+ New Project

</button>

{

projects.map(

p=>(

<div

key={p._id}

style={styles.projectCard}

>

<div

onClick={()=>{

setPrompt(p.prompt);
setCode(p.generatedCode);
setProjectId(p._id);

}}

>

📄 {p.title}

</div>

<button

onClick={async(e)=>{

e.stopPropagation();

console.log("DELETE CLICKED");
console.log(p._id);

try{

const res = await axios.delete(

`http://localhost:5000/api/projects/${p._id}`

);

console.log("DELETE RESPONSE");
console.log(res.data);

console.log("FETCHING AGAIN");

await fetchProjects();

console.log("FETCH DONE");

}

catch(error){

console.log("DELETE ERROR");

console.log(error);

}

}}

>

❌

</button>
<button

onClick={async(e)=>{

e.stopPropagation();

const title = window.prompt(

"New Title",

p.title

);

if(!title)return;

try{

console.log("RENAME CLICKED");

console.log("ID:",p._id);
console.log("TITLE:",title);

const res = await axios.put(

`http://localhost:5000/api/projects/${p._id}`,

{
title
}

);

console.log("RENAME RESPONSE");

console.log(res.data);

const refreshed = await axios.get(

"http://localhost:5000/api/projects"

);

setProjects(

[...refreshed.data.data]

);

console.log("SIDEBAR UPDATED");

console.log("FETCHED AGAIN");

}

catch(error){

console.log("RENAME ERROR");

console.log(error.response?.data);

console.log(error);

}

}}

>

✏️

</button>
</div>

)

)

}





</div>

<textarea

placeholder="Describe your website... (Portfolio, Hospital, School, Restaurant...)"

value={prompt}

onChange={(e)=>setPrompt(e.target.value)}

style={styles.textarea}

/>



<button

onClick={generate}

disabled={loading}

style={{

...styles.button,

opacity: loading ? 0.7 : 1,

cursor: loading ? "not-allowed" : "pointer"

}}

>
{loading ? "⏳ Generating..." : "✨ Generate Website"}
</button>
<button

onClick={downloadHTML}
disabled={!code || loading}

style={{

...styles.downloadButton,

opacity:!code ? 0.5 : 1

}}

>
📥 Download HTML

</button>

<button
onClick={copyCode}
disabled={!code || loading}
style={{
...styles.copyButton,
opacity: !code ? 0.5 : 1
}}
>
{copied ? "✅ Copied" : "📋 Copy Code"}
</button>
<button

onClick={generate}

disabled={loading}

style={{

...styles.regenerateButton,

opacity:loading ? .5 : 1

}}

>
🔄 Regenerate

</button>
</div>



<div style={styles.right}>

<div style={styles.previewHeader}>

<h3>🖥 Live Preview</h3>

</div>

{code ? (

<iframe
title="preview"
srcDoc={code}
style={styles.preview}
/>

) : (

<div style={styles.empty}>

<h1>🚀 Welcome to NxtBuild AI</h1>

<p style={{fontSize:"18px",marginTop:"10px"}}>
Describe the website you want to build.
</p>

<div style={{marginTop:"25px",textAlign:"left"}}>

<h3>✨ Try these prompts:</h3>

<p>🏥 Hospital Website</p>

<p>💼 Portfolio Website</p>

<p>🏫 School Website</p>

<p>🍕 Restaurant Website</p>

<p>🛒 Ecommerce Website</p>

<p>📊 Dashboard UI</p>

</div>

</div>

)}

</div>


</div>


);


}



const styles={


container:{
  display:"flex",
  height:"100vh",
  overflow:"hidden",
  background:"#0f172a",
  fontFamily:"Arial"
},

downloadButton:{

padding:"14px",

background:"#059669",

border:"none",

borderRadius:"12px",

color:"white",

fontSize:"16px",

cursor:"pointer",

transition:"0.3s"

},

left:{
  width:"30%",
  height:"100vh",
  padding:"30px",
  background:"#111827",
  display:"flex",
  flexDirection:"column",
  gap:"20px",
  overflowY:"auto",
  boxSizing:"border-box"
},

regenerateButton:{


padding:"14px",

background:"#f59e0b",

border:"none",

borderRadius:"12px",

color:"white",

fontSize:"16px",

cursor:"pointer",

transition:"0.3s"

},

projects:{


display:"flex",

flexDirection:"column",

gap:"10px"


},
deleteBtn:{

background:"red",

border:"none",

padding:"5px",

borderRadius:"6px",

cursor:"pointer",

color:"white"

},

projectCard:{

padding:"12px",

background:"#1e293b",

borderRadius:"10px",

color:"white",

display:"flex",

justifyContent:"space-between",

alignItems:"center",

cursor:"pointer",
transition:"0.3s",

},


newProject:{


padding:"12px",

background:"#8b5cf6",

border:"none",

borderRadius:"10px",

color:"white",

cursor:"pointer"


},

right:{
  width:"70%",
  height:"100vh",
  background:"#f8fafc",
  overflow:"hidden"
},




logo:{

fontSize:"32px",

fontWeight:"700",

color:"white",

margin:0

},
copyButton:{

padding:"14px",

background:"#2563eb",

border:"none",

borderRadius:"12px",

color:"white",

fontSize:"16px",

cursor:"pointer",

transition:"0.3s"

},

subtitle:{


color:"#94a3b8"

},
logoContainer:{

display:"flex",

alignItems:"center",

gap:"10px"

},
empty:{

height:"100%",

display:"flex",

flexDirection:"column",

justifyContent:"center",

alignItems:"center",

background:"#f8fafc",

color:"#64748b"

},

logoIcon:{

fontSize:"40px"

},



textarea:{


height:"220px",

padding:"20px",

borderRadius:"15px",

background:"#1e293b",

color:"white",

border:"none",

fontSize:"16px",

resize:"none",


outline:"none"

},




button:{


padding:"14px",

background:"#8b5cf6",

border:"none",

borderRadius:"12px",

color:"white",

fontSize:"16px",


transition:"0.3s"

},




preview:{


width:"100%",

height:"100%",

border:"none"


}
,
previewHeader:{
padding:"18px",
background:"#f8fafc",
borderBottom:"1px solid #e5e7eb",
boxShadow:"0 2px 8px rgba(0,0,0,.08)",
fontWeight:"bold",
fontSize:"20px",
textAlign:"center"
}

};
