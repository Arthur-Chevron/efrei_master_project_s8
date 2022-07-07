<template>
    <div class="signup">
        <img
            class="signup__image"
            src="~@/assets/logo.svg"
            alt="logo"
        />
        
        <h2 class="signup__title canala-deck ">S'inscrire chez MOP</h2>
        <p class="signup__sub-title">Bonjour, bienvenue parmis nous !<br>
            Avec MOP, n'oubliez plus de prendre votre traitement.
        </p>

        <form
            class="signup__form"
            @submit.prevent="signup"
        >
            <div class="signup__form__name">
                <input
                    class="signup__form-input"
                    type="text"
                    v-model="user.firstname"
                    placeholder="Prénom"
                    required
                />

                <input
                    class="signup__form-input"
                    type="text"
                    v-model="user.lastname"
                    placeholder="Nom"
                    required
                />
            </div>

            <input
                class="signup__form-input"
                type="email"
                v-model="user.email"
                placeholder="adresse@email.com"
                required
            />

            <input
                class="signup__form-input"
                type="password"
                v-model="user.password"
                placeholder="motdepasse"
                required
            />

            <div class="signup__form__birth">
                <input
                    v-on:input="birthday"
                    id="day"
                    class="signup__form-input"
                    type="number"
                    v-model="day"
                    placeholder="JJ"
                    min="1" max="31"
                    required
                />

                <input
                    v-on:input="birthday"
                    id="month"
                    class="signup__form-input"
                    type="number"
                    v-model="month"
                    placeholder="MM"
                    min="1" max="12"
                    required
                />

                <input
                    v-on:input="birthday"
                    id="year"
                    class="signup__form-input"
                    type="number"
                    v-model="year"
                    placeholder="AAAA"
                    min="1900" max="2021"
                    required
                />
            </div>

            <button class="signup__form-button hover">S'inscrire</button>
        </form>

        <p class="signup__information">
            Vous connaissez MOP ?
            <span
                class="signup__information-span hover"
                v-on:click="$router.push({path: '/'})"
            >Connectez-vous</span>
        </p>

        <p class="signup__cgv">
            En continuant, vous acceptez nos Conditions d’utilisation client, nos Conditions d’utilisation,<br>
            notre Politique de confidentialité et notre Politique de cookies.
        </p>
    </div>
</template>



<script>
    import axios from 'axios'

    export default {
        name: "Signup",

        data: () => ({
            user: {
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                birth: '',
                roles: 1
            },
            day: '',
            month: '',
            year: ''
        }),

        created() {
            this.user.email = 'arthur.chevron4@gmail.com'
            this.user.password = 'Arthur2000'
            this.user.firstname = 'Arthur'
            this.user.lastname = 'Chevron'
            this.day = 4
            this.month = 1
            this.year = 2000
        },

        methods: {
            async signup() {
                try {
                    if (this.day === '' || this.month === '' || this.year === '') return this.$emit('error', "Date invalide")
                    if (this.day < 1 || this.day > 31) return this.$emit('error', "Jour invalide")
                    if (this.month < 1 || this.month > 12) return this.$emit('error', "Mois invalide")

                    if(this.day.toString().length === 1) this.day = '0' + this.day
                    if(this.month.toString().length === 1) this.month = '0' + this.month
                    
                    this.user.birth = `${this.month}/${this.day}/${this.year}`

                    const res = await axios.post(
                        process.env.VUE_APP_URL_API + '/users',
                        this.user
                    )

                    this.$cookies.set('cookieMOP', res.data.accessToken, "3h", null, process.env.VUE_APP_DOMAIN, process.env.VUE_APP_SECURE_COOKIE)

                    return this.$router.push({path: '/browser?on=boarding'})

                } catch(err) {
                    console.log(err)
                    return this.$emit('error', err.response.data.message)
                }
            },

                birthday(){
                    if (this.day.length === 2 && this.month.length !== 2) document.getElementById('month').focus()
                    if (this.month.length === 2 && this.day.length === 2) document.getElementById('year').focus()
                },
        }
    }

</script>


<style scoped>

    .signup {
        margin: 7.5% auto;
        text-align: center;
    }

    .signup__image {
        width: 10%;
    }

    .signup__form {
        width: 50%;
        padding: 1% 5%;
        margin: 0 auto;
        text-align: center;
    }

    .signup__title {
        font-size: 3vw;
        font-weight: 700;
        margin: 2% 0 0;
    }

    .signup__sub-title {
        font-size: 1vw;
    }

    .signup__form-input {
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
    .signup__form-input:focus {
        border-radius: 4px;
        box-shadow: 0 0 0 1px rgba(18, 100, 163, 1), 0 0 0 5px #1d9bd14d;
        outline: none !important;
        transition: border 80ms ease-out, box-shadow 80ms ease-out;
    }

    .signup__form-button {
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

    .signup__form-button:hover {
        opacity: 0.8;
        transition: all 0.2s ease-in;
    }

    .signup__information {
        font-size: 1vw;
    }

    .signup__information-span {
        color: var(--blue);
        font-weight: 500;
    }

    .signup__cgv {
        font-size: 1vw;
        color: var(--border)
    }

    .signup__form__birth, .signup__form__name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
        margin: 0 auto;
    }

    .signup__form__name .signup__form-input {
        width: 48%;
        margin-left: 0;
        margin-right: 0;
    }

    .signup__form__birth .signup__form-input {
        width: 30%;
        margin-left: 0;
        margin-right: 0;
    }
</style>