async function fetchusers() {
    
try{
console.log("fetchusers:");

//

const response = await fetch('https://jsonplaceholder.typicode.com/users');
if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
}
//
const users = await response.json();

if (!Array.isArray(users) || users.length === 0) {
    console.log('No users found');

    return;
}

console.log("total.users:", users.length);


users.slice(0, 5).forEach(user => {
    console.log("name:", user.name);
    console.log("email:", user.email);
    console.log( ".city:", user.address?.city);
    
    
});   

   }catch (error) {
    console.error("Error:", error.message);
}}


fetchusers();