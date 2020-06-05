<style lang="scss">
    @import "~@miui/component-style/checkbox";
</style>

<template>
    <div>
        <div class="screen"
            v-flex.column
            v-full-screen.hidden
        >
            <header
                :class="[
                    'header',
                    showTopTitle? 'active': '',
                    headerClassName
                ]"
                v-flex-item.0
                v-show="showHeader"
            >
                <div class="action-bar" v-flex.centerY>
                    <BackButton
                        v-flex-item.0
                        v-show="showBackButton"
                        ref="backButton"
                    />
                    <p
                        :class="{
                            title: true,
                            show: showTopTitle
                        }"
                        v-flex-item.1
                        ref="title"
                    >
                        {{title}}
                    </p>
                </div>
                <slot name="header"></slot>
            </header>

            <main
                :class="['content', mainClassName]"
                v-flex-item:overflow.1="`hidden auto`"
                ref="content"
                @scroll="onMainContentScroll"
            >
                <p class="big-title" ref="bigTitle" v-show="title">{{title}}</p>
                <slot name="main"></slot>
            </main>

            <footer v-show="showFooter" :class="['footer', footerClassName]">
                <slot name="footer"></slot>
            </footer>
        </div>
        <slot name="maskLayer"></slot>
    </div>
</template>

<script>
import darkMode from '@/mixins/dark-mode'
import BackButton from '@/components/app/back-button'

export default {
    name: 'BaseActivity',
    mixins: [darkMode],
    components: { BackButton },
    props: {
        title: String,
        showBackButton: {
            type: Boolean,
            default: true
        },
        mainClassName: String,
        headerClassName: String,
        footerClassName: String
    },

    data() {
        return {
            showTopTitle: false
        }
    },

    computed: {
        showHeader() {
            let { title, showBackButton, $slots } = this
            return title || showBackButton || $slots.header
        },

        showFooter() {
            return this.$slots.footer
        }
    },

    watch: {
        title(newVal, oldVal) {
            if (newVal && !this.connected) {
                this.scrollObserver.observe(this.$refs.bigTitle)
                this.connected = true
            }

            if (!newVal && this.connected) {
                this.scrollObserver.disconnect(this.$refs.bigTitle)
                this.connected = false
            }
        }
    },

    mounted() {
        let elContentBody = this.$refs.content
        let elBigTitle = this.$refs.bigTitle
        let option = {
            threshold: [0, 0.8],
            root: elContentBody
        }
        this.scrollObserver = new IntersectionObserver(this.onBigTitleVisibilityChange, option)
        if (this.title) {
            this.scrollObserver.observe(elBigTitle)
            this.connected = true
        }
        this._adjustTitle()
    },

    methods: {
        _adjustTitle() {
            let backButton = this.$refs.backButton
            this.$refs.title.style.paddingRight = backButton.$el.offsetWidth + 'px'
        },

        onMainContentScroll(e) {
            this.$emit('scroll', e)
        },

        onBigTitleVisibilityChange(entry) {
            let e = entry[0]
            let showTopTitle = e.intersectionRatio === 0
            if (showTopTitle !== this.showTopTitle) {
                this.showTopTitle = showTopTitle
            }
        }
    },

    destroyed() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect()
            this.scrollObserver = null
        }
    }
}
</script>

<style lang="scss" scoped>
.screen {
    $paddingH: 15px;
    font-size: 1.4rem;
    color: var(--black80);
    background-color: var(--white);

    .header {
        padding: 10px #{$paddingH};

        &.active {
            // box-shadow: 0px 0px 0px 1px var(--black05);
        }
    }

    .action-bar {
        line-height: 1;

        .title {
            color: var(--black);
            opacity: 0;
            transition: all .15s ease;
            text-align: center;
            margin: 0 10px;
            transform: translateY(20%);

            &.show {
                opacity: 1;
            transform: translateY(0);
            }
        }
    }

    .big-title {
        text-align: left;
        font-size: 2.5rem;
        font-weight: 300;
        margin: 10px 0;
        margin-top: 0;
        transform-origin: top left;
    }

    .content {
        padding: 0 #{$paddingH};
    }

    .footer {
        padding: $paddingH;
    }
}
</style>
