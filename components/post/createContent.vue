<template>
  <section class="container" 
    v-loading="quillUpdateImg"
    element-loading-text="拼命上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- 图片上传组件辅助-->
    <el-upload
      class="avatar-uploader"
      :action="`${$axios.defaults.baseURL}/upload`"
      name="files"
      :headers="header"
      :show-file-list="false"
      list-type="picture"
      :multiple="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
    ></el-upload>
    <div
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-quill:myQuillEditor="editorOption"
    ></div>
    <input type="hidden" :value="storeDataChange">
  </section>
</template>
 
<script>
export default {
  props: {
    cleardata: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: '',
      quillUpdateImg: false,
      serverUrl:
        `/upload`, // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      }, // 有的图片服务器要求请求头需要有token
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
              ['blockquote', 'code-block'], // 引用  代码块
              [{ header: 1 }, { header: 2 }], // 1、2 级标题
              [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
              [{ script: 'sub' }, { script: 'super' }], // 上标/下标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              // [{'direction': 'rtl'}],                         // 文本方向
              [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
              [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
              [{ font: [] }], // 字体种类
              [{ align: [] }], // 对齐方式
              ['clean'], // 清除文本格式
              ['link', 'image', 'video'] // 链接、图片、视频
            ],
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
              // link: function(value) {
              //   if (value) {
              //     var href = prompt('请输入url');
              //     this.quill.format("link", href);
              //   } else {
              //     this.quill.format("link", false);
              //   }
              // },
            }
          }
        }
      }
    }
  },
  computed: {
    storeDataChange() {
      if (!this.$store.state.post.listenData) return ''
      if (this.$store.state.post.listenData.isListen) {
        const index = this.$store.state.post.listenData.index
        const {content} = this.$store.state.post.formPublish[index]
        this.content = content
        this.$store.commit('post/addListenData', {
          isListen: false
        })
      }
      return ''
    }
  },
  watch: {
    cleardata(newValue, oldValue) {
      this.content = ''
    }
  },
  mounted() {
  },
  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      this.$emit('quillEdit', html)
      this.content = html
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true
      // this.$message.success('文件上传中...请稍后')
    },
    uploadSuccess(res, files) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.myQuillEditor
      // console.log(quill.getSelection().index)
      // 如果上传成功
      if (true) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', `${this.$axios.defaults.baseURL}${res[0].url}`)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.success('文件上传中成功')
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    }
  }
}
</script>
 
<style lang="less" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 0 15px 0;
  .quill-editor {
    min-height: 400px;
    max-height: 600px;
    overflow-y: auto;
  }
}
/deep/.ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
/deep/.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

/deep/.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}

/deep/.ql-snow .ql-picker.ql-size .ql-picker-label::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '10px';
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
/deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
/deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}

/deep/.ql-snow .ql-picker.ql-header .ql-picker-label::before,
/deep/.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
/deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
/deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
/deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
/deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
/deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
/deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
/deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
/deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
/deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
/deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
/deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
/deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

/deep/.ql-snow .ql-picker.ql-font .ql-picker-label::before,
/deep/.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
/deep/.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
/deep/.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
/deep/.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value='monospace']::before,
/deep/.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}
</style>
