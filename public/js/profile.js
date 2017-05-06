








function getUserDetails() {
	$.get('/api/profile', renderuserData);
}

function renderuserData(data) {
var userData = data;
if (!userData || !userData.length) {
// ID/CLASS text for “record not available”.
           } else {
// userData object values are following, render each for a table row 
// userData["0"].userName
// userData["0"].fullName
// userData["0"].email
// userData["0"].location
// assign id to an attribute (eg. user-id) to the edit button
// userData["0"].id 
}
console.log(userData);
}
getUserDetails();

