<template>
    <div class="login">
        <h1 class="login__h1">Welcome in your Gmail & Tasks app</h1>
        <p>You can find all your Gmail emails and Tasks in the same space.<br>Create and perform your tasks. All on the same application.</p>

        <div class="login__all-buttons">
            <button class="login__all-buttons__button" v-on:click="login">Get started</button>
            <button class="login__all-buttons__button" v-on:click="login">Login to the app</button>
        </div>
        
        <img class="login__image" src="https://lh3.googleusercontent.com/3gccuO3mLZUugraAc07heH8Pl6QuoyDC8XuGlgnz8PJ43hUZgs4Av7Op-fRrURI1vyTnkbYFXjUIBvjaQOtkZM6emxoPogrkoG_heMLg=rw-e365-w2880"/>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Login",

        methods: {
            async login() {
                try {

                    const res = await axios.get(process.env.VUE_APP_URL_MAIL_API + '/auth')

                    // window.open(res.data.url)
                    // window.open(res.data.url, "Login Google Gmail", "height=200,width=200");
                    window.open(res.data.url, '_self')


                } catch(err) {
                    return console.log(err)
                }
             }
        },
    }

</script>


<style scoped>

.login {
    margin: 15% auto;
}

.login__h1 {
    font-size: 3vw;
}

.login__all-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin: 2% auto;
    width: 22.5%;
}


.login__all-buttons__button {
    border: 1px solid var(--light-grey);
    color: var(--blue-google);
    background: white;
    border-radius: 5px;

    font-size: 16px;
    font-weight: 500;
    letter-spacing: .1px;
    line-height: 24px;
    align-items: center;
    appearance: none;
    -webkit-appearance: none;
    background-color: #1a73e8;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    padding: 12px 24px 11px;
    text-decoration: none;
    text-rendering: optimizeLegibility;
}

.login__image {
    margin: 0 5% 0 15%;
    width: 80%;
}

</style>