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
    @include bg-center(25px 25px);
    background-image:url("data:image/svg+xml;utf-8,%3Csvg%20class%3D%22icon%22%20style%3D%22width%3A%201em%3B%20height%3A%201em%3Bvertical-align%3A%20middle%3Bfill%3A%20currentColor%3Boverflow%3A%20hidden%3B%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%221594%22%3E%3Cpath%20d%3D%22M512%20960C265.6%20960%2064%20758.4%2064%20512S265.6%2064%20512%2064s448%20201.6%20448%20448-201.6%20448-448%20448z%20m0-832c-211.2%200-384%20172.8-384%20384s172.8%20384%20384%20384%20384-172.8%20384-384-172.8-384-384-384z%20m-78.4%20544c-4.8%200-11.2-1.6-16-4.8-9.6-6.4-16-16-16-27.2V384c0-11.2%206.4-22.4%2016-27.2%209.6-6.4%2022.4-6.4%2032%200l222.4%20128c9.6%206.4%2016%2016%2016%2027.2s-6.4%2022.4-16%2027.2l-222.4%20128c-4.8%203.2-11.2%204.8-16%204.8z%20m32-232v145.6l126.4-72L465.6%20440z%22%20p-id%3D%221595%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
}

.pause {
    background-size: 23px 23px;
    background-image:url("data:image/svg+xml;utf-8,%3Csvg%20class%3D%22icon%22%20style%3D%22width%3A%201em%3B%20height%3A%201em%3Bvertical-align%3A%20middle%3Bfill%3A%20currentColor%3Boverflow%3A%20hidden%3B%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222411%22%3E%3Cpath%20d%3D%22M512.1%200.2C229.8%200.2%200.2%20229.8%200.2%20512.1S229.8%201024%20512.1%201024%201024%20794.4%201024%20512.1%20794.4%200.2%20512.1%200.2z%20m0%20958.1c-246%200-446.2-200.2-446.2-446.2S266%2065.9%20512.1%2065.9s446.2%20200.2%20446.2%20446.2-200.1%20446.2-446.2%20446.2zM418.2%20306.8c-18.1%200-32.8%2014.7-32.8%2032.8v345c0%2018.1%2014.7%2032.8%2032.8%2032.8s32.8-14.7%2032.8-32.8v-345c0.1-18.1-14.6-32.8-32.8-32.8zM606%20306.8c-18.1%200-32.8%2014.7-32.8%2032.8v345c0%2018.1%2014.7%2032.8%2032.8%2032.8%2018.1%200%2032.8-14.7%2032.8-32.8v-345c0-18.1-14.7-32.8-32.8-32.8z%22%20p-id%3D%222412%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
}

.play:active {
    opacity: .9;
}
</style>
