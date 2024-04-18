import "./style.css";
import "../node_modules/flowbite-vue/dist/index.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */

import "vue-toastification/dist/index.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

import ProgressSpinner from "primevue/progressspinner";

import PickList from "primevue/picklist";

import ProgressBar from "primevue/progressbar";

 

import ScrollPanel from "primevue/scrollpanel";


const app = createApp(App);

app.use(createPinia());
app.use(Toast);
app.use(router);
app.use(PrimeVue);

app.component("ProgressBar", ProgressBar);
app.component("PickList", PickList);
app.component("ScrollPanel", ScrollPanel);
app.component("ProgressSpinner", ProgressSpinner);





app.mount("#app");
