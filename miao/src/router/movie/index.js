
export default {
    path:'/movie',
    component : () => import('@/views/movie'),
    children:[
        
        {
            path:'nowplaying',
            component : () => import('@/components/NowPlaying')

        },
        {
            path:'detail',
            component:
                ()=>import('@/views/movie/detail'),
        },
        {
            path:'detail/1/:movieId',
            components:{
                default:()=>import('@/components/NowPlaying'),
                detail:()=>import('@/views/movie/detail'),
            },
            props:{
                detail:true,
            }

        },
        {
            path:'detail/2/:movieId',
            components:{
                default:()=>import('@/components/NowPlaying'),
                detail:()=>import('@/views/movie/detail'),
            },
            props:{
                detail:true,
            }

        },
        {
            path:'/movie',
            redirect:'/movie/nowplaying',
        }
    ]
}