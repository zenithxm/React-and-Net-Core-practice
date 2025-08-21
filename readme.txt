============================= FrontEnd =============================
====================================================================
extension:
-ES7+ React/Redux/React-Native snippets (tsrafce)
-Prettier - Code formatter

//create react and template folder
npm i create-react-app
npx create-react-app <folder_name> --template typescript
npx create-react-app frontend --template typescript

cd frontend
npm start (localhost web)
filetype: tsx

//connect api
npm i axios --save
npm i dotenv --save
//create file under frontend folder with name .env
//and create REACT_APP_API_KEY='api_key_asdasdasdasd'

//add css
npm install -D tailwindcss@3
npx tailwindcss init

npm install tailwindcss @tailwindcss/cli

//react change page or load part of page (link), dom is for website
npm i -save react-router
npm i -save react-router-dom

//additional
npm i uuid
npm i react-icons
npm i react-spinners
npm i recharts

//for pop up
npm i react-toastify

//for login form
npm i react-hook-form yup @hookform/resolvers

============================= tailwindcss =============================
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      colors: {
        lightBlue: "hsl(215.02, 98.39%, 51.18%)",
        darkBlue: "hsl(213.86, 58.82%, 46.67%)",
        lightGreen: "hsl(156.62, 73.33%, 58.82%)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      spacing: {
        180: "32rem",
      },
    },
  },
  plugins: [],
};
=======================================================================

============================= BackEnd =============================
===================================================================
extension:
-C#
-C# dev kit
-.NET expansion pack
-.NET install tool
-Nuget gallery
-C# Extension pack by JosKreativ
-Prettier

shortcut:
-prop = variable
-ctor = constractor

install visual studio code
install visual studio community
install sql server express
install sql server management studio (SSMS)

SQL:
instance: SQLEXPRESS
admin: ZENITHXM\Darwin
conn string: Server=localhost\SQLEXPRESS;Database=master;Trusted_Connection=True;

dotnet new webapi -o <folder_name>
dotnet new webapi -o api

cd api
dotnet add package Swashbuckle.AspNetCore
//add this in program.cs before builder.Build() //builder.Services.AddSwaggerGen();
//replace program.cs inside app.Environment.IsDevelopment() //app.UseSwagger(); app.UseSwaggerUI();

dotnet watch run (localhost/swagger/index.html)

//ctrl + shift + p or at bottom panel 
//for connect to db
Microsoft.EntityFrameworkCore.SqlServer (install match in api.csproj)
Microsoft.EntityFrameworkCore.Tools
Microsoft.EntityFrameworkCore.Design

//back to terminal to connect db and code
dotnet tool install --global dotnet-ef --version 9.* -> to run dotnet ef command
dotnet ef migrations add <name_migration> -> generate code to build db (Migration folder)
dotnet ef database update -> run that code (create table in db)

Newtonsoft.Json
Microsoft.AspNetCore.Mvc.NewtonsoftJson
//add this to program.cs, make sure it same version with other dotnet
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

//for login, make sure same version
Microsoft.Extensions.Identity.Core
Microsoft.AspNetCore.Identity.EntityFrameworkCore
Microsoft.AspNetCore.Authentication.JwtBearer
//add this to program.cs
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 12;
})
.AddEntityFrameworkStores<ApplicationDBContext>();
//add scheme
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
    options.DefaultChallengeScheme =
    options.DefaultForbidScheme =
    options.DefaultScheme =
    options.DefaultSignInScheme =
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
options.TokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = true,
    ValidIssuer = builder.Configuration["JWT:Issuer"],
    ValidateAudience = true,
    ValidAudience = builder.Configuration["JWT:Audience"],
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(
        System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
        )
    };
});