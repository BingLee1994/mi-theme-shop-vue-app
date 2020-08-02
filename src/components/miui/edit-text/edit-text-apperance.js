
import { isEmpty, warn } from '../utils'

const validator = document.createElement('div')

function isValidStyle(name, val) {
    let isValid = false
    validator.setAttribute('style', '')
    validator.style[name] = val
    isValid = !isEmpty(validator.style[name])
    return isValid
}

export default class EditTextAppearance {
    constructor(bgColor, color, bgImage, caretColor, borderColor, borderWidth, borderRadius = '') {
        let style = {}
        style.backgroundColor = isValidStyle('backgroundColor', bgColor) ? bgColor : ''
        style.color = isValidStyle('color', color) ? color : ''
        style.backgroundImage = isValidStyle('backgroundImage', bgImage) ? bgImage : ''
        style.caretColor = isValidStyle('caretColor', caretColor) ? caretColor : ''
        style.borderRadius = isValidStyle('borderRadius', borderRadius) ? borderRadius : ''
        this.__style__ = style
        this.__borderColor__ = isValidStyle('borderColor', borderColor) ? borderColor : 'var(--accentColor)'
        this.__borderWidth__ = isValidStyle('borderWidth', borderWidth) ? borderWidth : '2px'
        this._setBoxShadow()
    }

    _setBoxShadow() {
        let boxShadow = ''
        if (!isEmpty(this.__borderColor__) && !isEmpty(this.__borderWidth__)) {
            boxShadow = `0 0 0 ${this.__borderWidth__} inset ${this.__borderColor__}`
        }
        this._checkAndSetStyle('boxShadow', boxShadow)
    }

    _checkAndSetStyle(key, val) {
        if (!isValidStyle(key, val)) {
            warn(`Invalid style value '${val}' for '${key}.`)
            val = ''
        }
        this.__style__[key] = val
    }

    get backgroundColor() {
        return this.__style__.backgroundColor
    }

    set backgroundColor(val) {
        this._checkAndSetStyle('backgroundColor', val)
    }

    get color() {
        return this.__style__.color
    }

    set height(val) {
        this._checkAndSetStyle('height', val)
    }

    get height() {
        return this.__style__.height
    }

    set color(val) {
        this._checkAndSetStyle('color', val)
    }

    get backgroundImage() {
        return this.__style__.backgroundImage
    }

    set backgroundImage(val) {
        this._checkAndSetStyle('backgroundImage', val)
    }

    get caretColor() {
        return this.__style__.caretColor
    }

    set caretColor(val) {
        this._checkAndSetStyle('caretColor', val)
    }

    get borderColor() {
        return this.__borderColor__
    }

    set borderColor(val) {
        if (!isValidStyle('borderColor', val)) {
            warn(`Invalid style value '${val}' for 'borderColor'.`)
            val = ''
        }
        this.__borderColor__ = val
        this._setBoxShadow()
    }

    get borderWidth() {
        return this.__borderWidth__
    }

    set borderWidth(val) {
        if (!isValidStyle('borderWidth', val)) {
            warn(`Invalid style value '${val}' for 'borderWidth'.`)
            val = ''
        }
        this.__borderWidth__ = val
        this._setBoxShadow()
    }

    get borderRadius() {
        return this.__style__.borderRadius
    }

    set borderRadius(val) {
        this._checkAndSetStyle('borderRadius', val)
    }

    toStyle() {
        let style = Object.create(null)
        for (let name in this.__style__) {
            let val = this.__style__[name]
            if (!isEmpty(val)) {
                style[name] = val
            }
        }
        return style
    }

    toStyleString() {
        let styleStr = ''
        validator.setAttribute('style', '')
        for (let name in this.__style__) {
            let val = this.__style__[name]
            if (!isEmpty(val)) {
                validator.style[name] = val
            }
        }
        styleStr = validator.getAttribute('style')
        return styleStr
    }
}
