<template>

    <fwb-modal v-if="isShowModal" @close="closeModalDelete">
        <template #header>

        </template>
        <template #body>
            <div class="flex justify-center ">
                <img class="w-1/2 h-1/2"
                    src="https://th.bing.com/th/id/R.e2b23eb712c12203c36bc33b468f516e?rik=2fy31L5wvA4LVQ&riu=http%3a%2f%2fwww.dailyfreepsd.com%2fwp-content%2fuploads%2f2013%2f06%2fsign-of-danger-vector.jpg&ehk=JMb5ABS6sK0eYQu0CK8shEX2P%2b8gs9wQlyibkbbS8lY%3d&risl=&pid=ImgRaw&r=0"
                    alt="">
            </div>
            <div class="py-8">
                <h3 class="text-2xl font-bold text-center ">
                    are you sue you wannna delete this student
                </h3>
            </div>

        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <fwb-button @click="closeModalDelete" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button @click="deleteStudents" color="red">
                    confirm
                </fwb-button>
            </div>
        </template>
    </fwb-modal>




    <fwb-modal size="5xl" v-if="isShowModalAdd" @close="closeModalAdd">
        <template #header>

        </template>

        <template #body>
            <form class="flex justify-around">
                <div class="w-1/2 px-2">
                    <fwb-input v-model="student.firstName" required placeholder="enter your first Name address"
                        label="first Name" validation-status="">
                        <template #validationMessage>
                            Please enter a valid first Name address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.username" required placeholder="enter your username address"
                        label="username" validation-status="">
                        <template #validationMessage>
                            Please enter a valid username address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.number_phone" required placeholder="enter number phone address"
                        label="number phone" validation-status="">
                        <template #validationMessage>
                            Please enter a valid email address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.grade_id" required placeholder="enter drade" label="grade" type="text"
                        validation-status="">
                        <template #validationMessage>
                            Please enter a valid date d'inscription
                        </template>
                    </fwb-input>
                </div>
                <div class="w-1/2 px-2 ">
                    <fwb-input v-model="student.lastName" required placeholder="enter your first Name address"
                        label="first Name" validation-status="">
                        <template #validationMessage>
                            Please enter a valid first Name address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.email" type="email" required placeholder="enter your email address"
                        label="Email" validation-status="">
                        <template #validationMessage>
                            Please enter a valid email address
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.date_d_inscription" required placeholder="enter date d'inscription"
                        label="date d'inscription" type="date" validation-status="">
                        <template #validationMessage>
                            Please enter a valid date d'inscription
                        </template>
                    </fwb-input>
                    <fwb-input v-model="student.address" required placeholder="enter address" label="address"
                        type="text" validation-status="">
                        <template #validationMessage>
                            Please enter a valid date d'inscription
                        </template>
                    </fwb-input>
                </div>

            </form>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <fwb-button @click="closeModalAdd" color="alternative">
                    Decline
                </fwb-button>
                <fwb-button v-on:click="addEditStudent" :disabled="loader" type="submit" :loading="loader" color="blue">
                    submit
                </fwb-button>
            </div>
        </template>
    </fwb-modal>


    <div>
        <div class="flex justify-end py-3 pr-24">
            <fwb-button @click="showModalAdd" color="default">add student</fwb-button>
        </div>
        <fwb-table class="pb-10" striped>
            <fwb-table-head>
                <fwb-table-head-cell>name</fwb-table-head-cell>
                <fwb-table-head-cell>email</fwb-table-head-cell>
                <fwb-table-head-cell>grade</fwb-table-head-cell>
                <fwb-table-head-cell>role</fwb-table-head-cell>
                <fwb-table-head-cell>
                    <span class="sr-only">Edit</span>
                </fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body>


                <fwb-table-row v-for="(student, index) in students" :key="index">
                    <fwb-table-cell>{{ student.username }}</fwb-table-cell>
                    <fwb-table-cell>{{ student.email }}</fwb-table-cell>
                    <fwb-table-cell>Accessories</fwb-table-cell>
                    <fwb-table-cell>$99</fwb-table-cell>
                    <fwb-table-cell>
                        <fwb-dropdown text="">
                            <div class="w-20 overflow-hidden ">
                                <fwb-list-group>
                                    <fwb-list-group-item @click="showModalEdit(student.id)"
                                        class="text-blue-500  cursor-pointer ">
                                        Edit
                                    </fwb-list-group-item>
                                    <fwb-list-group-item @click="showModalDelete(student.id)"
                                        class="text-red-500  cursor-pointer ">
                                        Delete
                                    </fwb-list-group-item>

                                </fwb-list-group>
                            </div>
                        </fwb-dropdown>
                    </fwb-table-cell>
                </fwb-table-row>


            </fwb-table-body>
            <div class="flex justify-end pb-3 ">
                <fwb-pagination v-model="currentPage" :slice-length="lastPage > 8 ? 8 : lastPage"
                    :total-items="lastPage"></fwb-pagination>
            </div>
        </fwb-table>

    </div>
</template>

<script setup>
import { studentsStore } from "@/stores/studentsStore.js"
import { ref, reactive, computed, onMounted, watch } from 'vue'
const currentPage = ref(1)
const lastPage = ref(10)

import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbDropdown, FwbListGroup, FwbListGroupItem, FwbButton, FwbModal, FwbPagination, FwbInput
} from 'flowbite-vue'
const initialStudentValues = {
    username: "",
    email: "",
    password: "password",
    firstName: "",
    lastName: "",
    grade_id: "",
    address: "",
    phoneNumber: "",
    date_d_inscription: "",
    role: "student"
};

const student = reactive(initialStudentValues);
const loader = ref(false);
const students = ref([])
const studentRef = ref(null)
const store = studentsStore()
const isShowModal = ref(false)
const isShowModalAdd = ref(false)
const action = ref(true)
const selectedStudent = computed(() => {
    // Call the getObjectById getter from the store
    return store.getters.getObjectById(studentRef.value);
});
const showModalEdit = (id) => {
    for (let i = 0; i < students.value.length; i++) {
        let element = students.value[i];
        if (element.id === id) {
            
            for (const key in element) {

                student[key] = element[key];
            }
            break;
        }
    }
   
    action.value = false
    isShowModalAdd.value = true
}


const addEditStudent = async () => {

    loader.value = true;
    if (action.value) {
        try {
            const response = await store.addStudents(student);
            if (response.status) {
                for (const key in initialStudentValues) {
                    if (key != "role" && key != "password")
                        student[key] = "";
                }
               
                isShowModalAdd.value = false;
            } else {
                console.error("Failed to add student:", response.error);
            }
        } catch (error) {
            console.error("Error occurred while adding student:", error);

        } finally {
            loader.value = false;
        }
    } else {
     
        try {
            const response = await store.updateStudent(student, student.id);
            if (response.status) {
                for (const key in initialStudentValues) {
                    if (key != "role" && key != "password")
                        student[key] = "";
                }
                
                isShowModalAdd.value = false;
            } else {
                console.error("Failed to add student:", response.error);
            }
        } catch (error) {
            console.error("Error occurred while adding student:", error);

        } finally {
            loader.value = false;
        }
    }
};
// const editStudent = computed(() => {

//     return store.getters.getObjectById('123');
// });

const getStudents = async (page = 1) => await store.getStudents(page)



const deleteStudents = async () => {

    await store.deleteStudents(studentRef.value)

    isShowModal.value = false

}



onMounted(() => {
    getStudents();
});





const closeModalDelete = () => {
    isShowModal.value = false
}
const showModalDelete = (id) => {
    studentRef.value = id;
    isShowModal.value = true
}


const closeModalAdd = () => {
    isShowModalAdd.value = false
}
const showModalAdd = () => {
    action.value = true
    for (const key in initialStudentValues) {
        if (key != "role" && key != "password")
            student[key] = "";
    }
    isShowModalAdd.value = true
}






watch(() => store.students, (newValue) => {
    students.value = newValue.data;
    currentPage.value = newValue.current_page;
    lastPage.value = newValue.last_page
    console.log(students.value)
});

</script>
