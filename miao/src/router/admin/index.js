export default {
    path:'/admin',
    component:()=>import('@/views/admin'),
    children:[
        {
            path:'mine',
            component : () => import('@/views/admin/mine.vue')
        },
        {
            path:'cinema',
            component : () => import('@/views/admin/cinema.vue')
        },
        {
            path:'movie',
            component : () => import('@/views/admin/movie.vue')
        },

        {
            path:'/admin',
            redirect:'mine',
        }

    ]
}