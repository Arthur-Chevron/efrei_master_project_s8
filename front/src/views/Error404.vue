<script>
    export default {
        name: 'Error404',
        // redirect user to the home page
        created() {
            return this.$router.push({path: '/'})
        }
    }
</script>

