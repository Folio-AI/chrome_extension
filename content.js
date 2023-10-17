const exampleDataLever = {
    name: 'Fo Lina',
    pronouns: 'He/him',
    email: 'fo.lina@usefolio.ai',
    phone: '123-456-7890',
    currentCompany: 'ABC Corp',
    linkedInURL: 'https://www.linkedin.com/in/folina/',
    gitHubURL: 'https://github.com/folina',
    portfolioURL: 'https://www.folinafofina.com',
    country: 'United States [USA]', // The country value should match the exact text of one of the option elements
    languages: ['English (ENG)', 'Spanish (SPA)'], // The language values should match the exact values of the checkbox elements
    preferredName: 'Fo',
    namePronunciation: 'pho lie nuh'
};

const exampleDataGreenhouse = {
    firstName: 'Fo',
    lastName: 'Lina',
    email: 'fo.linna@usefolio.ai',
    phone: '123-456-7890',
    devField1: 'Developer field value'
};

// Function to fill the forms
function greenhouseFill(data) {
    // Fill out the text fields
    const firstNameField = document.getElementById('first_name');
    const lastNameField = document.getElementById('last_name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');

    if (firstNameField) firstNameField.value = data.firstName || '';
    if (lastNameField) lastNameField.value = data.lastName || '';
    if (emailField) emailField.value = data.email || '';
    if (phoneField) phoneField.value = data.phone || '';
    
    // You may also handle the file upload section if needed
    // It depends on how the website handles file uploads
    // Generally, you need to trigger a file picker dialog or drag and drop interface
    const eduSection = document.querySelector("#education_section input")
    if (eduSection) {
        document.querySelector("#education_section input").value = "Stanford University";
        var event = new Event('change');
        eduSection.dispatchEvent(event);
    }
}
function leverFill(data) {
    const form = document.getElementById('application-form');
    
    if (form) {
        // Fill the full name
        const nameInput = form.querySelector('input[name="name"]');
        if (nameInput) {
            nameInput.value = data.name;
        }

        // Check the pronouns
        const pronounsInput = form.querySelector(`input[name="pronouns"][value="${data.pronouns}"]`);
        if (pronounsInput) {
            pronounsInput.checked = true;
        }

        // Fill the email
        const emailInput = form.querySelector('input[name="email"]');
        if (emailInput) {
            emailInput.value = data.email;
        }

        // Fill the phone number
        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.value = data.phone;
        }

        // Fill the current company
        const companyInput = form.querySelector('input[name="org"]');
        if (companyInput) {
            companyInput.value = data.currentCompany;
        }

        // Fill the LinkedIn URL
        const linkedInInput = form.querySelector('input[name="urls[LinkedIn]"]');
        if (linkedInInput) {
            linkedInInput.value = data.linkedInURL;
        }

        // Fill the GitHub URL
        const gitHubInput = form.querySelector('input[name="urls[GitHub]"]');
        if (gitHubInput) {
            gitHubInput.value = data.gitHubURL;
        }

        // Fill the Portfolio URL
        const portfolioInput = form.querySelector('input[name="urls[Portfolio]"]');
        if (portfolioInput) {
            portfolioInput.value = data.portfolioURL;
        }

        const countrySelect = form.querySelector('select[name^="cards"][name$="[field0]"]');
        if (countrySelect) {
            countrySelect.value = Array.from(countrySelect.options)
                .find(option => option.text.trim() === data.country)?.value || "";
            const event = new Event('change');
            countrySelect.dispatchEvent(event);  // Trigger a change event to update the UI
        }
        
        // Check the language skills
        const languages = data.languages || [];
        languages.forEach(language => {
            const languageCheckbox = form.querySelector(`input[name^="cards"][name$="[field1]"][value="${language}"]`);
            if (languageCheckbox) {
                languageCheckbox.checked = true;
            }
        });

    } else {
        console.error('Application form not found');
    }
}


const handlers = {
    'lever.co': () => {
        const currentUrl = window.location.href;
        const targetUrl = currentUrl.replace('/apply', '');

        // Fetch the HTML content of the target page without navigating away from the current page
        fetch(targetUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();  // Parse the text from the response
            })
            .then(html => {
                // Create a new HTML document from the response
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Now you can query the doc object as you would the current document
                const metaTag = doc.querySelector('meta[property="og:description"]');
                const scriptTag = doc.querySelector('script[type="application/ld+json"]');
                if (scriptTag) {
                    try {
                        const jsonData = JSON.parse(scriptTag.textContent);
                        if (jsonData.description) {
                            console.log(jsonData.description);
                        } else {
                            console.log("The 'description' field is not found in the JSON data.");
                        }
                    } catch (error) {
                        console.error("Error parsing the JSON content.", error);
                    }
                } else if (metaTag) {
                    console.log(metaTag.getAttribute('content'));
                    console.warn("Got response from website");
                } else {
                    console.log('Neither the job description div nor the meta tag was found on lever.co.');
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            }
        );

        leverFill(exampleDataLever);
    
    },
    'myworkdayjobs.com': () => {
        const metaTag = document.querySelector('meta[property="og:description"]');
        
        if (metaTag) {
            console.log(metaTag.getAttribute('content'));
        } else {
            console.log('The meta tag with property "og:description" is not found on myworkdayjobs.com.');
        }
    },
    'greenhouse.io': () => {
        const scriptTag = document.querySelector('script[type="application/ld+json"]');
        if (scriptTag) {
            try {
                const jsonData = JSON.parse(scriptTag.textContent);
                if (jsonData.description) {
                    console.log(jsonData.description);
                } else {
                    console.log("The 'description' field is not found in the JSON data.");
                }
            } catch (error) {
                console.error("Error parsing the JSON content.", error);
            }
        } else {
            console.log("The script tag of type 'application/ld+json' is not found.");
        }

        greenhouseFill(exampleDataGreenhouse);
    }
};

const currentHostname = window.location.hostname;

Object.keys(handlers).forEach((key) => {
    if (currentHostname.includes(key)) {
        handlers[key]();
    }
});

