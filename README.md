## Star Wars APP

Design a small React app that shows a list of characters using the api SWAPI (https://swapi.dev/). This list should have a traditional pager or a scrolling pager, you decide. Add the ability to navigate the list filtering by race, character, planets and starships. When an item is clicked, show the details of it.

Also, create another section called "My Galactic League" where the user can add:

- 3 Races
- 6 Characters
- 2 Planets
- 3 Starships

My Galactic League must have at least one character of the 3 selected races. And only characters of the selected races can be added.

The items on "My Galactic League" can be added or deleted always respecting the maximum and restrictions commented before.

For saving the data of "My Galactic League" use something local, may be cookies, local storage or something else. But don't use anything on the server side.

### Demo

https://starwars-github.netlify.app/

### Notes

- Tests are important (unit, integration, end to end). Add the tests you prefer.
- Add a README with everything you consider necessary to run the app
- Do not develope any backend code
- If you make any assumptions, take note of them in the README, so we can better understand your decisions.
- We are open for questions if you have any doubts

### Assumptions / Considerations

- Use [Material UI](https://material-ui.com/) library for faster and easier development.

- Use local storage for implementing `My galactic team`.

- Characters filters cannot be combined because of the API. There is no simple way to search characters by specie, name, planet AND starship. SWAPI provides only name filter in /people resource. I would prefer the API to have more query params to search in /people resource.

- When filtering by planet, specie or starship first the corresponded resource are fetched (planet, specie or starship) and then characters are fetched because the API is not denormalized. For example a planet has an array of people urls. This generates a high amount of request to the api.

### Setup the project

Install dependencies:

### `npm install`

Add `.env` and `.env.test` file with this content: 

`REACT_APP_API_URL=https://swapi.dev/api`

Run tests: 

### `npm test`

Start the project:

### `npm start`



