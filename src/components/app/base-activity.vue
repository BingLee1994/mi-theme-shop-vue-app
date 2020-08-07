<style lang="scss">
    @import "~@miui/component-style/checkbox";
</style>

<template>
    <div>
        <div
            :class="['screen', $attrs.class, screenClassName]"
            v-flex.column
            v-full-screen.hidden
            ref="screen"
            :style="`--darkModeColor: ${darkModeColor}`"
        >
            <header
                :class="[
                    'header',
                    showTopTitle? 'active': '',
                    headerClassName
                ]"
                v-flex-item.0
                v-show="showHeader"
                ref="header"
            >
                <div class="action-bar" v-flex.centerY>
                    <BackButton
                        v-flex-item.0
                        v-show="showBackButton"
                        ref="backButton"
                        :route="backRoute"
                        :color="darkModeColor"
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
                :style="{
                    padding: `0 ${padding}`
                }"
            >
                <p
                    class="big-title"
                    :style="`color: ${darkMode? 'white': ''}`"
                    ref="bigTitle" v-show="title"
                >{{title}}</p>
                <slot name="main" :padding="padding"></slot>
            </main>

            <footer v-show="showFooter" :class="['footer', footerClassName]">
                <slot name="footer"></slot>
            </footer>
        </div>
        <slot name="maskLayer"></slot>
    </div>
</template>

<script>
import BackButton from '@/components/app/back-button'

export default {
    name: 'BaseActivity',
    components: { BackButton },
    props: {
        title: String,
        showBackButton: {
            type: Boolean,
            default: true
        },
        mainClassName: String,
        headerClassName: String,
        footerClassName: String,
        screenClassName: String,
        backRoute: [String, Object],
        darkMode: Boolean
    },

    data() {
        return {
            showTopTitle: false,
            padding: '1.5rem'
        }
    },

    computed: {
        darkModeColor() {
            let defaultColor = 'var(--black90)'
            return this.darkMode ? 'white' : defaultColor
        },
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
        this.elMain = this.$refs

        this.$emit('ref', {
            screen: this.$refs.screen,
            header: this.$refs.header,
            amin: this.$refs.content
        })
    },

    methods: {
        _adjustTitle() {
            let backButton = this.$refs.backButton
            this.$refs.title.style.paddingRight = backButton.$el.offsetWidth + 'px'

            let elMain = this.$refs.content
            let { paddingLeft, paddingRight } = getComputedStyle(elMain)
            if (!paddingLeft || paddingLeft === '0px') {
                this.$refs.bigTitle.style.paddingLeft = '1.5rem'
            }
            if (!paddingRight || paddingRight === '0px') {
                this.$refs.bigTitle.style.paddingRight = '1.5rem'
            }
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
        },

        resetScrollBar() {
            this.$refs.content.scrollTop = 0
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
    $paddingH: 1.5rem;
    font-size: 1.4rem;
    color: var(--black80);
    background-color: var(--white);

    & > .header {
        padding: 1rem #{$paddingH};

        & > .action-bar {
            line-height: 1;

            .title {
                color: var(--darkModeColor);
                opacity: 0;
                transition: all .15s ease;
                text-align: center;
                margin: 0 1rem;
                transform: translateY(20%);

                &.show {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }

        &.active {
            // box-shadow: 0px 0px 0px 1px var(--black05);
        }
    }

    & .big-title {
        text-align: left;
        font-size: 2.5rem;
        font-weight: 300;
        margin: 1.5rem 0;
        margin-top: 0;
        transform-origin: top left;
        color: var(--darkModeColor);
    }

    & > main.content {
    }

    & > .footer {
        padding: $paddingH;
    }
}
</style>
