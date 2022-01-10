<template>
  <div>
    <header>Create Your Account</header>
    <div class="container">
      <router-link class="login link" to="/">
        ALREADY HAVE AN ACCOUNT? LOG IN.</router-link
      >
      <form @submit.prevent="submit">
        <div class="col-md-6">
          <input
            type="text"
            name="first name"
            required
            autofocus
            v-model="userInfo.firstName"
            placeholder="FIRST NAME"
          />
        </div>

        <div class="col-md-6">
          <input
            type="text"
            name="last name"
            required
            autofocus
            v-model="userInfo.lastName"
            placeholder="LAST NAME"
          />
        </div>

        <div class="col-md-6">
          <input
            id="username"
            type="username"
            class="form-control"
            name="username"
            value
            required
            autofocus
            v-model="userInfo.userName"
            placeholder="USERNAME"
          />
        </div>

        <div>
          <vuejs-datepicker
            v-model="userInfo.birthdate"
            placeholder="BIRTHDATE"
            class="date"
          ></vuejs-datepicker>
        </div>

        <div id="gender">
          <div class="radio">
            <input
              type="radio"
              id="gender-f"
              name="gender"
              class="custom-control-input"
              value="♀"
              v-model="userInfo.gender"
            />
            <label> ♀</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="gender-m"
              name="gender"
              class="custom-control-input"
              value="♂"
              v-model="userInfo.gender"
            />
            <label> ♂ </label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="gender-na"
              name="gender"
              class="custom-control-input"
              value="×"
              v-model="userInfo.gender"
            />

            <label> × </label>
          </div>
        </div>

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

        <div class="col-md-6">
          <input
            id="email"
            type="email"
            class="form-control"
            name="email"
            value
            required
            autofocus
            v-model="userInfo.email"
            placeholder="CONFIRM EMAIL"
          />
        </div>

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
          <div
            v-if="!$v.password.minLength && $v.password.$dirty"
            class="error"
          >
            Password must have at least
            {{ $v.password.$params.minLength.min }} characters.
          </div>
        </div>
        <h4 v-if="error">
          {{ error }}
        </h4>

        <button type="submit" class="btn btn-primary">
          <img src="@/assets/Focusregister.png" alt="" />
        </button>
        <vue-recaptcha sitekey="6LfrjgMeAAAAAFORsHioq1Ce23kj9mO-pzC3kixe">
        </vue-recaptcha>
        <p class="legal">
          when you register you agree to our
          <router-link
            to="/terms"
            class="link"
            style="text-decoration: underline"
            >terms and conditions</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import vuejsDatepicker from "vuejs-datepicker";
import { auth, db } from "@/firebase";
import { mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "Register",
  components: { vuejsDatepicker, VueRecaptcha },
  data() {
    return {
      error: null,
      email: "",
      password: "",
      userInfo: this.createEmptyUserInfo(),
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
  },
  props: {
    value: Date,
  },

  computed: {
    ...mapState(["user", "profile"]),
    calcAge(birthdate) {
      var birthday = +new Date(birthdate);
      return ~~((Date.now() - birthday) / 31557600000);
    },
  },
  methods: {
    async submit() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        await this.$router.push({ name: "Verify" });
      } catch (error) {
        this.error = "username and/or email already registered";
      }

      await auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          firebaseUser.sendEmailVerification();
        } else {
          this.error = "Error! Make sure password is longer than 6 characters.";
        }
      });

      await db
        .collection("profiles")
        .doc(this.user.uid)
        .set({
          ...this.userInfo,
        });
      this.userInfo = this.createEmptyUserInfo();
    },
    createEmptyUserInfo() {
      return {
        userName: null,
        firstName: null,
        lastName: null,
        gender: null,
        birthdate: null,
        email: null,
      };
    },
  },
};
</script>

<style scoped>
header {
  background-color: yellow;
  padding: 0.5rem;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

input {
  width: 300px;
  padding: 0.5rem;
  background-color: yellow;
  border: none;
  margin-top: 1rem;
  color: black;
}

.date {
  width: 300px;
  padding: 0.5rem;
  background-color: yellow;
  border: none;
  margin-top: 1rem;
}

::placeholder {
  color: black;
}

button {
  background: none;
  border: none;
  margin-top: 3rem;
}

#gender input {
  width: 70px;
}

#gender {
  display: flex;
  background-color: yellow;
  width: 300px;
  padding: 0 0.5rem 0.5rem 0.5rem;
  margin-top: 1rem;
}

.radio {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.legal {
  font-size: 8px;
  margin-top: 2rem;
}

.login {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  font-size: 16px;
  font-weight: 600;
}

.login:hover {
  text-decoration: underline;
}

h4 {
  margin: 2rem;
  color: red;
}
</style>
