// import { Vue } from 'vue/types/vue';


// declare module 'vue/types/vue' {
//     interface VueConstructor<V extends Vue = Vue> {
//         asyncData?: (...args: any[]) => Promise<any>
//     }
// }

// declare module 'vue/types/options' {
//     // type Component ={ 
//     //     asyncData?: (...args: any[]) => Promise<any>
//     // }
// }

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}