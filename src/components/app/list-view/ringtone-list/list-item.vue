<template>
    <div @click="setRingtone" class="ringtone-list-item" v-flex.centerY>
        <div v-flex-item.1>
            <p class="title">{{name}}</p>
            <p class="keywords-wrapper">
                <ColorfulButton
                    v-for="keyword in keyWords"
                    :key="keyword"
                    plain
                    tiny
                >
                    {{keyword}}
                </ColorfulButton>
            </p>
            <p class="sub-title">
                <span>{{hot}}万</span>
                <span> / </span>
                <span>{{duration}}</span>
            </p>
        </div>
        <div v-flex-item.0>
            <PlayBtn />
        </div>
    </div>
</template>

<script>
import ColorfulButton from '@/components/app/colorful-button'
import darkMode from '@/mixins/dark-mode'
import PlayBtn from '@/components/app/play-btn-test'

export default {
    name: 'RingtoneListItem',
    mixins: [darkMode],
    components: { ColorfulButton, PlayBtn },
    props: {
        keyWords: Array,
        name: String,
        hot: [String, Number],
        duration: [String, Number]
    },

    data() {
        return { playing: false }
    },

    methods: {
        setRingtone() {
            this.$dialog.confirm({
                title: '设定铃声',
                message: '是否设置系统铃声？'
            }).then(() => {
                this.$toast.show('恭喜设定成功！')
            })
        },

        playAudio() {
            this.playing = true
            this.$toast.show('亲，A r e     y o u     O K！')
            setTimeout(() => {
                this.playing = false
            }, 200)
        }
    },

    created() {
        this.darkModeClass = 'dark-mode'
    }
}
</script>

<style scoped lang="scss">
    .ringtone-list-item {
        margin: 10px 0;
        border-bottom: 1px solid var(--black10);
        padding: 10px;

        &:first-of-type {
            margin-top: 0;
        }

        &:last-of-type {
            margin-bottom: 5px;
        }

        & .title {
            font-size: 1.5rem;
            color: var(--black);
            letter-spacing: 1px;
        }

        & .keywords-wrapper {
            margin: 5px 0;
            margin-left: -3px;
        }

        & .sub-title {
            font-size: 1rem;
            color: var(--black50);
        }

        &.dark-mode {
            .play, .pause {
                filter: brightness(2) contrast(0);
            }
        }
    }
</style>
