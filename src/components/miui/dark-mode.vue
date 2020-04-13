<template>
    <div ref="root">
        <slot>
        </slot>
    </div>
</template>

<script>
let miuiRoot = null
const BLACK = '0, 0, 0'
const WHITE = '255, 255, 255'
const opacity = ['05', 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

export default {
    name: 'MIUI-DarkMode',
    computed: {
        isDarkMode() {
            return this.$store.state.preference.darkMode
        }
    },
    watch: {
        isDarkMode(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.reverseColor()
            }
        }
    },
    mounted() {
        if (!miuiRoot) {
            miuiRoot = document.querySelector('.miui')
            if (!miuiRoot) {
                this.$refs.root.classList.add('miui')
                miuiRoot = this.$refs.root
            }
        }
        if (this.isDarkMode) {
            this.reverseColor()
        }
    },
    methods: {
        reverseColor() {
            let blackColor = this.isDarkMode ? WHITE : BLACK
            let whiteColor = this.isDarkMode ? BLACK : WHITE

            let style = document.querySelector(':root').style
            console.log(this.isDarkMode)

            opacity.forEach(t => {
                let alpha = t / 100
                let alphaName = t === 100 ? '' : t
                console.log(`--black${alphaName}`, `rgba(${[blackColor, alpha].join(',')})`)
                style.setProperty(
                    `--black${alphaName}`,
                    `rgba(${[blackColor, alpha].join(',')})`
                )
                style.setProperty(
                    `--white${alphaName}`,
                    `rgba(${[whiteColor, alpha].join(',')})`
                )
            })
        }
    }
}
</script>
