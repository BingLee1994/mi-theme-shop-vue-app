<script>
import Star from './star'

export default {
    name: 'StartRank',
    components: { Star },
    model: {
        prop: 'point',
        event: 'change'
    },
    props: {
        length: {
            type: Number,
            default: 0,
            validator(val) {
                return val > 0 || val <= 10
            }
        },
        starSize: Number,
        starColor: String,
        starDivider: Number,
        point: [Number, String]
    },

    render(h) {
        return (
            <div
                class='start-rank-wrapper'
            >
                { this.genStars(h) }
            </div>
        )
    },

    methods: {
        handleClick(index) {
            this.$emit('change', index + 1)
        },

        genStars(h) {
            let validLength = Math.floor(this.length)
            let validPoint = Math.min(this.point, this.length)
            let stars = []

            for (let i = 0; i < validLength; i++) {
                let breakPoint = Math.floor(validPoint)
                let point = 1
                if (i === breakPoint) {
                    point = Math.abs(i - validPoint)
                }
                if (i > breakPoint) {
                    point = 0
                }
                stars.push(
                    <Star
                        point={point}
                        color={this.starColor}
                        size={this.starSize}
                        divider={this.starDivider}
                        onClick={e => { this.handleClick(i, e) }}
                    />
                )
            }

            return stars
        },

        onClickItem(e, item, index) {
            this.$emit('clickTab', index, item, e)
        }
    }
}
</script>

<style scoped lang="scss">
    .start-rank-wrapper {
        display: flex;
        align-items: center;
    }
</style>
