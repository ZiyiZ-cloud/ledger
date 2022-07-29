
# Personal-Ledger


### A Web application that allows users to create their personal ledger and also provide them with different types of images to visualize their spending behaviors. The website is deployed in the following link: (https://personal-ledger.surge.sh/)

## App Features Include:

Once user sign up an account for the application, they can add their expenses and incomes under different category and dates to their online ledger. 

User have the access to add, edit, and delete any of the expesnes they created. They can also change their registered name and email for the website.

The application allows user to broswer all history expenses. It also provides monthly report for users. Users can view their current monthly expenses, where they can see their monthly total expenses and total incomes. Also the application will provide Pie chart based on expense and income data, and Bar chart based on daily activities and monthly category activities.

Users can also selected a specific month to view their history monthly activities.

<img width="1440" alt="Screen Shot 2022-05-21 at 11 26 45 PM" src="https://user-images.githubusercontent.com/82247271/169677022-ad95aef9-f722-40b2-8289-61aef6c58486.png">

<img width="1439" alt="Screen Shot 2022-05-21 at 11 26 03 PM" src="https://user-images.githubusercontent.com/82247271/169677012-3c10481c-de36-4524-a39e-f47d4e2682f0.png">

## API
I decided to build up my own API for this application. I have created the API with Node JS and deployed on Heroku and set up the connection with the API to the Personal-Ledger application. API is deployed at: https://personalledger.herokuapp.com/

API provides support for frontend. With the correct user token, api provides access to get and edit user information and expenses. For expenses, user can access all history or history for selected month. API also provides data for building up the chart in frontend about monthly category, daily total income and expense, and monthly total balance. 

## Technology Used:
* JavaScript 
* Node JS
* React JS
* React Chart JS
* Material UI
* PostgreSQL
* Heroku
* RESTful APIs
* HTML
* CSS

