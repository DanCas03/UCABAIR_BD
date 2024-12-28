export async function HandleSignup({user, password, email, name, lastName, address, address2 ,phone, pagWeb}) {


    return await fetch(`http://localhost:3000/users/signup?user=${user}&password=${password}&email=${email

    }&name=${name}&lastname=${lastName

    }&address=${address}&address2=${address2

    }&phone=${phone}&pagWeb=${pagWeb}` ,{ method: 'PUT',headers: { 'Accept': 'application/json' } })
    .then(response => response.json())
    
    .catch((e) => { 
        console.log(e);
        return '404';
    });
}