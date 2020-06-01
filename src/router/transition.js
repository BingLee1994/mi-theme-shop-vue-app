export default function beforeEach(to, from, _, router) {
    console.log('t')
    if (!to) {
        return
    }
    let isBacking = false
    let matched = to.matched || [to]
    let { expectedEntry } = from.meta
    if (expectedEntry && expectedEntry.length > 0) {
        isBacking = matched.some(m => expectedEntry.indexOf(m.name) > -1)
    }
    router.isBacking = isBacking
}
