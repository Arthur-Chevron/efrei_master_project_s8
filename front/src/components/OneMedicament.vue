<template>
    <transition name="one-medicament">
        <div class="one-medicament" v-if="open">
            <div class="one-medicament__body">
                <p class="one-medicament__body__title canala-deck">Prise de médicaments</p>
                <p class="one-medicament__body__sub-title" v-if="modif">Médicament : {{ medicament.name }}</p>
                <p class="one-medicament__body__sub-title" v-if="!modif">Ajouter un médicament</p>

                <form
                    class="one-medicament__body__form"
                    @submit.prevent="update"
                    v-if="modif"
                >
                    <input
                        class="one-medicament__body__form-input"
                        type="text"
                        v-model="medicamentData.name"
                        placeholder="Nom du médicament"
                        required
                    />


                    <p class="one-medicament__body__form_p">Durée de la prise (en jours)</p>
                    <input
                        class="one-medicament__body__form-input"
                        type="number"
                        min="1"
                        max="1000000"
                        v-model="medicamentData.duree"
                        placeholder="Durée de la prise"
                        required
                    />

                    <p class="one-medicament__body__form_p">Horaire de la prise</p>
                    <input
                        class="one-medicament__body__form-input"
                        type="time"
                        v-model="medicamentData.hour"
                        placeholder="Durée de la prise"
                        required
                    />

                    <p class="one-medicament__body__form_p">Nombre de dose</p>
                    <input
                        class="one-medicament__body__form-input"
                        type="number"
                        min="1"
                        max="300"
                        v-model="medicamentData.dose"
                        placeholder="Nombre de dose"
                        required
                    />

                    <button
                        class="one-medicament__body__form-button-modif hover"
                    >Modifier</button>
                </form>

                <form
                    class="one-medicament__body__form"
                    @submit.prevent="add"
                    v-if="!modif"
                >
                    <input
                        class="one-medicament__body__form-input"
                        type="text"
                        v-model="medicamentData.name"
                        placeholder="Nom du médicament"
                        required
                    />


                    <p class="one-medicament__body__form_p">Durée de la prise (en jours)</p>
                    <input
                        class="one-medicament__body__form-input"
                        type="number"
                        min="1"
                        max="1000000"
                        v-model="medicamentData.duree"
                        placeholder="Durée de la prise"
                        required
                    />

                    <p class="one-medicament__body__form_p">Horaire de la prise</p>
                    <input
                        class="one-medicament__body__form-input"
                        type="time"
                        v-model="medicamentData.hour"
                        placeholder="Durée de la prise"
                        required
                    />

                    <p class="one-medicament__body__form_p">Nombre de dose</p>
                    <input
                        class="one-medicament__body__form-input"
                        type="number"
                        min="1"
                        max="300"
                        v-model="medicamentData.dose"
                        placeholder="Nombre de dose"
                        required
                    />

                    <button
                        class="one-medicament__body__form-button-modif hover"
                    >Ajouter</button>
                </form>

                <button
                    class="one-medicament__body__form-button-stop hover"
                    v-on:click="deleteMedicament"
                    v-if="modif"
                >Arrêter la prise</button>

                <button
                    class="one-medicament__body__form-button-canceled hover"
                    v-on:click="$emit('medicament', {open: false, medicament: medicament, modif: false, add: false, delete: false, update: false})"
                >Annuler</button>
            </div>
        </div>
    </transition>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "OneMedicament",
        
        props: {
            open: Boolean,
            modif: Boolean,
            medicament: Object,
            addProps: Boolean
        },

        data: () => ({
            medicamentData: {}
        }),

        methods: {
            async update() {
                try {
                    this.medicamentData.duration = parseInt(this.medicamentData.duree * 24)
                    this.medicamentData.time = parseInt(this.medicamentData.hour.split(':')[0]) + parseFloat((this.medicamentData.hour.split(':')[1] / 60).toFixed(2))

                    await axios.put(
                        process.env.VUE_APP_URL_API + '/medications',
                        this.medicamentData,
                        {
                            headers: {
                                "Authorization": `Bearer ${this.$cookies.get('cookieMOP')}`
                            }
                        }
                    )

                    return this.$emit('medicament', {open: false, medicament: this.medicamentData, modif: false, update: true})

                } catch(err) {
                    return this.$emit('error', err.response.data.message)
                }
            },

            async add() {
                try {
                    this.medicamentData.duration = parseInt(this.medicamentData.duree * 24)
                    this.medicamentData.time = parseInt(this.medicamentData.hour.split(':')[0]) + parseFloat((this.medicamentData.hour.split(':')[1] / 60).toFixed(2))
                    this.medicamentData.intervals = 15.50

                    await axios.post(
                        process.env.VUE_APP_URL_API + '/medications',
                        this.medicamentData,
                        {
                            headers: {
                                "Authorization": `Bearer ${this.$cookies.get('cookieMOP')}`
                            }
                        }
                    )

                    return this.$emit('medicament', {open: false, medicament: this.medicamentData, modif: false, add: true})

                } catch(err) {
                    return this.$emit('error', err.response.data.message)
                }
            },

            async deleteMedicament() {
                try {

                    await axios.delete(
                        process.env.VUE_APP_URL_API + '/medications?_id=' + this.medicamentData._id,
                        {
                            headers: {
                                "Authorization": `Bearer ${this.$cookies.get('cookieMOP')}`
                            }
                        }
                    )

                    return this.$emit('medicament', {open: false, medicament: this.medicamentData, modif: false, delete: true})

                } catch(err) {
                    console.log(err)
                    return this.$emit('error', err.response.data.message)
                }
            }
        },

        watch: {
            'open': function(val) {
                if (val) {
                    
                    console.log(this.addProps)
                    if (!this.addProps) {
                        for (const property in this.medicament) this.medicamentData[`${property}`] = this.medicament[property]
                        this.medicamentData.duree = parseFloat(this.medicamentData.duree.split(" ")[0])
                    } else {
                        this.medicamentData = {
                            name: "",
                            duration: "",
                            dose: "",
                            time: "",
                            hour: "",
                            duree: ""
                        }
                    } 
                }
            }
        }
    }

</script>

<style scoped>

    .one-medicament-enter, .one-medicament-leave-to {
        opacity: 0;
    }

    .one-medicament-enter-active, .one-medicament-leave-active {
        transition: opacity 0.2s ease;
    }

    .one-medicament {
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
        box-shadow: 0 15px 40px 0 rgba(55, 61, 91, .10);
        width: 60vw;
        height: 85vh;
        overflow: scroll;
    }
    .one-medicament__body {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        padding: 5% 10%;
    }

    .one-medicament__body__title,
    .one-medicament__body__content__title {
        font-size: 2vw;
        font-weight: 700;
        margin: 2% 0 0;
    }

    .one-medicament__body__title__sub-title,
    .one-medicament__body__content__sub-title {
        font-size: 1vw;
    }

    .one-medicament__body__form {
        width: 50%;
        margin: 2% auto;
    }

    .one-medicament__body__form-input {
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
        width: calc(100% - 12px);
        outline: none !important;

        display: block;
    }    
    .one-medicament__body__form-input:focus {
        border-radius: 4px;
        box-shadow: 0 0 0 1px rgba(18, 100, 163, 1), 0 0 0 5px #1d9bd14d;
        outline: none !important;
        transition: border 80ms ease-out, box-shadow 80ms ease-out;
    }

    .one-medicament__body__form-button-stop,
    .one-medicament__body__form-button-canceled,
    .one-medicament__body__form-button-modif {
        border: none;
        color: #fff;
        border-radius: 4px;
        margin-bottom: 20px;
        width: 50%;
        height: 36px;
        font-size: 1vw;
        font-weight: 700;
        padding: 0 2%;
        opacity: 1;
        transition: all 0.2s ease-in;
        margin: 1% auto;
        display: block;
    }

    .one-medicament__body__form-button-stop:hover,
    .one-medicament__body__form-button-canceled:hover,
    .one-medicament__body__form-button-modif:hover {
        opacity: 0.8;
        transition: all 0.2s ease-in;
    }

    .one-medicament__body__form-button-modif {
        background-color: var(--blue);
    }

    .one-medicament__body__form-button-canceled {
        background-color: white;
        color: black;
    }

    .one-medicament__body__form-button-stop {
        background-color: var(--red);
    }

    .one-medicament__body__form_p {
        font-size: 1vw;
        text-align: left;
        margin: 2% 0;
    }

</style>