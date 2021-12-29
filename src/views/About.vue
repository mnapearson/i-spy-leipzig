<template>
  <div>
    <header>i spy FAQ</header>
    <ul>
      <li>How do I reset my password?</li>
      <p>
        If you wish to reset your password, please contact our team at
        hi@ispyleipzig.de
      </p>
      <li>How do I delete my account?</li>
      <p>
        If you wish to delete your account, please contact our team at
        hi@ispyleipzig.de
      </p>
      <li>Can I recover a deleted account?</li>
      <p>No, we’re unable to recover a deleted account at this time.</p>
      <li>How do you block or report someone?</li>
      <p>
        If you want to delete or block another user, please contact our team at
        hi@ispyleipzig.de.
      </p>
      <li>How do I unlock my account?</li>
      <p>
        To unlock your account, please contact our team at hi@ispyleipzig.de.
      </p>
      <li>How do I report a fake account?</li>
      <p>
        If you believe that another user’s account is fraudulent, please contact
        our team at hi@ispyleipzig.de.
      </p>
      <li>How can I reach out with general questions or concerns?</li>
      <p>
        If you have any questions or concerns, please contact our team at
        hi@ispyleipzig.de.
      </p>
    </ul>
    <footer>
      <div class="footer-left">
        <p>
          <a class="link" href="https://www.instagram.com/ispyleipzig/"
            >instagram</a
          >
        </p>
        <p>
          <a class="link" href="https://twitter.com/ISPYLEIPZIG">twitter</a>
        </p>
      </div>

      <div class="footer-right">
        <p>
          <router-link to="/privacy" class="link">privacy policy</router-link>
        </p>
        <p>
          <router-link to="/impressum" class="link">impressum</router-link>
        </p>
      </div>
    </footer>
    <div class="navigation" v-if="user">
      <nav>
        <router-link class="link" to="/home"
          ><img src="@/assets/pepicons_eyesmall.png"
        /></router-link>

        <router-link class="link" to="spy"
          ><img src="@/assets/postbutton.png"
        /></router-link>
        <!-- <router-link class="link" to="/About"
              ><i class="fas fa-question-circle"></i
            ></router-link> -->

        <router-link class="link" to="/Account">
          <img src="@/assets/accounblack.png"
        /></router-link>

        <button v-if="user" @click.prevent="signOut">
          <img src="@/assets/logout.png" />
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  background-color: blue;
  padding: 0.5rem;
  color: white;
}

ul {
  list-style: none;
  padding: 0 0.5rem 4rem;
}

li {
  margin: 1rem 0;
  font-weight: bold;
  background-color: blue;
  padding: 0.5rem;
  color: white;
}

p {
  margin: 0.5rem;
}

footer {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 4rem 0;
  text-align: center;
}

.footer-left,
.footer-right {
  margin-bottom: 1rem;
  display: flex;
}

.footer-left p,
.footer-right p {
  margin: 0 1rem;
}
</style>
