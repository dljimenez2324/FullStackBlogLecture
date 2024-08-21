// helper functions here but not a component  so not a rafce

// helper function to check our token in our local storage 
const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");

    if(lsData && lsData != null)
    {
        result = true;
    }
    
    return result;
}

// helper function or method to createAccount, async and await instead of axios
// this typically is  a fetch(), json(), stringify
const createAccount = async(createduser) => {
    
    const result = await fetch('http://localhost:5041/api/User/AddUsers', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createduser)
    })
    if(!result.ok)
    {
        const message = `Yo! You have an error! Check your code ${result.status}`
        throw new Error(message);

    }
    let data = await result.json();
    console.log(data);
}

export { checkToken, createAccount }