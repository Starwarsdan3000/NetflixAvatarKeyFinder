// ==UserScript==
// @name         Netflix Avatar Key Finder
// @namespace    https://www.netflix.com/
// @version      1.2
// @description  Find the Avatar key of your Netflix icon, modify, and copy it
// @author       starwarsdan3000
// @match        https://www.netflix.com/settings/profile/edit/*
// @grant        none
// ==/UserScript==

(function () {
    console.log("Netflix Avatar Finder script loaded.");

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    container.style.color = 'white';
    container.style.padding = '10px';
    container.style.zIndex = '9999';
    container.style.borderRadius = '8px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';

    const executeButton = document.createElement('button');
    executeButton.innerHTML = 'Grab Avatar Key';
    executeButton.style.padding = '10px';
    executeButton.style.border = 'none';
    executeButton.style.backgroundColor = '#007bff';
    executeButton.style.color = 'white';
    executeButton.style.cursor = 'pointer';
    executeButton.style.borderRadius = '4px';

    const openRedditButton = document.createElement('button');
    openRedditButton.innerHTML = 'Join the Avatar Key Compilation';
    openRedditButton.style.padding = '10px';
    openRedditButton.style.border = 'none';
    openRedditButton.style.backgroundColor = '#ff0000';
    openRedditButton.style.color = 'white';
    openRedditButton.style.cursor = 'pointer';
    openRedditButton.style.borderRadius = '4px';
    openRedditButton.style.marginTop = '10px';

    const copyrightText = document.createElement('p');
    copyrightText.innerHTML = 'Made by starwarsdan3000 &copy; 2025.';
    copyrightText.style.fontSize = '12px';
    copyrightText.style.color = '#bbb';
    copyrightText.style.marginTop = '10px';

    container.appendChild(executeButton);
    container.appendChild(openRedditButton);
    container.appendChild(copyrightText);
    document.body.appendChild(container);

    async function findAvatarAndModify() {
        const pageHTML = document.documentElement.innerHTML.trim(); // Get full HTML content
        const searchPhrase = document.querySelector('input[name="profile-name"]').value; // Extract profile ID from the URL

        console.log("Searching for profile name:", searchPhrase);

        let matches = [];
        if (searchPhrase.includes(' ')) {
            const inputPhrase = searchPhrase.replaceAll(/ /g, '\\\\x20'); // uses string
            console.log(inputPhrase);
            console.log(pageHTML.includes("Logan\\x20B"));
            const regex = new RegExp(inputPhrase, 'g');
            console.log(regex);
            console.log("regex source:", regex.source);
            matches = [...pageHTML.matchAll(regex)];
        } else {
            const regex = new RegExp(searchPhrase, 'g'); // always exists
            console.log(regex);
            matches = [...pageHTML.matchAll(regex)];
        }

        console.log(matches);
        // Get the position of the occurrence
        const occurrenceIndex = matches[matches.length - 1];
        const position = occurrenceIndex.index;

        console.log("Occurrence found at position:", position);

        // Now search backwards for the word "AVATAR" just before the occurrence of the profile name
        const avatarPosition = pageHTML.lastIndexOf('AVATAR', position); // Find "AVATAR" before the profile name

        if (avatarPosition === -1) {
            console.log('Could not find "AVATAR" before the profile name.');
            return;
        }

        console.log('"AVATAR" found at position:', avatarPosition);

        // Grab the 64 characters after "AVATAR"
        let modifiedString = pageHTML.substring(avatarPosition + 6, avatarPosition + 6 + 64); // Add 6 to skip past "AVATAR"

        console.log("Initial string grabbed after AVATAR:", modifiedString);

        // Modify the string: Replace backslashes with pipes and remove the 3 characters after each backslash
        modifiedString = modifiedString.replace(/\\/g, "|"); // Replace backslashes with pipes

        // Now remove the 3 characters after each "|"
        modifiedString = modifiedString.replace(/\|.{3}/g, "|");
        
        modifiedString = "AVATAR" + modifiedString;

        console.log("Modified string:", modifiedString);

        // Display the result
        const alertContainer = document.createElement('div');
        alertContainer.style.position = 'fixed';
        alertContainer.style.top = '50%';
        alertContainer.style.left = '50%';
        alertContainer.style.transform = 'translate(-50%, -50%)';
        alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        alertContainer.style.color = 'white';
        alertContainer.style.padding = '20px';
        alertContainer.style.borderRadius = '8px';
        alertContainer.style.zIndex = '10000';
        alertContainer.style.textAlign = 'center';

        const alertMessage = document.createElement('p');
        alertMessage.innerHTML = `Found Avatar Key: <br><strong>${modifiedString}</strong>`;
        alertMessage.style.marginBottom = '15px';
        alertContainer.appendChild(alertMessage);

        const copyBtn = document.createElement('button');
        copyBtn.innerText = 'Copy to Clipboard & Close';
        copyBtn.style.padding = '10px';
        copyBtn.style.border = 'none';
        copyBtn.style.backgroundColor = '#007bff';
        copyBtn.style.color = 'white';
        copyBtn.style.cursor = 'pointer';
        copyBtn.style.borderRadius = '4px';
        alertContainer.appendChild(copyBtn);

        document.body.appendChild(alertContainer);

        copyBtn.addEventListener('click', () => {
            const tempInput = document.createElement('input');
            tempInput.value = modifiedString;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            alert("Copied!");
            document.body.removeChild(alertContainer);
        });
    }

    executeButton.addEventListener('click', findAvatarAndModify);

    openRedditButton.addEventListener('click', () => {
        window.open('https://www.reddit.com/r/netflix/comments/13h9uhr/netflix_profile_icons_compilation_project/', '_blank');
    });
})();
