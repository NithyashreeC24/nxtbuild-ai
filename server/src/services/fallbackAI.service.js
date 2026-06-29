export const generateFallbackCode = (prompt) => {

const p = prompt.toLowerCase();


if(p.includes('login')){

return `

<!DOCTYPE html>
<html>

<head>

<style>

body{

height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#667eea,#764ba2);
font-family:Arial;

}


.card{

background:white;
padding:40px;
border-radius:20px;
width:320px;

box-shadow:0 10px 30px rgba(0,0,0,.2);

}


h2{

text-align:center;

}


input{

width:100%;
padding:12px;
margin-top:15px;

border-radius:10px;

border:1px solid #ddd;

}


button{


width:100%;
padding:12px;

margin-top:20px;

border:none;

border-radius:10px;

background:#667eea;

color:white;

font-size:16px;

cursor:pointer;


}

button:hover{

background:#5a67d8;

}


</style>

</head>



<body>



<div class="card">


<h2>Welcome Back</h2>


<input placeholder="Email">


<input placeholder="Password">


<button>

Login

</button>


</div>


</body>

</html>

`;

}



if(p.includes('portfolio')){


return `


<!DOCTYPE html>

<html>

<body style="font-family:Arial;background:#111;color:white;">


<center>


<h1>Nithya Portfolio</h1>


<p>Frontend Developer</p>


<button style="padding:10px 20px;background:purple;color:white;border:none;border-radius:8px;">


Contact Me


</button>


</center>



</body>

</html>


`;

}



if(p.includes('navbar')){


return `

<nav style="display:flex;justify-content:space-between;padding:20px;background:#111;color:white;">

<div>

Logo

</div>


<div>

Home

About

Projects

Contact


</div>



</nav>

`;

}



if(p.includes('dashboard')){


return `


<div style="display:flex;height:100vh;">


<div style="width:220px;background:#111;color:white;padding:20px;">

Dashboard


</div>


<div style="padding:30px;">


<h1>Welcome</h1>


</div>



</div>


`;

}



return `

<h1>

AI Generated Page

</h1>


<p>

${prompt}

</p>


`;

};