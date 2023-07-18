## CSS frameworks

CSS frameworks provide  organised units of css to cover common situations.

## Bootstrap

A popular framework is Bootstrap 5.

The full example listing is:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="jumbotron text-center">
  <h1>My First Bootstrap Page</h1>
  <p>Resize this responsive page to see the effect!</p> 
</div>

<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="assets/icon.png" alt="logo" width="30" height="30">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Design</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Play Game</a>
          </li>  
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Games</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Fortnite</a></li>
              <li><a class="dropdown-item" href="#">Ratchet & Clank: Rift Apart</a></li>
              <li><a class="dropdown-item" href="#">Splatoon 3</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
<div class="container-fluid mt-3">
  <div class="row">
    <div class="col-sm-4">
      <h3 style="text-align: center;">Fortnite</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
    <div class="col-sm-4">
      <h3 style="text-align: center;">Ratchet & Clank: Rift Apart</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
    <div class="col-sm-4">
      <h3 style="text-align: center;">Splatoon 3</h3>        
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
  </div>
</div>

<!-- Carousel -->
<div id="demo" class="carousel slide" data-bs-ride="carousel">

    <!-- Indicators/dots -->
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
    </div>
    
    <!-- The slideshow/carousel -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="assets/fortnite.jpg" alt="Fortnite" class="d-block" style="width:100%">
        <div class="carousel-caption">
          <h3 style="background-color: black;">Fortnite</h3>
          <p style="background-color: black;">A game by Epic Games!</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="assets/ratchetandclank.jpg" alt="Ratchet & Clank" class="d-block" style="width:100%">
        <div class="carousel-caption">
          <h3 style="background-color: black;">Ratchet & Clank: Rift Apart</h3>
          <p style="background-color: black;">A game by Insomniac Games!</p>
        </div> 
      </div>
      <div class="carousel-item">
        <img src="assets/splatoon3.jpg" alt="Splatoon 3" class="d-block" style="width:100%">
        <div class="carousel-caption">
          <h3 style="background-color: black;">Splatoon 3</h3>
          <p style="background-color: black;">A game by Nintendo Entertainment Planning & Development!</p>
        </div>  
      </div>
    </div>
    
    <!-- Left and right controls/icons -->
    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>

  <div class="card" style="width: 300px;">
    <img src="assets/icon.jpg" class="card-img-top" alt="...">
    <div class="card-body text-center">
        <h5 class="card-title">Alan Williams</h5>
        <p class="card-text">Alan works at UWS. Specialising in game development; Unity and Unreal Engine along with web technology languages and frameworks.</p>
        <a href="#" class="btn btn-primary">View Profile</a>
    </div>
</div>

<div class="m-4">
    <div class="accordion" id="myAccordion">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">1. What is HTML?</button>									
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                <div class="card-body">
                    <p>HTML stands for HyperText Markup Language. HTML is the standard markup language for describing the structure of web pages. <a href="https://www.tutorialrepublic.com/html-tutorial/" target="_blank">Learn more.</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">2. What is Bootstrap?</button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#myAccordion">
                <div class="card-body">
                    <p>Bootstrap is a sleek, intuitive, and powerful front-end framework for faster and easier web development. It is a collection of CSS and HTML conventions. <a href="https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/" target="_blank">Learn more.</a></p>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree">3. What is CSS?</button>                     
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                <div class="card-body">
                    <p>CSS stands for Cascading Style Sheet. CSS allows you to specify various style properties for a given HTML element such as colors, backgrounds, fonts etc. <a href="https://www.tutorialrepublic.com/css-tutorial/" target="_blank">Learn more.</a></p>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>

```

Which produces:

<iframe 
    height="2000" 
    width="100%" 
    scrolling="no" 
    title="Hello.html" 
    src="Block_1/section_3/public/index.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>

## Bulma

A popular alternative to bootstrap is [Bulma](https://bulma.io/).

Creating a basic layout:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello Bulma!</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Hello World
      </h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
    </div>

    <div>
      <button class="button is-primary">
        Button 1
      </button>
      <button class="button is-link">
        Button 2
      </button>
      <button class="button is-info">
        Button 3
      </button>
      <button class="button is-success">
        Button 4
      </button>
      <button class="button is-warning">
        Button 5
      </button>
      <button class="button is-danger">
        Button 6
      </button>
    </div>
    
    <div>
      <button class="button is-small">
        Button 1
      </button>
      <button class="button">
        Button 2
      </button>
      <button class="button is-medium">
        Button 3
      </button>
      <button class="button is-large">
        Button 4
      </button>
    </div>

    <div>
      <button class="button is-primary is-outlined">
        Button 1
      </button>
      <button class="button is-loading">
        Button 2
      </button>
      <button class="button" disabled>
        Button 3
      </button>
    </div>

    <div class="columns">
      <div class="column"><p>Column 1</p></div>
      <div class="column"><p>Column 2</p></div>
      <div class="column"><p>Column 3</p></div>
      <div class="column"><p>Column 4</p></div>
      <div class="column"><p>Column 5</p></div>
  </div>

  Dropdown Field
         </span>
         <div class = "field">
            <div class = "control">
               <div class = "select">
                  <select>
                     <option>Option One</option>
                     <option>Option Two</option>
                  </select>
               </div>
            </div>
         </div>
         <br>

  </section>
  </body>
</html>
```

Which produces:

<iframe 
    height="2000" 
    width="100%" 
    scrolling="no" 
    title="Hello.html" 
    src="Block_1/section_3/public_Bulma/index.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>