import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();

    // get the name and family id from the form
    const formData = new FormData(form);

    const familyId = formData.get('family-id');
    const name = formData.get('bunny-name');

    // use createBunny (which is from fetch-utils.js) to create a bunny with this name and family id
    await createBunny({
        name: name,
        family_id: familyId,
    });
    
    form.reset();

    //after clicking SUBMIT redirect to main family page
    window.location.href = '../families';
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const select = document.querySelector('select');

    // go get the families from supabase
    const families = await getFamilies();

    // for each family
    // create an option tag
    // set the option's value and text content
    // and append the option to the select
    for (let family of families) {

        //create an option tag
        const option = document.createElement('option');

        //set the option's value and text content
        option.value = family.id;
        option.textContent = family.name;

        //append the option to the select
        select.append(option);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
