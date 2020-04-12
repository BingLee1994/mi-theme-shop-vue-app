<template>
  <div id='app' class='miui'>
    <div style='display: block;padding:10px'>
      <ActionBar title='设置' showBackButton showSearchBox searchBoxPlaceholder='搜索设定' /> <br/>
      <Button @click="log('click')" @tap="log('tap')">123</Button>
      <Button primary>123</Button>
      <Button disabled>789</Button> <br/><br/>
    <Button @click='testDialog'>测试dialog</Button> <br/>
    <Button @click='testToast'>测试Toast</Button> <br/>
      <Button widen>
        <font>101</font>
      </Button> <br/>
      <Toggle :value='true' />
      <Toggle disabled />
      <Toggle
        v-model='isChecked'
        @click='toggleChange'
        :label="isChecked?'开关开启':'开关关闭'"
        labelClass='bold'
      />
      <br /><br/>
      <EditText :width='120' />
      <EditText name='hehe' widen placeholder='123' v-model='usn'>
        <template slot='prepend-text'>
          <font>用户名：</font>
          <span>用户名：</span>
          <span>用户名：</span>
        </template>
      </EditText>
      <EditText
        widen
        type='password'
        showPasswordButton
        placeholder='请输入密码'
        v-model='pwd'
        @focus='pwdFocus'
        @blur='pwdBlur'
      >
        <template slot='prepend-text'>
          <font class='highlight'>用户名：</font>
          <span>用户名：</span>
          <span>用户名：</span>
        </template>
      </EditText>
      <EditText widen type='password' disabled showPasswordButton placeholder='请输入密码' value='qqq'>
        <template slot='prepend-text'>
          <font class='highlight'>用户名：</font>
          <span>用户名：</span>
          <span>用户名：</span>
        </template>
      </EditText>
      <EditText
        widen
        type='text'
        showClearButton
        showPasswordButton
        placeholder='带清除按钮'
        v-model='content'
      >
        <template slot='prepend-text'>
          <font class='highlight'>用户名：</font>
          <span>用户名：</span>
          <span>用户名：</span>
        </template>
      </EditText>
      用户名:{{usn}}
      <br />
      密码：{{pwd}}
      <br />
      内容: {{content}}
      <br />

      <button @click='syncText'>测试sync</button>
      <Checkbox label='123' />
      <Checkbox checked label='123' />
      <Checkbox checked label='123' disabled />

      <SearchEditText placeholder='123' id='tst' />
      <ActionMenu :menuItems="testMenuItems"/>

      <div id='nav'>
        <router-link to='/'>Home</router-link>|
        <router-link to='/about'>About</router-link>|
        <router-link to='/article'>Article</router-link>|
        <router-link to='/user/billy'>User</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@miui/buttons/button'
import Toggle from '@miui/toggle'
import Checkbox from '@miui/checkbox'
import EditText from '@miui/edit-text/edit-text'
import SearchEditText from '@miui/action-bar/search-edit-text'
import ActionBar from '@miui/action-bar/action-bar'
import ActionMenu from '@miui/action-bar/action-menu/menu'

export default {
  components: { Button, ActionMenu, ActionBar, Toggle, EditText, Checkbox, SearchEditText },
  methods: {
    log(msg) {
      console.log(msg)
    },
    toggleChange(v) {
      this.isChecked = v
    },
    syncText() {
      this.content = '这是sync完的'
    },
    pwdFocus() {
      console.log('focus')
    },
    pwdBlur() {
      console.log('blur')
    },
    confirm() {
      console.log('确定')
    },
    cancel() {
      console.log('取消')
    },
    closed() {
      console.log('closed')
    },
    testDialog() {
      /* this.$dialog.alert('标题', '文件').then(() => {
        console.log('app ok')
      })
      this.$dialog.alert('标题', '文件').then(() => {
          console.log('app ok')
      }) */
      /* this.$dialog.confirmWithCheckbox({
        title: 123,
        message: 456,
        checkboxOptions: [{ label: 123, required: true, checked: false }]
      }) */
      this.$dialog.prompt({
        title: '输入密码',
        inputOptions: [{ placeholder: '请输入用户名' }, { placeholder: '请输入密码', type: 'password' }],
        validator(optiops) {
          console.log(optiops)
          return true
        }
      }).then(optiops => {
        console.log(optiops)
      })
    },
    testToast() {
      this.$toast.show('this.$dialog')
    }
  },
  data() {
    return {
      isChecked: true,
      usn: '123',
      pwd: 123,
      content: '你好呀',
      testMenuItems: [
        { text: 123 },
        { text: 456 }
      ]
    }
  }
}
</script>
