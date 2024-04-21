import { defineStore } from "pinia";
import instance from "@/axios-config.js";
// import router from "@/router";

 

export const studentStore = defineStore("studentStore", {
  id: "studentStore",
  state: () => ({
    student: {
      id: null,
      username: "",
      email: "",
      firstName: "",
      genre: "",
      lastName: "",
      grade_id: "",
      address: "",
      number_phone: "",
      date_d_inscription: "",
      image: "",
    },
    students: {},
    allResponse: {},
    idDeletestudent: null,
    isShowModalDelete: false,
    loader: false,
    isShowModal: false,
    ModalChangeImage: false,
  }),
  getters: {
    getstudentById: function (state) {
      return function (ID) {
        return state.students.find((obj) => obj.id === ID);
      };
    },
    intialValues: function (state) {
      return {
        id: null,
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        grade_id: "",
        address: "",
        genre: "",
        number_phone: "",
        date_d_inscription: "",
        image: "",
      };
    },
    getterStudents: function (state) {
      return [state.students, []];
    },
  },
  actions: {
    async getAllStudents() {
      try {
        const response = await instance.get("/admin/allstudents");
        this.students = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getstudents(id = 1) {
      try {
        const response = await instance.get("/admin/students?page=" + id);
        this.allResponse = response;
        this.students = this.allResponse.data;
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
        console.log(response);

        this.students = this.students.filter(
          (t) => t.id !== this.idDeletestudent
        );

        this.idDeletestudent = null;
        this.isShowModalDelete = false;
        
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
          const response = await instance.put(
            "/admin/students/" + this.student.id,
            this.student
          );

          console.log(response);
          this.students = this.students.map((t) => {
            if (t.id !== this.student.id) return t;
            else return response.data;
          });

          this.student = {
            id: null,
            username: "",
            email: "",
            firstName: "",
            genre: "",
            lastName: "",
            grade_id: "",
            address: "",
            number_phone: "",
            date_d_inscription: "",
            image: "",
          };

          this.isShowModal = false;

      
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      } else {
        try {
          let formData = new FormData();

          formData.append("username", this.student.username);
          const response = await instance.post(
            "/admin/students",

            this.student
          );
          this.students.unshift(response);
          this.student = {
            id: null,
            username: "",
            email: "",
            firstName: "",
            genre: "",
            lastName: "",
            grade_id: "",
            address: "",
            number_phone: "",
            date_d_inscription: "",
            image: "",
          };

          this.isShowModal = false;
          
        } catch (err) {
          console.log(err);
        } finally {
          this.loader = false;
        }
      }
    },
    async changeImage() {
      try {
        let formData = new FormData();
        formData.append("image", this.student.image);
        console.log(this.student.image);
        const response = await instance.post(
          "/admin/students/changeImage/" + this.student.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.students = this.students.map((t) => {
          if (t.id !== this.student.id) return t;
          else return response;
        });

        this.student = {
          id: null,
          username: "",
          email: "",
          firstName: "",
          genre: "",
          lastName: "",
          grade_id: "",
          address: "",
          number_phone: "",
          date_d_inscription: "",
          image: "",
        };

        this.ModalChangeImage = false;
        
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
  },
});
