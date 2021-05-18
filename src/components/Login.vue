<template>
  <div>
    <template v-if="!user">
      <div class="container">
        <h1>Time to start spying...</h1>
        <div class="login">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="submit">
                <div class="form-group row">
                  <label
                    for="email"
                    class="col-md-4 col-form-label text-md-right"
                    >Email</label
                  >

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
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="password"
                    class="col-md-4 col-form-label text-md-right"
                    >Password</label
                  >

                  <div class="col-md-6">
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      name="password"
                      required
                      v-model="password"
                    />
                  </div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
                <h4 v-if="error">
                  {{ error }}
                </h4>
                <div class="extras">
                  <a @click="togglePasswordReset()">Forgot Password?</a>
                </div>
                <PasswordReset
                  v-if="showPasswordReset"
                  @close="togglePasswordReset()"
                ></PasswordReset>
              </form>
            </div>
          </div>
        </div>
        <h1>Need to create an account?</h1>
        <button>
          <router-link class="link" to="/Register">REGISTER</router-link>
        </button>
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
}

.login {
  display: flex;
  flex-direction: column;
  margin: 2rem;
  justify-content: center;
}

.extras {
  margin: 2rem;
}

button {
  margin-top: 1rem;
}

h4 {
  margin-top: 2rem;
  color: red;
}
</style>
