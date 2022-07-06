<template>
    <transition name="error">
        <div class="error" v-if="open">
            <div class="error__body">
                <svg class="error__body__chechmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="error__body__chechmark-circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="error__body__chechmark-check" fill="none" d="M16 16 36 36 M36 16 16 36" />
                </svg>
                <p class="error__body__p">{{ msg }}</p>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        props: {
            msg: String,
            open: Boolean
        }
    }

</script>

<style scoped>

    .error-enter, .error-leave-to {
        opacity: 0;
    }

    .error-enter-active, .error-leave-active {
        transition: opacity 0.2s ease;
    }

    .error {
        background: rgba(255,255,255,1);
        border-radius: 5px;
        border: 2px solid white;
        text-align: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        color: black;
        box-shadow: 0 15px 40px 0 rgba(55,61,91,.15);
        width: 20vw;
        height: 30vh;
    }
    .error__body {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .error__body__chechmark-circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: black;
        fill: none;
        animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }
    .error__body__chechmark {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: block;
        stroke-width: 2;
        stroke: black;
        stroke-miterlimit: 10;
        box-shadow: black;
        animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
        margin: 10% auto; /* Will not center vertically and won't work in IE6/7. */
        z-index:101;
    }
    .error__body__chechmark-check {
        transform-origin: 50% 50%;
        stroke-dasharray: 29;
        stroke-dashoffset: 29;
        animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
    }

    .error__body__p {
        margin: 0;
        font-size: 1vw;
    }

    /* animation */
    @keyframes stroke {
        100% {
            stroke-dashoffset: 0;
        }
    }

    @keyframes scale {
        0%, 100% {
            transform: none;
        }
        50% {
            transform: scale3d(1.1, 1.1, 1);
        }
    }

    @keyframes fill {
        100% {
            box-shadow: black;
        }
    }

</style>