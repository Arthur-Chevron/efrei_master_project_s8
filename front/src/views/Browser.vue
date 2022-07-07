<template>
    <div class="browser">
        <Menu class="browser__menu" />

        <div class="browser__body">
            <p class="browser__body__title canala-deck">Bonjour {{ user.firstname }}</p>
            <p class="browser__body__sub-title">Nous espérons que vous allez pour le mieux.</p>
        </div>        



        
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Browser",

        components: {
            Menu: () => import('../components/Menu')
        },

        data: () => ({
            user: {}
        }),

        async created() {
            await this.getMySelf()
            if (this.$route.query.on === "boarding") this.$emit('on-boarding', true) 
        },

        methods: {
            async getMySelf() {
                try {
                    const res = await axios.get(
                        process.env.VUE_APP_URL_API + '/users',
                        {
                            headers: {
                                "Authorization": `Bearer ${this.$cookies.get('cookieMOP')}`
                            }
                        }
                    )
                    
                    this.user = res.data.result

                } catch(err) {
                    return this.$emit('error', err.response.data.message)
                }
            }
        }
    }

</script>

<style scoped>
    .browser__menu {
        position: fixed;
        top: 0;
        left: 0;
    }

    .browser__body {
        width: 81%;
        margin-left: 15%;
        padding: 3% 2%;
    }

    .browser__body__title {
        font-weight: 700;
        font-size: 2vw;
        margin: 0;
    }

    .browser__body__sub-title {
        font-size: 1vw;
    }

</style>