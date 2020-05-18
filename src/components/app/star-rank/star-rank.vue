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
    .tab-bar {
        display: flex;
        justify-content: space-evenly;
        box-shadow: 0px -2px 4px var(--black10);
        padding: 1rem;

        .tab-item {
            text-align: center;
            font-size: 1.3rem;

            .icon {
                display: block;
                width: 3rem;
                height: 3rem;
                border: 1px solid green;
                margin: 0 auto;
                margin-bottom: 2px;
            }
        }
    }
</style>
