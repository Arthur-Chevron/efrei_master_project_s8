<template>
    <div class="menu">
        <div class="menu__logo hover"  v-on:click="$router.push('/browser')"></div>

        <div class="menu__content">

            <div
                v-on:click="$router.push({path: '/browser'})"
                class="menu__content__tab hover"
                v-bind:class="{'menu__content__tab-active': $route.path === '/browser'}"
            >
                <p>Dashboard</p>
            </div>

            <div
                v-on:click="$router.push({path: '/browser/medications'})"
                class="menu__content__tab hover"
                v-bind:class="{'menu__content__tab-active': $route.path === '/browser/medications'}"
            >

                <p>Medicaments</p>
            </div>

            <div
                v-on:click="$router.push({path: '/browser/difficulties'})"
                class="menu__content__tab hover"
                v-bind:class="{'menu__content__tab-active': $route.path === '/browser/difficulties'}"
            >

                <p>Difficultés</p>
            </div>

            <div
                v-on:click="$router.push({path: '/browser/settings'})"
                class="menu__content__tab hover"
                v-bind:class="{'menu__content__tab-active': $route.path === '/browser/settings'}"
            >

                <p>Settings</p>
            </div>

            <div
                v-on:click="deconnected"
                class="menu__content__tab hover"
                v-bind:class="{'menu__content__tab-active': $route.path === '/browser/settings'}"
            >

                <p>Se déconnecter</p>
            </div>
            
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Menu",

        methods: {
            async deconnected() {
                try {
                    await axios.get(process.env.VUE_APP_URL_API + '/users/deconnected')
                    this.$cookies.remove('cookieMOP')
                    this.$router.push('/login')

                } catch(err) {
                    return this.$emit('error', err.response.data.message)
                }
            }
        }
    }

</script>

<style scoped>
    .menu {
        height: 100vh;
        width: 10%;
        padding: 50px 0;
        border-right: 1px solid var(--grey);
        background: white;
        z-index: 10;
        padding: 2.5%;
    }
    .menu__logo {
        width: 75px;
        height: 75px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5% 10%;
        background-image: url('https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg');
    }

    .menu__content {
        padding: 5% 0;
    }

    .menu__content__tab-active {
        color: var(--blue);
    }

    .menu__content__tab p {
        font-size: 1vw;
    }


</style>