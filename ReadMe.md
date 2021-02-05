1. To create database run the script given in "Products_create.txt" in mysql workbench. It will create the database named "product_shop" for the project.

2. Open terminal in "server". Start server with "npm run start".

3. To seed the database with sample data with server running:
	Open terminal in "dbseeder".. Start with "npm run start" and sample data will be seeded.
	
4. Open  terminal in "client"> Start client with "npm run start".

5. Connection to mysql database configurations (host, user, password, database) are provided in server > index.js lines "15-20" if configuration is needed to connect to database.

6. To test functionality with a customer account you can login with:
	email:customertest@email.com
	password: testpassword
	
7. You can also create a new account to test customer functionality by pressing the "Register as customer" button in the main page.
	
8. To test functionality with an admin account you can login with:
	email: admin@admin.com
	password: admin
		
9. Once logged in, to login with a different account just refresh the page.

10. Customer accounts can only read available products.

11. Admin account can read, update and delete products, customers and orders as well as read detail views and display list of all records for each table.

12. To update and delete records with an admin account, login with an admin account and click on "Show Customers", "Show Products", or "Show Orders".

13. The forms for inserting are client side validated with JS and server side validated with express-validator package.

14. Registration and logging in functions have been implemented as well as different functionalities based on user status (not logged in/logged in as customer/logged in as guest).

15. Pagination of displayed lists has also been implemented.

16. The client side app has been built as a Single Page Application using ReactJS.