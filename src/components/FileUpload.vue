<template>
  <div class="file-input-box">
    <div class="wrapper-file-input">
      <div class="input-box" @click="openFileInput">
        <img class="upload-icon" src="@/assets/images/upload.svg" alt="upload icon" />
        <h4>Faylni yuklang</h4>
        <input ref="fileInput" type="file" hidden @change="handleFileChange" multiple />
      </div>
    </div>
    <div class="wrapper-file-section">
      <div class="selected-files" v-if="selectedFileNames.length">
        <ul class="file-list" :style="selectedFileNames.length ? 'max-height:220px' : 'height:auto'">
          <li class="file-list__item" v-for="(f, index) in selectedFileNames" :key="f.name">
            <button @click="removeFile(index)" class="btn-file">
              <img class="btn-file__img" src="@/assets/images/assign.svg" alt="remove file" />
            </button>
            <span class="name"> {{ f.name }} </span>
            <button @click="removeFile(index)" class="btn-file">
              <img class="btn-file__img" src="@/assets/images/close-btn.svg" alt="assign file" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FileUpload',
  emits: ['files-uploaded'],
  data() {
    return {
      selectedFileNames: [] as any,
    }
  },
  methods: {
    openFileInput() {
      ;(this.$refs.fileInput as HTMLInputElement).click()
    },
    handleFileChange(event: Event) {
      const target = event.target as HTMLInputElement
      const fileList = target.files
      if (fileList) {
        const files: File[] = []
        for (let i = 0; i < fileList.length; i++) {
          files.push(fileList[i])
          this.selectedFileNames.push({
            name: fileList[i].name,
            size: fileList[i].size,
          })
        }
        this.$emit('files-uploaded', files)
      }
    },
    formatFileSize(size: number) {
      const units = ['B', 'KB', 'MB', 'GB'] as any
      let index = 0
      while (size >= 1024 && index < units.length - 1) {
        size /= 1024
        index++
      }
      return `${size.toFixed(2)} ${units[index]}`
    },
    removeFile(index: number) {
      this.selectedFileNames.splice(index, 1)
    },
  },
})
</script>
<style scoped>
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #f0f0f0;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #0000002a;
  border-radius: 10px;
}

.wrapper-file-input {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
  padding: 18px;
  height: auto;
  background-color: #ffffff;
  color: #d9d9d9;
  border: 1px dashed #cacaca;
  margin-bottom: 24px;
}

.input-box {
  display: grid;
  place-items: center;
  cursor: pointer;
}

.upload-icon {
  margin-bottom: 8px;
  display: block;
}

.file-list {
  display: flex;
  overflow-y: auto;
  list-style-type: none;
  margin: 0;
}

.file-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 8px 16px;
  font-size: 10px;
  line-height: 12.19px;
  font-weight: 600;
}

.file-list__item:not(:last-child) {
  margin-right: 18px;
}

.btn-file {
  background-color: none;
  border: none;
  cursor: pointer;
  display: flex;
}

.btn-file__img {
  width: 12px;
  height: 12px;
}

.name {
  margin-left: 8px;
  margin-right: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 60px;
  white-space: nowrap;
  color: #000000;
}
</style>
