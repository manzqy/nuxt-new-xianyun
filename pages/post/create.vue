<template>
  <div class="add">
    <div style="fontSize:18px;fontWeight:700">发表新攻略</div>
    <div style="color:#909399;fontSize:14px;margin:10px 0;">分享你的个人游记，让更多人看到哦！</div>
    <el-input v-model="title"
              placeholder="请输入标题"
              style="margin:10px 0"></el-input>
    <!-- 富文本框 -->
    <div>
      <div class="quill-editor"
           :content="content"
           @change="onEditorChange($event)"
           @blur="onEditorBlur($event)"
           @focus="onEditorFocus($event)"
           @ready="onEditorReady($event)"
           v-quill:myQuillEditor="editorOption"></div>
    </div>
    <!-- <input
        type="file"
        style="display: none;"
        id="getFile"
        @change="selectContentImg($event)"
        accept="image/gif,image/jpeg,image/jpg,image/png"
    >-->
    <div style="fontSize:14px;margin:10px 0;">
      选择城市
      <el-autocomplete v-model="city"
                       :fetch-suggestions="queryDepartSearch"
                       placeholder="请搜索城市"
                       @select="handleDepartSelect"
                       class="el-autocomplete"></el-autocomplete>
    </div>
    <div>
      <el-button type="primary"
                 size="mini"
                 @click="handleSubmit">发布</el-button>
      <span style="fontSize:14px;">或者</span>
      <span style="fontSize:14px;color:orange">保存到草稿</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      content: "",
      title: "",
      city: "",
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              ["link", "image"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"] // remove formatting button
            ]
          }
        }
      }
    };
  },
  methods: {
    // // 选择图片之后的处理
    // selectContentImg(e) {
    //     let file = e.target.files;
    //         if (file.length > 0) {
    //             let data = new FormData();
    //             for (let item of file) {
    //             data.append('files', item)
    //             }
    //             // 可以使用post方法上传文件到服务器
    //             // 然后把返回的路径拼接好插入到内容里
    //             uploadFile(data).then(res => {
    //             this.content += `<img src="${res.imgUrl}" alt="内容图片">`;
    //             })
    //         }
    //     },
    // 获取城市名称
    async queryDepartSearch (queryString, cb) {
      let data = await this.querySearchAsync(queryString);
      if (data.length > 0) {
        this.city = data[0].value;
      }
      cb(data);
    },
    querySearchAsync (queryString) {
      return new Promise((resolve, reject) => {
        if (queryString) {
          this.$axios({
            url: "/airs/city",
            method: "get",
            params: {
              name: queryString
            }
          })
            .then(result => {
              let { data } = result.data;
              data.forEach(item => {
                item.value = item.name.substring(0, item.name.length - 1);
              });
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        } else {
          resolve([]);
        }
      });
    },
    // 选中城市
    handleDepartSelect (selected) {
      this.city = selected.value;
    },
    // 发布文章
    handleSubmit () {
      this.$axios({
        url: "/posts",
        method: "post",
        data: {
          city: this.city,
          content: this.content,
          title: this.title
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token ||
            "NO TOKEN"}`
        }
      }).then(res => {
        this.$message({
          type: "info",
          message: res.data.message
        });
        this.$router.push({
          path: "/travelStrategy",
          query: {
            name: this.city
          }
        })
      });
    },
    onEditorBlur (editor) {
      // console.log("editor blur!", editor);
    },
    onEditorFocus (editor) {
      // console.log("editor focus!", editor);
    },
    onEditorReady (editor) {
      // console.log("editor ready!", editor);
    },
    onEditorChange ({ editor, html, text }) {
      // console.log("editor change!", editor, html, text);
      this.content = html;
    }
  }
};
</script>
<style scoped>
.add {
  width: 700px;
  margin: 20px auto;
}
.quill-editor {
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
}
/* 11 */
</style>
