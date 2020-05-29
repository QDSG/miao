
export default {
    path:'/mine',
    component:()=>import('@/views/mine'),
    children:[
        {
            path:'login',
            component : () => import('@/components/Login')
        },
        {
            path:'center',
            component : () => import('@/views/mine/center.vue')
        },
        {
            path:'register',
            component : () => import('@/components/Register')
        },
        {
            path:'findpassword',
            component : () => import('@/components/FindPassword')
        },
        {
            path:'address',
            component : () => import('@/components/Address')
        },
        {
            path:'addaddress',
            component : () => import('@/components/Address/AddAdress.vue')
        },
        {
            path:'moaddress',
            component : () => import('@/components/Address/ModifyAddress.vue')
        },
        {
            path:'/mine',
            redirect:'center',
        },
        {
            path:'city',
            component : () => import('@/components/City')
        },
    ]
}