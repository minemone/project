<template>
    <div class="container-fluid py-5">
      <h1 class="text-center">Create Skill</h1>
      <form v-on:submit.prevent="createSkill" class="mx-auto" style="max-width: 700px;">
        <div class="mb-3">
          <label for="name" class="form-label"> Agent Name:</label>  
          <input type="text" v-model="skill.name" class="form-control" id="name" />
        </div>
  
        <transition name="fade">
          <label for="name" class="form-label">Picture:</label>
          <div class="thumbnail-pic" v-if="skill.thumbnail !== 'null'">
            <img :src="BASE_URL + skill.thumbnail" class="img-thumbnail" alt="thumbnail" />
          </div>
        </transition>
  
        <div class="mb-3 dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="
            filesChange($event.target.name, $event.target.files);
          fileCount = $event.target.files.length;
          " accept="image/*" class="input-file form-control" />
          <p v-if="isInitial">
            Drag your file(s) here to begin<br />
            or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
        <div>
          <transition-group tag="ul" class="pictures mt-4">
            <li v-for="picture in pictures" :key="picture.id" class="list-inline-item">
              <img style="margin-bottom: 5px; background-color: #000; max-width: 100px;" :src="BASE_URL + picture.name " alt="picture image"
                class="img-thumbnail" />
              <br />
              <button @click.prevent="useThumbnail(picture.name)" class="btn btn-secondary btn-sm">Thumbnail</button>
              <button @click.prevent="delFile(picture)" class="btn btn-danger btn-sm">Delete</button>
            </li>
          </transition-group>
          <div class="clearfix"></div>
        </div>
  
        <div class="mb-3">
          <label for="skill1" class="form-label">Skill 1:</label>
          <input type="text" v-model="skill.skill1" class="form-control" id="skill1" />
        </div>
  
        <div class="mb-3">
          <label for="details1" class="form-label">Details:</label>
          <textarea v-model="skill.details1" class="form-control" id="details1" rows="4" cols="50"></textarea>
        </div>

        <div class="mb-3">
          <label for="skill2" class="form-label">Skill 2:</label>
          <input type="text" v-model="skill.skill2" class="form-control" id="skill2" />
        </div>
  
        <div class="mb-3">
          <label for="details2" class="form-label">Details:</label>
          <textarea v-model="skill.details2" class="form-control" id="details2" rows="4" cols="50"></textarea>
        </div>

        <div class="mb-3">
          <label for="skill3" class="form-label">Skill 3:</label>
          <input type="text" v-model="skill.skill3" class="form-control" id="skill3" />
        </div>
  
        <div class="mb-3">
          <label for="details3" class="form-label">Details:</label>
          <textarea v-model="skill.details3" class="form-control" id="details3" rows="4" cols="50"></textarea>
        </div>

        <div class="mb-3">
          <label for="skill4" class="form-label">Skill 4:</label>
          <input type="text" v-model="skill.skill4" class="form-control" id="skill4" />
        </div>
  
        <div class="mb-3">
          <label for="details4" class="form-label">Details:</label>
          <textarea v-model="skill.details4" class="form-control" id="details4" rows="4" cols="50"></textarea>
        </div>
  
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Create Skill</button>
        </div>

      </form>
    </div>
  </template>
  
  <script>
  import SkillsService from "@/services/SkillsService";
  import VueCkeditor from "vue-ckeditor2";
  import UploadService from "../../services/UploadService";
  
  const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;
  
  export default {
    data() {
      return {
        BASE_URL: "http://localhost:8081/assets/uploads/",
        error: null,
        // uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: "userPhoto",
        uploadedFileNames: [],
        pictures: [],
        pictureIndex: 0,
        skill: {
          name: "",
          pictures: "null",
          thumbnail: "null",
          skill1: "",
          details1: "",
          skill2: "",
          details2: "",
          skill3: "",
          details3: "",
          skill4: "",
          details4: "",
        },
      };
    },
    methods: {
      async delFile(material) {
        let result = confirm("Want to delete?");
        if (result) {
          let dataJSON = {
            filename: material.name,
          };
  
          await UploadService.delete(dataJSON);
          for (var i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].id === material.id) {
              this.pictures.splice(i, 1);
              this.materialIndex--;
              break;
            }
          }
        }
      },
      async createSkill() {
        this.skill.pictures = JSON.stringify(this.pictures);
        console.log("JSON.stringify: ", this.skill);
        try {
          await SkillsService.post(this.skill);
          this.$router.push({
            name: "skills",
          });
        } catch (err) {
          console.log(err);
        }
      },
      onBlur(editor) {
        console.log(editor);
      },
      onFocus(editor) {
        console.log(editor);
      },
      navigateTo(route) {
        console.log(route);
        this.$router.push(route);
      },
      wait(ms) {
        return (x) => {
          return new Promise((resolve) => setTimeout(() => resolve(x), ms));
        };
      },
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        // this.uploadedFiles = []
        this.uploadError = null;
        this.uploadedFileNames = [];
      },
      async save(formData) {
        // upload data to the server
        try {
          this.currentStatus = STATUS_SAVING;
          await UploadService.upload(formData);
          this.currentStatus = STATUS_SUCCESS;
  
          // update image uploaded display
          let pictureJSON = [];
          this.uploadedFileNames.forEach((uploadFilename) => {
            let found = false;
            for (let i = 0; i < this.pictures.length; i++) {
              if (this.pictures[i].name == uploadFilename) {
                found = true;
                break;
              }
            }
            if (!found) {
              this.pictureIndex++;
              let pictureJSON = {
                id: this.pictureIndex,
                name: uploadFilename,
              };
              this.pictures.push(pictureJSON);
            }
          });
          this.clearUploadResult();
        } catch (error) {
          console.log(error);
          this.currentStatus = STATUS_FAILED;
        }
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        if (!fileList.length) return;
        // append the files to FormData
        Array.from(Array(fileList.length).keys()).map((x) => {
          formData.append(fieldName, fileList[x], fileList[x].name);
          this.uploadedFileNames.push(fileList[x].name);
        });
        // save it
        this.save(formData);
      },
      clearUploadResult: function () {
        setTimeout(() => this.reset(), 5000);
      },
      useThumbnail(filename) {
        console.log(filename);
        this.skill.thumbnail = filename;
      },
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      },
    },
    components: {
      VueCkeditor,
    }
  };
  </script>
  <style scoped>
  .dropbox {
    outline: 2px dashed grey;
    /* the dash box */
    outline-offset: -10px;
    background: lemonchiffon;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px;
    /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0;
    /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: khaki;
    /* when mouse over to the drop zone, change color 
  */
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
  
  ul.pictures {
    list-style: none;
    padding: 0;
    margin: 0;
    float: left;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  ul.pictures li {
    float: left;
  }
  
  ul.pictures li img {
    max-width: 180px;
    margin-right: 20px;
  }
  
  .clearfix {
    clear: both;
  }
  
  /* thumbnail */
  .thumbnail-pic img {
    width: 200px;
  }
  
  .container-fluid {
    color: aliceblue;
  }
  </style>
  