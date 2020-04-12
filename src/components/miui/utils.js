import { nanoid } from 'nanoid'

export function genID(len) {
    return nanoid(len)
}

const EMPTY_FUNC = _ => {}
export function isObject(val) {
    return val && typeof val === 'object'
}

export function isString(val) {
    return typeof val === 'string'
}

function isFunc(val) {
    return typeof val === 'function'
}

export { isFunc }

export function isArray(val) {
    return val instanceof Array
}

function isNone(val) {
    return val === undefined || val === null
}

export function isEmpty(val) {
    return isNone(val) || val === ''
}

export function isNumber(val) {
    return !isNaN(val) && typeof val === 'number'
}

export function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null || obj === undefined) return false

    let proto = Object.getPrototypeOf(obj)
    return proto === null || proto === Object.prototype
}

function callFunc(func, ...args) {
    func = isFunc(func) ? func : EMPTY_FUNC
    return func.apply(null, args)
}

function classify(str) {
    let classifyRE = /(?:^|[-_])(\w)/g
    return str
    .replace(classifyRE, c => c.toUpperCase())
    .replace(/[-_]/g, '')
}

function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
        return '<Root>'
    }
    let options = typeof vm === 'function' && vm.cid != null
        ? vm.options
        : vm._isVue
            ? vm.$options || vm.constructor.options
            : vm

    let name = options.name || options._componentTag
    let file = options.__file
    if (!name && file) {
        let match = file.match(/([^/\\]+)\.vue$/)
        name = match && match[1]
    }

    return (
        (name ? ('<' + (classify(name)) + '>') : '<Anonymous>') +
        (file && includeFile !== false ? (' at ' + file) : '')
    )
}

function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
        let tree = []
        let currentRecursiveSequence = 0
        while (vm) {
            if (tree.length > 0) {
                let last = tree[tree.length - 1]
                if (last.constructor === vm.constructor) {
                    currentRecursiveSequence++
                    vm = vm.$parent
                    continue
                } else if (currentRecursiveSequence > 0) {
                    tree[tree.length - 1] = [last, currentRecursiveSequence]
                    currentRecursiveSequence = 0
                }
            }
            tree.push(vm)
            vm = vm.$parent
        }
        return tree.map((vm, i) => {
            return ('' + (i === 0 ? '---> ' : ' '.repeat(5 + i * 2)) + (Array.isArray(vm)
                ? ((formatComponentName(vm[0])) + '... (' + (vm[1]) + ' recursive calls)')
                : formatComponentName(vm)))
        })
        .join('\n')
    } else {
        return ('\n\n(found in ' + (formatComponentName(vm)) + ')')
    }
}

function warn(msg, vm) {
    if (process.env.NODE_ENV !== 'production') {
        if (isNone(vm)) return console.warn(msg)
        let trace = generateComponentTrace(vm)
        console.warn(msg, '\n', trace)
    }
}

function joinClass() {
    let className = []
    let args = arguments || []
    Array.prototype.forEach.call(args, arg => {
        !isNone(arg) && (className.push(arg))
    })
    return className.join(' ')
}

export { isNone, warn, joinClass, callFunc }
