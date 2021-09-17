<template>
    <div class="d-flex flex-column container px-4" style="min-height: 100vh;">
        <Header/>
            <nuxt />
        <Footer/>
    </div>
</template>

<style>
/* credits bennylin for Aksara Jawa fonts */
@font-face {
  font-family: 'Noto-Sans-Javanese';
  src: local("Noto-Sans-Javanese"),
       url(~assets/fonts/noto2.eot),
       url(~assets/fonts/noto2.eot?#iefix) format('embedded-opentype'),
       url(~assets/fonts/noto2.woff) format('woff'),
       url(~assets/fonts/noto2.ttf) format('truetype');
  font-weight: normal;
  font-style: normal;
}

:root {
    /* default color  */
    --black: #6C757D;
    --gray: #E4E4E4;

    --brown: #6A492B;
    --dark-brown: #47311C;
    --light-brown: #D2AC7F;
}

body {
    font-family: 'Mulish', sans-serif;
    margin : auto 0;
    min-height: 100vh;
    background-color: var(--light-dark-brown);
    color : var(--dark-brown);
    font-size: 14px;
}

h1, h2, h3, h4, h5 {
  font-style: normal;
  font-weight: 900;
}

a {
  font-weight: 900;
  text-decoration: none;
  color: var(--dark-brown);
}

a:hover {
  text-decoration: none;
  color: var(--dark-brown);
}

label {
  cursor: pointer;
}

.button {
  color: var(--dark-brown);
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0);
  font-weight: 900;
  border: 2px solid var(--dark-brown);
  border-bottom: 4px solid var(--dark-brown);
  outline-offset: 4px;
}

.button:hover {
  color: var(--dark-brown);
}

.button:active {
  transform: translateY(2px);
  border-bottom: 2px solid var(--dark-brown);
}

.button:focus {
  outline: none;
  box-shadow: none;
}


.mb-6 {
  margin-bottom: 6rem;
}
</style>

