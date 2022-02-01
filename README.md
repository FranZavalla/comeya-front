# ComeYa - Frontend
A simple food ordering app

## Introduction
ComeYa is a project that I set out to do during the month of January 2022. The goal was to learn and develop the application with NodeJS and React, and then publish it on my curriculum.
ComeYa is a food ordering application, from a user to a store or restaurant. It is inspired by [PedidosYa](https://www.pedidosya.com.ar/)
This is the frontend, to see the backend [click here](https://github.com/FranZavalla/comeya-backend/)

### Table of contents
- [Install](#install)
- [Run](#run)
- [Dependencies](#dependencies)
- [Screenshots](#screenshots)
- [ToDo](#todo)
- [Bugs](#bugs)

# Install

- ```npm install```

# Run

**Note**: you need React to run the frontend

- ```npm start```

# Dependencies
For the design and development of the frontend, I used:
- Material UI (MUI)
- React-hot-toast
- React-star-ratings
- Use-sound

# Screenshots

**Home page for users**

<img src="./readme-images/home.png" width="800" height="400">

**Sign up for users**

<img src="./readme-images/signup.png" width="800" height="400">

**Home page for stores**

<img src="./readme-images/home_store.png" width="800" height="400">

**Store administration**

<img src="./readme-images/store_admin_empty.png" width="800" height="400">

**Adding a product**

<img src="./readme-images/add_product.png" width="800" height="400">

**Editing store profile**

<img src="./readme-images/store_profile.png" width="800" height="400">

**Main page for users**

<img src="./readme-images/menu.png" width="800" height="400">

**Products administration**

<img src="./readme-images/products.png" width="800" height="400">

**Ordering from a store**

<img src="./readme-images/store_menu.png" width="800" height="400">

**Viewing the cart**

<img src="./readme-images/store_cart.png" width="800" height="400">

**Store receiving the order**

<img src="./readme-images/store_admin.png" width="800" height="400">

# ToDo
### The following features were not implemented due to lack of time/knowledge. The project was thought to be developed in a month

- Testing!

- Change localStorage in frontend to cookies sent from backend
- Implement images to users, stores and products
- Delete products in cart
- Change the username/store_name to an email and use it as a primary key in the database
- Add an automatic update of new orders for stores
- Add a notice message to users when their order is accepted/cancelled

# Bugs

- If you enter /menu/orders directly from the search bar, the browser will not render anything
