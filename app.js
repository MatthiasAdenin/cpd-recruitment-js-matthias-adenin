// Importing data from the data.js module
const { data } = require('./data.js');

// Class containing methods to filter and count data
class AnimalFilter {
    // Method to filter animals based on a patternTested
    static filterAnimals(data, patternTested) {
        return data.map(country => {
            const filteredPeople = country.people
                .map(person => {
                    // Filter animals that contain the specified patternTested
                    const filteredAnimals = person.animals.filter(animal =>
                        animal.name.includes(patternTested)
                    );

                    // If there are matching animals, return the person with the filtered animals
                    if (filteredAnimals.length > 0) {
                        return {
                            name: person.name,
                            animals: filteredAnimals,
                        };
                    }

                    return null;
                })
                .filter(Boolean);

            // If there are matching people, return the country with the filtered people
            if (filteredPeople.length > 0) {
                return {
                    name: country.name,
                    people: filteredPeople,
                };
            }

            return null;
        }).filter(Boolean);
    }



    // Method to count the number of people and animals in each country
    static countPeopleAndAnimals(data) {
        return data.map(country => {
            const countedPeople = country.people.map(person => {
                // Count the number of animals for each person
                const count = person.animals.length;
                // Add the number of animals to the person's name
                const nameWithCount = `${person.name} [${count}]`;

                return {
                    name: nameWithCount,
                    animals: person.animals,
                };
            });

            // Count the total number of people in the country
            const totalPeople = countedPeople.length;
            // Add the total number of people to the country's name
            const nameWithCount = `${country.name} [${totalPeople}]`;

            return {
                name: nameWithCount,
                people: countedPeople,
            };
        });
    }
}

// Function to parse command line arguments and perform the corresponding action
function parseCommandLineArgs() {
    const args = process.argv.slice(2);
    const commandWithArgument = args[0];

    // Separate the command and the argument
    const [command, argument] = commandWithArgument.split('=');

    switch (command) {
        case '--filter':
            const patternTested = argument;
            const filteredData = AnimalFilter.filterAnimals(data, patternTested);
            console.log(JSON.stringify(filteredData, null, 2));
            break;
        case '--count':
            const countedData = AnimalFilter.countPeopleAndAnimals(data);
            console.log(JSON.stringify(countedData, null, 2));
            break;
        default:
            break;
    }
}

// Call the function to parse command line arguments
parseCommandLineArgs();

module.exports = { AnimalFilter }