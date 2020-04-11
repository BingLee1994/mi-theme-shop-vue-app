import Vue from 'vue'
import BaseDialog from './base'
import { callFunc } from '../utils'

// 创建基于组件的构造方法
const BaseDialogConstructor = Vue.extend(BaseDialog)
const NOTASSIGNED = Symbol()

// 对话框在同一时刻只能有一个实例
let curDialogInstance = null
let dialogContainer = document.body
let dialogIsShowing = false
// let dialogQueue = []

function dialogButtonAction(resolve, reject) {
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
        }
    }
}

function createDialog(props, instancsOption, slots) {
        let dialogInstance = new BaseDialogConstructor({
            el: document.createElement('div'),
            propsData: props
        })
        Object.assign(dialogInstance, instancsOption)
        console.log(dialogInstance)
        curDialogInstance = dialogInstance
}

function mountDialog() {
    if (!dialogIsShowing && curDialogInstance) {
        dialogContainer.appendChild(curDialogInstance.$el)
        dialogIsShowing = true
    }
}
createDialog()
mountDialog()

const dialogUtils = {
    alert(title, message, buttonLabel) {
        return new Promise((resolve, reject) => {
            // curDialogInstance.onClickButton
            let dialogActionButtonCb = 
            initDialog({ title, message, primaryButton: buttonLabel })
        })
    },
    confirm() {

    },
    confirmWithCheckbox() {

    },
    prompt() {

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
