// helper functions here but not a component  so not a rafce

let userData = {};

// lets store data in our local storage
// store our userData in local storage
// check if
if(localStorage.getItem("UserData")){
    userData = JSON.parse(localStorage.getItem("UserData"));
}

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

// helper function to hold login logic
const login = async (loginUser) => {
    const result = await fetch('http://localhost:5041/api/User/Login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUser)
    })
    if(!result.ok)
    {
        const message = `Yo! You have an error! Check your code ${result.status}`
        throw new Error(message);

    }
    let data = await result.json();
    if(data.token !=null)
    {
        localStorage.setItem("Token", data.token);
        localStorage.setItem("UserData", JSON.stringify(data.user)); // we might have to comment out
    }
    console.log(data);
    return data

}

// get our endpoint by our username to pass in to get our result
const GetLoggedInUser = async (username) => 
{
    let result = await fetch(`http://localhost:5041/api/User/GetUserByUserName/${username}`)
    
    userData = await result.json();
    console.log(userData, "getloggedinuser method");
    localStorage.setItem("UserData", JSON.stringify(userData));
    userData = JSON.parse(localStorage.getItem("UserData"));
}

const LoggedInData = () =>
{   
    if(!userData && localStorage.getItem("UserData")) {
        userData = JSON.parse(localStorage.getItem("UserData"));
    }
    return userData;
}

// we need a function to help us add our blog items to the back end
const AddBlogItems = async (blogItems) =>
{
    const result = await fetch('http://localhost:5041/api/Blog/AddBlogItems', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blogItems)
    })
    if(!result.ok)
    {
        const message = `Yo! You have an error! Check your code ${result.status}`
        throw new Error(message);

    }
    let data = await result.json();
    console.log(data, "addblogItems method");
    return data
}

// can we make a function to handle all of these so that its simpler this can be called in our other components
const sendData = async(controller, endpoint, passedInData) =>
{
    const result = await fetch(`http://localhost:5041/api/${controller}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(passedInData)
    })
    if(!result.ok)
    {
        const message = `Yo! You have an error! Check your code ${result.status}`
        throw new Error(message);

    }
    let data = await result.json();
    console.log(data);
    return data
}

// method or function to get our blogItems
const getBlogItems = async () =>
{
    let result = await fetch("http://localhost:5041/api/Blog/GetBlogItem")
    let data = await result.json()
    
    console.log(data, "from our getblogitems method");
    return data;
}

// create a function to hit our GetItemsByUserId
const GetItemsByUserId = async (UserId) =>
{
    let result = await fetch(`http://localhost:5041/api/Blog/GetItemsByUserId/${UserId}`)
    let data = await result.json()
    
    console.log(data, "from our getItemsByUserId method");
    return data;
}

export { checkToken, createAccount, login, GetLoggedInUser, LoggedInData, sendData, AddBlogItems, getBlogItems, GetItemsByUserId }