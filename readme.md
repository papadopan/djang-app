# Assignment: INSPIREHEP Search & Summarization Web App

## Overview
You are tasked with building a simple web application that allows users to search for high-energy physics papers using the INSPIREHEP REST API and receive a summary generated by the OpenAI API and the list of results. The application should consists of a Django backend and a React frontend.

### How to run
- Download repo
- in the root folder run commands
  - `make up`
  - `make bootstrap`

- In docker_compose file
   replace the key with the one that is provided in the submission email (avoid exposure)
    ```
    environment:
      - OPENAI_API_KEY=WILL_BE_PROVIDED
    ```
 
- navigate to ui folder
  - run `npm i`
  - run `npm run dev`

after that you can open the browser to the port that the frontend runs and enjoy exploring the application


## Example Case

Example Workflow
- [X] User Interaction: User enters "quantum entanglement" into the search bar and clicks "Search".
- [X] Frontend Request:
    * React app sends a request to /api/search/ with the query parameter.
- [X] Backend Processing:
    * Django view receives the query.
    * Retrieves results from ElasticSearch for "quantum entanglement".
    * Extracts titles and abstracts from the top results.
    * Summarizes the information using the OpenAI API or a mock function.
- [X] Response:
    * Django returns the results and summary to the React app.
- [X] Displaying Results:
    * React app displays the summary to the user.
     
## React Frontend
- Frontend is ready to receive your requests
<img width="1439" alt="image" src="https://github.com/user-attachments/assets/69657f07-fb0b-408c-9b94-2319caa96908">
<img width="1769" alt="image" src="https://github.com/user-attachments/assets/4ac4e67a-5844-42b0-9abb-315b540231bc">
<img width="1772" alt="image" src="https://github.com/user-attachments/assets/27530818-e607-4a5c-bd85-8e86de304190">



### Notes
- We do not want to update params such as `limit`, `offset` I provided them hardcoded
- UI provides informative messages for all the different scenarios
- Responsivenss has been taken into account, might not be the most optimal solution though for mobile screens
- I prefered simple ui solutions with tailwind and shadcn to speed up the development

## Backend
![image](https://github.com/user-attachments/assets/1846e70c-b068-44fb-a8ee-0b708971eeaa)

### Notes
- there was an issue with the type `DateField` I changed it to `DateTimeField` in order to make the project running
- for the celery task, I validated the functionality by making it run every minute (I could not validate the daily time, but I am sure it will be running as the minute one). As a thought, for the worst case scenario that the task fail, I would provide a monitoring/alerting system to notify the stakeholders in any scenario.
- I developed a custom ApiViewError, thought that it was intended since it was there without any body
- for the openai, my account has credits, I have run it multiple times, hope that will still be the case during evaluation
- I had difficulty to identify the exact same fields in the inspire response (tilte, abstract, publication_date, etc) so I took the liberty based on the data to actually get something that would make sense to me and based of course on the current naming.

#### Create a task description for the following request:
* The product owner wants to have metrics about the OPENAI API response time and the most common user queries.
    *  Create an issue for this task that you will give to your team to solve, please be specific.
       in the implementation.
    * OPTIONAL: Implement your suggestion.
 
#### Assumptions
- the whole team is available
- this task would be the only goal of the sprint
- the objectives most likely are covered from one tool (especially the most modern ones) so we assume that the goal can be covered with one tool and not spliting into two different objectives

 
  ### **The sprint overview**
  - timeboxed task to search and find tools that could support the monitoring of an api (the market provide many solutions)
  - For every of the solution we should write down different aspects and features that could be useful (these are some that comes to my mind now)
    - The **cost** of the tool to use (acquiring license, additional costs based on the usage or the size of the application)
    - Is the tool **technolocy agnostic** (what would happen if our tech stack changes)
    - Is it time consuming to install, use , and view the results
    - Does it provide a **usefull and meaningfull dashboard or UI** to monitor the specs
    - Can it provide additional features that would enable us improving our way of calling this API?
    - Is the documentation easily consumed
    - Does the industry use it
    - Is any other team in our organisation use a tool that can provide a feedback either positive or negative.
    - Very important requirement here, the tool to provide a nice way of monitor and presentation of the most **common user queries**
  - When we have concluded to our suggestions (assuming that we found 2 or 3 candidates) we can have a breainstorming session to make sure that all the concerns and opinions have been heard
  - And after that session we can start implementing the solution (assuming that all the concerns above are met, and we are now onboard with our solution)
    1. Introduce the tool to our tech stack
    2. Making sure that documents properly the time of the API response
    3. Make sure that our tests include from the best to worst case scenarions (location, device, reception)
    4. Present the solution to the team
    5. Include stakeholders to validate that their goal is actually reached with the current solution
    6. If yes, congrats on the team keep working, If not we go again from the step of selecting the tool and make sure that we apply the learnings of that solution to the selection of the new one
   

This can be of course considered a more eagle-eye view of how we should structure a spring and what kind of considerations we should include.
Step by step, we are going to get some findings and these can lead to shape more specifics tasks with a more clear and detailed perspective
All of these tasks we can actually groom them when needed and inform the team if any findings rise.
   
  
    
   
    




