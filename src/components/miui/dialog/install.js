import Vue from 'vue'
import BaseDialog from './base'
import { callFunc } from '../utils'
import Checkbox from '../checkbox'

// https://cn.vuejs.org/v2/api/

// 创建基于组件的构造方法
const BaseDialogConstructor = Vue.extend(BaseDialog)

const NOTASSIGNED = Symbol('not-assigned')
const createElement = new Vue().$createElement

// 对话框在同一时刻只能有一个实例
let curDialogInstance = null
let dialogContainer = document.body
let dialogIsShowing = false
let dialogQueue = []

const TEXT_OK = '确定'
const TEXT_CANCEL = '取消'

/* function isDialog(vm) {
    return vm instanceof BaseDialogConstructor
} */

function getCommonDialogActions(resolve, reject) {
    let resolvedVal = NOTASSIGNED
    let rejectedReason = NOTASSIGNED
    return {
        cancel(p) {
            rejectedReason = p
        },
        confirm(s) {
            resolvedVal = s
        },
        closed() {
            if (resolvedVal !== NOTASSIGNED) {
                callFunc(resolve, resolvedVal)
            }
            if (rejectedReason !== NOTASSIGNED) {
                callFunc(reject, resolvedVal)
            }
            dialogIsShowing = false
            showNextDialogIfNeed()
        }
    }
}

function createDialog(options) {
    let { props, actions, children: slot } = options
    let dialogInstance = new BaseDialogConstructor({
        el: document.createElement('div'),
        propsData: props,
        created() {
            this.$slots.default = slot || []
        }
    })
    console.log(dialogInstance)
    return Object.assign(dialogInstance, actions)
}

function mountDialog(options) {
    if (!dialogIsShowing) {
        curDialogInstance = createDialog(options)
        dialogContainer.appendChild(curDialogInstance.$el)
        dialogIsShowing = true
    } else {
        dialogQueue.push(options)
    }
}

function unmountDialog() {
    if (!dialogIsShowing && curDialogInstance) {
        curDialogInstance.$el.parentElement.removeChild(curDialogInstance.$el)
        curDialogInstance = null
    }
}

function showNextDialogIfNeed() {
    unmountDialog()
    if (dialogQueue.length > 0) {
        let nextDialogOption = dialogQueue.shift()
        mountDialog(nextDialogOption)
    }
}

function createCheckboxElement(items, onChange, h = createElement) {
    const customizedOnChange = (flag) => {
        console.log(flag)
        callFunc(onChange)
    }
    return [
        <div class="checkbox-option-wrapper with-divider-10">
            <Checkbox onChange={customizedOnChange} label="456"/>
        </div>,
        <div class="checkbox-option-wrapper with-divider-20">
            <Checkbox onChange={customizedOnChange} label="789"/>
        </div>
    ]
}

const dialogUtils = {
    alert(title, message, button = TEXT_OK) {
        return new Promise((resolve, reject) => {
            let alertDialogOption = {
                props: {
                    title,
                    message,
                    primaryButton: button
                },
                actions: getCommonDialogActions(resolve, reject)
            }
            mountDialog(alertDialogOption)
        })
    },
    confirm(options) {
        let { title, message, primaryButton, secondaryButton } = options
        return new Promise((resolve, reject) => {
            let confirmDialogOption = {
                props: {
                    title,
                    message,
                    primaryButton: primaryButton || TEXT_OK,
                    secondaryButton: secondaryButton || TEXT_CANCEL
                },
                actions: getCommonDialogActions(resolve, reject)
            }
            mountDialog(confirmDialogOption)
        })
    },
    confirmWithCheckbox(options) {
        let { title, message, primaryButton, secondaryButton, checkboxOptions } = options
        let checkboxSlots = createCheckboxElement(checkboxOptions, () => {
            console.log(123)
        })
        return new Promise((resolve, reject) => {
            let confirmDialogOption = {
                props: {
                    title,
                    message,
                    primaryButton: primaryButton || TEXT_OK,
                    secondaryButton: secondaryButton || TEXT_CANCEL
                },
                actions: getCommonDialogActions(resolve, reject),
                children: checkboxSlots
            }
            mountDialog(confirmDialogOption)
        })
    },
    prompt() {

    },
    whichDialog() {
        return curDialogInstance
    },
    dialogIsShowing() {
        return dialogIsShowing
    },
    queueLength() {
        return dialogQueue.length
    }
}

export default {
    install(Vue, root) {
        if (root instanceof HTMLDivElement) {
            dialogContainer = root
        }
        Vue.prototype.$dialog = dialogUtils
    }
}
