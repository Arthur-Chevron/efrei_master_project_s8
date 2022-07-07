<template>
    <div class="login">

        <img
            class="login__image"
            src="~@/assets/logo.svg"
            alt="logo"
        />
        
        <h2 class="login__title canala-deck ">Se connecter à MOP</h2>
        <p class="login__sub-title">Bonjour, ravis de vous revoir parmis nous !</p>

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

            <button class="login__form-button hover">Se connecter</button>
        </form>

        <p class="login__information">
            Vous découvrez MOP ?
            <span
                class="login__information-span hover"
                v-on:click="$router.push({path: '/signup'})"
            >Inscrivez-vous</span>
        </p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Login",

        data: () => ({
            email: '',
            password: ''
        }),

        methods: {
            async login() {
                try {
                    this.email = "arthur.chevron4@gmail.com"
                    this.password = 'Arthur2000'
                    
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
        margin: 10% auto;
        text-align: center;
    }

    .login__image {
        width: 10%;
    }

    .login__form {
        width: 50%;
        padding: 1% 5% 4%;
        margin: 0 auto;
        text-align: center;
    }

    .login__title {
        font-size: 3vw;
        font-weight: 700;
        margin: 2% 0 0;
    }

    .login__sub-title {
        font-size: 1vw;
    }

    .login__form-input {
        padding: 11px 12px 13px;
        height: 44px;
        font-size: 1vw;
        line-height: 1.33333333;

        border-radius: 4px;
        border: 1px solid var(--border);
        transition: border 80ms ease-out, box-shadow 80ms ease-out;
        box-sizing: border-box;
        margin: 0 auto 20px;
        padding: 1% 2%;
        height: 36px;
        width: 50%;
        outline: none !important;

        display: block;
    }    
    .login__form-input:focus {
        border-radius: 4px;
        box-shadow: 0 0 0 1px rgba(18, 100, 163, 1), 0 0 0 5px #1d9bd14d;
        outline: none !important;
        transition: border 80ms ease-out, box-shadow 80ms ease-out;
    }

    .login__form-button {
        background-color: var(--blue);
        border: none;
        color: #fff;
        border-radius: 4px;
        margin-bottom: 20px;
        width: 50%;
        height: 36px;
        font-size: 1vw;
        font-weight: 900;
        padding: 0 2%;
        opacity: 1;
        transition: all 0.2s ease-in;
    }

    .login__form-button:hover {
        opacity: 0.8;
        transition: all 0.2s ease-in;
    }

    .login__information {
        font-size: 1vw;
    }

    .login__information-span {
        color: var(--blue);
        font-weight: 500;
    }
</style>