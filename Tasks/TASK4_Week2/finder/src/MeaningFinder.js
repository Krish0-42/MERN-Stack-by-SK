import React, { useState } from 'react';

const MeaningFinder = () => {
    const [name, setName] = useState('');

    const handleClick = () => {
        /* The `fetch(`https://api.agify.io/?name=`)` statement is making a GET request to the
        Agify API with a dynamic parameter `name` that is set to the value stored in the `name`
        state variable. This API is used to predict the age of a person based on their name. The
        response from the API is then processed in the subsequent `.then` chain where the JSON
        response is logged to the console. If there is an error during the fetch request, it will be
        caught and logged to the console as well. */
        fetch(`https://api.agify.io/?name=${name}`)
        //.then is used to handle successful response
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    };

    return (
    <div>
        <h1>Meaning Finder</h1>
        <input type="text" placeholder="Enter a name" value={name} onChange={e => setName(e.target.value)}/>
        {/* The `onChange={e => setName(e.target.value)}` in the input element is setting up an event listener that 
        triggers a function whenever the input field's value changes. */}
        <button onClick={handleClick}>Find Meaning</button>
    </div>
    );
};

export default MeaningFinder;