<template>
  <div>
    <template v-if="!user">
      <div class="container">
        <img src="@/assets/pepicons_eye.png" alt="" />
        <h1>i spy</h1>
        <div class="login">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="submit">
                <div class="form-group row">
                  <div class="col-md-6">
                    <input
                      id="email"
                      type="email"
                      class="form-control"
                      name="email"
                      value
                      required
                      autofocus
                      v-model="email"
                      placeholder="EMAIL"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-md-6">
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      name="password"
                      required
                      v-model="password"
                      placeholder="PASSWORD"
                    />
                  </div>
                  <div class="login-option">
                    <button type="submit">
                      <img src="@/assets/FocusLOGIN.png" alt="" />
                    </button>

                    <router-link class="extras" to="/about"
                      >NEED HELP?</router-link
                    >
                  </div>
                </div>

                <h4 v-if="error">
                  {{ error }}
                </h4>

                <PasswordReset
                  v-if="showPasswordReset"
                  @close="togglePasswordReset()"
                ></PasswordReset>
              </form>
            </div>
          </div>
        </div>

        <router-link class="link" to="/Register"
          >DON'T HAVE AN ACCOUNT? CREATE ONE.</router-link
        >
      </div>
    </template>
  </div>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";
import { auth } from "@/firebase";
import { mapState } from "vuex";

export default {
  components: {
    PasswordReset,
  },
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: null,
      showPasswordReset: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    async submit() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        await this.$router.push({ name: "Home" });
      } catch (error) {
        this.error = "Invalid email or password.";
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 0;
  background: none;
  border: none;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5rem;
}

h1 {
  font-weight: 100;
  font-size: 40px;
}

input {
  margin: 0.5rem 0;
  width: 300px;
  padding: 0.5rem;
  background-color: black;
  color: white;
  border: white;
}

::placeholder {
  color: white;
  font-size: 18px;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
}

.link {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  font-size: 16px;
  text-decoration: none;
  color: red;
}

.link:hover {
  text-decoration: underline;
}

.login-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
}

.extras {
  font-size: 14px;
  margin: 1rem;
  font-style: italic;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.extras:hover {
  text-decoration: underline;
}

h4 {
  margin-top: 2rem;
  color: red;
}
</style>
