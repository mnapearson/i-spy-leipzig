<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div>
          <h1>Register</h1>
          <div class="card-body">
            <form @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right"
                  >Name</label
                >

                <div class="col-md-6">
                  <input
                    type="text"
                    name="name"
                    required
                    autofocus
                    v-model="userInfo.name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="username"
                  class="col-md-4 col-form-label text-md-right"
                  >Username</label
                >

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
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="age" class="col-md-4 col-form-label text-md-right"
                  >Age</label
                >

                <div class="col-md-6">
                  <input
                    v-model="userInfo.age"
                    class="mb-4 border-black w-full"
                    required
                  />
                </div>
              </div>
              <div id="gender" class="form-group">
                <label>If you want to identify as:</label>
                <br />

                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="gender-f"
                    name="gender"
                    class="custom-control-input"
                    value="female"
                    v-model="userInfo.gender"
                  />
                  <label class="custom-control-label" for="gender-f"
                    >Female</label
                  >
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="gender-m"
                    name="gender"
                    class="custom-control-input"
                    value="male"
                    v-model="userInfo.gender"
                  />
                  <label class="custom-control-label" for="gender-m"
                    >Male</label
                  >
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="gender-na"
                    name="gender"
                    class="custom-control-input"
                    value="non-binary"
                    v-model="userInfo.gender"
                  />
                  <label class="custom-control-label" for="gender-na"
                    >Non-binary</label
                  >
                </div>
              </div>
              <div class="email-info">
                <div class="form-group">
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

                <div class="form-group">
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
                    <div
                      v-if="!$v.password.minLength && $v.password.$dirty"
                      class="error"
                    >
                      Password must have at least
                      {{ $v.password.$params.minLength.min }} charachters.
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <h4 v-if="error">
      {{ error }}
    </h4>
  </div>
</template>

<script>
import { auth, db } from "@/firebase";
import { mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Register",

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
  },
  methods: {
    async submit() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        await this.$router.push({ name: "Home" });
      } catch (error) {
        this.error = "You have an account!";
      }

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
        name: null,
        gender: null,
        age: null,
      };
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

h1 {
  margin-bottom: 1rem;
}

input {
  margin: 0.5rem 0;
}

button {
  margin-top: 1rem;
}

h4 {
  font-size: 28px;
  color: red;
  margin: 3rem;
  text-transform: uppercase;
}

.email-info {
  margin-top: 3rem;
}
</style>
