<template>
    <div class="browser">
        <p>Bonjour Arthur</p>
        <p>{{ user }}</p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Browser",

        data: () => ({
            user: []
        }),

        async created() {
            this.getMySelf()
        },

        methods: {
            async getMySelf() {
                try {
                    const res = await axios(
                        process.env.VUE_APP_URL_API + '/users',
                        {
                            headers: {
                                "Authorization": `Bearer ${this.$cookies.get('cookieMOP')}`
                            }
                        }
                    )
                    
                    this.user = res.data.result

                } catch(err) {
                    return this.$emit('error', err.responsee.data.message)
                }
            }
        }
    }

</script>