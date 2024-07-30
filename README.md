<!-- PseudoCode for our backend and front end -->
<!-- Goal: Create a full stack webapp for a blog site -->
<!-- Backend will be done in .Net 8, web api, EF core, SQL Server -->
<!-- Frontend will be done in React with Javascript -->
<!-- Deployment will be done with Azure Static web apps -->

<!-- Our api needs to handle all of the CRUD functions we need -->

<!-- 
    Create - 
    Read    
    Update
    Delete
 -->

 <!--  In this app, the user should be able to log in so we need a login page -->
 <!-- Create Account Page -->
 <!-- Page to view published items  /  Blog view post page of published items -->
 <!-- Dashboard or admin page, this will be the profile page where you can edit, delete, publish and unpublish your blog posts -->

 <!-- Set up a SQL Sever from Azure for our database -->
 <!-- Folder Structure for our data / pages -->

 <!-- Controllers // Folders

        UserController: This will handle all of our user interactions
        All endpoints will be in this controller for users

  -->

  <!-- Login//Endpoint 
        
        AddUser//endpoint
        UpdateUser//endpoint
        DeleteUser//endpoint

  -->
  <!-- BlogController

        AddBlogItems//endpoint C  post 
        GetAllBlogItems//endpoint R  get
        GetAllBlogItemsByCategory//endpoint R
        GetAllBlogItemsByTags// endpoint R
        GetAllBlogItemsByDate// endpoint R
        UpdateBlogItems//endpoint U put
        DeleteBlogItems//endpoint D  in our case a put
  
   -->

<!--          ----------------------------------------               Models               ----------------------------------------                -->
   <!-- Models for how to shape our data 
   
        Model Folder structure:

            UserModel:
                Id: int
                username: string
                Salt: string
                Hash: string
   
   -->

   <!-- Models for our blog items
   
            id: int
            UserId: int
            PublisherName: string
            Title: string
            Image: string
            Description: string
            Date: string
            Category: string
            IsPublished: bool
            IsDeleted: bool
   
    -->

<!------------------------------------------- Items that will be saved to our database are above ----------------------------------------->

<!-- Models for login 

        Username: string
        Password: string

    CreateAccount model
        Id: int
        Username: string
        Password: string

    Password Model
        Salt: string
        Hash: string

-->

<!-- Services//Folder

    UserService//file
        GetUserByUserName
        Login
        AddUser
        DeleteUser

    BlogItemService//file
        AddBlogItems
        GetAllBlogItemsByCategory//functions(methods)
        GetAllBlogItemsByTag
        GetAllBlogItemsByDate
        UpdateBlogItems
        DeleteBlogItems
        GetUserById

 -->

 <!-- PasswordServices//file 
 
        Hash password

        Very hash password

 -->