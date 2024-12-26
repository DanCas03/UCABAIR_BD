


export async function HandleLogin(user,password){
    return await fetch(`http://localhost:3000/users/login?user=${user}&password=${password}` ,{ headers: { 'Accept': 'application/json' } })
    .then(response => response.json())
    
    .catch((e) => { 
        console.log(e);
        return '404';
    });
}