<script>
// import { useImage } from '@/composables/useImage'
export default {
  data() {
    return {
      selectedFileNames: [],
    }
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      const fileList = event.target.files
      const files = []

      for (let i = 0; i < fileList.length; i++) {
        this.selectedFileNames.push({
          name: fileList[i].name,
          size: fileList[i].size,
        })
      }
    },
    formatFileSize(size) {
      const units = ['B', 'KB', 'MB', 'GB']
      let index = 0

      while (size >= 1024 && index < units.length - 1) {
        size /= 1024
        index++
      }

      return `${size.toFixed(2)} ${units[index]}`
    },
    removeFile(index) {
      this.selectedFileNames.splice(index, 1)
    },
  },
}
</script>

<template>
  <div>
    <div class="file-input-box">
      <div class="wrapper-file-input">
        <div class="input-box" @click="openFileInput">
          <img src="@/assets/images/upload.svg" alt="upload icon" />
          <h4>Faylni yuklang</h4>
          <input ref="fileInput" type="file" hidden @change="handleFileChange" multiple />
        </div>
        <small>Files Supported: PDF, TEXT, DOC, DOCX, JPG, PNG, SVG</small>
      </div>

      <div class="wrapper-file-section">
        <div class="selected-files" v-if="selectedFileNames.length">
          <h5>Selected Files</h5>
          <ul class="file-list" :style="selectedFileNames.length ? 'max-height:220px' : 'height:auto'">
            <transition-group name="fade" class="selected-files">
              <li class="item" v-for="(f, index) in selectedFileNames" :key="f.name">
                <span class="name"> {{ f.name }} ({{ formatFileSize(f.size) }}) </span>
                <div class="remove" @click="removeFile(index)">remove</div>
              </li>
            </transition-group>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --secondary: #1b2631;
}

.file-input-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  height: auto;
  background-color: #ffffff;
}

.input-box {
  padding: 20px;
  display: grid;
  place-items: center;
  border: 2px dashed #cacaca;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}

small {
  display: none;
  font-size: 12px;
  color: #a3a3a3;
}
h5 {
  margin-bottom: 10px;
}
.file-list {
  overflow-y: auto;
  list-style-type: none;
  padding: 0 10px 10px 0;
  margin: 0;
  transition: 0.3s all ease-in-out;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cacaca;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
}
.item:not(:last-child) {
  margin-bottom: 5px;
}
.remove {
  display: grid;
  place-items: center;
  color: #c0392b;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}
</style>
