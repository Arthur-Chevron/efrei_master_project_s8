<template>
    <div class="login">

        <form
            class="login__form"
            @submit.prevent="login"
        >
            <input
                class="login__form-input"
                type="email"
                v-model="email"
                placeholder="adresse@email.com"
                required
            />

            <input
                class="login__form-input"
                type="password"
                v-model="password"
                placeholder="motdepasse"
                required
            />

            <button class="login__form-button">Se connecter</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Login",

        data: () => ({
            email: 'arthur.chevron4@gmail.com',
            password: 'Arthur2000'
        }),

        methods: {
            async login() {
                try {
                    const res = await axios.post(
                        process.env.VUE_APP_URL_API + '/users/login',
                        {email: this.email, password: this.password}
                    )

                    this.$cookies.set('cookieMOP', res.data.accessToken, "3h", null, process.env.VUE_APP_DOMAIN, process.env.VUE_APP_SECURE_COOKIE)

                    return this.$router.push({path: '/browser'})
                    
                } catch(err) {
                    console.log(err.response.data.message)
                    return this.$emit('error', err.response.data.message)
                }
             }
        },
    }

</script>


<style scoped>

.login {
    margin: 15% auto;
}

</style>