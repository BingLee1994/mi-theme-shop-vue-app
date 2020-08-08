<template>
    <button
        :class="['play-btn', this.playing? 'pause': '']"
        @click.stop="playAudio"
    ></button>
</template>

<script>
import testAudio from '../../assets/ringtone.mp3'

export default {
    name: 'TestPlayButton',
    data() {
        return {
            playing: false
        }
    },
    created() {
        this.stop = _ => { this.playing = false }
        this.audio = new Audio()
        this.audio.addEventListener('ended', this.stop)
    },
    methods: {
        playAudio() {
            if (!this.playing) {
                this.audio.setAttribute('src', testAudio)
                this.audio.play()
                this.playing = true
                this.$toast.show('Are you OK!')
            } else {
                this.audio.pause()
                this.playing = false
            }
        }
    },
    beforeDestroy() {
        this.audio.removeEventListener('ended', this.stop)
        this.audio = null
    }
}
</script>

<style lang="scss" scoped>
.play-btn {
    width: 30px;
    height: 30px;
    opacity: .5;
    filter: brightness(1.5);
    @include bg-center(25px 25px);
    background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIiBzdHlsZT0id2lkdGg6IDFlbTtoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGRpbWdyZXk7b3ZlcmZsb3c6IGhpZGRlbjsiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgcC1pZD0iMTU5NCI+PHBhdGggZD0iTTUxMiA5NjBDMjY1LjYgOTYwIDY0IDc1OC40IDY0IDUxMlMyNjUuNiA2NCA1MTIgNjRzNDQ4IDIwMS42IDQ0OCA0NDgtMjAxLjYgNDQ4LTQ0OCA0NDh6IG0wLTgzMmMtMjExLjIgMC0zODQgMTcyLjgtMzg0IDM4NHMxNzIuOCAzODQgMzg0IDM4NCAzODQtMTcyLjggMzg0LTM4NC0xNzIuOC0zODQtMzg0LTM4NHogbS03OC40IDU0NGMtNC44IDAtMTEuMi0xLjYtMTYtNC44LTkuNi02LjQtMTYtMTYtMTYtMjcuMlYzODRjMC0xMS4yIDYuNC0yMi40IDE2LTI3LjIgOS42LTYuNCAyMi40LTYuNCAzMiAwbDIyMi40IDEyOGM5LjYgNi40IDE2IDE2IDE2IDI3LjJzLTYuNCAyMi40LTE2IDI3LjJsLTIyMi40IDEyOGMtNC44IDMuMi0xMS4yIDQuOC0xNiA0Ljh6IG0zMi0yMzJ2MTQ1LjZsMTI2LjQtNzJMNDY1LjYgNDQweiIgcC1pZD0iMTU5NSIvPjwvc3ZnPg==");
}

.pause {
    background-size: 23px 23px;
    background-image:url("data:image/svg+xml;utf-8,%3Csvg%20class%3D%22icon%22%20style%3D%22width%3A%201em%3B%20height%3A%201em%3Bvertical-align%3A%20middle%3Bfill%3A%20currentColor%3Boverflow%3A%20hidden%3B%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222411%22%3E%3Cpath%20d%3D%22M512.1%200.2C229.8%200.2%200.2%20229.8%200.2%20512.1S229.8%201024%20512.1%201024%201024%20794.4%201024%20512.1%20794.4%200.2%20512.1%200.2z%20m0%20958.1c-246%200-446.2-200.2-446.2-446.2S266%2065.9%20512.1%2065.9s446.2%20200.2%20446.2%20446.2-200.1%20446.2-446.2%20446.2zM418.2%20306.8c-18.1%200-32.8%2014.7-32.8%2032.8v345c0%2018.1%2014.7%2032.8%2032.8%2032.8s32.8-14.7%2032.8-32.8v-345c0.1-18.1-14.6-32.8-32.8-32.8zM606%20306.8c-18.1%200-32.8%2014.7-32.8%2032.8v345c0%2018.1%2014.7%2032.8%2032.8%2032.8%2018.1%200%2032.8-14.7%2032.8-32.8v-345c0-18.1-14.7-32.8-32.8-32.8z%22%20p-id%3D%222412%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
}

.play:active {
    opacity: .9;
}
</style>
