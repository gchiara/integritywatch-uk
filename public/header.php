<nav class="navbar navbar-expand-lg navbar-light" id="iw-nav">
  <a class="navbar-brand" href="https://www.transparency.org.uk/" target="_blank"><img src="./images/ti_uk_logo.png" alt="" /> </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a href="./" class="nav-link" :class="{active: page == 'tabA'}">Open Access Home</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Other versions
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="https://www.integritywatch.eu/" target="_blank">EU</a>
          <a class="dropdown-item" href="https://www.integritywatch.fr/" target="_blank">France</a>
          <a class="dropdown-item" href="http://www.soldiepolitica.it/" target="_blank">Italy</a>
          <a class="dropdown-item" href="https://integritywatch.cl/" target="_blank">Chile</a>
        </div>
      </li>
      <li class="nav-item">
        <a href="https://www.transparency.org.uk/donate" class="donate-btn" target="_blank">DONATE</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a href="./about.php" class="nav-link">About</a>
      </li>
      <li class="nav-item">
        <i class="material-icons nav-link icon-btn info-btn" @click="showInfo = !showInfo">info</i>
      </li>
    </ul>
  </div>
</nav>