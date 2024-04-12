import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

import { useToast } from "vue-toastification";
const studentInitiolvalue = {
  id: null,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  grade_id: "",
  address: "",
  number_phone: "",
  date_d_inscription: "",
  image: "",
};
export const studentStore = defineStore("studentStore", {
  id: "studentStore",
  state: () => ({
    student: studentInitiolvalue,
    students: {},
    allResponse: {},
    idDeletestudent: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
  }),
  getters: {
    getstudentById: function (state) {
      return function (ID) {
        return state.students.find((obj) => obj.id === ID);
      };
    },
    intialValues: function (state) {
      return studentInitiolvalue;
    },
  },
  actions: {
    async getstudents() {
      try {
        const response = await instance.get("/admin/students");
        this.allResponse = response.data;
        this.students = this.allResponse.data.data;
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    async deletestudent() {
      this.loader = true;
      try {
        const response = await instance.delete(
          "/admin/students/" + this.idDeletestudent
        );

        if (response.status === 200) {
          this.students = this.students.filter(
            (t) => t.id !== this.idDeletestudent
          );

          this.idDeletestudent = null;
          this.isShowModalDelete = false;
          useToast().success("student deleted with success", {
            timeout: 2000,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    async updateAndEdit() {
      if (this.student.id) {
        // update
        try {
          // let formData = new FormData();
          // for (const [key, value] of Object.entries(this.student)) {
          //   console.log(key + " " + value);
          //   formData.append(key, value);
          // }
          
          
          const response = await instance.put(
            "/admin/students/" + this.student.id,
            this.student 
          );

          if (response.status === 200) {
            console.log(response);
            this.students = this.students.map((t) => {
              if (t.id !== this.student.id) return t;
              else return response.data.data;
            });

            this.student = studentInitiolvalue;

            this.isShowModal = false;

            useToast().success("student updated with success", {
              timeout: 2000,
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      } else {
        try {
          let formData = new FormData();
       
          for (const [key, value] of Object.entries(this.student)) {
            formData.append(key, value);
          }
          const response = await instance.post("/admin/students", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          this.students.unshift(response.data.data);
          this.student = studentInitiolvalue;

          this.isShowModal = false;
          useToast().success("student created with success", {
            timeout: 2000,
          });
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      }
    },
  },
});
