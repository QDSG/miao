
export default {
    path:'/cinema',
    component:()=>import('@/views/cinema'),
    children:[
        {
            path:'clist',
            component : () => import('@/components/CiList')
        },
        {
            path:'/cinema',
            redirect:'/cinema/clist',
        }
    ]
}